<template>
    <!-- <div class="container col-xxl-12">
        <div class="d-flex justify-content-start">
            <div class="col-lg-10 py-2 px-5">
                <div class="border-bottom border-2 w-25 mb-3" v-for="data in dokterSpesialis">
                    <h5 class="fw-1 text-secondary">Daftar {{data.idKeahlian.namaKeahlian}}</h5>
                </div>
                    <div class="row row-cols-1 row-cols-md-4 g-4">
                        <div v-if="isLoading">
                            <SkeletonLoading/>
                        </div>
                        <div class="alert alert-danger text-center" v-else-if="dokterSpesialis.length === 0">
                            <small>
                                data ga ada
                            </small>
                        </div>
                        <div v-else class="col">
                            <div v-for="data in dokterSpesialis">
                                <div class="card shadow border-0">
                                    <div class="card-header">
                                        <img src="../../../assets/images/avadoktercowo.png" class="img-fluid rounded" alt="">
                                    </div>
                                    <div class="card-body">
                                        <p class="mb-0">
                                            <b class="text-secondary">
                                                dr. {{ data.namaDokter }}
                                            </b>
                                        </p>
                                        <p class="mb-0">
                                            <small class="text-secondary">
                                                {{ data.idKeahlian.namaKeahlian }}
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
                                    <div class="card-footer">
                                        <div class="d-flex justify-content-end">
                                            <ButtonComponent Color=" btn-danger" Label="buat janji" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="container">
            <div class="row">
                <div v-for="data in praktekDokter" class="col-8 col-md-4">
                    <h5 class="text-dark">Dokter Spesialis {{dokterSpesialis.namaSpesialis}}</h5>
                    <div class="card shadow border-0 rounded">
                        <div class="card-body">
                            <div class="d-flex">
                                <img src="../../../assets/images/avadoktercowo.png" class="img-fluid w-25 mt-3" alt="">
                                <div class="mt-4 px-5">
                                    <p class="mb-0">dr. {{ data.ahli.nama }}</p>
                                    <p class="mb-2"><i class="text-secondary">spesialis {{dokterSpesialis.namaSpesialis}}</i></p>
                                    <p class="mb-0"><b>biaya konsultasi:</b> Rp. {{ data.biayaPraktek.toLocaleString('id-ID') }}
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <ButtonComponent Color="btn-outline-dark"
                                    @click="$redirect('/detail_rumah_sakit/buat_janji' + '/' + data.ahli.id + '/' + data.idDetailPraktek)"
                                    Label="buat janji" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            dokterSpesialis: [],
            praktekDokter: [],
            isLoading: false
        };
    },
    computed: {
        idFromParams() {
            return this.$route.params.id;
        },
        idDokterSpesialis() {
            return this.$route.params.idPenyakit;
        }
    },
    created() {
        this.getDokterSpesialis();
        this.getPraktek()
    },
    methods: {
        getDokterSpesialis() {
            const dokterSpesialis = this.idDokterSpesialis;
            let type = "getData";
            let url = [
                `master/penyakit/spesialis_penyakit/${dokterSpesialis}/edit`,
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.dokterSpesialis = result.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        getPraktek() {
            let type = "getData"
            let url = [
                "master/ahli/detail_praktek/" + this.idFromParams, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.praktekDokter = result.data
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    components: {
        ButtonComponent, SkeletonLoading
    }
};
</script>
<style>
.text-size{
    font-size: 14px;
    font-weight: 400;
}
</style>