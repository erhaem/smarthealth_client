<template>
    <div class="container-fluid p-lg-4 bg-primary">
        <div class="container col-xxl-10 col-md-6">
            <router-link style="text-decoration: none" to="/">
                <p class="text-light">
                    Home
                    /
                    <router-link to="/produk-obat" class="text-light" style="text-decoration: none">
                        {{ $route.name }}
                    </router-link>
                </p>
            </router-link>
            <div class="d-flex justify-content-between">
                <div class="text-light mb-3 d-none d-sm-block">
                    <h3>
                        Rumah sakit dan Apotek terdekat
                    </h3>
                    <h4>
                        Pelayanan medis yang akurat
                    </h4>
                </div>
                <div class="text-light mb-3 mt-2">
                    <h6 class="text-end">
                        Alamat saya:
                    </h6>
                    <div class="rounded text-center px-3" style="background-color: navy;">
                        <p v-if="hasLocation">
                            <i class="fa fa-location-dot text-danger"></i>
                            {{ locationName.address.village }}, {{ locationName.address.county }}, {{
                                locationName.address.state }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-start pb-2">
                <div class="col-12 col-md-6">
                    <div class="input-group">
                        <span class="input-group-text border-0 bg-warning" id="search-addon"><i
                                class="fas fa-magnifying-glass text-light"></i></span>
                        <input type="search" class="form-control rounded p-2"
                            placeholder="Cari nama rumah sakit atau apotek" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container pt-3">
        <div class="row">
            <div class="col-6 col-md-6 py-3">
                <h4 class="text-secondary">
                    <b>
                        <small>Berikut adalah rumah sakit terdekat denganmu:</small>
                    </b>
                </h4>
                <div class="row overflow-auto" style="max-height: 500px">
                    <template v-for="data in nearestResults" :key="data.id">
                        <div class="col-sm-6 mb-3 mb-sm-3">
                            <div v-if="isLoading">
                                <SkeletonLoading />
                            </div>
                            <div v-if="!isLoading" class="card shadow rounded border-0">
                                <div class="card-body" @click="$redirect('detail_rumah_sakit/' + data.idRumahSakit)">
                                    <img src="../../../../assets/images/rs.jpg" class="img-fluid rounded mb-2" alt="">
                                    <h5 class="card-title mb-0">{{ data.namaRs }}</h5>
                                    <p class="text-secondary mb-0">{{ data.deskripsiRs }}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-for="data in apotekResult" :key="data.id">
                        <div v-if="isLoading">
                            <SkeletonLoading />
                        </div>
                        <div v-else class="col-sm-6 mb-3 mb-sm-3">
                            <div class="card shadow rounded border-0">
                                <div class="card-body" @click="$redirect('detail_rumah_sakit/' + data.idProfilApotek)">
                                    <img src="../../../../assets/images/rs.jpg" class="img-fluid rounded mb-2" alt="">
                                    <h5 class="card-title mb-0">{{ data.namaApotek }}</h5>
                                    <!-- <p class="text-secondary mb-0">{{ data.deskripsiRs }}</p> -->
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="col-6 col-md-6 mt-5">
                <div v-if="latitude !== null && longitude !== null" style="height: 450px; width: 650px">
                    <l-map ref="map" :zoom="zoom" :center="[latitude, longitude]" :bounds="bounds" class="rounded">
                        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            name="OpenStreetMap"></l-tile-layer>
                        <l-marker :lat-lng="[latitude, longitude]"></l-marker>
                        <div v-for="result in nearestResults" :key="result.id">
                            <l-marker :lat-lng="[result.latitude, result.longitude]" :icon="hospitalIcon">
                                <l-popup :options="popupOptions">
                                    <template v-slot:default>
                                        <div class="custom-popup">
                                            <p class="mb-0">{{ result.namaRs }}</p>
                                            <div v-if="hasLocation">
                                                <p>{{ Math.floor(result.distance) }} km dari {{ locationName.address.village
                                                }}</p>
                                            </div>
                                        </div>
                                    </template>
                                </l-popup>
                            </l-marker>
                        </div>
                        <div v-for="data in apotekResult" :key="data.id">
                            <l-marker :lat-lng="[data.latitude, data.longitude]" :icon="apotekIcon">
                                <l-popup :options="popupOptions">
                                    <template v-slot:default>
                                        <div class="custom-popup">
                                            <p class="mb-0">{{ data.namaApotek }}</p>
                                            <div v-if="hasLocation">
                                                <p>{{ Math.floor(data.distance) }} km dari {{ locationName.address.village
                                                }}</p>
                                            </div>
                                        </div>
                                    </template>
                                </l-popup>
                            </l-marker>
                        </div>
                    </l-map>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import InputField from '@/components/partials-component/InputField.vue';
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import iconMarker from '../../../../assets/images/maps.png'
import hospitalMarker from '../../../../assets/images/hospital-marker.png'
import apotekMarker from '../../../../assets/images/apotekmarker.png'
export default {
    data() {
        return {
            latitude: null,
            longitude: null,
            apotekResult: [],
            nearestResults: [],
            zoom: 15,
            locationName: null,
            bounds: null,
            popupOptions: {
                maxWidth: 200,
            },
            customIcon: null,
            hospitalIcon: null,
            apotekIcon: null,
            isLoading: false,
        };
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        SkeletonLoading,
        InputField
    },
    mounted() {
        this.getCurrentLocation();
        this.createCustomIcon()
    },
    computed: {
        hasLocation() {
            return this.locationName && this.locationName.address;
        },
    },
    methods: {
        getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        this.getNearest();
                        this.getApotek()
                        this.fetchLocationDetails();
                    },
                    error => {
                        console.error('Error occurred while retrieving current location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        },
        getNearest() {
            let type = 'postData';
            let url = ['master/rumah_sakit/data/find_nearest', {
                latitude: this.latitude,
                longitude: this.longitude,
            }];
            this.isLoading = true;
            this.$store
                .dispatch(type, url)
                .then(result => {
                    this.isLoading = false;
                    this.nearestResults = result.data;
                    this.calculateBounds();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        fetchLocationDetails() {
            axios
                .get('https://nominatim.openstreetmap.org/reverse', {
                    params: {
                        lat: this.latitude,
                        lon: this.longitude,
                        format: 'jsonv2',
                    },
                })
                .then(response => {
                    // Extract the desired location details from the response
                    this.locationName = response.data;
                    const { address } = response.data;
                })
                .catch(error => {
                    console.error('Error occurred while fetching location details:', error);
                });
        },
        calculateBounds() {
            if (this.nearestResults.length === 0) {
                this.bounds = null;
                return;
            }

            const minLat = Math.min(...this.nearestResults.map(result => result.latitude));
            const maxLat = Math.max(...this.nearestResults.map(result => result.latitude));
            const minLng = Math.min(...this.nearestResults.map(result => result.longitude));
            const maxLng = Math.max(...this.nearestResults.map(result => result.longitude));

            this.bounds = [[minLat, minLng], [maxLat, maxLng]];
        },
        createCustomIcon() {
            // Create a custom icon with the desired color
            this.customIcon = L.icon({
                iconUrl: iconMarker, // Path to the custom marker icon image
                iconSize: [40, 45], // Size of the icon image
            });
            this.hospitalIcon = L.icon({
                iconUrl: hospitalMarker,
                iconSize: [40, 45]
            })
            this.apotekIcon = L.icon({
                iconUrl: apotekMarker,
                iconSize: [40, 45]
            })
        },
        getApotek() {
            let type = "postData"
            let url = [
                "apotek/pengaturan/profil_apotek/find_nearest", {
                    latitude: this.latitude,
                    longitude: this.longitude,
                }
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.apotekResult = result.data
                setTimeout(() => {
                   this.isLoading = false 
                }, 3000);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
};
</script>
  
<style>
.leaflet-container {
    height: 100%;
    width: 100%;
}

.custom-popup {
    max-width: 200px;
}
</style>

  