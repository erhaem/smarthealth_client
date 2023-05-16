<template>
    <div class="container col-xxl-6 px-3 py-3">
        <div class="d-flex justify-content-center">
            <div class="col-lg-8">
                <div class="input-group mb-3">
                    <span class="input-group-text border-0" id="search-addon"><i class="fas fa-magnifying-glass"></i></span>
                    <input type="search" class="form-control rounded" placeholder="Cari nama rumah sakit atau poliklinik" />
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="d-flex justify-content-between">
            <div class="col-lg-6">
                <h6><i class="fa-solid fa-hospital text-danger"></i>
                    Daftar Obat dan Produk
                </h6>
            </div>
            <div class="col-lg-6 text-end">
                <p><i class="fa-solid fa-location-dot text-danger"></i>
                    {{ latitude }}, {{ longitude }}
                </p>
            </div>
        </div>
    </div>
    <div class="container col-xxl-12">
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
                                        <button @click="$redirect('/detail_produk/' + data.kodeProduk)"
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
    <div class="container mt-5">
        <div class="d-flex justify-content-between">
            <div class="col-lg-6">
                <h6><i class="fa-solid fa-hospital text-danger"></i>
                    Daftar Apotek Terdekat
                </h6>
            </div>
            <div class="col-lg-6 text-end">
                <h6><i class="fa-solid fa-location-dot text-danger"></i>
                    {{ latitude }}, {{ longitude }}
                </h6>
            </div>
        </div>
    </div>
    <div class="container col-xxl-12">
        <div class="d-flex justify-content-center">
            <div class="col-12 py-2 px-2">
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    <div class="col" v-for="data in nearestResults" :key="data.idProfilApotek">
                        <template v-if="isLoading">
                            <SkeletonLoading />
                        </template>
                        <div v-else class="card shadow border-0" v-if="!isLoading">
                            <div class="embed-responsive embed-responsive-16by9">
                                <img src="../../../assets/images/9.png" class="card-img-top" alt="...">
                            </div>
                            <div class="card-body" @click="$redirect('/detail_apotek/' + data.idProfilApotek)">
                                <p class="mb-0">{{ data.namaApotek }}</p>
                                <div class="text-secondary">
                                    <p class="mb-0"><small>{{ data.alamatApotek }}</small></p>
                                    <div class="d-flex justify-content-end">
                                        <p class="mt-2 mb-0"><small><i
                                                    class="fa-solid fa-location-dot text-danger me-1"></i>{{
                                                        Math.floor(data.distance) }}
                                                km</small></p>
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
import iziToast from 'izitoast'
import CardArtikel from '@/components/CardArtikel.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
export default {
    data() {
        return {
            cart: [],
            nearestResults: [],
            dataProduk: [],
            countOfKodeProduk: 0, // Initialize count to 0
            isLoading: false,
            latitude: null,
            longitude: null
        }
    },
    components: {
        CardArtikel, SkeletonLoading
    },
    mounted() {
        this.getLocation()
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    },
    created() {
        this.getProduk()
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