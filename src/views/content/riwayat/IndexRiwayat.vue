<template>
    <div class="container">
        <div class="py-3">
            <h4>
                <b>
                    Riwayat Kunjungan Medis
                </b>
            </h4>
        </div>
        <div class="row g-4 row-cols-lg-4 me-2 mb-5">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header text-center">
                        <h5>
                            <b>
                                Total Antrian Aktif
                            </b>
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="card-text text-center">
                            <h2>
                                1
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card shadow">
                    <div class="card-header text-center">
                        <h5>
                            <b>
                                Total Kunjungan Medis
                            </b>
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="card-text text-center">
                            <h2>
                                1
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        this.getAntrian()
    },
    methods: {
        getAntrian(){
            let type = "getData"
            let url = [
                "master/ahli/jadwal_antrian", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>