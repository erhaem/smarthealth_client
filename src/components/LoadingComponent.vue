<template>
    <loading :is-full-page="fullPage"
    :color="color" :background-color="warna" :opacity="opacity" :loader="loader" />
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
export default {
    props: {
        opacity: {
            type: Number,
            default: 0.8
        },
        warna: {
            type: String,
            default: "#EEEEE"
        },
        color: {
            type: String,
            default: "black"
        },
        loader: {
            type: String,
            default: "spinner"
        }
    },
    components: {
        Loading
    },
    data(){
        return {
            fullPage: true
        }
    }
}
</script>