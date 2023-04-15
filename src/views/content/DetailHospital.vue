<template>
    <div class="container col-xl-10 col-xxl-9 border-top">
        <div class="row mb-3 mt-3 text-center">
            <div class="col-md-12 themed-grid-col">
                <div class="pb-1 text-start">
                    <h5>Rumah Sakit Mitra Plumbon</h5>
                </div>
                <div class="row">
                    <div class="col-md-6 themed-grid-col">
                        <img src="../../assets/images/rs.jpg" class="img-fluid" alt="">
                    </div>
                    <div class="col-md-4 themed-grid-col text-start">
                        <h6 class="mt-2"><b>Deskripsi</b></h6>
                        <p>placeat, ducimus explicabo nam fugiat
                            recusandae? Ipsam, perspiciatis repellat dolorem exercitationem aut hic?</p>
                        <h6><b>Alamat</b></h6>
                        <div class="d-inline-flex align-items-start">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.557138513222!2d108.47898077420345!3d-6.701638593293944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee04fdc5dd811%3A0x4d0342bacbbba99d!2sRS%20Mitra%20Plumbon!5e0!3m2!1sid!2sid!4v1681476493034!5m2!1sid!2sid"
                                width="330" height="210" style="border:0;" allowfullscreen="" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div class="col-md-2 themed-grid-col">
                        <div class="text-start">
                            <h6 class="mt-3 mb-0"><b>Fasilitas</b></h6>
                            <ul style="padding-left: 1rem;">
                                <li>Farmasi</li>
                                <li>Ambulan</li>
                                <li>IGD</li>
                            </ul>
                        </div>
                        <div class="row">
                            <div class="d-flex justify-content-start">
                                <button class="btn btn-sm btn-danger me-2">Buat Janji</button>
                                <button class="btn btn-sm btn-outline-danger">telepon</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <h5 class="py-2">Spesialisasi Dokter</h5>
            <div class="row row-cols-1 row-cols-md-3">
                <div class="col" v-for="specialist in limitedDataSpesialis" :key="specialist.id">
                <CardMedicine @click="$redirect('/hospital' + specialist.idRumahSakit + '/' + specialist.idRumahSakit.slugSpesialis)" class="mb-2" icon="fa-user" :labelTitle="specialist.penyakit.namaSpesialis"/>
            </div>
            <div class="px-3 py-4 text-center">
            <p class="text-primary">lihat semua spesialis</p>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardMedicine from '@/components/CardMedicine.vue';
export default {
    data() {
        return {
            detailHospitals: [],
            limit: 5
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        limitedDataSpesialis(){
            return this.detailHospitals.slice(0, this.limit)
        }
    },
    mounted() {
        this.getDetailHospital()
    },
    methods: {
        getDetailHospital() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/spesialis/" + this.idFromParams, []
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.detailHospitals = result.data
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components:{
        CardMedicine
    }
}
</script>