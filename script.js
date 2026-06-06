const inputGambar = document.getElementById('observasi');
const inputTanggal = document.getElementById('tanggal');
const btnTampilkan = document.getElementById('btnTampilkan');
const btnHapusSemua = document.getElementById('btnHapusSemua');
const listKonten = document.getElementById('listKonten');

function muatData() {
    listKonten.innerHTML = "";
    const dataLokal = JSON.parse(localStorage.getItem('riwayatObservasi')) || [];

    dataLokal.forEach((item, index) => {
        const card = document.createElement('div');

        card.style.border = "4px solid #657733";
        card.style.padding = "15px";
        card.style.marginBottom = "15px";
        card.style.borderRadius = "5%";
        card.style.backgroundColor = "#d7e3a4";
        card.style.maxWidth = "400px";

        card.innerHTML = `
            <p><strong>Observasi ${index + 1}</strong></p>
            <p><strong>Tanggal:</strong> ${item.tanggal}</p>
            <p><strong>Gambar:</strong></p>
            <img src="${item.gambar}" alt="Preview" style="max-width: 100%; margin-top: 10px;">
        `;

        listKonten.appendChild(card);
    });
}

btnTampilkan.addEventListener('click', function () {
    const file = inputGambar.files[0];
    const tanggalValue = inputTanggal.value;

    if (!file || !tanggalValue) {
        alert("Harap masukkan gambar dan tanggal terlebih dahulu!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const base64Gambar = e.target.result;

        const dataLokal = JSON.parse(localStorage.getItem('riwayatObservasi')) || [];

        dataLokal.push({
            tanggal: tanggalValue,
            gambar: base64Gambar
        });

        localStorage.setItem(
            'riwayatObservasi',
            JSON.stringify(dataLokal)
        );

        muatData();

        document.getElementById('observasiForm').reset();
    };

    reader.readAsDataURL(file);
});

btnHapusSemua.addEventListener('click', function () {
    if (confirm("Apakah Anda yakin ingin menghapus semua riwayat observasi?")) {
        localStorage.removeItem('riwayatObservasi');
        muatData();
    }
});

window.onload = muatData;