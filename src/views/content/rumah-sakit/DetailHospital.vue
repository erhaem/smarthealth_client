<template>
    <div class="container col-xl-10 col-xxl-9 border-top">
        <div class="row mb-3 mt-3 text-center">
            <div class="col-md-12 themed-grid-col">
                <div class="pb-1 text-start">
                    <h5>{{ detailRS.namaRs }}</h5>
                </div>
                <div class="row">
                    <div class="col-md-6 themed-grid-col">
                        <div v-if="isLoading">
                            <LoadingComponent />
                        </div>
                        <div v-else-if="detailRS.foto === null">
                            <img src="../../../assets/images/9.png" class="img-fluid" alt="">
                        </div>
                        <div v-else>
                            <img src="" alt="">
                        </div>
                    </div>
                    <div class="col-md-4 themed-grid-col text-start">
                        <h6 class="mt-2"><b>Deskripsi</b></h6>
                        <div v-if="isLoading">
                            <LoadingComponent />
                        </div>
                        <div v-else-if="detailRS.deskripsiRs === null">
                            data ga ada
                        </div>
                        <div v-else>
                            <p>
                                {{ detailRS.deskripsiRs }}
                            </p>
                        </div>
                        <h6><b>Alamat</b></h6>
                        <div v-if="isLoading">
                            <LoadingComponent />
                        </div>
                        <div v-else-if="detailRS.deskripsiRs === null">
                            data ga ada
                        </div>
                        <div v-else class="d-inline-flex align-items-start">
                            <p>
                                {{ detailRS.alamatRs }}
                            </p>
                        </div>
                    </div>
                    <div class="col-md-2 themed-grid-col">
                        <div class="text-start mb-3">
                            <h6 class="mt-3 mb-0"><b>Fasilitas</b></h6>
                            <div v-if="isLoading">
                                <LoadingComponent />
                            </div>
                            <div v-else-if="detailFasilitas.length === 0" class="text-danger text-center">
                                <p><strong><i>data belum tersedia</i></strong></p>
                            </div>
                            <div v-else>
                                <ul style="padding-left: 1rem;" class="mt-2" v-for="fasilitas in detailFasilitas"
                                    :key="fasilitas.id">
                                    <li class="">{{ fasilitas.namaFasilitas }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex justify-content-bottom">
                                <button class="btn btn-sm btn-danger me-2">Buat Janji</button>
                                <button class="btn btn-sm btn-outline-danger">telepon</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 mt-4">
            <div class="d-flex justify-content-between">
                <h5 class="py-2">Spesialisasi Dokter</h5>
                <div v-if="limitedDataSpesialis.length > 5">
                    <p class="text-primary">lihat semua spesialis</p>
                </div>
                <div v-else></div>
            </div>
            <div v-if="isLoading">
                <LoadingComponent />
            </div>
            <div v-else-if="limitedDataSpesialis.length === 0" class="alert p-0 pt-2 alert-danger text-center">
                <p>
                    <strong>
                        <i>
                            data belum tersedia
                        </i>
                    </strong>
                </p>
            </div>
            <div v-else class="row row-cols-1 row-cols-md-5 g-3">
                <div class="col" v-for="specialist in limitedDataSpesialis" :key="specialist.id">
                    <CardMedicine
                        @click="$redirect('/detail_rumah_sakit/' + specialist.penyakit.idPenyakit + '/' + specialist.idRumahSakit)"
                        class="mb-2 rounded-circle" icon="fa-user-doctor" :labelTitle="specialist.penyakit.namaSpesialis" />
                </div>
                <div class="px-3 py-4 text-center">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardMedicine from '@/components/CardMedicine.vue';
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue'
export default {
    data() {
        return {
            detailHospitals: [],
            limit: 12,
            detailFasilitas: [],
            detailRS: []
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        limitedDataSpesialis() {
            return this.detailHospitals.slice(0, this.limit)
        }
    },
    created() {
        this.getDetailFasilitas(),
            this.getDetailHospital(),
            this.getRumahSakit()
    },
    methods: {
        getDetailHospital() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/spesialis/" + this.idFromParams, []
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailHospitals = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getDetailFasilitas() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/fasilitas_rs/rs/" + this.idFromParams, []
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((response) => {
                this.isLoading = false
                this.detailFasilitas = response.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getRumahSakit() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/data/" + this.idFromParams + "/edit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailRS = result.data
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        CardMedicine,
        LoadingComponent
    }
}
</script>