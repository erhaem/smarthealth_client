<template>
    <div class="d-flex justify-content-start mb-3">
        <button class="btn btn-sm btn-outline-dark shadow me-3" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
        <h5>
          Dokter Spesialis  {{ spesialis.namaSpesialis }}
        </h5>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-3">
        <div class="col" v-for="data in dokter">
            <CardDokter :Label="spesialis.namaSpesialis" :nama="'dr ' + data.user.nama" :biaya="data.keahlianId.namaKeahlian"  @click="$redirect('/detail/' + data.idDokter + '/' + data.userId.id)" />
        </div>
    </div>
</template>
<script>
import CardDokter from '@/components/card/CardDokter.vue'
export default{
    data(){
        return {
            dokter: [],
            spesialis: [],
            isLoading: false
        }
    },
    created(){
        this.getDokter(),
        this.getSpesialis()
    },
    methods: {
        getDokter(){
            const params = this.$route.params.idSpesialis
            let type = "getData"
            let url = [
                `master/spesialis/${params}/get_dokter`, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result)=>{
                this.dokter = result.data
                this.isLoading = false
            }).catch((err)=>{
                console.log(err);
            })
        },
        getSpesialis(){
            const namaSpesialis = this.$route.params.idSpesialis
            let type = "getData"
            let url = [
                `master/penyakit/spesialis_penyakit/${namaSpesialis}/edit`, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.spesialis = result.data
                console.log(result
                );
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components: {
        CardDokter
    }
}
</script>