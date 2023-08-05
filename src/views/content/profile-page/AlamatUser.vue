<template>
    <div class="container py-5">
        <h5><b>Daftar Alamat Pengiriman</b></h5>
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <div class="input-group mb-3">
                    <span class="input-group-text border-0 bg-warning" id="search-addon">
                        <i class="fas fa-magnifying-glass text-light"></i>
                    </span>
                    <input type="search" class="form-control rounded p-2" placeholder="Cari alamat atau nama penerima" />
                </div>
                <template v-if="isLoading">
                    <SkeletonLoading />
                </template>
                <template v-else-if="!alamat.length">
                    <div class="mt-3 text-center">
                        <div class="alert mb-0 alert-info">
                            <p>
                                Kamu belum nambahin alamat pengiriman nihh
                            </p>
                        </div>
                        <img src="../../../assets/images/alamatnotfound.gif" style="width: 70%; height: 70%" alt="">
                    </div>
                </template>
                <div v-else v-for="(data, index) in alamat" :key="index">
                    <div class="card shadow mb-2">
                        <div class="card-body">
                            <p>
                                <b> {{ profil.user.nama }} </b> <span class="bg-primary rounded pe-2 ps-2 text-light">{{
                                    data.simpanSebagai }}</span> <br> {{ profil.user.nomorHp }} <br> {{ data.lokasi }} <br>
                                note: {{
                                    data.detail }}
                            </p>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-danger btn-sm" @click="hapusAlamat(data.idAlamat)">
                                    <i class="fas fa-trash">
                                    </i>
                                    hapus alamat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <div class="card shadow">
                    <div class="card-body">
                        <l-map :zoom="zoom" :center="mapCenter" class="rounded" style="height:350px; width: 100%">
                            <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
                            <l-marker v-if="selectedPosition" :lat-lng="selectedPosition" :draggable="true"
                                @dragend="handleMarkerDrag"></l-marker>
                        </l-map>
                        <label class="mt-2"><b>Label Alamat</b></label>
                        <input type="text" class="form-control" placeholder="ex: Rumah" v-model="form.simpan_sebagai">
                        <label class="mt-2"><b>Detail Lokasi</b></label>
                        <textarea class="form-control" rows="4" disabled :value="locationName"></textarea>
                        <label class="mt-2"><b>Catatan untuk Kurir</b></label>
                        <textarea class="form-control" rows="4" placeholder="ex: taro di depan pintu"
                            v-model="form.detail"></textarea>
                        <div class="d-flex justify-content-between mt-3">
                            <div>
                                <p class="mb-0 text-dark"><b>Pakai metode lain?</b></p>
                                <p class="text-secondary"><small><b>Tambahkan Alamat secara Manual</b></small></p>
                            </div>
                            <div class="mt-4">
                                <button class="btn btn-sm btn-success" @click="postAlamat">Simpan Alamat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import InputField from '@/components/partials-component/InputField.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
export default {
    data() {
        return {
            alamat: [],
            zoom: 15,
            tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            selectedPosition: null,
            locationName: null,
            form: {
                simpan_sebagai: 'Rumah',
                lokasi: '',
                detail: 'Taro di depan aja'
            },
            profil: {},
            isLoading: false
        }
    },
    mounted() {
        this.geolocate(),
            this.getAlamat(),
            this.getProfil()
    },
    methods: {
        hapusAlamat(idAlamat) {
            let type = "deleteData"
            let url = [
                "master/alamat_user", idAlamat, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.$swal({
                    icon: 'success',
                    title: 'Alamat Berhasil Dihapus'
                })
                this.getAlamat()
            }).catch((err) => {
                console.log(err);
            })
        },
        geolocate() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        this.fetchLocationDetails(latitude, longitude);
                    },
                    error => {
                        console.error('Error occurred while retrieving current location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        },
        handleMarkerDrag(e) {
            if (e && e.target) {
                const latitude = e.target._latlng.lat;
                const longitude = e.target._latlng.lng;
                this.selectedPosition = [latitude, longitude];
                this.fetchLocationDetails(latitude, longitude);
            }
        },
        fetchLocationDetails(latitude, longitude) {
            axios
                .get('https://nominatim.openstreetmap.org/reverse', {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        format: 'jsonv2',
                    },
                })
                .then(response => {
                    this.locationName = response.data.display_name;
                    this.selectedPosition = [response.data.lat, response.data.lon];
                })
                .catch(error => {
                    console.error('Error occurred while fetching location details:', error);
                });
        },
        getAlamat() {
            let type = "getData"
            let url = [
                "master/alamat_user", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.alamat = result.data
                this.isLoading = false
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
        postAlamat() {
            let type = "postData"
            let url = [
                "master/alamat_user", {
                    simpan_sebagai: this.form.simpan_sebagai,
                    lokasi: this.locationName,
                    detail: this.form.detail
                }, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.$swal({
                    icon: 'success',
                    title: 'berhasil menambahkan alamat'
                }).then(() => {
                    window.location.reload()
                })
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    components: {
        LMap, LTileLayer, LMarker, SkeletonLoading, InputField
    },
    computed: {
        mapCenter() {
            return this.selectedPosition || [0, 0];
        },
    }
}
</script>