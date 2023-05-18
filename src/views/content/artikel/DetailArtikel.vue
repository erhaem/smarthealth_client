<template>
    <div class="container px-5 py-5">
        <div class="row g-5">
            <div class="col-md-8">
                <router-view></router-view>
            </div>
            <div class="col-md-4">
                <div class="position-sticky" style="top: 2rem;">
                    <div class="p-4" style="overflow-y: auto; max-height: 400px">
                        <h4 class="fst-italic">Artikel terkait</h4>
                        <div v-for="data in relatedArtikels" :key="data.id">
                            <ol class="list-unstyled mb-0">
                                <li>
                                    <div class="row">
                                        <div class="col-4 mb-2">
                                            <img src="../../../assets/images/28.png" class="img-fluid rounded border"
                                                alt="">
                                        </div>
                                        <div class="col-8">
                                            <router-link class="text-dark" style="text-decoration: none;"
                                                :to="'/artikel/kategori/' + data.idGroupingArtikel"
                                                @click="updateRelatedArtikel">
                                                <p class="mb-0">
                                                    <small>
                                                        <b>
                                                            {{ data.getArtikel.judulArtikel }}
                                                        </b>
                                                    </small>
                                                </p>
                                                <p class="rounded ps-2 text-dark" style="background-color:honeydew">
                                                    <small>
                                                        {{ data.getKategoriArtikel.namaKategori }}
                                                    </small>
                                                </p>
                                            </router-link>
                                        </div>
                                    </div>
                                </li>
                            </ol>
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
            relatedArtikels: [],
            isLoading: false
        }
    },
    components: {
        SmallLoading, SkeletonLoading
    },
    created() {
        this.getRelatedArtikel()
    },
    methods: {
        getRelatedArtikel() {
            let type = "getData"
            let url = [
                "master/grouping_artikel", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
                this.relatedArtikels = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        clicked(){
            const userId = this.data.idGroupingArtikel
            this.$router.push('/artikel/kategori/${userId}')
        }
        
    },
}
</script>