<template>
    <div class="container">
        <div class="d-flex justify-content-between">
            <h6 class="font-weight-bold text-primary">{{ $route.name }}</h6>
            <p v-if="hasLocation">
                <i class="fa fa-map-marker text-danger"></i>
                {{ locationName.address.village }}, {{ locationName.address.county }}, {{ locationName.address.state }}
            </p>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="row">
                    <template v-for="data in nearestResults" :key="data.id">
                        <div class="col-sm-6 mb-3 mb-sm-3">
                            <div class="card shadow rounded border-0">
                                <div class="card-body">
                                    <img src="../../../assets/images/bg.png" class="img-fluid rounded mb-2" alt="">
                                    <h5 class="card-title">{{ data.namaRs }}</h5>
                                    <p class="card-text">{{ data.deskripsiRs }}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="col-6">
                <div v-if="latitude !== null && longitude !== null" style="height: 400px; width: 650px">
                    <l-map ref="map" :zoom="zoom" :center="[latitude, longitude]" :bounds="bounds">
                        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" :layer-type="base"
                            name="OpenStreetMap"></l-tile-layer>
                        <l-marker :lat-lng="[latitude, longitude]" :icon="customIcon"></l-marker>
                        <div v-for="result in nearestResults" :key="result.id">
                            <l-marker :lat-lng="[result.latitude, result.longitude]">
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
                    </l-map>
                </div>
            </div>
        </div>
        <button class="btn btn-sm btn-primary">
            lihat selanjutnya
        </button>
    </div>
</template>
  
<script>
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import iconMarker from '../../../assets/images/maps.png'
export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
    },
    data() {
        return {
            latitude: null,
            longitude: null,
            nearestResults: [],
            zoom: 15,
            locationName: null,
            bounds: null,
            popupOptions: {
                maxWidth: 200, 
            },
            customIcon: null,
        };
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
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 2000);
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
                    console.log('Location:', address);
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
        },
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

  