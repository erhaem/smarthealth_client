<template>
    <div class="container px-5 py-5 rounded" style="background-color:ghostwhite;">
        <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        {{ detailKeahlian }}
        {{ detailPerawat }}
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