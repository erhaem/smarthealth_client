<template>
    <div class="container">
        <div class="p-3">
        <h4><b>{{this.$route.name}}</b></h4>
        </div>
        <div class="row row-cols-1 row-cols-md-1 g-4">
            <div class="col" v-for="data in riwayat">
                <div :class="['card shadow mb-2', { 'border-primary': data.clicked }]" @click="aksi()">
                    <div class="card-body">
                        <p>
                            <b> {{ data.idPembelian }} </b> <span class="rounded pe-2 ps-2 text-light">{{
                                data.tanggalPembelian }}</span> <br> {{ data.status }} <br> {{ data.totalPembelian }} <br>
                            note: {{
                                data.tarif }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            riwayat: []
        }       
    },
    created() {
        this.getDetailTransaksi()
    },
    methods: {
        getDetailTransaksi(){
            let type = "getData"
            let url = [
                "master/pembelian/transaksi", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.riwayat = result.data
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>