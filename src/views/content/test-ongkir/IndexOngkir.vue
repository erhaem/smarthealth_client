<template>
    <div class="container px-3 py-3">
        <Form @submit="cekHarga">
            <div class="form-group">
                <label for="">Berat Obat</label>
                <input type="text" class="form-control w-50 mt-2" v-model="form.weight">
                <label for="" class="mt-2">Jasa Pengiriman</label>
                <select class="form-select w-50" v-model="form.courier">
                    <option value="">pilih jasa pengiriman</option>
                    <option value="jne">JNE</option>
                    <option value="pos">POS</option>
                    <option value="tik">TIKI</option>
                </select>
                <label for="" class="mt-2">Pilih kota asal</label>
                <select class="form-select w-50" v-model="selectedProvinsi" @change="showKabupaten">
                    <option value="">pilih provinsi</option>
                    <option :value="data.idProvinsi" v-for="data in provinsi">{{ data.provinsi }}</option>
                </select>
                <br>
                <select class="form-select w-50 mb-3" :disabled="isKotaDisabled" v-model="selectedKota" id="kota"
                    placeholder="pilih kota">
                    <option value="" selected>pilih kota</option>
                    <option :value="data.idKota" v-for="data in kota">{{ data.namaKota }}</option>
                </select>



                <label for="">Pilih kota tujuan</label>
                <select class="form-select w-50" v-model="selectedProvinsiTujuan" @change="showKabupatenTujuan">
                    <option value="">pilih provinsi</option>
                    <option :value="data.idProvinsi" v-for="data in provinsiTujuan">{{ data.provinsi }}</option>
                </select>
                <br>
                <select class="form-select w-50 mb-3" :disabled="isKotaTujuanDisabled" v-model="selectedKotaTujuan"
                    id="kota" placeholder="pilih kota">
                    <option value="" selected>pilih kota</option>
                    <option :value="data.idKota" v-for="data in kotaTujuan">{{ data.namaKota }}</option>
                </select>
            </div>
            <button class="btn btn-sm btn-primary mt-3">cek ongkir</button>
        </Form>
    </div>
    <div class="container col-xxl-12">
        <div class="d-flex justify-content-center">
            <div class="col-12 py-2 px-2">
                <div v-if="isLoading">
                    <LoadingComponent/>
                </div>
                <div v-else>
                <div class="row row-cols-1 row-cols-md-4 g-4">
                        <div class="col" v-for="data in resultFoto">
                            <div class="card shadow rounded border-0 mb-3">
                                <div class="card-header">
                                    Hasil Pencarian
                                </div>
                                <div class="card-body">
                                    <p class="mb-0"><b><i>{{data.description}}</i> ({{data.service}})</b></p>
                                    <p class="mb-0">Rp. {{data.cost[0].value}}</p>
                                    <p class="mb-0">{{data.cost[0].etd}} hari</p>
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
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue';
import { Form } from 'vee-validate'
export default {
    data() {
        return {
            provinsi: [],
            kota: [],
            provinsiTujuan: [],
            kotaTujuan: [],
            resultFoto: [],
            selectedKota: null,
            selectedProvinsi: null,
            selectedKotaTujuan: null,
            selectedProvinsiTujuan: null,
            form: {
                city_destination: '',
                courier: '',
                weight: '',
                city_origin: ''
            },
            isLoading: false
        }
    },
    computed: {
        isKotaDisabled() {
            return !this.selectedProvinsi;
        },
        isKotaTujuanDisabled() {
            return !this.selectedProvinsiTujuan
        }
    },
    created() {
        this.getProvinsi()
    },
    methods: {
        getProvinsi() {
            let type = "getData"
            let url = [
                "master/raja_ongkir/get_provinsi", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.provinsi = result.data
                this.provinsiTujuan = result.data
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        },
        showKabupaten() {
            const idProvinsi = this.selectedProvinsi;
            const type = "getData";
            const url = [`master/raja_ongkir/get_kota/${idProvinsi}`, {}];
            this.$store
                .dispatch(type, url)
                .then((result) => {
                    this.kota = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        showKabupatenTujuan() {
            const idProvinsi = this.selectedProvinsiTujuan;
            const type = "getData";
            const url = [`master/raja_ongkir/get_kota/${idProvinsi}`, {}];
            this.$store
                .dispatch(type, url)
                .then((result) => {
                    this.kotaTujuan = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        cekHarga() {
            let type = "postData"
            let url = [
                "tes_ongkir", {
                    weight: this.form.weight,
                    courier: this.form.courier,
                    city_origin: this.selectedKota,
                    city_destination: this.selectedKotaTujuan
                }
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.resultFoto = result
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    components: {
        Form, LoadingComponent
    }
}
</script>