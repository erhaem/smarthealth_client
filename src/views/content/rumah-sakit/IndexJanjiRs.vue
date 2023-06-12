<template>
    <div class="container">
        <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <div class="card border-0 sticky-top" style="max-width: 720px;">
            <div class="row g-0">
                <div class="col-md-4 col-3">
                    <img src="../../../assets/images/avadoktercewe.png" class="px-3 py-3 img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8 col-9">
                    <div class="card-body pt-0 mt-0 pt-sm-4 mt-sm-2">
                        <h5 class="card-title mb-0">dr. Muhamad Rafli Septian</h5>
                        <p class="card-text text-secondary"><i>Dokter Kandungan</i></p>
                        <hr>
                        <div class="d-flex justify-content-between">
                            <p class=""><i class="fas fa-thumbs-up text-primary"></i><small class="text-primary"> 99%
                                </small><small class="text-secondary">100 pasien</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <h5>Profil Dokter</h5>
            <p>
                dr. Amelia Suganda, Sp.OG merupakan seorang Dokter Kandungan. Beliau lulusan pendidikan Spesialis Obstetri
                dan
                Ginekologi Universitas Padjadjaran, Bandung. Saat ini beliau berpraktek di Rumah Sakit Mitra Plumbon Cirebon
                dan
                RS Sumber Kasih Cirebon.
            </p>
            <h5>Tindakan Medis</h5>
            <ul>
                <li>operasi</li>
                <li>operasi</li>
                <li>operasi</li>
            </ul>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <h5>Pilih tanggal dan waktu kunjungan</h5>
            <input type="date" name="" id="">
        </div>
        <div class="row row-cols-1 row-cols-md-4 g-4">
            <div v-for="data in jadwalPraktek" class="col">
                <div :class="['card shadow d-block-none d-sm', { 'border-danger': data.clicked }]" @click="aksi(data)">
                    <div class="card-body">
                        <p class="mb-0">
                            {{ data.tanggal }}
                        </p>
                        <p>{{ data.mulaiJam }} - {{ data.selesaiJam }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="fixed-bottom bg-light shadow">
        <div class="mt-3 mb-3">
            <div class="d-flex justify-content-end">
                <p class="mb-0 me-4">
                </p>
                <button class="btn btn-dark btn-sm me-4" @click="redirectToPage" :disabled="!isAnyClicked">
                    buat janji
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import Button from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            jadwalPraktek: [],
            selectedIdJdwl: null
        }
    },
    components: {
        Button,
    },
    computed: {
        idFromParams() {
            return this.$route.params.idDetailPraktek
        },
        idAhli(){
            return this.$route.params.idAhli
        },
        isAnyClicked() {
            return this.selectedId !== null;
        },
    },
    mounted() {
        this.getJadwalPraktek()
    },
    
    methods: {
        getJadwalPraktek() {
            let type = "getData"
            let url = [
                "master/ahli/jadwal_praktek/" + this.idFromParams, {}
            ]
            console.log("get jadwal")
            this.$store.dispatch(type, url).then((result) => {
                this.jadwalPraktek = result.data
                console.log(result)
            }).catch((err) => {
                console.log(err);
            })
        },
        aksi(data) {
            this.jadwalPraktek.forEach(item => {
                item.clicked = false;
            });
            data.clicked = true;
            this.selectIdJdwl = data.idJadwalPraktek;
        },
        redirectToPage() {
            if (this.isAnyClicked) {
                this.$router.push({
                    name: 'Detail Janji',
                    params: { idAhli: this.idAhli, idJadwalPraktek: this.selectIdJdwl }
                });
            }
        },
    },
}
</script>