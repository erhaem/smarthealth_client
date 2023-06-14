<template>
    <div class="container">
        <div class="col-xxl-10 px-5 py-5">
            <SkeletonLoading v-if="isLoading" />
            <article class="blog-post" v-if="!isLoading">
                <h2 class="blog-post-title mb-2">{{ detailArtikel.judulArtikel }}</h2>
                <div class="rounded px-4 w-50" style="background-color:cadetblue;">
                    <p class="blog-post-meta text-light"> <a style="text-decoration: none;">{{
                        detailArtikel.namaKategori
                    }}</a></p>
                </div>
                <p class="mt-3">
                    {{ detailArtikel.deskripsi }}
                </p>
            </article>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            detailArtikel: {}
        }
    },
    computed: {
        idFromParams() {
            return this.$route.params.idGroupingArtikel
        }
    },
    created() {
        this.getDetailArtikel()
    },
    methods: {
        getDetailArtikel() {
            let type = "getData"
            let url = [
                "master/grouping_artikel/" + this.idFromParams + "/edit", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.detailArtikel = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>