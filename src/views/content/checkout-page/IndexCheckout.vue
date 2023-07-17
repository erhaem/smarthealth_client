<template>
    <div class="container py-5 px-3">
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
                        <button class="btn" @click="deleteItem(item.id)">
                            <i class="fas fa-trash text-danger"></i>
                            hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button @click="withBui" class="btn btn-dark btn-sm mt-3">checkout</button>
        </div>
        <h6>
            Total Price: {{ totalPrice }}
        </h6>
        <h6>
            <!-- Total Produk : {{ calculateTotalProduct() }} -->
        </h6>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            items: [],
        }
    },
    methods: {
        getDetailCheckout(){
            let type = "getData"
            let url = [
                "keranjang", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.items = result.data
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    created() {
        this.getDetailCheckout()
    },

}
</script>
  
<style></style>
  