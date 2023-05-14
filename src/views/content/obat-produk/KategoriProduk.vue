<template>
    {{ dataProduk.produk.namaProduk }}
</template>
<script>
export default {
    data(){
        return {
            dataProduk: []
        }
    },  
    computed: {
        idFromParams(){
            return this.$route.params.id
        }
    },
    created(){
        this.getProduk()
    },
    methods: {
        getProduk(){
            let type = "getData"
            let url = [
                "apotek/produk/produk_kategori/" + this.idFromParams + "/edit", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.dataProduk = result.data
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>