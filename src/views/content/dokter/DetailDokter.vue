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
                        <div v-if="detailDokter.getDokter.jenisKelamin === 'P'">
                            <img src="../../../assets/images/avadoktercewe.png" class="img-fluid rounded" alt="">
                        </div>
                        <div v-else-if="detailDokter.getDokter.jenisKelamin === 'L'">
                            <img src="../../../assets/images/avadoktercowo.png" class="img-fluid rounded" alt="">
                        </div>
                        <div v-else-if="detailDokter.getDokter.jenisKelamin === null">
                            <img src="../../../assets/images/avadoktercewe.png" class="img-fluid rounded" alt="...">
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="border-bottom">
                            <p class="mb-0">
                                dr. {{ detailDokter.getDokter.nama }}
                            </p>
                            <p class="mb-0 text-secondary">
                                <small>
                                    {{ detailDokter.getKeahlian.namaKeahlian }}
                                </small>
                            </p>
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
                        <div style="font-size: 14px;" class="border-bottom">
                            <p class="mt-2 mb-0">
                                <b>Alumnus</b> Universitas Padjajaran
                            </p>
                            <p class="mt-2 mb-0">
                                <b>Praktik di</b> Bandung
                            </p>
                            <p class="mt-2 mb-2">
                                <b>Nomor STR</b> {{ detailDokter.idDokterKeahlian }}
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
            detailDokter: [],
            isLoading: false
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        }
    },
    created() {
        this.getDetailDokter()
    },
    methods: {
        getDetailDokter() {
            let type = "getData"
            let url = [
                "master/dokter_keahlian/" + this.idFromParams + "/edit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailDokter = result.data
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        SkeletonLoading
    }
}
</script>