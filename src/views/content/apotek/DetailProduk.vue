<template>
    <div class="container col-xxl-10">
        <div class="row">
            <div class="col-lg-4">
                <div class="pt-5">
                    <img src="../../../assets/images/28.png" class="img-fluid" alt="">
                </div>
            </div>
            <div class="col-lg-4">
                <div class="pt-5">
                    <h5 class="text-dark"><b>{{ detailProduk.namaProduk }}</b></h5>
                    <h3>{{ detailProduk.hargaProduk }}</h3>
                    <hr>
                    <h5 class="text-primary"><b>Detail</b></h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi magnam consequatur sequi, aliquam temporibus in minima iure vel mollitia minus obcaecati, error soluta quis labore voluptatem ea. Est, blanditiis consequatur.
                        {{ detailProduk.deskripsiProduk }}</p>
                        <button class="btn btn-sm btn-outline-primary" @click="addCart()">
                          Add to cart  <i class="fas fa-cart-shopping"></i>
                        </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import iziToast from 'izitoast'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
export default {
    data() {
        return {
            cart: [],
            nearestResults: [],
            dataProduk: [],
            countOfKodeProduk: 0,
            isLoading: false,
            latitude: null,
            longitude: null,
            detailProduk: []
        }
    },
    components: {
        SkeletonLoading
    },
    computed: {
        idFromParams() {
            return this.$route.params.id
        },
        pathUrl() {
            return this.$route.fullPath
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
        shareProduk() {
            const pesan = this.detailProduk.deskripsiProduk
            const path = this.pathUrl
            window.location = `https://api.whatsapp.com/send?text=${pesan}., http://10.0.140.209:5173${path}`
        },
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