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
          <ButtonComponent Label="get started" Color=" btn-primary" />
        </div>
      </div>
    </div>
  </section>
  <section id="feature">
    <div class="container">
      <TitleFeature Label="Layanan Utama" />
      <div class="row g-4 row-cols-lg-4">
        <div @click="$redirect('/chat-dokter/dokter')">
          <template v-if="isLoading">
            <SkeletonLoading />
          </template>
          <FeaturePrimary v-else labelTitle="Chat Dengan Dokter" icon="fa-user-doctor"
            labelParagraph="Konsultasi chat dengan dokter ">
          </FeaturePrimary>
        </div>
        <template v-if="isLoading">
          <SkeletonLoading />
        </template>
        <div v-else @click="$redirect('/reservasi-perawat')">          
          <FeaturePrimary labelTitle="Rawat Jalan" icon="fa-user-nurse" labelParagraph="Perawatan Pasien">
          </FeaturePrimary>
        </div>
        <template v-if="isLoading">
          <SkeletonLoading />
        </template>
        <div v-else @click="$redirect('/produk-obat')">
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
          <template v-if="artikels.length > 4">
            <div class="col-sm-6 text-end">
              <TitleFeature Label="Lihat semua" class="text-primary" />
            </div>
          </template>
          <template v-else>
          </template>
        </div>
      </div>
      <div class="row g-4">
        <template v-if="loadingArtikel">
          <div class="col-md-4 col-lg-3 rounded" v-for="data in limitedData.artikels" :key="data.id">
            <SkeletonLoading />
          </div>
        </template>
        <template v-else>
          <div class="col-md-4 col-lg-3 rounded" v-for="data in limitedData.artikels" :key="data.id">
            <CardArtikel :title="data.judulArtikel" :description="data.deskripsi"
              @click="$redirect('/artikel/' + data.slugArtikel)">
            </CardArtikel>
          </div>
        </template>
      </div>
    </div>
  </section>
  <section id="obat">
    <div class="container">
      <div class="d-flex justify-content-between">
        <TitleFeature Label="Obat & Vitamin" />
        <div v-if="golongans.length > 4">
          <TitleFeature Label="Lihat semua" class="text-primary" />
        </div>
        <div v-else>
        </div>
      </div>
      <p class="ms-2">Dapatkan informasi seputar kandungan, aturan, petunjuk penggunaan obat dan vitamin di sini
      </p>
      <div class="row g-4 row-cols-lg-4">
        <div v-for="data in limitedData.golongans" :key="data.id">
          <SkeletonLoading v-if="isLoading" />
          <router-link :to="'/produk_kategori/' + data.idProdukKategori" style="text-decoration: none;">
            <CardMedicine v-if="!isLoading" :labelTitle="data.kategori.namaKategoriProduk" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import FeaturePrimary from '@/components/FeaturePrimary.vue';
import TitleFeature from '@/components/partials-component/TitleFeature.vue';
import CardArtikel from '@/components/card/CardArtikel.vue';
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue';
import CardMedicine from '@/components/card/CardMedicine.vue';
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
    ButtonComponent, FeaturePrimary, TitleFeature, LoadingComponent, CardArtikel, CardMedicine, SkeletonLoading
  },
  data() {
    return {
      users: [],
      artikels: [],
      golongans: [],
      limit: 4,
      maxLength: 20,
      isLoading: false,
      loadingArtikel: false
    }
  },
  mounted() {
    this.getUsers()
    this.getArtikel();
    this.getKategoriObat()
  },
  computed: {
    limitedData() {
      return {
        artikels: this.artikels.slice(0, this.limit),
        golongans: this.golongans.slice(0, this.limit)
      }
    },
  },
  methods: {
    getUsers() {
      let type = "getData"
      let url = [
        "create-api", {}
      ]
      this.isLoading = true
      this.$store.dispatch(type, url).then((result) => {
        if (Cookies.get("user") != undefined) {
          Cookies.set("user", Cookies.get("user"))
        } else {
          if (Cookies.get("token") == undefined) {
            Cookies.set("token", result.token);
            this.getArtikel()
            this.getKategoriObat()
          }
        }
        this.users = Cookies.get("token");
        setTimeout(() => {
          this.isLoading = false
        }, 1000);
      }).catch((err) => {
        console.log(err);
      })
    },
    getArtikel() {
      let type = "getData"
      let url = [
        "master/artikel", {}
      ]
      this.loadingArtikel = true
      this.$store.dispatch(type, url).then((result) => {
        this.loadingArtikel = false
        this.artikels = result.data
      }).catch((err) => {
        console.log(err);
      })
    },
    getKategoriObat() {
      let type = "getData"
      let url = [
        "apotek/produk/produk_kategori", {}
      ]
      this.isLoading = true
      this.$store.dispatch(type, url).then((result) => {
        this.golongans = result.data
        setTimeout(() => {
          this.isLoading = false
        }, 1000);
      }).catch((err) => {
        console.log(err);
      })
    },
  }
}
</script>