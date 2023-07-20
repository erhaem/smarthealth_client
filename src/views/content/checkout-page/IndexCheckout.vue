<template>
    <div class="container">
        <template v-if="hasProduk">
            <div class="row p-lg-4">
                <h5 class="mb-3"><b>Checkout</b></h5>
                <div class="col-lg-9 col-md-12">
                    <div class="border-bottom w-100 mb-1">
                        <h6><b>Alamat Pengiriman</b></h6>
                    </div>
                    <div class="border-bottom w-100 mb-1">
                        <P>{{ profil.user.nama }} ({{ selectedAddressData.simpanSebagai }}) <br> {{ profil.user.nomorHp }}
                            <br> <small class="text-secondary">
                                <div v-if="selectedAddressData">
                                    <p>
                                        {{ selectedAddressData.lokasi }}
                                        <br />
                                        Note: {{ selectedAddressData.detail }}
                                    </p>
                                </div>
                            </small>
                        </P>
                    </div>
                    <div class="border-bottom w-100 mb-1 p-2">
                        <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal"
                            data-bs-target="#tambahData">
                            ganti alamat
                        </button>
                    </div>
                    <div class="row g-0 mt-2">
                        <template v-for="(data, index) in detail" :key="index">
                            <div class="col-md-10 border-bottom border-5 mt-2 border-light container">
                                <P><b>Pesanan {{ index + 1 }}</b></P>
                                <p>
                                    <b>Apotek Arjawinangun</b> <br> <b class="text-secondary">{{ data.produk.namaProduk
                                    }}</b> <br> <small> {{ data.qty }} produk | {{ data.produk.hargaProduk }}</small>
                                </p>
                            </div>
                            <div class="col-md-2 border-bottom border-5 border-light mt-2">
                            </div>
                            <div class="d-flex justify-content-between px-2">
                                <h6>Subtotal</h6>
                                <h6><b>{{ data.jumlahHarga }}</b></h6>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="col-lg-3 col-md-12">
                    <div class="sticky-top">
                        <div class="card shadow-lg border-0">
                            <div class="card-header">
                                <b>Ringkasan Belanja</b>
                            </div>
                            <div class="card-body">
                                <div class="card-text border-bottom pb-2 text-secondary">
                                    <p class="mb-0">
                                        <small>Total Harga: {{ items.jumlahHarga }} </small>
                                    </p>
                                    <p class="mb-0">
                                        <small>Total Diskon Barang: {{ items.jumlahHarga }} </small>
                                    </p>
                                </div>
                                <p class="mb-0 mt-2">
                                    <b>Total Harga: {{ items.jumlahHarga }} </b>
                                </p>
                            </div>
                            <div class="card-footer text-center">
                                <button @click="$redirect({ name: 'Checkout' })" :class="'btn btn-sm w-100 btn-dark'"
                                    :disabled="selected.length === 0">
                                    Beli Sekarang ({{ calculateProduct() }})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="row p-3 justify-content-center">
                <div class="col-md-8">
                    <p>nampaknya kamu belum masukkin produk nihhhhh</p>
                </div>
            </div>
        </template>
    </div>
    <ModalComponent id="tambahData" labelBy="exampleModalLabel" :modalTitle="'Pilih Alamat Pengiriman'">
        <template #modal>
            <button class="btn rounded btn-outline-success mb-2 text-center w-100">Tambah Alamat Baru</button>
            <div v-for="(data, index) in alamat" :key="index">
                <div :class="['card shadow mb-2', { 'border-primary': data.clicked }]" @click="aksi(data, index)">
                    <div class="card-body">
                        <p>
                            <b> {{ profil.user.nama }} </b> <span class="bg-primary rounded pe-2 ps-2 text-light">{{
                                data.simpanSebagai }}</span> <br> {{ profil.user.nomorHp }} <br> {{ data.lokasi }} <br>
                            note: {{
                                data.detail }}
                        </p>
                    </div>
                </div>
            </div>
            <button class="btn btn-success btn-sm rounded mb-2 text-center w-25"
                @click="saveAlamatToCookies">Simpan</button>
        </template>
    </ModalComponent>
</template>
  
