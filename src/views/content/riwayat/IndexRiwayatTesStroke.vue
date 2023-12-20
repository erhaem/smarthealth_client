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
    <div class="row row-cols-1 row-cols-md-2 g-4" v-if="dataRiwayat !== null">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">No. Urut Antrean</th>
            <th scope="col">Tanggal Tes</th>
            <th scope="col">Dokter</th>
            <th scope="col">Persentase Kemungkinan</th>
            <th scope="col">Kategori</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history, index) in dataRiwayat" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <th>{{ history.noUrutAntrean }}</th>
            <td>{{ getFormattedDate(history.createdAt) }}</td>
            <td>{{ history.userDokter.nama }}</td>
            <td>{{ history.persentaseTotal }}</td>
            <td>{{ history.label }}</td>
            <td>
              <!-- Add any action buttons here -->
              <button
                class="btn btn-sm btn-warning"
                @click="selectedHistory = history"
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
  <ModalComponent
    v-if="selectedHistory !== null"
    :isScrollable="true"
    id="dataRiwayat"
    :modalTitle="'Detail ' + $route.name"
  >
    <template #modal>
      <div class="d-flex rounded pt-3 text-dark" style="background-color: #effcfc">
        <ul class="fw-bold" style="list-style-type: none">
          <li>ID Rekam Medis: {{ this.selectedHistory.id }}</li>
          <li>Dokter: {{ this.selectedHistory.userDokter.nama }}</li>
          <li>Waktu Tes: {{ getFormattedDate(this.selectedHistory.createdAt) }}</li>
        </ul>
      </div>
      <div class="ms-4">
        <h6 class="fw-bold text-primary-emphasis mt-2">Hasil Tes:</h6>
        <div class="d-flex flex-row gap-5">
          <h1>
            <span
              :class="
                'badge bg-' +
                getLabelClass(this.selectedHistory.persentaseTotal) +
                ' rounded-circle'
              "
              >{{ this.selectedHistory.persentaseTotal }}</span
            >
          </h1>

          <h4
            :class="
              'text-' + getLabelClass(this.selectedHistory.persentaseTotal) + '-emphasis mt-3'
            "
          >
            {{ this.selectedHistory.label }}
          </h4>
        </div>
        <h6 class="fw-bold text-primary-emphasis mt-2">Anjuran:</h6>
        <p>{{ this.selectedHistory.pesanDokter }}</p>
        <h5 class="fw-bold text-primary-emphasis">Ringkasan Seputar Tes</h5>
        <div class="d-grid gap-2 mb-1">
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>Apakah pasien memiliki riwayat hipertensi ?</p>
            <p class="fw-normal">{{ this.selectedHistory.isHipertensi === 1 ? 'Ya' : 'Tidak' }}</p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>
              Berapa tingkat kolesterol “jahat” Low Density Lipoprotein pasien (Berdasarkan hasil
              tes lab)?
            </p>
            <p class="fw-normal">{{ this.selectedHistory.rangeKadarLdl }}</p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>Apakah pasien memiliki gejala vertigo sentral (pusing berkeliling)?</p>
            <p class="fw-normal">{{ this.selectedHistory.isVertigo === 1 ? 'Ya' : 'Tidak' }}</p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>Apakah pasien memiliki gejala Kelumpuhan pada sebagian tubuh?</p>
            <p class="fw-normal">
              {{ this.selectedHistory.isKelumpuhanParsial === 1 ? 'Ya' : 'Tidak' }}
            </p>
          </div>
          <div class="d-flex flex-column rounded bg-secondary-subtle px-3 py-2">
            <p>Apakah pasien mengalami kesulitan dalam berbicara?</p>
            <p class="fw-normal">
              {{ this.selectedHistory.isKesulitanBicara === 1 ? 'Ya' : 'Tidak' }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>
<script>
import Cookies from 'js-cookie'
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
export default {
  data() {
    return {
      dataRiwayat: null,
      selectedHistory: null,
      idPembelian: [],
      detail: [],
      limit: 1,
      isLoading: false
    }
  },

  created() {
    this.listRiwayatTestByKonsumen()
  },

  methods: {
    listRiwayatTestByKonsumen() {
      const currentKonsumen = JSON.parse(Cookies.get('user')).data

      // console.log(currentKonsumen)

      let type = 'getData'
      let url = [`list_riwayat_test_stroke/${currentKonsumen.id}/konsumen?order_by=DESC`, {}]

      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (!result.success) {
            this.$swal({
              icon: 'error',
              title: 'Gagal mendapatkan list riwayat test stroke',
              text: result.message + ' Silakan refresh halaman ini nanti'
            })

            return false
          }

          this.dataRiwayat = result.data
        })
        .catch(console.error)
    },

    getFormattedDate(currentDate) {
      const nextMonthDate = new Date(currentDate)
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false // Use 24-hour format
      }

      return nextMonthDate.toLocaleDateString('id-ID', options).replace(/\./g, ':')
    },

    getLabelClass(persentase) {
      const persentaseTotal = persentase

      if (persentaseTotal > 75) {
        return 'danger'
      } else if (persentaseTotal > 50) {
        return 'warning'
      }

      return 'primary'
    }
  },
  components: {
    ModalComponent,
    LoadingComponent
  }
}
</script>
