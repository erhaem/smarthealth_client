<template>
  <div class="container">
    <div class="row align-items-top">
      <div class="d-flex">
        <template v-if="isLoading">
          <SkeletonLoading />
        </template>
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
        <div class="onboarding d-flex justify-content-center align-item-strech">
          <img
            src="../../../assets/images/palsy.jpg"
            alt="Banner"
            class="img-fluid"
            height="700"
            justify-content
          />
          <div class="px-4">
            <p class="mb-0 py-0" style="font-size: 14px; color: #625757"><u>Disclaimer</u></p>
            <p class="mb-0 py-1" style="font-size: 11px; color: #625757">
              Test ini tidak bertujuan untuk menggantikan diagnosa medis, Anda tetap dianjurkan
              untuk berkonsultasi dengan pihak medis
            </p>

            <div
              class="fixed-bottom shadow-sm p-1 mb-0 bg-body-tertiary rounded mx-auto"
              style="width: 488px"
            >
              <div class="d-grid p-1 gap-2 col-12 mx-auto">
                <button
                  @click="$redirect({ name: 'Onboarding Stroke Analysis' })"
                  type="button"
                  class="btn btn-primary"
                >
                  Lakukan Pengecekan
                </button>
              </div>
            </div>
          </div>
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
  height: max-content;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  color: #333;
  background-color: #f9fbfd;
}
.onboarding {
  width: 600px;
  flex-direction: column;
  height: max-content;
  position: relative;
  background-color: #dbf1ff;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
}
.animated {
  animation: up-down 3s ease-in-out infinite alternate-reverse both;
}
@keyframes up-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
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
