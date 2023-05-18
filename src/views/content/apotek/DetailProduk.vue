<template>
    <div class="container col-xxl-10">
        <div class="row flex-lg-row-reverse align-items-top g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
                <div class="sticky-top" style="overflow-y: auto; max-height: 400px">
                    <h4>Obat dan Vitamin</h4>
                    <div class="d-flex justify-content-start mt-4 border-bottom">
                        <img src="../../../assets/images/9.png" class="img-fluid w-25 h-25 me-2" alt="">
                        <p class="p-3">akakakakak</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pt-5">
                    <div v-if="isLoading">
                        <div class="" aria-hidden="true">
                            <div class="card-body">
                              <h5 class="card-title placeholder-glow">
                                <span class="placeholder col-6"></span>
                              </h5>
                              <p class="card-text placeholder-glow">
                                <span class="placeholder col-7"></span>
                                <span class="placeholder col-4"></span>
                                <span class="placeholder col-4"></span>
                                <span class="placeholder col-6"></span>
                                <span class="placeholder col-8"></span>
                              </p>
                              <span class="placeholder col-4"></span>
                            </div>
                          </div>
                    </div>
                    <div v-else>
                        <p>⭐4.5(23 reviews)</p>
                        <h6 class="text-dark"><b>{{ detailProduk.namaProduk }}</b></h6>
                        <p>{{ detailProduk.hargaProduk }}</p>
                        <p class="text-secondary"><small>Apotek Arjawinangun</small></p>
                        <div class="d-flex justify-content-start">
                            <button class="btn btn-sm btn-dark me-2">add to cart</button>
                            <button class="btn btn-sm btn-outline-dark me-2">+</button>
                            <button class="btn btn-sm btn-outline-dark me-2">1</button>
                            <button class="btn btn-sm btn-outline-dark">-</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card border">
                    <img src="../../../assets/images/avadokterpr.png" class="img-fluid" alt="">
                </div>
                <div class="text-start p-lg-3">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="me-5">Deskripsi</h6>
                        <h6>Reviews</h6>
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
            longitude: null,
            detailProduk: []
        }
    },
    components: {
        CardArtikel, SkeletonLoading
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        }
    },
    mounted() {
        this.getLocation()
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    },
    created() {
        this.getProduk(),
            this.getDetailProduk()
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
        getDetailProduk() {
            let type = "getData"
            let url = [
                "apotek/produk/data_produk/" + this.idFromParams + "/edit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.detailProduk = result.data
            }).catch((error) => {
                console.log(err);
            })
        }
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