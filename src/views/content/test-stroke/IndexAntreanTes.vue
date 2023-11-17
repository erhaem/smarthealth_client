<template>
  <SectionHeaderBody>
    <template #router>
      <router-link style="text-decoration: none" :to="{ name: 'IndexHome' }">
        <p class="text-light">
          Home /
          <router-link
            :to="{ name: 'Buat Antrean Tes' }"
            class="text-light"
            style="text-decoration: none"
          >
            {{ $route.name }}
          </router-link>
        </p>
      </router-link>
    </template>
  </SectionHeaderBody>
  <div class="container mt-4">
    <div class="d-lg-flex rounded-top px-5 py-3" style="background-color: #c2daff">
      <slot name="router">
        <router-link style="text-decoration: none" :to="{ name: 'Tes Risiko Stroke' }">
          <p class="text-primary">
            <i class="fas fa-angle-left text-primary"></i>
            Kembali Ke Dokter
          </p>
        </router-link>
      </slot>
      <div class="d-flex flex-row mx-auto py-3 mt-4 align-items-center">
        <div class="d-flex position-relative" style="width: 80px">
          <img src="../../../assets/images/user.png" alt="" style="width: 90px" />
          <div
            class="d-flex rounded-circle position-absolute"
            style="bottom: 0; right: 0; width: 15px; height: 15px; background-color: rgb(0, 195, 0)"
          ></div>
        </div>
        <div class="d-flex flex-column px-4 pt-3">
          <h5><b>Something agak panjang dikit ya</b></h5>
          <p class="fs-6">Spesialis Saraf Kejepit</p>
        </div>
      </div>
    </div>
    <div
      class="d-lg-flex flex-column rounded-bottom bg-white border border-primary-subtle mx-auto p-5"
    >
      <h3 class="mx-auto"><b>Buat Antrean Tes </b></h3>
      <h6 class="mx-auto"><b>Bagaimana kami dapat membantu Anda?</b></h6>
      <!-- STEPPER HERE -->
      <div class="bs-stepper text-wrap mx-auto" style="width: 40rem">
        <div class="bs-stepper-header" role="tablist">
          <!-- your steps here -->
          <div class="step" data-target="#">
            <button
              type="button"
              class="step-trigger"
              role="tab"
              aria-controls="logins-part"
              id="logins-part-trigger"
            >
              <span class="bs-stepper-circle">1</span>
            </button>
          </div>
          <div class="line"></div>
          <div class="step" data-target="#information-part">
            <button
              type="button"
              class="step-trigger"
              role="tab"
              aria-controls="information-part"
              id="information-part-trigger"
            >
              <span class="bs-stepper-circle">2</span>
            </button>
          </div>
          <div class="line"></div>
          <div class="step" data-target="#information-part">
            <button
              type="button"
              class="step-trigger"
              role="tab"
              aria-controls="information-part"
              id="information-part-trigger"
            >
              <span class="bs-stepper-circle">3</span>
            </button>
          </div>
        </div>
        <div class="bs-stepper-content">
          <!-- your steps content here -->
          <div
            id="logins-part"
            class="content"
            role="tabpanel"
            aria-labelledby="logins-part-trigger"
          ></div>
          <div
            id="information-part"
            class="content"
            role="tabpanel"
            aria-labelledby="information-part-trigger"
          ></div>
        </div>
      </div>
      <div class="d-flex flex-column">
        <h6 class=" mx-auto fw-bold">Antrean ini untuk siapa ?</h6>
        <div class="d-flex mx-auto gap-5">
          <div>
            <input
              type="radio"
              class="form-check-input"
              name="options-outlined"
              id="primary-outlined1"
              autocomplete="off"
            />
            <label class="form-check-label ps-2" for="primary-outlined1">Pasien Baru</label>
          </div>
          <div>
            <input
              type="radio"
              class="form-check-input"
              name="options-outlined"
              id="primary-outlined2"
              autocomplete="off"
            />
            <label class="form-check-label ps-2" for="primary-outlined2">Pasien Lama</label>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-5">
          <button class="btn btn-primary rounded-4 py-2 px-4" type="button">Dapatkan Antrean</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeaderBody from '../../../components/partials-component/SectionHeaderBody.vue'
export default {
  data() {
    return (
      {
        isLoading: false
      },
      {
        cardData: [
          {
            dokters: [
              {
                nama: 'Dr Rangga Soetomo',
                img: '../../../assets/images/user.png',
                spesialis: 'Spesialis Neurologi',
                rating: 20,
                pengalaman: '1 Tahun Pengalaman'
              },
              {
                nama: 'Dr Rangga Soetomo',
                img: '../../../assets/images/user.png',
                spesialis: 'Spesialis Neurologi',
                rating: 20,
                pengalaman: '1 Tahun Pengalaman'
              },
              {
                nama: 'Dr Rangga Soetomo',
                img: '../../../assets/images/user.png',
                spesialis: 'Spesialis Neurologi',
                rating: 20,
                pengalaman: '1 Tahun Pengalaman'
              },
              {
                nama: 'Dr Rangga Soetomo',
                img: '../../../assets/images/user.png',
                spesialis: 'Spesialis Neurologi',
                rating: 20,
                pengalaman: '1 Tahun Pengalaman'
              }
            ]
          }
        ]
      }
    )
  },
  computed: {
    limitData() {
      return {
        kategori: this.kategori.slice(0, this.limit)
      }
    }
  },
  components: {
    SectionHeaderBody
  },
  mounted() {},
  created() {},
  methods: {}
}
</script>

<style>
h2,
h3,
h5,
h6 {
  color: #002761;
}
p {
  color: #686868;
}
</style>

<script></script>
