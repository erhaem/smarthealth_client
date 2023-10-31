<template>
  <div class="container">
    <div class="row align-items-top">
      <div class="d-flex">
        <!-- <div class="mh-100 col-md-6 py-4" style="background-color: #e3effa; height: 700px"> -->

        <div class="details p-4">
          <span class="name">
            <h6><b>Test Risiko Stroke</b></h6>
          </span>
          <span class="description">
            <p class="mb-0 py-2" style="font-size: 15px">
              Stroke merupakan gangguan fungsi otak yang terjadi karena terhentinya suplai darah ke
              otak, baik karena sumbatan (stroke iskemik) ataupun karena pecahnya pembuluh darah
              (stroke hemoragik). Stroke terjadi secara mendadak, kapanpun dan di manapun, saat
              beristirahat maupun saat beraktivitas. Untuk itu kamu harus mengenali gejala stroke
              sedini mungkin dengan langkah mudah. FAST (Face, Arms, Speech dan Time) untuk
              mendeteksi gejala awal stroke.
            </p>
          </span>
          <span class="info">
            <dl style="list-style-type: none">
              <li>
                <p style="font-size: 18px"><b>Hasil test yang diperoleh</b></p>
              </li>
              <li>
                <i class="fa-solid fa-check-circle py-2 px-2"></i> Informasi seputar Stroke
                berdasarkan skor risiko
              </li>
              <li>
                <i class="fa-solid fa-check-circle px-2"></i> Akses cepat ke layanan kesehatan yang
                tepat sesuai risiko
              </li>
            </dl>
          </span>
        </div>
        <!-- Stepper -->
        <div class="onboarding flex-wrap">
          <div class="bs-stepper">
            <div class="bs-stepper-header" role="tablist">
              <!-- your steps here -->
              <div class="step" data-target="#logins-part">
                <button
                  type="button"
                  class="step-trigger"
                  role="tab"
                  aria-controls="logins-part"
                  id="logins-part-trigger"
                >
                  <span class="bs-stepper-circle">1</span>
                  <span class="bs-stepper-label">Satu</span>
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
                  <span class="bs-stepper-label">Kedua</span>
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
                  <span class="bs-stepper-label">Ketiga</span>
                </button>
              </div>
            </div>
            <cdbootstrap-stepper :options="stepperOptions"></cdbootstrap-stepper>

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
          <div
            class="fixed-bottom shadow-sm p-2 mb-5 bg-body-tertiary rounded mx-auto"
            style="width: 488px"
          >
            <div class="d-grid p-2 gap-2 col-12 mx-auto">
              <button
                @click="$redirect({ name: 'Onboarding Stroke Analysis' })"
                type="button"
                class="btn btn-primary"
              >
                Lakukan Pengecekan
              </button>
            </div>
          </div>

          <!-- <router-view :valueSearch="valueSearch"></router-view> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'

export default {
  data() {},
  components: {
    SkeletonLoading
  },

  methods: {}
}
</script>

<style>
.details {
  width: 600px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  color: #333;
  background-color: #f9fbfd;
}
.onboarding {
  width: 600px;
  flex-direction: column;
  height: 100%;
  position: relative;
  background-color: #dbf1ff;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
}

.flex-item-left {
  background-color: #f9fbfd;
  /* flex: 50%; */
  height: 100%;
}
.flex-item-right {
  background-color: #dbf1ff;
  /* flex: 50%; */
  height: 100%;
}
.section-bg {
  background-color: #f1f7fd;
}
.animated {
  animation: up-down 3s ease-in-out infinite alternate-reverse both;
}
.responsive {
  width: 100%;
  max-width: 400px;
  height: auto;
}
.fixed-button {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #007bff; /* Warna latar belakang sesuaikan dengan desain Anda */
  color: #fff; /* Warna teks sesuaikan dengan desain Anda */
  padding: 15px; /* Sesuaikan sesuai kebutuhan */
  text-align: center;
  z-index: 999; /* Pastikan tombol tampil di atas konten lain */
}
,
li {
  font-size: 16px;
}
@keyframes up-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
</style>
