<template>
    <div class="container px-4 my-4">
        <button class="btn btn-sm btn-outline-dark shadow mb-3" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="data in praktekDokter">
                <template v-if="isLoading">
                    <SkeletonLoading/>
                </template>
                <CardDokter v-else data-aos="zoom-in" data-aos-duration="700" Image="../../../assets/images/avadoktercowo.png" :nama="data.ahli.nama" rating="3" :biaya="data.biayaPraktek" :Label="'Dokter ' + dokterSpesialis.namaSpesialis" labelButton="buat Janji"
                @click="$redirect({ name: 'Detail Janji Rs', params: { idAhli: data.ahli.id, idDetailPraktek: data.idDetailPraktek, idRumahSakit: this.idFromParams, idSpesialis: this.idDokterSpesialis } })"
                />
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
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.praktekDokter = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    components: {
    ButtonComponent,
    SkeletonLoading,
    CardDokter
}
};
</script>
<style>
.text-size {
    font-size: 14px;
    font-weight: 400;
}
</style>