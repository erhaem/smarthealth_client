<template>
  <SectionHeaderBody
    Judul="Temukan dokter yang tersedia saat ini"
    Slogan="Tes risiko stroke dilakukan bersama dokter expert dibidang ini. Tersedia lebih dari 50 dokter yang siap melakukan tes bersama Anda "
  >
    <template #router>
      <router-link style="text-decoration: none" :to="{ name: 'IndexHome' }">
        <p class="text-light">
          Home /
          <router-link
            :to="{ name: 'Tes Risiko Stroke' }"
            class="text-light"
            style="text-decoration: none"
          >
            {{ $route.name }}
          </router-link>
        </p>
      </router-link>
    </template>
    <template #input>
      <div class="input-group">
        <span class="input-group-text border-0 bg-warning" id="search-addon"
          ><i class="fas fa-magnifying-glass text-light"></i
        ></span>
        <input
          type="search"
          class="form-control rounded-end p-2"
          placeholder="Cari dokter yang sedang online"
        />
      </div>
    </template>
  </SectionHeaderBody>
  <div class="container mt-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="mb-0"><b>Semua Hasil</b></h6>
    </div>
    <div class="container mt-3">
      <div id="customCarousel" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="d-flex justify-content-between">
              <div
                class="carousel-container"
                style="width: 282px; height: 317px; background-color: pink"
              >
                <!-- Content for the first container -->
              </div>
              <div
                class="carousel-container"
                style="width: 282px; height: 317px; background-color: pink"
              >
                <!-- Content for the second container -->
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="d-flex justify-content-between">
              <div
                class="carousel-container"
                style="width: 282px; height: 317px; background-color: pink"
              >
                <!-- Content for the third container -->
              </div>
              <div
                class="carousel-container"
                style="width: 282px; height: 317px; background-color: pink"
              >
                <!-- Content for the fourth container -->
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev btn btn-primary rounded-circle"
          type="button"
          style="width: 45px; height: 45px;"
          data-bs-target="#customCarousel"
          data-bs-slide="prev"
          
        >
          <span aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#customCarousel"
          data-bs-slide="next"
        >
          <span aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue'
import Cookies from 'js-cookie'
import iziToast from 'izitoast'
import CardArtikel from '@/components/card/CardArtikel.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import SectionHeaderBody from '../../../components/partials-component/SectionHeaderBody.vue'
export default {
  data() {
    return {
      cart: [],
      nearestResults: [],
      dataProduk: [],
      kategori: [],
      limit: 6,
      isLoading: false,
      latitude: null,
      longitude: null,
      produk_id: ''
    }
  },
  computed: {
    limitData() {
      return {
        kategori: this.kategori.slice(0, this.limit)
      }
    }
  },
  components: {
    CardArtikel,
    SkeletonLoading,
    SectionHeaderBody,
    LoadingComponent
  },
  mounted() {
    this.getLocation()
  },
  created() {
    this.getProduk(), this.getKategoriObat()
  },
  methods: {
    getNeareset() {
      let type = 'postData'
      let url = [
        'apotek/pengaturan/profil_apotek/find_nearest',
        {
          latitude: this.latitude,
          longitude: this.longitude
        }
      ]
      this.isLoading = true
      this.$store
        .dispatch(type, url)
        .then((result) => {
          this.isLoading = false
          this.nearestResults = result
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude
            this.longitude = position.coords.longitude
            this.getNeareset()
          },
          (error) => {
            console.error(error)
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
      }
    },
    getProduk() {
      let type = 'getData'
      let url = ['apotek/produk/data_produk', {}]
      this.$store
        .dispatch(type, url)
        .then((result) => {
          this.dataProduk = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getKategoriObat() {
      let type = 'getData'
      let url = ['master/produk/kategori_produk', {}]
      this.isLoading = true
      this.$store
        .dispatch(type, url)
        .then((result) => {
          this.kategori = result.data
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showAlertSuccess() {
      iziToast.success({
        title: 'success',
        message: 'berhasil ditambahkan ke keranjang',
        position: 'topRight'
      })
    },
    addToCart(produk_id) {
      const message = 'Data Berhasil di Tambahkan'
      let type = 'postData'
      let url = [
        'keranjang',
        {
          produk_id
        },
        {}
      ]
      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (result.pesan == message) {
            this.$swal({
              icon: 'success',
              title: 'berhasil menambahkan ke keranjang'
            }).then(() => {
              window.location.reload()
            })
          } else {
            this.$swal({
              icon: 'error',
              title: 'kamu harus login dulu nih'
            }).then(() => {
              this.$router.push({ name: 'LoginUser' })
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>



.form-control:focus {
  border-color: #4538db;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(95, 124, 218, 0.6);
}
</style>

<script></script>
