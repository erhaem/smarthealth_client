<template>
  <section id="hero" class="d-flex align-items-start">
    <div class="container">
      <div class="px-5 py-5 mt-4" data-aos="fade-right" data-aos-duration="3000">
        <h1 :class="'display-4 fw-bold ' + colorText">Solusi Kesehatan Anda</h1>
        <div class="col-lg-6">
          <p class="lead fw-bold">Konsultasi Dokter, Perawatan Intensif, Beli Obat, Informasi Seputar Kesehatan,
            Semua bisa
            di
            Berobat+</p>
          <ButtonLayanan Label="get started" Color="btn-primary" />
        </div>
      </div>
    </div>
  </section>
  <section id="feature">
    <div class="container">
      <TitleFeature Label="Layanan Utama" />
      <div class="row g-4 row-cols-lg-4">
        <div @click="$redirect('/tanya-dokter')">
          <SkeletonLoading v-if="isLoading" />
          <FeaturePrimary v-if="!isLoading" labelTitle="Chat Dengan Dokter" icon="fa-user-doctor"
            labelParagraph="Konsultasi chat dengan dokter ">
          </FeaturePrimary>
        </div>
        <SkeletonLoading v-if="isLoading" />
        <FeaturePrimary v-if="!isLoading" labelTitle="Rawat Jalan" icon="fa-user-nurse" labelParagraph="Perawatan Pasien">
        </FeaturePrimary>
        <div @click="$redirect('/toko-kesehatan')">
          <SkeletonLoading v-if="isLoading" />
          <FeaturePrimary v-if="!isLoading" labelTitle="Toko Kesehatan" icon="fa-suitcase-medical"
            labelParagraph="Obat dan Vitamin">
          </FeaturePrimary>
        </div>
        <div @click="$redirect('/hospital')">
          <SkeletonLoading v-if="isLoading" />
          <FeaturePrimary v-if="!isLoading" labelTitle="Rumah Sakit" icon="fa-hospital"
            labelParagraph="Buat janji dengan RS">
          </FeaturePrimary>
        </div>
      </div>
      <div>
      </div>
    </div>
  </section>
  <section id="services" class="services">
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-between">
          <div class="col-sm-6">
            <TitleFeature Label="Baca Artikel" />
          </div>
          <div class="col-sm-6 text-end">
            <TitleFeature Label="Lihat semua" class="text-primary" />
          </div>
        </div>
      </div>
      <div class="row g-4">
        <div class="col-md-4 col-lg-3 rounded" v-for="artikel in limitedDataArtikel" :key="artikel.id">
          <SkeletonLoading v-if="isLoading" />
          <CardArtikel v-if="!isLoading" :title="artikel.judulArtikel" :description="artikel.deskripsi"
            @click="$redirect('/artikel/' + artikel.slugArtikel)">
          </CardArtikel>
        </div>
      </div>
    </div>
  </section>
  <section id="obat">
    <div class="container">
      <TitleFeature Label="Obat & Vitamin" />
      <p class="ms-2">Dapatkan informasi seputar kandungan, aturan, petunjuk penggunaan obat dan vitamin di sini
      </p>
      <div class="row g-4 row-cols-lg-4">
        <div v-for="golongan in golongans" :key="golongan.id">
          <SkeletonLoading v-if="isLoading" />
          <CardMedicine v-if="!isLoading" :labelTitle="golongan.golonganObat" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ButtonLayanan from '@/components/partials-component/ButtonLayanan.vue';
import FeaturePrimary from '@/components/FeaturePrimary.vue';
import TitleFeature from '@/components/partials-component/TitleFeature.vue';
import CardArtikel from '@/components/CardArtikel.vue';
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue';
import CardMedicine from '@/components/CardMedicine.vue';
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
import Cookies from 'js-cookie'
export default {
  props: {
    colorText: {
      type: String,
      default: "text-primary"
    }
  },
  components: {
    ButtonLayanan, FeaturePrimary, TitleFeature, LoadingComponent, CardArtikel, CardMedicine, SkeletonLoading
  },
  data() {
    return {
      users: [],
      artikels: [],
      golongans: [],
      limit: 4,
      maxLength: 20,
      isLoading: false,
    }
  },
  mounted() {
    this.getArtikel();
    this.getKategoriObat()
  },
  created() {
    this.getUsers()
  },
  computed: {
    limitedDataArtikel() {
      return this.artikels.slice(0, this.limit)
    },
  },
  methods: {
    getUsers() {
      const selfGet = this
      let type = "getData"
      let url = [
        "create-api", {}
      ]
      selfGet.isLoading = true
      selfGet.$store.dispatch(type, url).then((result) => {
        if (Cookies.get("user") != undefined) {
          Cookies.set("user", Cookies.get("user"))
        } else {
          if (Cookies.get("token") == undefined) {
            Cookies.set("token", result.token);
          }
        }
        selfGet.users = Cookies.get("token");
        setTimeout(() => {
          selfGet.isLoading = false
        }, 1000);
      }).catch((err) => {
        console.log(err);
      })
      // if (Cookies.get("token-login") != null) {
      //   selfGet.$store.dispatch(type, url).then((result) => {
      //     Cookies.set("user", Cookies.get("user"));
      //     Cookies.remove('token')
      //     selfGet.users = Cookies.get("token-login");
      //     setTimeout(() => {
      //       selfGet.isLoading = false
      //     }, 1000);
      //   }).catch((err) => {
      //     console.log(err);
      //   })
      // } else {
      //   selfGet.isLoading = true
      //   selfGet.$store.dispatch(type, url).then((result) => {
      //     console.log(result)
      //     Cookies.set("token", result.token);
      //     selfGet.users = result.data
      //     setTimeout(() => {
      //       selfGet.isLoading = false
      //     }, 1000);
      //   }).catch((err) => {
      //     console.log(err);
      //   })
      // }
    },
    getArtikel() {
      const selfGet = this
      let type = "getData"
      let url = [
        "master/artikel", {}
      ]
      selfGet.isLoading = true
      selfGet.$store.dispatch(type, url).then((result) => {
        selfGet.artikels = result.data
        setTimeout(() => {
          selfGet.isLoading = false
        }, 2000);
      }).catch((err) => {
        console.log(err);
      })
    },
    getKategoriObat() {
      const selfGet = this
      let type = "getData"
      let url = [
        "master/obat/golongan_obat", {}
      ]
      selfGet.isLoading = true
      selfGet.$store.dispatch(type, url).then((result) => {
        console.log(result.data);
        selfGet.golongans = result.data
        setTimeout(() => {
          selfGet.isLoading = false
        }, 1000);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>