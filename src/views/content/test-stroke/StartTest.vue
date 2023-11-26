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

    <!-- daftar dokter di bawah ini msih tumpang tindih - 22/11/23 -->
    <div class="container mt-3">
      <div id="customCarousel" class="carousel slide">
        <div class="carousel-inner">
          <div
            v-for="(card, index) in cardData"
            :key="index"
            class="carousel-item"
            :class="{ active: index === 0 }"
          >
            <div class="d-flex justify-content-between text-center">
              <!-- <div v-for="index in 4" :key="index" -->
              <div
                v-for="(dokter, indexDokter) in card.dokters"
                :key="indexDokter"
                class="card d-flex flex-column border border-primary-subtle rounded-4"
                style="width: 18rem"
              >
                <div class="d-flex flex-row mx-auto mt-2 position-relative" style="width: 80px">
                  <img
                    src="../../../assets/images/user.png"
                    alt="card-img-top"
                    style="width: 90px"
                  />
                  <div
                    class="d-flex rounded-circle position-absolute"
                    style="
                      bottom: 0;
                      right: 0;
                      width: 15px;
                      height: 15px;
                      background-color: rgb(0, 195, 0);
                    "
                  ></div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">
                    <b>{{ dokter.nama }}</b>
                  </h5>
                  <h5 class="card-text small">{{ dokter.spesialis }}</h5>
                  <h6 class="mx-auto" style="font-size: small">
                    <i v-for="index in 5" :key="index" class="fas fa-star text-warning"></i>

                    ({{ dokter.rating }})
                  </h6>
                  <h6 style="font-size: small">
                    <i class="fas fa-briefcase text-primary"></i> {{ dokter.pengalaman }}
                  </h6>
                  <button
                    @click="$redirect({ name: 'Buat Antrean Tes' })"
                    type="button"
                    class="btn btn-primary mt-4"
                  >
                    Pilih Dokter
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="carousel-item">
            <div class="d-flex justify-content-between text-center">
              <div
                v-for="index in 4"
                :key="index"
                class="card d-flex flex-column border border-primary-subtle rounded-4"
                style="width: 18rem"
              >
                <div class="d-flex flex-row mx-auto mt-2 position-relative" style="width: 80px">
                  <img
                    src="../../../assets/images/user.png"
                    alt="card-img-top"
                    style="width: 90px"
                  />
                  <div
                    class="d-flex rounded-circle position-absolute"
                    style="
                      bottom: 0;
                      right: 0;
                      width: 15px;
                      height: 15px;
                      background-color: rgb(0, 195, 0);
                    "
                  ></div>
                </div>

                <div class="card-body">
                  <h5 class="card-title">
                    <b>Dr Budiman Hakim</b>
                  </h5>
                  <h5 class="card-text small">Spesialis Saraf Kejepit</h5>
                  <h6 class="mx-auto" style="font-size: small">
                    <i v-for="index in 5" :key="index" class="fas fa-star text-warning"></i>

                    (20)
                  </h6>
                  <h6 style="font-size: small">
                    <i class="fas fa-briefcase text-primary"></i> 1 Tahun Pengalaman
                  </h6>
                  <button
                    @click="$redirect({ name: 'Buat Antrean Tes' })"
                    type="button"
                    class="btn btn-primary mt-4"
                  >
                    Pilih Dokter
                  </button>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <button
          class="my-auto carousel-control-prev btn btn-primary opacity-30 rounded-circle"
          type="button"
          style="width: 45px; height: 45px"
          data-bs-target="#customCarousel"
          data-bs-slide="prev"
        >
          <span><i class="fas fa-chevron-left text-dark"></i></span>
        </button>
        <button
          class="my-auto carousel-control-next btn btn-primary opacity-30 rounded-circle"
          type="button"
          style="width: 45px; height: 45px"
          data-bs-target="#customCarousel"
          data-bs-slide="next"
        >
          <span><i class="fas fa-chevron-right text-dark"></i></span>
        </button>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <div class="mt-3 d-flex flex-column align-items-center">
      <img src="../../../assets/images/hearth-rate.png" alt="" justify-content-center />
      <h6 class="mt-4"><b>Disclaimer</b></h6>
      <p
        class="mt-2 text-center fw-lighter text-wrap"
        style="font-size: 16px; font-weight: 300; width: 50rem"
      >
        Harap dicatat bahwa tes ini dilakukan secara on-point bersama dokter yang bertugas, hasil
        tes anda akan divalidasi secara langsung oleh dokter yang akan melakukan skrining. Hasil
        dari tes risiko stroke ini dapat Anda lihat setelah sesi tes bersama dokter dilakukan.
      </p>
    </div>
  </div>
</template>

<script>
import SectionHeaderBody from '../../../components/partials-component/SectionHeaderBody.vue'
export default {
  data() {
    return {
      isLoading: false,

      //struktur array kudu diperbaiki, biar g tumpang tindih - 22/11/23
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
            },
            {
              nama: 'Dr Rangga Soetomos',
              img: '../../../assets/images/user.png',
              spesialis: 'Spesialis Neurologi',
              rating: 20,
              pengalaman: '1 Tahun Pengalaman'
            }
          ]
        }
      ]
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
    SectionHeaderBody
  },
  mounted() {},
  created() {
    this.getDokters()
  },
  methods: {
    getDokters() {
      let type = 'getData'
      let url = ['list_dokter_sp_stroke', {}]

      // this.isLoading = true

      // console.log('getting dokters')
      // this.$store
      //   .dispatch(type, url)
      //   .then((result) => {
      //     this.isLoading = false

      //     this.cardData = result.data.map((dok) => {
      //       return {
      //         dokters: [
      //           {
      //             nama: dok.user.nama,
      //             img: '../../../assets/images/user.png',
      //             spesialis: dok.keahlian.namaKeahlian,
      //             rating: 20,
      //             pengalaman: '20 tahun pengalaman'
      //           }
      //         ]
      //       }
      //     })

      //     console.log(this.cardData)

      //     // console.log(result.data[0].keahlian.namaKeahlian)
      //   })
      //   .catch(console.error)
    }
  }
}
</script>
