<template>
    <div class="container">
        <div class="col-xxl-10 px-5 py-5">
            <SkeletonLoading v-if="isLoading" />
            <article class="blog-post" v-if="!isLoading">
                <h2 class="blog-post-title mb-2">{{ artikel.judulArtikel }}</h2>
                <div class="rounded px-4 w-50" style="background-color:cadetblue;">
                    <p class="blog-post-meta text-light">Mei 23, 2022 by <a style="text-decoration: none;">{{ artikel.getUser.nama
                    }}</a></p>
                </div>
                <p class="mt-3">
                    {{ artikel.deskripsi }}
                </p>
            </article>
        </div>
    </div>
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
        slugFromParams() {
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