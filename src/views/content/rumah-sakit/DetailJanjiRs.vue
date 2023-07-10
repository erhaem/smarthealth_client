<template>
    <div class="container">
        <div class="col-lg-12 col-md-6 pt-3 pb-3">
            <div class="d-flex justify-content-center">
                <div class="card shadow pb-2">
                    <div class="card-body">
                        <div class="card-title px-4">
                            <p class="mb-0"><b>Ringkasan Janji Kunjungan</b></p>
                        </div>
                        <div class="card-text px-4">
                            <!-- <div v-for="data in detailDokter"> -->
                            <p class="mb-0">
                                kunjungan untuk dr. {{ detailKunjungan.praktek.dokter }}
                            </p>
                            <p class="mb-0 text-secondary">
                                <small>
                                    {{ detailKunjungan.praktek.rumahSakit }}
                                </small>
                            </p>
                            <!-- </div> -->
                            <p class="mb-0">
                                <small>
                                    tanggal - {{ detailKunjungan.tanggal }} | jam- {{ detailKunjungan.mulaiJam }}
                                </small>
                            </p>
                            <hr>
                            <p><b>Ringkasan Pembayaran</b></p>
                            <div class="d-flex justify-content-between">
                                <p class="mb-0">
                                    Biaya Layanan
                                </p>
                                <p class="mb-0 text-success">
                                    Gratis
                                </p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="mb-0">
                                    Biaya Konsultasi
                                </p>
                                <p class="mb-0 text-dark">
                                    Rp. {{ detailKunjungan.praktek.biaya.toLocaleString('id-ID') }}
                                </p>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between">
                                <p class="mb-0">
                                    <b>
                                        Total pembayaran
                                    </b>
                                </p>
                                <p class="mb-0 text-dark">
                                    Rp. {{ detailKunjungan.praktek.biaya.toLocaleString('id-ID') }}
                                </p>
                            </div>
                            <div class="alert alert-info mt-4" role="alert">
                                <p class="mb-0 mt-0">
                                    <small>
                                        Silakan membayar biaya kunjungan dan biaya tambahan lainnya secara langsung di RS.
                                    </small>
                                </p>
                            </div>
                            <hr>
                            <div class="d-grid gap-2">
                                <button class="btn btn-danger" @click="postKunjungan">
                                    <small>
                                        Buat Kunjungan
                                    </small>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <input type="text" v-model="detailKunjungan.idJadwalPraktek" hidden>
    </div>
</template>
<script>
export default {
    data() {
        return {
            detailKunjungan: {
                praktek: {}
            },
            dataa: []
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.idJadwalPraktek
        },
        idAhli() {
            return this.$route.params.idAhli
        }
    },
    created() {
        this.getDetail(),
            this.getAntrian()
    },
    methods: {
        getDetail() {
            let type = "getData"
            let url = [
                "master/ahli/jadwal_praktek/jadwal/" + this.idFromParams + "/edit", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.detailKunjungan = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        postKunjungan() {
            const message = "Data Berhasil di Tambahkan"
            let type = "postData"
            let url = [
                "master/ahli/jadwal_antrian", {
                    ahliId: this.idAhli,
                    idJadwalPraktek: this.detailKunjungan.idJadwalPraktek
                }, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                if (result.pesan == message) {
                    this.$swal({
                        icon: 'success',
                        title: 'berhasil mendapatkan antrian'
                    })
                    this.$router.push({ name: 'Riwayat Konsumen' })
                } else {
                    this.$swal({
                        icon: 'error',
                        title: (result.pesan)
                    })
                }
                this.getAntrian()
            }).catch((err) => {
                console.log(err);
            })
        },
        getAntrian() {
            let type = "getData"
            let url = [
                "master/ahli/jadwal_antrian", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>