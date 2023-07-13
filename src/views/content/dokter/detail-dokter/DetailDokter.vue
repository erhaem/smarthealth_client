<template>
    <div class="container p-lg-5 rounded">
        <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.push({ name: 'Page Dokter' })">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="col-12 col-md-6">
            <img src="../../../../assets/images/avadoktercowo.png" class="w-25 mt-3 h-50 img-fluid rounded-start" alt="...">
            <div class="mt-3">
                <h5>Profil Dokter</h5>
                <p>
                    dr. {{ detailDokter.userId.nama }}, merupakan seorang Dokter Kandungan. Lahir pada tanggal {{
                        detailDokter.userId.tanggalLahir }} di {{ detailDokter.userId.tempatLahir }}. Beliau lulusan pendidikan
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
                biaya konsultasi online: Rp. {{ detailDokter.biaya.biaya }}
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
            detailKeahlian: [],
            isLoading: false
        }
    },
    computed: {
        idFromParams() {
            return {
                idDokter: this.$route.params.idDokter,
                idAhli: this.$route.params.idAhli
            }
        },
        hideFrom() {
            return this.$route.name === "Cari Keahlian"
        }
    },
    created() {
        this.getKeahlian()
        this.getDetailDokter()
    },
    methods: {
        getDetailDokter() {
            let type = "getData"
            let url = [
                "akun/dokter/" + this.idFromParams.idDokter + "/edit", []
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailDokter = result.data// Assign the id value
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