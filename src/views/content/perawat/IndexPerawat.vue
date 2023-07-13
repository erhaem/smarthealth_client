<template>
        <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="container pt-3">
            <div class="col-xxl-10 px-5 py-2 mb-5 col-md-4 mx-auto">
                <div class="d-flex justify-content-center">
                    <img src="../../../assets/images/avaperawat.jpg" class="mt-3 h-50 w-50 d-block img-fluid" alt="...">
                </div>
                <div class="mt-3">
                    <h5>Profil Perawat</h5>
                <p>
                    {{ detailPerawat.user.nama }}, S.Kep., merupakan seorang Dokter Kandungan. Lahir pada tanggal {{
                         }} di {{  }}. Beliau lulusan pendidikan
                    Spesialis Obstetri
                    dan
                    Ginekologi Universitas Padjadjaran, Bandung. Saat ini beliau berpraktek di Rumah Sakit Mitra Plumbon
                    Cirebon
                    dan
                    RS Sumber Kasih Cirebon.
                </p>
                    <h5>Keahlian Medis</h5>
                    <div class="mb-2" v-for="(data, index) in detailKeahlian" :key="index">
                        <p class="mb-0 text-dark">
                            <small>
                                {{ index + 1 }}. Mengatasi {{ data.keahlianId.namaKeahlian }}
                            </small>
                        </p>
                    </div>
                </div>
                <div class="alert alert-info text-start">
                    biaya konsultasi online: Rp. 20000
                </div>
                <div class="d-flex justify-content-start">
                    <button class="btn btn-dark btn-sm">
                        chat sekarang
                    </button>
                </div>
            </div>
        </div>
</template>
<script>
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
export default {
    data() {
        return {
            detailPerawat: [],
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