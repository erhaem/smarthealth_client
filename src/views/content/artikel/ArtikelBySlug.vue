<template>
    <SkeletonLoading v-if="isLoading" />
    <article class="blog-post" v-if="!isLoading">
        <h2 class="blog-post-title mb-1">{{ artikel.judulArtikel }}</h2>
        <p class="blog-post-meta">December 23, 2020 by <a style="text-decoration: none;">{{ artikel.getUser.nama
        }}</a></p>
        <img src="../../../assets/images/rs.jpg" class="img-fluid h-75 w-75" alt="">
        <p class="mt-3">
            {{ artikel.deskripsi }}
        </p>
    </article>
</template>
<script>
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
export default {
    data() {
        return {
            artikel: [],
            isLoading: false
        }
    },
    components: {
        SkeletonLoading
    },
    computed: {
        slugFromParams(){
            return this.$route.params.slug
        }
    },
    created() {
        this.getDetailArtikel()
    },
    methods: {
        getDetailArtikel() {
            let type = "getData"
            let url = [
                "master/artikel/" + this.slugFromParams, []
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                console.log(result.data);
                this.artikel = result.data
                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
            }).catch((err) => {
                console.log(err);
            })
        },
    },
}
</script>