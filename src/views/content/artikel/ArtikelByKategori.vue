<template>
    {{ dataArtikel.getArtikel.judulArtikel }}
</template>
<script>
export default {
    data(){
        return{
            dataArtikel: {
                getArtikel: {}
            }
        }
    },
    computed: {
        idFromParams(){
            return this.$route.params.id
        }
    },
    mounted() {
        this.getArtikel()
    },
    methods: {
        getArtikel(){
            let type = "getData"
            let url = [
                "master/grouping_artikel/" + this.idFromParams + "/edit", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.dataArtikel = result.data
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>