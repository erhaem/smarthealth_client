<template>
    <div>
        
    </div>
</template>

<script>
export default{
    data(){
        return{
            detailHospitals: []
        }
    },
    computed: {
        idFromParams(){
            return this.$route.params.id
        }
    },
    mounted(){
        this.getDetailHospital()
    },
    methods: {
        getDetailHospital(){
            let type = "getData"
            let url = [
                "master/rumah_sakit/spesialis/" + this.idFromParams, []
            ]
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result.data);
                this.detailHospitals = result.data
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>