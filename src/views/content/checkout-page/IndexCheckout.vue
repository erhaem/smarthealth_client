<template>
    <div class="container py-3 px-3">
        <div class="d-flex justify-content-center">
            <div class="card shadow pt-3 px-3 w-100">
                    <div class="row">
                    <div class="col-1">
                        <input type="checkbox" name="" id="" v-model="selectAll">
                    </div>
                    <div class="col-2">
                        <p><b>Nama Produk</b></p>
                    </div>
                    <div class="col-2">
                        <p><b>
                                Harga satuan
                            </b></p>
                    </div>
                    <div class="col-2">
                        <p><b>
                                qty
                            </b></p>
                    </div>
                    <div class="col-2">
                        <p><b>
                                total harga
                            </b></p>
                    </div>
                    <div class="col-2">
                        <p><b>
                                aksi
                            </b></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center" v-for="item in items" :key="item.id">
            <div class="card shadow pt-3 px-3 pb-3 mt-3 w-100">
                <div class="row">
                    <div class="col-1">
                        <input type="checkbox" :value="item.id" v-model="checked">
                    </div>
                    <div class="col-2">
                        {{ item.namaProduk }}
                    </div>
                    <div class="col-2">
                        {{ item.hargaProduk }}
                    </div>
                    <div class="col-2">
                        <div class="d-flex justify-content-start">
                            <button class="btn btn-outline-danger" @click="decrementQty(item.id)">
                                -
                            </button>
                            <span class="mx-2">{{ item.qty }}</span>
                            <button class="btn btn-outline-success" @click="incrementQty(item.id)">
                                +
                            </button>
                        </div>
                    </div>
                    <div class="col-2">
                        {{ item.hargaProduk }}
                    </div>
                    <div class="col-2">
                        <button class="btn" @click="deleteItem(item.id)">
                            <i class="fas fa-trash text-danger"></i>
                            hapus
                        </button>
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

                </div>
            </div>
        </div>
    </div>

    Total Price: {{ totalPrice }}
    Total Produk : {{ calculateTotalProduct() }}

    <button @click="withBui">pesen kontol</button>
</template>
  
<script>
import iziToast from 'izitoast';
export default {
    data() {
        return {
            items: [],
            checked: [],
            selectAll: false
        }
    },
    computed: {
        totalQuantity() {
            return this.items.reduce((total, item) => total + item.qty, 0);
        },
        totalPrice() {
            let totalPrice = 0;
            for (const item of this.items) {

                if (this.checked.includes(item.id)) {
                    totalPrice += item.qty * item.harga;
                }
            }
            return totalPrice;
        },

    },
    mounted() {
        this.getItemsFromStorage()
    },
    methods: {
        calculateTotalProduct() {
            let totalProduct = 0;
            for (const item of this.items) {
                if (this.checked.includes(item.id)) {
                    totalProduct += item.qty;
                }
            }
            console.log('Total Product:', totalProduct);
            return totalProduct;
        },

        incrementQty(idProduct) {
            const item = this.items.find(item => item.id === idProduct);
            if (item) {
                item.qty++;
                this.updateLocalStorage()
            }
        },
        decrementQty(idProduct) {
            const item = this.items.find(item => item.id === idProduct);
            if (item && item.qty > 1) {
                item.qty--;
                this.updateLocalStorage()
            }
        },
        getItemsFromStorage() {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                this.items = JSON.parse(cartData);
            }
        },
        deleteItem(idProduct) {
            const index = this.items.findIndex((item) => item.id === idProduct);
            if (index !== -1) {
                iziToast.success({
                    title: 'success',
                    message: 'data berhasil dihapus'
                })
                this.items.splice(index, 1);
                this.updateLocalStorage();
            }
        },

        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.items));
        },
        withBui() {
            let type = "postData"
            let url = [
                "invoice", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                window.open(result.data.invoiceUrl, "_blank")
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    watch: {
        checked: {
            handler() {
                this.calculateTotalProduct();
            },
            deep: true,
        },
    },

}
</script>
  
<style></style>
  