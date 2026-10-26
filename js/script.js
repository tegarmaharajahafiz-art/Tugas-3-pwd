
// MENAMPILKAN TAHUN OTOMATIS
const elemenTahun = document.getElementById("tahun");

if (elemenTahun) {
    elemenTahun.textContent = new Date().getFullYear();
}

// MENGAMBIL FORM DAN TEMPAT HASIL
const formLaundry = document.getElementById("formLaundry");
const hasilPesanan = document.getElementById("hasilPesanan");

// MENANGANI PENGIRIMAN FORM
formLaundry.addEventListener("submit", function(event) {
    // Mencegah halaman dimuat ulang
    event.preventDefault();

    // Mengambil nilai dari setiap input
    const nama = document.getElementById("nama").value.trim();
    const telepon = document.getElementById("telepon").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const layanan = document.getElementById("layanan").value;
    const berat = document.getElementById("berat").value;

    // Mengambil radio button yang dipilih
    const pilihanMetode = document.querySelector(
        'input[name="metode"]:checked'
    );

    // Validasi data
    if (!nama || !telepon || !alamat || !layanan || !berat || !pilihanMetode) {
        hasilPesanan.className = "alert alert-warning";
        hasilPesanan.textContent = "Mohon lengkapi semua data wajib.";
        return;
    }

    // Menentukan harga per kilogram
    let hargaPerKg = 0;

    if (layanan === "Cuci Reguler") {
        hargaPerKg = 7000;
    } else if (layanan === "Cuci + Setrika") {
        hargaPerKg = 10000;
    } else if (layanan === "Laundry Express") {
        hargaPerKg = 15000;
    }

    // Menghitung total biaya
    const total = hargaPerKg * Number(berat);

    // Menampilkan hasil pesanan
    hasilPesanan.className = "alert alert-success";
    hasilPesanan.textContent =
        "Pesanan berhasil divalidasi! Nama: " + nama +
        ". Layanan: " + layanan +
        ". Berat: " + berat + " kg" +
        ". Metode: " + pilihanMetode.value +
        ". Estimasi total: Rp" + total.toLocaleString("id-ID") +
        ". Data ini hanya simulasi dan belum dikirim ke server.";

    // Mengarahkan tampilan ke hasil
    hasilPesanan.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});
