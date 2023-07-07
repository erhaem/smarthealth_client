<template>
    <div class="container-fluid p-lg-4 bg-primary">
        <div class="container col-xxl-10 col-md-6">
            <router-link style="text-decoration: none" to="/">
                <p class="text-light">
                    Home
                    /
                    <router-link to="/produk-obat" class="text-light" style="text-decoration: none">
                        {{ $route.name }}
                    </router-link>
                </p>
            </router-link>
            <div class="d-flex justify-content-between">
                <div class="text-light mb-3 d-none d-sm-block">
                    <h3>
                        Berobat+ Shop
                    </h3>
                    <h4>
                        Solusi Aman dan Terpercaya
                    </h4>
                </div>
                <div class="text-light mb-3 mt-2">
                    <h6 class="text-end">
                        Alamat pengiriman:
                    </h6>
                    <div class="rounded text-center px-3" style="background-color: navy;">
                        <p>
                            <i class="fas fa-location-pin"></i>
                            Lohbener
                        </p>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-start">
                <div class="col-12 col-md-6">
                    <div class="input-group">
                        <span class="input-group-text border-0 bg-warning" id="search-addon"><i
                                class="fas fa-magnifying-glass text-light"></i></span>
                        <input type="search" class="form-control rounded p-2" placeholder="Cari nama obat atau vitamin" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="container col-xxl-10 col-md-6 pb-3 mt-3">
            <div class="d-flex justify-content-between">
                <h5><b>Kategori</b></h5>
                <!-- <h5 style="color: navy"><b>Lihat Semua</b></h5> -->
            </div>
            <div class="row g-4 p-lg-2 row-cols-sm-6">
                <div class="col-6 col-sm-4 col-md-3 col-lg-2" v-for="data in kategori">
                    <div class="card shadow border me-2 p-1" style="background-color: ghostwhite;">
                        <div class="card-body">
                            <div class="card-text">
                                <i class="fas fa-hospital me-2"></i> {{ data.kategori.namaKategoriProduk }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid col-xxl-12" style="background-color:ghostwhite;">
        <div class="container col-xxl-10 col-md-6 pb-3">
            <div class="d-flex justify-content-between mt-3 pt-3">
                <h5><b>Suplemen</b></h5>
                <h5 style="color: navy"><b>Lihat Semua</b></h5>
            </div>
            <div class="d-flex justify-content-center">
                <div class="col-12 py-2 px-2">
                    <div class="row row-cols-1 row-cols-md-6 g-4">
                        <div class="col" v-for="data in dataProduk">
                            <template v-if="isLoading">
                                <SkeletonLoading />
                            </template>
                            <div v-else class="card shadow border-0" v-if="!isLoading">
                                <div class="embed-responsive embed-responsive-16by9">
                                    <img src="../../../assets/images/9.png" class="card-img-top" alt="...">
                                </div>
                                <div class="card-body">
                                    <p class="mb-0">{{ data.namaProduk }}</p>
                                    <div class="text-secondary" style="font-size: 14px">
                                        <p class="mb-0"><small>{{ data.deskripsiProduk }}</small></p>
                                        <div class="d-flex justify-content-end">
                                            <p class="mb-2"><small>{{ data.hargaProduk }}</small></p>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <button @click="$redirect('/produk-obat/' + data.kodeProduk)"
                                                class="btn btn-sm btn-outline-primary w-75">
                                                detail
                                            </button>
                                            <div class="">
                                                <button class="btn btn-sm btn-primary">
                                                    <i class="fas fa-cart-shopping text-light" @click="addCart(data)"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import iziToast from 'izitoast'
import CardArtikel from '@/components/card/CardArtikel.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
export default {
    data() {
        return {
            cart: [],
            nearestResults: [],
            dataProduk: [],
            kategori: [],
            countOfKodeProduk: 0, // Initialize count to 0
            isLoading: false,
            latitude: null,
            longitude: null,
            userId: null
        }
    },
    computed: {
        userId() {
            const cookie = Cookies.get("user");
            const parsing = JSON.parse(cookie);
            const cekRole = parsing.data.id;
            return cekRole
        },
    },
    components: {
        CardArtikel, SkeletonLoading
    },
    mounted() {
        this.countProductOccurrences()
            this.getLocation()
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    },
    created() {
        this.getProduk(),
            this.getKategoriObat()
    },
    methods: {
        getNeareset() {
            let type = "postData"
            let url = [
                "apotek/pengaturan/profil_apotek/find_nearest", {
                    latitude: this.latitude,
                    longitude: this.longitude
                }
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.nearestResults = result
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        this.getNeareset();
                    },
                    error => {
                        console.error(error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        },
        getProduk() {
            let type = "getData"
            let url = [
                "apotek/produk/data_produk", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.dataProduk = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        getKategoriObat() {
            let type = "getData"
            let url = [
                "apotek/produk/produk_kategori", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.kategori = result.data
                setTimeout(() => {
                    this.isLoading = false
                }, 1000);
            }).catch((err) => {
                console.log(err);
            })
        },
        addCart(produk) {
            produk.qty = 1
            console.log('kode produk:', produk);
            this.cart.push(produk),
                this.showAlertSuccess(),
                this.saveCartToLocalStorage(produk); // Save the updated cart to local storage
        },
        saveCartToLocalStorage(produk) {
            const cart = localStorage.getItem('cart');

            if (cart) {
                const jsonCart = JSON.parse(cart);
                const existingItemIndex = jsonCart.findIndex(item => item.id === produk.id);
                if (existingItemIndex !== -1) {
                    console.log('Product exists in cart');
                    jsonCart[existingItemIndex].qty += produk.qty; // Increment the quantity
                } else {
                    console.log('Product does not exist in cart');
                    jsonCart.push(produk); // Add the product to the cart
                }
                localStorage.setItem('cart', JSON.stringify(jsonCart));
            } else {
                localStorage.setItem('cart', JSON.stringify([produk])); // Create a new cart with the product
            }
        },
        countProductOccurrences(kodeProduk) {
            const count = this.cart.filter(item => item === kodeProduk).length;
            this.countOfKodeProduk = count; // Assign count value to the data property
            console.log(`Count of ${kodeProduk}:`, count);
            ;
        },
        showAlertSuccess() {
            iziToast.success({
                title: 'success',
                message: 'berhasil ditambahkan ke keranjang',
                position: 'topRight'
            })
        },
    },
}
</script>

<style>
.form-control:focus {
    border-color: #4538db;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(95, 124, 218, 0.6);
}
</style>

<script>
</script>