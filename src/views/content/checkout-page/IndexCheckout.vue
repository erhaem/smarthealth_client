<template>
    <div class="container">
        <template v-if="hasProduk">
            <div class="row mt-3">
                <div class="col-lg-8 col-md-6">
                    <div class="d-flex justify-content-between border-bottom border-light border-5">
                        <input type="checkbox" name="" id="">
                        <p class="mb-1 text-success font-weight-bold" @click="deleteChecked"><b>Hapus</b></p>
                    </div>
                    <div class="row g-0 mt-3">
                        <template v-for="data in items">
                            <div class="col-md-2 border-bottom border-5 border-light mt-2">
                                <input type="checkbox" v-model="selected" :value="data.idKeranjangDetail">
                            </div>
                            <div class="col-md-8 border-bottom border-5 mt-2 border-light container">
                                <p>
                                    <b>{{ data.produk.namaProduk }}</b> <br> {{ data.produk.hargaProduk }}
                                </p>
                            </div>
                            <div class="col-md-2 border-bottom border-5 border-light mt-2">
                                <P class="text-primary"
                                    @click="$redirect({ name: 'Detail Produk', params: { id: data.produk.kodeProduk } })">
                                    Lihat
                                    Produk</P>
                            </div>
                            <div class="d-flex justify-content-end">
                                <p class="px-5">
                                    <i class="fas fa-trash text-danger" @click="deleteOne(data.idKeranjangDetail)"></i>
                                </p>
                                <p></p>
                                <div>
                                    <i class="fas fa-minus text-success" @click="decrementQty(data.idKeranjangDetail)"></i>
                                    <span class="ms-2 me-2">{{ data.qty }}</span>
                                    <i class="fas fa-plus text-success" :class="{ 'disabled': data.qty === 1 }"
                                        @click="incrementQty(data.idKeranjangDetail)"></i>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 pt-3 sticky-top">
                    <div class="card shadow-lg border-0">
                        <div class="card-header">
                            <b>Ringkasan Belanja</b>
                        </div>
                        <div class="card-body">
                            <div class="card-text border-bottom pb-2">
                                <b>Total Harga: </b>
                            </div>
                            <div class="card-text pt-2 pb-2">
                                <b>Total Harga:</b>
                            </div>
                        </div>
                        <div class="card-footer">
                            <ButtonComponent Color="btn-success" Label="Beli Sekarang" class="text-center w-100" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div>
                nampaknya kamu belum masukkin produk nihhhhh
            </div>
        </template>
    </div>
</template>
  
<script>
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue'
export default {
    data() {
        return {
            items: [],
            produk_id: '',
            idKeranjangDetail: '',
            isLoading: false,
            selected: []
        }
    },
    computed: {
        hasProduk() {
            return this.items.length > 0
        }
    },
    methods: {
        getDetailCheckout() {
            let type = "getData"
            let url = [
                "keranjang/KRNJG-20230718154108", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.items = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        incrementQty(idKeranjangDetail) {
            let type = "putData"
            let url = [
                `detail_keranjang/tambah/${idKeranjangDetail}`, {},
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.getDetailCheckout()
            }).catch((err) => {
                console.log(err);
            })
        },
        decrementQty(idKeranjangDetail) {
            let type = "putData"
            let url = [
                `detail_keranjang/kurang/${idKeranjangDetail}`, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.getDetailCheckout()
            }).catch((err) => {
                console.log(err);
            })
        },
        deleteOne(idKeranjangDetail) {
            let type = "deleteData";
            let url = [
                `detail_keranjang`, idKeranjangDetail, {}
            ];
            this.$swal({
                icon: 'question',
                title: "Apakah kamu ingin menghapus produk ini dari keranjang?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch(type, url)
                        .then((result) => {
                            this.$swal({
                                icon: 'success',
                                title: 'Berhasil hapus data keranjang'
                            });
                            this.getDetailCheckout();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
        },
        deleteChecked() {
            if (this.selected.length === 0) {
                return;
            }
            let type = "deleteData";
            let urls = this.selected.map((idKeranjangDetail) => ["detail_keranjang", idKeranjangDetail]);
            this.$swal({
                icon: 'question',
                title: "Apakah kamu ingin menghapus produk ini dari keranjang?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Ya, Hapus",
                denyButtonText: "Jangan Hapus"
            }).then((results) => {
                if (results.isConfirmed) {
                    Promise.all(urls.map((url) => this.$store.dispatch(type, url)))
                    this.$swal({
                        icon: 'success',
                        text: 'data berhasil dihapus'
                    })
                    this.getDetailCheckout();
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            this.selected = [];
        },

    },
    created() {
        this.getDetailCheckout()
    },
    components: {
        LoadingComponent, ButtonComponent, SkeletonLoading
    }

}
</script>
  
<style></style>
  