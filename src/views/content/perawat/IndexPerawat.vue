<template>
    <div class="container px-5 py-5 rounded" style="background-color:ghostwhite;">
        <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="d-flex justify-content-center mb-5">
            <div class="col-12 col-sm-8 col-md-4 col-lg-6">
                <div v-if="isLoading">
                    <SkeletonLoading />
                </div>
                <div v-else class="card shadow border-0">
                    <div class="card-header">
                        <div v-if="detailPerawat.user.jenisKelamin === 'P'">
                            <img src="../../../assets/images/avadoktercewe.png" class="img-fluid rounded" alt="">
                        </div>
                        <div v-else-if="detailPerawat.user.jenisKelamin === 'L'">
                            <img src="../../../assets/images/avadoktercowo.png" class="img-fluid rounded" alt="">
                        </div>
                        <div v-else-if="!detailPerawat.user.jenisKelamin">
                            <img src="../../../assets/images/user.png" class="img-fluid rounded" alt="...">
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="border-bottom">
                            <p class="mb-0">
                                dr. {{ detailPerawat.user.nama }}
                            </p>
                            <!-- <div v-if="detailPerawat.biaya">
                                <p class="mb-0 text-secondary">
                                    <small>
                                        biaya: Rp. {{ detailPerawat.biaya.biaya.toLocaleString('id-ID') }}
                                    </small>
                                </p>
                            </div>
                            <div v-else>
                                kosong
                            </div> -->
                            <div class="d-flex justify-content-start mt-2">
                                <p class="me-2 pe-2 px-2 bg-secondary rounded text-light text-size">
                                    <small>
                                        <i class="fas fa-briefcase"></i> 3 tahun
                                    </small>
                                </p>
                                <p class="me-2 pe-2 px-2 bg-secondary rounded text-light text-size">
                                    <small>
                                        <i class="fas fa-thumbs-up"></i> 100
                                    </small>
                                </p>
                            </div>
                        </div>
                        <div class="border-bottom mt-1 mb-1">
                            <p class="mb-0"><b>Keahlian</b></p>
                            <div v-for="data in detailKeahlian">
                                <div class="d-flex justify-content-start">
                                    <p class="mb-0"><small>{{ data.keahlianId.namaKeahlian }}</small></p>
                                </div>
                            </div>
                        </div>
                        <div style="font-size: 14px;" class="border-bottom">
                            <p class="mt-2 mb-0">
                                <b>Alumnus</b> Universitas Padjajaran
                            </p>
                            <p class="mt-2 mb-0">
                                <b>Praktik di</b> Bandung
                            </p>
                            <p class="mt-2 mb-2">
                                <b>Nomor STR</b> {{ detailPerawat.nomorStrp ? :  'data tidak ada' }}
                            </p>
                        </div>
                        <div class="mt-2">
                            <button class="btn btn-sm btn-danger w-100">
                                chat
                            </button>
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
    data() {
        return {
            detailPerawat: {
            },
            detailKeahlian: [],
            isLoading: false
        }
    },
    computed: {
        idFromParams() {
            return {
                idPerawat: this.$route.params.idPerawat,
                idAhli: this.$route.params.idAhli
            }
        },
        hideFrom() {
            return this.$route.name === "Cari Keahlian"
        }
    },
    mounted() {
        this.getKeahlian()
    },
    created() {
        this.getdetailPerawat()
    },
    methods: {
        getdetailPerawat() {
            let type = "getData"
            let url = [
                "akun/perawat/" + this.idFromParams.idPerawat + "/edit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailPerawat = result.data// Assign the id value
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