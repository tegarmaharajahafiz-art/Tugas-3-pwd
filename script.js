// JavaScript interaktif untuk portofolio
document.addEventListener("DOMContentLoaded", function () {
  // 1. Menu navigasi responsif
  const menuToggle = document.querySelector("#menu-toggle");
  const navLinks = document.querySelector("#nav-links");

  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  });

  // Menutup menu setelah salah satu tautan dipilih
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    });
  });

  // 2. Tombol kembali ke atas muncul saat halaman digulir
  const backToTop = document.querySelector("#back-to-top");
  function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 350);
  }
  window.addEventListener("scroll", updateBackToTop);
  updateBackToTop();

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 3. Tahun footer menyesuaikan tahun saat ini
  document.querySelector("#current-year").textContent = new Date().getFullYear();

  // 4. Animasi elemen ketika masuk ke area tampilan
  const revealItems = document.querySelectorAll(
    ".section-label, .section-heading, .profile-layout, .education-item, .skill-card, .hobbies, .project-feature, .campus-note, .contact-layout"
  );
  revealItems.forEach(function (item) {
    item.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("revealed");
    });
  }

  // 5. Validasi formulir dan tampilkan ringkasan tanpa reload halaman
  const contactForm = document.querySelector("#contact-form");
  const formResult = document.querySelector("#form-result");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah halaman dimuat ulang

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const nama = String(formData.get("fnama") || "").trim();
    const email = String(formData.get("femail") || "").trim();
    const prodi = String(formData.get("fprodi") || "");
    const gender = String(formData.get("fjkel") || "Belum dipilih");
    const hobi = formData.getAll("fhobi");
    const pesan = String(formData.get("fpesan") || "").trim();

    // Gunakan textContent agar masukan pengguna ditampilkan sebagai teks biasa.
    formResult.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = "Pesan berhasil disiapkan!";
    formResult.appendChild(heading);

    [
      ["Nama", nama],
      ["Email", email],
      ["Program studi", prodi],
      ["Jenis kelamin", gender],
      ["Hobi / minat", hobi.length ? hobi.join(", ") : "Belum dipilih"],
      ["Pesan", pesan]
    ].forEach(function (item) {
      const paragraph = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = item[0] + ": ";
      paragraph.append(strong, document.createTextNode(item[1] || "-"));
      formResult.appendChild(paragraph);
    });

    const note = document.createElement("p");
    note.textContent = "Catatan: ini hanya pratinjau di browser, belum dikirim atau disimpan ke server.";
    formResult.appendChild(note);

    formResult.hidden = false;
    formResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  // 6. Tombol reset juga menghapus hasil pratinjau
  contactForm.addEventListener("reset", function () {
    window.setTimeout(function () {
      formResult.hidden = true;
      formResult.replaceChildren();
    }, 0);
  });
});
