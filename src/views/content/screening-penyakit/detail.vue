<template>
  <div class="container py-5">
    <h2 class="text-center mb-4 fw-semibold">DETAIL SKRINING PENYAKIT</h2>

    <div class="table-responsive">
      <table class="table table-hover border">
        <thead class="thead-light">
          <tr>
            <th>Gejala yang Kamu Alami Saat Ini</th>
            <th>Tingkat Keyakinan</th>
            <th>CF User</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gejala in gejalaTerpilih" :key="gejala.kode">
            <td>{{ gejala.kode }} - {{ gejala.nama }}</td>
            <td>{{ gejala.keyakinan }}</td>
            <td>{{ gejala.cf_user }}</td>
          </tr>
        </tbody>
      </table>

      <div class="mt-4">
        <h6 class="font-weight-bold">
          Tabel perhitungan penyakit:
          <!---{{ $diagnosa['nama_penyakit'] }} ({{ $diagnosa['kode_penyakit'] }}) -->
        </h6>
      </div>

      <div class="mt-4" v-for="diagnosa in hasilDiagnosa" :key="diagnosa.kode_penyakit">
        <div class="card card-body p-0 mt-5 border" style="box-shadow: none !important">
          <div class="card-header bg-primary text-white p-2">
            <h6 class="font-weight-bold">
              Tabel perhitungan penyakit: {{ diagnosa.nama_penyakit }} ({{ diagnosa.kode_penyakit }})
            </h6>
          </div>
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th>Gejala</th>
                <th>CF User</th>
                <th>CF Expert</th>
                <th>CF (H, E)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="gejala in diagnosa.gejala" :key="gejala.kode">
                <td>{{ gejala.kode }} - {{ gejala.nama }}</td>
                <td>{{ gejala.cf_user }}</td>
                <td>{{ gejala.cf_role }}</td>
                <td>{{ gejala.hasil_perkalian }}</td>
              </tr>
            </tbody>
            <tfoot class="font-weight-bold">
              <tr>
                <td scope="row">Nilai CF</td>
                <td>
                  <span class="text-danger">{{ parseFloat(diagnosa.hasil_cf).toFixed(3) }}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!-- Kesimpulan -->
    <div class="alert alert-success mt-5">
      <h5 class="font-weight-bold">Kesimpulan</h5>

      Berdasarkan dari gejala yang kamu pilih atau alami juga berdasarkan Role/Basis aturan yang
      sudah ditentukan oleh seorang pakar penyakit maka perhitungan Algoritma Certainty Factor
      mengambil nilai CF yang paling tinggi yakni
      <!-- Tampilkan hasil diagnosa -->
      <!-- Jika ada cfMax -->
      <span v-if="cfMax">
        <!-- Tampilkan nama penyakit dan nilai CF -->
        {{ cfMax[1] }} dengan nilai CF {{ cfMax[0] }}
      </span>

      <!-- Jika tidak ada cfMax -->
      <!-- Tampilkan pesan bahwa tidak ada hasil diagnosa -->
      <span v-else>Tidak ada hasil diagnosa.</span>
    </div>

    <!-- Tombol Cetak PDF hanya untuk di web -->
    <button @click="cetakPDF" class="btn btn-primary mt-3 d-print-none" id="btnCetakPDF">Cetak PDF</button>
  </div>
</template>

<script>
import axios from 'axios'
import html2pdf from 'html2pdf.js'

export default {
  data() {
    return {
      gejalaTerpilih: [],
      hasilDiagnosa: [],
      cfMax: null
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.fetchDetails()
  },
  methods: {
    async fetchDetails() {
      try {
        const response = await axios.get(`riwayat/${this.id}`)
        this.gejalaTerpilih = response.data.gejala_terpilih
        this.hasilDiagnosa = response.data.hasil_diagnosa
        this.cfMax = response.data.cf_max
      } catch (error) {
        console.error('Error fetching detail: ', error)
        alert('Terjadi kesalahan saat mengambil detail diagnosa. Silakan coba lagi nanti.')
      }
    },
    cetakPDF() {
      // Sembunyikan tombol cetak sebelum proses konversi
      const btnCetakPDF = document.getElementById('btnCetakPDF');
      if (btnCetakPDF) {
        btnCetakPDF.style.display = 'none';
      }

      const element = this.$el;
      const options = {
        margin: 30,
        filename: 'skrining_kesehatan.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        // Opsi untuk menyembunyikan tombol cetak di file PDF
        onBeforeSave: (pdf) => {
          pdf.internal.pages.forEach((page) => {
            page.content.forEach((pdfElement, index) => {
              if (
                pdfElement &&
                pdfElement.settings &&
                pdfElement.settings.id === 'btnCetakPDF' &&
                page.content[index + 1].text === 'Cetak PDF'
              ) {
                // Sembunyikan tombol cetak dengan menghapus elemen yang berkaitan
                page.content.splice(index, 2);
              }
            });
          });
        },
      };

      html2pdf(element, options)
        .then(() => {
          console.log('PDF berhasil dibuat');

          // Setelah selesai proses konversi, tampilkan kembali tombol cetak
          if (btnCetakPDF) {
            btnCetakPDF.style.display = 'block';
          }
        })
        .catch((error) => {
          console.error('Gagal membuat PDF: ', error);

          // Jika terjadi kesalahan, pastikan tombol cetak ditampilkan kembali
          if (btnCetakPDF) {
            btnCetakPDF.style.display = 'block';
          }
        });
    },
  },
};
</script>

<style scoped>
h2 {
  text-shadow: 1px 1px #0099ff;
  color: rgb(0, 0, 0);
}

.container {
  max-width: 800px;
  margin: auto;
}

.card {
  border-radius: 0.5rem;
}

.card-header {
  border-radius: 0.5rem 0.5rem 0 0;
}
</style>
