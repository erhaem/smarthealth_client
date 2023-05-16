<template>
    <div class="container py-3 px-3">
        <div class="d-flex justify-content-center">
            <div class="w-100">
                <div class="row">
                    <div class="col-4">
                        <p><b>Nama Produk</b></p>
                    </div>
                    <div class="col-4">
                        <p><b>
                                Harga per produk
                            </b></p>
                    </div>
                    <div class="col-4">
                        <p><b>
                                qty
                            </b></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="w-100">
                <div class="row" v-for="item in items" :key="item.id">
                    <div class="col-4">
                        {{ item.namaProduk }}
                    </div>
                    <div class="col-4">
                        {{ item.hargaProduk }}
                    </div>
                    <div class="col-4">
                        <div class="d-flex">
                            <button class="btn" @click="decrementQty(item.id)">
                                -
                            </button>
                            <span class="mx-2">{{ item.qty }}</span>
                            <button class="btn" @click="incrementQty(item.id)">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="w-100">
                <div class="row">
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                        <p><b>
                                Jumlah barang: {{ totalQuantity }}
                            </b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
  
<script>
export default {
    data() {
        return {
            items: [
            ]
        }
    },
    computed: {
        totalQuantity() {
            return this.items.reduce((total, item) => total + item.qty, 0);
        }
    },
    mounted() {
        this.getItemsFromStorage()
    },
    methods: {
        incrementQty(idProduct) {
            const item = this.items.find(item => item.id === idProduct);
            if (item) {
                item.qty++;
            }
        },
        decrementQty(idProduct) {
            const item = this.items.find(item => item.id === idProduct);
            if (item && item.qty > 1) {
                item.qty--;
            }
        },

        getItemsFromStorage() {
            const cartData = localStorage.getItem('cart');
            console.log(cartData)
            if (cartData) {
                this.items = JSON.parse(cartData);
            }
        }

    }
}
</script>
  
<style></style>
  