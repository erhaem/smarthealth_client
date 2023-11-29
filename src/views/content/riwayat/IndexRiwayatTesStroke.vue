<template>
  <div class="container">
    <div class="mb-3">
      <h4><b>Riwayat Tes Risiko Stroke</b></h4>
    </div>
    <div class="input-group mb-3 w-50">
      <span class="input-group-text border-0 bg-warning" id="search-addon">
        <i class="fas fa-magnifying-glass text-light"></i>
      </span>
      <input
        type="search"
        class="form-control rounded-end p-2"
        placeholder="Cari riwayat tes risiko strokemu di sini"
      />
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nomor</th>
            <th scope="col">Tanggal Tes</th>
            <th scope="col">Dokter</th>
            <th scope="col">Angka Stroke</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history, index) in riwayatTes" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ history.tanggalTes }}</td>
            <td>{{ history.dokter }}</td>
            <td>{{ history.angkaStroke }}</td>
            <td>
              <!-- Add any action buttons here -->
              <button
                class="btn btn-sm btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#dataRiwayat"
              >
                <i class="fa-solid fa-eye text-light"></i>
              </button>
              <button class="mx-1 btn btn-sm btn-primary">
                <i class="fa-solid fa-file-arrow-down"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <ModalComponent :isScrollable="true" id="dataRiwayat" :modalTitle="'Detail ' + $route.name">
    <template #modal>
      <div class="d-flex rounded pt-3 text-dark" style="background-color: #effcfc">
        <ul class="fw-bold" style="list-style-type: none">
          <li>ID Rekam Medis:</li>
          <li>Dokter:</li>
          <li>Waktu Tes:</li>
        </ul>
      </div>
      <div class="ms-4">
        <h6 class="fw-bold text-primary-emphasis mt-2">Hasil Tes:</h6>
        <div class="d-flex flex-row gap-5">
          <h1><span class="badge bg-primary rounded-circle">70</span></h1>

          <h4 class="text-primary-emphasis mt-3">Risiko Tinggi</h4>
        </div>
        <h6 class="fw-normal">Level Risiko Perempuan, >40 Tahun</h6>
        <h6 class="fw-bold text-primary-emphasis mt-2">Anjuran:</h6>
        <ul>
          <li>Cobalah untuk minum air putih 1 galon</li>
          <li>Cobalah untuk minum air putih 1 galon</li>
          <li>Cobalah untuk minum air putih 1 galon</li>
        </ul>
        
      </div>
    </template>
  </ModalComponent>
</template>
<script>
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
export default {
  data() {
    return {
      riwayatTes: [
        {
          tanggalTes: '14 November 2023',
          dokter: 'Dr. Stone',
          angkaStroke: '75%'
        },
        {
          tanggalTes: '14 Agustus 2023',
          dokter: 'Dr. Stone',
          angkaStroke: '75%'
        }
      ],
      riwayat: [],
      idPembelian: [],
      detail: [],
      limit: 1,
      isLoading: false,
    
    }
  },

  methods: {},
  components: {
    ModalComponent,
    LoadingComponent
  }
}
</script>
