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
      <slot name="router" v-if="currentStep === 1">
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
        <div class="d-flex flex-column px-4 pt-3" v-if="chosenDokter">
          <h5>
            <b>{{ chosenDokter.user.nama }}</b>
          </h5>
          <p class="fs-6">Spesialis {{ chosenDokter.keahlian.namaKeahlian }}</p>
        </div>
      </div>
    </div>
    <div
      class="d-lg-flex flex-column rounded-bottom bg-white border border-primary-subtle mx-auto p-5"
    >
      <h3 class="mx-auto">
        <b>{{ stepTitles[currentStep - 1].title }} </b>
      </h3>
      <h6 class="mx-auto">
        <b>{{ stepTitles[currentStep - 1].subtitle }}</b>
      </h6>
      <!-- STEPPER HERE -->
      <div class="bs-stepper text-wrap mx-auto" style="width: 40rem">
        <div class="bs-stepper-header" role="tablist">
          <!-- your steps here -->
          <div class="step" data-target="#part1">
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
          <div class="step" data-target="#part2">
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
          <div class="step" data-target="#part3">
            <button
              type="button"
              class="step-trigger"
              role="tab"
              aria-controls="information-next"
              id="information-next-trigger"
            >
              <span class="bs-stepper-circle">3</span>
            </button>
          </div>
          <div class="line"></div>
          <div class="step" data-target="#part4">
            <button
              type="button"
              class="step-trigger"
              role="tab"
              aria-controls="information-next"
              id="information-next-trigger"
            >
              <span class="bs-stepper-circle">4</span>
            </button>
          </div>
        </div>
        <div class="bs-stepper-content">
          <!-- your steps content here -->
          <div
            id="part1"
            ref="part1"
            class="content"
            role="tabpanel"
            aria-labelledby="logins-part-trigger"
            v-show="isCurrentStep(1)"
          >
            <div class="d-flex flex-column">
              <h6 class="mx-auto fw-bold">Antrean ini untuk siapa?</h6>
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
            </div>
          </div>
          <div
            id="part2"
            ref="part2"
            class="content"
            role="tabpanel"
            aria-labelledby="logins-part-trigger"
            v-show="isCurrentStep(2)"
          >
            <div class="d-flex flex-column text-center">
              <h6><b>Nomor Antrean Anda:</b></h6>
              <h3 class="fw-bold">10</h3>
            </div>
          </div>
          <div
            id="part3"
            ref="part3"
            class="content"
            role="tabpanel"
            aria-labelledby="logins-part-trigger"
            v-show="isCurrentStep(3)"
          >
            <div class="d-flex flex-column text-center">
              <h6 class="fw-bold">Dokter sedang memberikan sesi tes</h6>
              <h6>Anda dapat melihat hasil tes setelah sesi tes ini berakhir</h6>
            </div>
          </div>
          <div
            id="part4"
            ref="part4"
            class="content"
            role="tabpanel"
            aria-labelledby="logins-part-trigger"
            v-show="isCurrentStep(4)"
          >
            <div class="d-flex flex-column text-center">
              <div
                class="progress mx-auto w-50"
                role="progressbar"
                aria-label="bar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div class="progress-bar text-bg-warning fw-bold text-light" style="width: 75%">
                  75%
                </div>
              </div>
              <p class="fw-bold mt-3 text-center">Level Risiko Perempuan, >40 Tahun</p>
              <div class="d-flex bg-secondary-subtle p-3 rounded-top">
                <p class="fw-light">
                  Anjuran dokter di tulis disini.... Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </p>
              </div>
              <div
                class="d-lg-flex rounded-bottom border px-3 py-2"
                style="background-color: #c2daff"
              >
                <span>
                  <i class="fa-solid fa-circle-info text-primary mx-3"></i>
                  <a href="" class="text-decoration-none">Unduh hasil tes dalam bentuk file PDF</a>
                </span>
              </div>
              <p class="fw-normal mt-3">
                <b>NOTE:</b> Anda dianjurkan untuk melakukan skrining wajah untuk menganalisa gejala
                kelumpuhan pada wajah.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-4">
        <button class="btn btn-primary rounded-4 py-2 px-4" @click="getAntrean" type="button">
          {{ getButtonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from 'bs-stepper'
import SectionHeaderBody from '../../../components/partials-component/SectionHeaderBody.vue'
export default {
  data() {
    return {
      chosenDokter: null,
      currentStep: 1,
      stepper: null,
      stepTitles: [
        { title: 'Buat Antrean Tes', subtitle: 'Bagaimana kami dapat membantu Anda?' },
        {
          title: 'Anda telah memasuki Antrean Tes',
          subtitle: 'Tunggu hingga dokter memvalidasi kehadiran Anda'
        },
        { title: 'Ruang Tes Risiko Stroke', subtitle: 'Proses Skrining sedang berlangsung ' },
        { title: 'Hasil Tes Risiko Stroke', subtitle: 'Risiko Tinggi ' }
      ],
      cardData: [{}]
    }
  },
  computed: {
    limitData() {
      return {
        kategori: this.kategori.slice(0, this.limit)
      }
    },
    isCurrentStep() {
      return (step) => this.currentStep === step
    },
    getButtonLabel() {
      switch (this.currentStep) {
        case 1:
          return 'Dapatkan Antrean'
        case 2:
          return 'Mulai Skrining'
        case 3:
          return 'Lihat hasil'
        default:
          return 'Lakukan Skrining Wajah'
      }
    }
  },
  components: {
    SectionHeaderBody
  },
  mounted() {
    this.getInfoChosenDokter(),
      (this.stepper = new Stepper(document.querySelector('.bs-stepper'), {
        linear: true,
        animation: false,
        selectors: {
          steps: '.step',
          trigger: '.step-trigger',
          stepper: '.bs-stepper'
        }
      }))
  },
  created() {},

  methods: {
    changeStep(step) {
      this.currentStep = step
    },
    getAntrean() {
      console.log('Antrean Diperoleh')
      this.stepper.next()
      this.currentStep++

      if (this.currentStep === 5) {
        // Redirect to the specified page
        this.$router.push({ name: 'Skrining Penyakit Stroke' })
      }

      this.$nextTick(() => {
        for (let i = 1; i <= 5; i++) {
          const contentRef = this.$refs[`part${i}`]
          if (contentRef) {
            contentRef.style.display = this.currentStep === i ? 'block' : 'none'
          }
        }
      })
    },

    getInfoChosenDokter() {
      this.$nextTick().then(() => {
        const dokterUid = this.$route.query.dokter_uid

        let type = 'getData'
        let url = [`list_dokter_sp_stroke/${dokterUid}/info`, {}]

        this.$store
          .dispatch(type, url)
          .then((result) => {
            if (!result.success) {
              /* 30/11/23 redirect ke pilih dokter lagi*/

              this.$router.push({ name: 'Tes Risiko Stroke' })
              return false
            }

            if (result.data.dokter.sedangOnline == 0) {
              this.$swal({
                icon: 'error',
                title: 'Dokter sedang tidak online',
                text: 'Silakan pilih ulang.'
              })

              this.$router.push({ name: 'Tes Risiko Stroke' })
              return false
            }

            this.chosenDokter = result.data
            // console.log(this.chosenDokter.keahlian)
          })
          .catch(console.error)
      })
    }
  }
}
</script>

<style>
h6 {
  color: #002761;
}
p {
  color: #686868;
}
</style>
