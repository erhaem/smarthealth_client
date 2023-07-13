<template>
    <div class="container p-lg-5 rounded">
        <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.push({name: 'Page Dokter'})">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="card border-0 mb-3 p-lg-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="@/assets/images/avadoktercowo.png" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">dr. {{detailDokter.userId.nama}}</h5>
                  <p class="card-text mb-0">
                    Rp. {{ detailDokter.biaya.biaya.toLocaleString('id-ID')  }}
                  </p>
                  <div v-for="data in detailKeahlian">
                      <p class="card-text">
                        <small class="text-body-dark">
                        spesialisasi: {{ data.keahlianId.namaKeahlian }}
                        </small>
                      </p>
                  </div>
                  <p class="card-text"><small class="text-body-secondary">Last online 3 mins ago</small></p>
                    <button class="btn btn-sm w-25 btn-dark">
                        <small>
                            Chat
                        </small>
                    </button>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>
<script>
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
export default {
    data() {
        return {
            detailDokter: [],
            detailKeahlian: [],
            isLoading: false
        }
    },
    computed: {
        idFromParams() {
            return {
                idDokter: this.$route.params.idDokter,
                idAhli: this.$route.params.idAhli
            }
        },
        hideFrom() {
            return this.$route.name === "Cari Keahlian"
        }
    },
    created() {
        this.getKeahlian()
        this.getDetailDokter()
    },
    methods: {
        getDetailDokter() {
            let type = "getData"
            let url = [
                "akun/dokter/" + this.idFromParams.idDokter + "/edit", []
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailDokter = result.data// Assign the id value
            }).catch((err) => {
                console.log(err);
            })
        },
        getKeahlian() {
            const idKeahlian = this.idFromParams.idAhli;
            let type = "getData";
            let url = [
                `master/ahli/keahlian/master/${idKeahlian}/get`, []
            ];
            this.$store.dispatch(type, url)
                .then((result) => {
                    this.detailKeahlian = result.data
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    components: {
        SkeletonLoading
    }
}
</script>