<script>
import Cookies from 'js-cookie'
import axios from 'axios';
import InputField from '@/components/partials-component/InputField.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue'
export default {
    data() {
        return {
            items: {},
            produk_id: '',
            idKeranjangDetail: '',
            isLoading: false,
            selected: [],
            detail: [],
            isSelected: [],
            dataProduk: [],
            produk_id: '',
            profil: {},
            alamat: [],
            provinsi: [],
            kota: [],
            kecamatan: [],
            kelurahan: [],
            selectedKota: null,
            selectedProvinsi: null,
            selectedKecamatan: null,
            selectedKelurahan: null,
            selectedIndex: null
        }
    },
    computed: {
        hasProduk() {
            return this.detail.length > 0
        },
        idDetail() {
            return this.items.idKeranjang
        },
        isKotaDisabled() {
            return !this.selectedProvinsi;
        },
        isKecamatanDisabled() {
            return !this.selectedKota
        },
        isKelurahanDisabled() {
            return !this.selectedKecamatan
        },
        selectedLocations() {
            const selectedProvinsiName = this.getSelectedName(this.selectedProvinsi, this.provinsi);
            const selectedKotaName = this.getSelectedName(this.selectedKota, this.kota);
            const selectedKecamatanName = this.getSelectedName(this.selectedKecamatan, this.kecamatan);
            const selectedKelurahanName = this.getSelectedName(this.selectedKelurahan, this.kelurahan);

            return `${selectedProvinsiName}, ${selectedKotaName}, ${selectedKecamatanName}, ${selectedKelurahanName}`;
        },
        selectedAddressData() {
            const selectedAddressJson = Cookies.get('selectedAddress');
            return selectedAddressJson ? JSON.parse(selectedAddressJson) : null;
        },
    },
    methods: {
        saveAlamatToCookies() {
            const selectedAddress = this.alamat.find((data) => data.clicked === true);

            if (selectedAddress) {
                const selectedAddressJson = JSON.stringify(selectedAddress);

                Cookies.set('selectedAddress', selectedAddressJson);
                this.selectedAddressData = selectedAddress; // Update the data property
                this.$swal({
                    icon: 'success',
                    title: 'Berhasil menyimpan perubahan alamat',
                }).then(() => {
                    window.location.reload(); // Refresh the page after clicking "OK"
                });
            } else {
                Cookies.remove('selectedAddress');
                this.selectedAddressData = null; // Update the data property
            }
        },
        aksi(data, index) {
            if (this.selectedIndex === index) {
                return;
            }
            if (this.selectedIndex !== null) {
                this.alamat[this.selectedIndex].clicked = false;
            }

            data.clicked = true;
            this.selectedIndex = index;
        },
        calculateProduct() {
            let totalPrice = 0;
            for (const data of this.detail) {
                if (this.selected.includes(data.idKeranjangDetail)) {
                    totalPrice += data.qty;
                }
            }
            return totalPrice;
        },
        getDetailCheckout() {
            let type = "getData"
            let url = [
                "keranjang", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.items = result.data
                this.getKeranjang()
            }).catch((err) => {
                console.log(err);
            })
        },
        getKeranjang() {
            let type = "getData"
            this.$store.dispatch(type, [
                `keranjang/${this.idDetail}`, []
            ]).then((result) => {
                this.isLoading = false
                this.detail = result.data
            }).catch((err) => {
                console.log(err);
            })
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
        },
        getProfil() {
            let type = "getData"
            let url = [
                "akun/profil/konsumen/profil", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.profil = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getAlamat() {
            let type = "getData"
            let url = [
                "master/alamat_user", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.alamat = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getSelectedName(selectedId, data) {
            if (!selectedId || !data) return ''; // Return an empty string if no data or ID is selected
            const selectedData = data.find(item => item.id === selectedId);
            return selectedData ? selectedData.nama : ''; // Return the name or an empty string if not found
        },
        getProvinsi() {
            axios({
                method: "get",
                url: "http://dev.farizdotid.com/api/daerahindonesia/provinsi"
            }).then((result) => {
                this.provinsi = result.data.provinsi
            })
        },
        showKabupaten() {
            const idProvinsi = this.selectedProvinsi;
            axios({
                method: "get",
                url: `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvinsi}`
            }).then((result) => {
                this.kota = result.data.kota_kabupaten
            })
        },
        showKecamatan() {
            const idKabupaten = this.selectedKota;
            axios({
                method: "get",
                url: `http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${idKabupaten}`
            }).then((result) => {
                this.kecamatan = result.data.kecamatan
            })
        },
        showKelurahan() {
            const idKecamatan = this.selectedKecamatan
            axios({
                method: "get",
                url: `http://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKecamatan}`
            }).then((result) => {
                this.kelurahan = result.data.kelurahan
                console.log(result);
            })
        },

    },
    mounted() {
        this.getDetailCheckout(),
            this.getProfil(),
            this.getAlamat(),
            this.getProvinsi()

    },
    components: {
        LoadingComponent, ButtonComponent, SkeletonLoading, ModalComponent, InputField
    },
    watch: {
        checked: {
            handler() {
                this.calculateProduct();
            },
            deep: true,
        },
    },


}
</script>
  
<style>
.clickable {
    pointer-events: none;
}
</style>
  