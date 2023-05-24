<template>
    <div class="text-start ms-2 ">
        <p class="fs-4 mb-0"><b>Rekomendasi Dokter</b></p>
        <p>Konsultasi online dengan dokter siaga kamii
        </p>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-3">
        <div class="col" v-for="dokter in limitData.dokters" :key="dokter.id">
            <template v-if="isLoading">
                <div class="col">
                    <SkeletonLoading />
                </div>
            </template>
            <template v-else-if="!isLoading">
                <div class="card border-0" @click="$redirect('/chat-dokter/dokter/' + dokter.idDokterKeahlian)">
                    <div class="row">
                        <div class="col-6 py-2">
                            <div v-if="dokter.getDokter.jenisKelamin === 'P'">
                                <img src="../../../assets/images/avadoktercewe.png" class="img-fluid rounded" alt="">
                            </div>
                            <div v-else-if="dokter.getDokter.jenisKelamin === 'L'">
                                <img src="../../../assets/images/avadoktercowo.png" class="img-fluid rounded" alt="">
                            </div>
                            <div v-else-if="dokter.getDokter.jenisKelamin === null">
                                <img src="../../../assets/images/avadoktercewe.png" class="img-fluid rounded" alt="...">
                            </div>
                        </div>
                        <div class="col-6 py-3 px-3">
                            <p class="mb-1" style="font-size: 14px;"><b>dr. {{ dokter.getDokter.nama }}</b></p>
                            <p class="text-secondary text-sm mb-1" style="font-size: 12px;">{{
                                dokter.getKeahlian.namaKeahlian }}</p>
                            <div class="d-flex justify-content-start text-primary">
                                <p class="rounded mb-1 me-1" style="font-size: 10px;"><i
                                        class="ms-1 fa-solid fa-briefcase"></i> 1 tahun &nbsp;</p>
                                <p class="rounded mb-1" style="font-size: 10px;"><i class="ms-1 fa-solid fa-thumbs-up"></i>
                                    100% &nbsp;</p>
                            </div>
                            <p class="mb-1" style="font-size: 12px;">Rp. 20.000 {{ dokter.getDokter.biayaAdmin }}</p>
                            <div class="pt-3">
                                <button class="btn btn-sm btn-danger w-50" style="font-size: 12px;">Chat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-if="dokters.length === 0">
                    <div class="alert alert-danger text-center">
                        <i><strong>data tidak ada</strong></i>
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div class="text-start ms-2 pt-4">
        <p class="fs-4 mb-0"><b>Cari Dokter Spesialis</b></p>
        <p>Pilih kategori yang sesuai dengan kondisimu
        </p>
    </div>
    <div v-if="isLoading">
        <LoadingComponent />
    </div>
    <template v-else>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 text-center">
            <div class="col" v-for="specialist in limitData.specialist" :key="specialist.id">
                <i class="fa-solid bg-danger p-3 rounded-circle fa-stethoscope fs-2 text-light"></i>
                <p>{{ specialist.namaSpesialis }}</p>
            </div>
        </div>
    </template>
</template>
<script>
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue';
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
import BodyDetailDokter from '@/components/BodyDetailDokter.vue';
export default {
    data() {
        return {
            dokters: [],
            specialist: [],
            dokterLimit: 3,
            specialistLimit: 12,
            isLoading: false
        }
    },
    created() {
        this.getDokter(),
            this.getSpesialis()
    },
    computed: {
        limitData() {
            return {
                dokters: this.dokters.slice(0, this.dokterLimit),
                specialist: this.specialist.slice(0, this.specialistLimit)
            }
        }
    },
    components: {
        HeaderComponent,
        FooterComponent,
        SkeletonLoading,
        BodyDetailDokter,
        LoadingComponent
    },
    methods: {
        getDokter() {
            let type = "getData"
            let url = [
                "master/dokter_keahlian", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                setTimeout(() => {
                this.isLoading = false
                    
                }, 3000);
                this.dokters = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getSpesialis() {
            let type = "getData"
            let url = [
                "master/penyakit/spesialis_penyakit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.specialist = result.data
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>