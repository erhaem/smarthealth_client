<template>
    {{ produkKategori }}
</template>
<script>
export default {
    data(){
        return{
            produkKategori:[]
        }
    },
    created() {
        this.getKategoriProduk()
    },
    methods: {
        getKategoriProduk(){
            const kategoriId = this.$route.params.idKategori
            let type = "getData"
            let url = [
                `apotek/produk/produk_kategori/${kategoriId}`, {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.produkKategori = result.data
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>