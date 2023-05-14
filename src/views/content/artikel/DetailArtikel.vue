<template>
    <div class="container col-xxl-10 px-4 py-2">
        <div class="row align-items-top g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start">
                <SmallLoading v-if="isLoading" />
                <div v-if="!isLoading">
                    <h4 class="fw-bold lh-1 mb-3">{{ artikel.judulArtikel }}</h4>
                    <p class="text-secondary">author: {{ artikel.getUser.nama }}</p>
                    <p class="col-lg-10 fs-5">{{ artikel.deskripsi }}</p>
                </div>
            </div>
            <div class="col-lg-5">
                <div>
                    <p>Topik Terkini</p>
                </div>
                <div class="d-flex flex-wrap">
                    <div v-for="kategori in kategoris" :key="kategori.id">
                        <div class="me-2 bg-secondary rounded">
                            <div>
                                <p class="text-light">&nbsp; {{ kategori.namaKategori }} &nbsp;</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Artikel Terkait</p>
                </div>
                <div class="d-flex flex-wrap">
                    <div v-for="relate in relatedArtikels" :key="relate.id">
                        <div class="me-2 bg-secondary rounded">
                            <router-link style="text-decoration:none" :to="'/artikel/' + relate.slugArtikel">
                                <p class="text-light">&nbsp; {{ relate.judulArtikel }} &nbsp;</p>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SmallLoading from '@/components/partials-component/SmallLoading.vue';
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
export default {
    data() {
        return {
            artikel: [],
            kategoris: [],
            relatedArtikels: [],
            isLoading: false,
            onLoading: false
        }
    },
    components: {
        SmallLoading, SkeletonLoading
    },
    created() {
        const slug = this.$route.params.slug
        this.getDetailArtikel(slug),
            this.getKategoriArtikel(),
            this.getRelatedArtikel()
    },
    methods: {
        getDetailArtikel(slug) {
            let type = "getData"
            let url = [
                "master/artikel/" + slug, []
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
        getKategoriArtikel() {
            let type = "getData"
            let url = [
                "master/kategori_artikel", {}
            ]
            this.onLoading = true
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
                this.kategoris = result.data
                setTimeout(() => {
                    this.onLoading = false
                }, 2000);
            }).catch((err) => {
                console.log(err);
            })
        },
        getRelatedArtikel() {
            let type = "getData"
            let url = [
                "master/artikel", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
                this.relatedArtikels = result.data
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>