<template>
    <div class="container col-xxl-6 px-3 py-3">
        <div class="d-flex justify-content-center">
            <div class="col-lg-8">
                <div class="input-group mb-3">
                    <span class="input-group-text border-0" id="search-addon"><i class="fas fa-magnifying-glass"></i></span>
                    <input type="search" class="form-control rounded" placeholder="Cari nama rumah sakit atau poliklinik" />
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="d-flex justify-content-between">
            <div class="col-lg-6">
                <p><i class="fa-solid fa-hospital text-danger"></i>
                    Daftar Rumah Sakit Terdekat
                    </p>
            </div>
            <div class="col-lg-6 text-end">
                <p><i class="fa-solid fa-location-dot text-danger"></i>
                    {{ latitude }}, {{ longitude }}
                    </p>
            </div>
        </div>
    </div>
    <div class="container col-xxl-12">
        <div class="d-flex justify-content-center">
            <div class="col-12 py-2 px-2">
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    <div class="col" v-for="data in nearestResults" :key="data.idRumahSakit">
                        <template v-if="isLoading">
                            <SkeletonLoading/>
                        </template>
                        <div v-else class="card shadow border-0" v-if="!isLoading">
                            <div class="embed-responsive embed-responsive-16by9">
                                <img src="../../../assets/images/9.png" class="card-img-top" alt="...">
                            </div>
                            <div class="card-body" @click="$redirect('/detail_rumah_sakit/' + data.idRumahSakit)">
                                <p class="mb-0">{{ data.namaRs }}</p>
                                <div class="text-secondary">
                                    <p class="mb-0"><small>{{ data.alamatRs }}</small></p>
                                    <div class="d-flex justify-content-end">
                                        <p class="mt-2 mb-0"><small><i
                                                    class="fa-solid fa-location-dot text-danger me-1"></i>{{ data.jarak }}
                                                km</small></p>
                                    </div>
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
import CardArtikel from '@/components/card/CardArtikel.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
export default {
    data() {
        return {
            nearestResults: [],
            isLoading: false,
            latitude: null,
            longitude: null,
            locationName: ''
        }
    },
    components: {
        CardArtikel, SkeletonLoading
    },
    mounted() {
        this.getLocation()
    },
    methods: {
        getNeareset() {
            let type = "postData"
            let url = [
                "master/rumah_sakit/data/find_nearest", {
                    latitude: this.latitude,
                    longitude: this.longitude
                }
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                setTimeout(() => {
                this.isLoading = false
                }, 2000);
                this.nearestResults = result.data
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
                        console.log(this.latitude);
                        console.log(this.longitude);
                    },
                    error => {
                        console.error(error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        },
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