<template>
    <SectionHeaderBody Judul="BerobatShop" :Slogan="'Cari Produk ' + this.$route.params.namaKategori + ' di sini'">
        <template #router>
            <router-link style="text-decoration: none" :to="{ name: 'IndexHome' }">
                <p class="text-light">
                    Home
                    /
                    <router-link :to="{ name: 'Data Produk' }" class="text-light" style="text-decoration: none">
                        {{ $route.name }}
                    </router-link>
                </p>
            </router-link>
        </template>
        <template #input>
            <div class="input-group">
                <span class="input-group-text border-0 bg-warning" id="search-addon"><i
                        class="fas fa-magnifying-glass text-light"></i></span>
                <input type="search" class="form-control rounded p-2" placeholder="Cari nama obat atau vitamin" />
            </div>
        </template>
    </SectionHeaderBody>
    <div class="container-fluid col-xxl-12" style="background-color:ghostwhite;">
        <div class="container col-xxl-10 col-md-6 pb-3">
            <div class="d-flex justify-content-between mt-3 pt-3">
                <h5><b>
                        {{ this.$route.params.namaKategori }}
                    </b></h5>
            </div>
            <div class="d-flex justify-content-center">
                <div class="col-12 py-2 px-2">
                    <div class="row row-cols-1 row-cols-md-6 g-4">
                        <template v-if="isLoading">
                            <SkeletonLoading />
                        </template>
                        <template v-else>
                            <div class="col" v-for="data in produkKategori" v-if="hasProduk">
                                <div class="card shadow border-0">
                                    <div class="embed-responsive embed-responsive-16by9">
                                        <img src="../../../assets/images/9.png" class="card-img-top" alt="...">
                                    </div>
                                    <div class="card-body">
                                        <p class="mb-0">{{ data.produk.namaProduk }}</p>
                                        <div class="text-secondary" style="font-size: 14px">
                                            <p class="mb-0"><small>
                                                    pereda nyeri otot
                                                </small></p>
                                            <div class="d-flex justify-content-end">
                                                <p class="mb-2"><small>Rp. 20.000</small></p>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <router-link class="btn btn-sm btn-outline-primary w-75"
                                                    :to="{ name: 'Detail Produk', params: { id: data.produk.kodeProduk } }">
                                                    detail
                                                </router-link>
                                                <div class="">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="fas fa-cart-shopping text-light"
                                                            @click="addCart(data)"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template v-else>
                                <div class="alert alert-warning w-100 text-center">
                                    <p>
                                        Maaf Produk Kategori {{ this.$route.params.namaKategori }} Sedang Tidak Tersedia
                                    </p>
                                </div>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SectionHeaderBody from '../../../components/partials-component/SectionHeaderBody.vue'
import SkeletonLoading from '@/components/partials-component/LoadingComponent.vue'
export default {
    data() {
        return {
            produkKategori: [],
            isLoading: false
        };
    },
    created() {
        this.getKategoriProduk();
    },
    computed: {
        hasProduk() {
            return this.produkKategori.length > 0
        }
    },
    methods: {
        getKategoriProduk() {
            const kategoriId = this.$route.params.idKategori;
            let type = "getData";
            let url = [
                `apotek/produk/produk_kategori/${kategoriId}`,
                {}
            ];
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.produkKategori = result.data;
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    components: { SectionHeaderBody, SkeletonLoading }
}
</script>