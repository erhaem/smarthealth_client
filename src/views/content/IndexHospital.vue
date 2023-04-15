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
    <div class="container col-xxl-10">
        <div class="row justify-content-start">
            <div class="col-8">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div class="col" v-for="(hospital, idRumahSakit) in hospitals" :key="hospital.idRumahSakit">
                        <SkeletonLoading v-if="isLoading" />
                        <div class="card" v-if="!isLoading">
                            <div class="embed-responsive embed-responsive-16by9">
                                <img src="../../assets/images/rs.jpg" class="card-img-top" alt="...">
                            </div>
                            <div class="card-body">
                                <p class="card-text">{{ hospital.namaRs }}</p>
                                <p class="card-text">{{ hospital.deskripsiRs }}</p>
                                <router-link :to="{ name: 'UserInfo', params: { userIndex: hospital.idRumahSakit } }">Home</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="d-flex justify-content-between px-3 py-2 mb-0">
                        <p><i class="fas fa-location me-2"></i>Lokasi</p>
                        <p class="text-danger">Ubah Lokasi</p>
                    </div>
                    <div class="px-3 pb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Semua lokasi
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Terdekat
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardArtikel from '../../components/CardArtikel.vue'
import SkeletonLoading from '@/components/SkeletonLoading.vue';
export default {
    data() {
        return {
            hospitals: [],
            isLoading: false
        }
    },
    components: {
        CardArtikel, SkeletonLoading
    },
    created() {
        this.getHospital()
    },
    methods: {
        getHospital() {
            let type = "getData"
            let url = [
                "master/rumah_sakit/data", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
                this.hospitals = result.data
                setTimeout(() => {
                    this.isLoading = false
                }, 2000);
            }).catch((err) => {
                console.log(err);
            })
        }
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