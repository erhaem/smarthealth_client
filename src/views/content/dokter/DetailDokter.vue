<template>
    <div class="container">
        <p>
         <b>Nama</b>:   {{ detailDokter.getDokter.nama }}
        </p>
        <p>
         <b>Spesialis</b>: Dokter {{ detailDokter.getKeahlian.namaKeahlian }}
        </p>
        <p>
        <b>Nomor STR</b>:    {{ detailDokter.idDokterKeahlian }}
        </p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            detailDokter: []
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
            this.$store.dispatch(type, url).then((result) => {
                this.detailDokter = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>