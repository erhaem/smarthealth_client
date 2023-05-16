<template>
    <div class="container px-5 py-5 rounded" style="background-color:ghostwhite;">
        <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="d-flex justify-content-center mb-5">
            <div class="col-12 col-sm-8 col-md-4 col-lg-6">
                <div v-if="isLoading">
                    <SkeletonLoading/>
                </div>
                <div v-else class="card shadow border-0">
                    <div class="card-header">
                        <img src="../../../assets/images/dokter.jpg" class="img-fluid" alt="">
                    </div>
                    <div class="card-body">
                        <p>
                            dr. {{ detailDokter.getDokter.nama }}
                           </p>
                           <p>
                            <b>Spesialis</b>: Dokter {{ detailDokter.getKeahlian.namaKeahlian }}
                           </p>
                           <p>
                           <b>Nomor STR</b>:    {{ detailDokter.idDokterKeahlian }}
                           </p>
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