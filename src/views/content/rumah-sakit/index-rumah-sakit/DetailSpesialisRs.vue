<template>
    <div class="container py-3">
        <button class="btn btn-sm btn-outline-dark shadow mb-3" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col" v-for="data in praktekDokter">
                <div class="card shadow border-0 mb-3" style="max-width: 400px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="../../../assets/images/avadoktercewe.png" class="img-fluid rounded-start px-2 mt-3"
                                alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body mt-3">
                                <h5 class="card-title">{{ data.ahli.nama }}</h5>
                                <p class="card-text mb-0">
                                    <small>
                                        {{ dokterSpesialis.namaSpesialis }}
                                    </small>
                                </p>
                                <p class="card-text">
                                    Rp. {{ data.biayaPraktek.toLocaleString('id-ID') }}
                                </p>
                                <div class="d-flex justify-content-end">
                                    <router-link
                                        :to="{ name: 'Detail Janji Rs', params: { idAhli: data.ahli.id, idDetailPraktek: data.idDetailPraktek, idRumahSakit: this.idFromParams, idSpesialis: this.idDokterSpesialis } }">
                                        <ButtonComponent Color="btn-outline-dark" Label="buat janji" />
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CardDokter from '@/components/card/CardDokter.vue'
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
        ButtonComponent, SkeletonLoading, CardDokter
    }
};
</script>
<style>
.text-size {
    font-size: 14px;
    font-weight: 400;
}
</style>