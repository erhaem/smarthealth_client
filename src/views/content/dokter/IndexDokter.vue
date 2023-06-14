<template>
    <div class="container col-xl-10 col-xxl-12 px-4 py-2">
        <div class="row align-items-top g-lg-5 py-2">
            <div class="col-lg-5 text-center" data-aos="fade-right" data-aos-duration="500">
                <div class="header">
                    <p class="fw-bold lh-1 mb-3">Chat Dokter dengan Berobat+</p>
                    <p class="col-lg-12 fs-5 text-secondary">Layanan telemedisin yang siap siaga untuk bantu kamu hidup
                        lebih
                        sehat</p>
                </div>
                <div id="carouselExampleCaptions" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../../../assets/images/hero-bg.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="../../../assets/images/hero-bg.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="../../../assets/images/hero-bg.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="body py-4">
                    <p class="fw-bold lh-1 mb-3">Mengapa chat di berobat+ ?</p>
                    <BodyDetailDokter />
                </div>
            </div>
            <div class="col-md-10 mx-auto col-lg-7 overflow-auto" data-aos="fade-up" data-aos-duration="500"
                style="overflow-y: auto; max-height: 600px">
                <div class="d-flex justify-content-between sticky-top"  v-if="$route.name !== 'Detail Dokter'">
                    <InputField placeholder="cari dokter, spesialis, atau gejala" v-model="search" class="me-2 p-sm-2" />
                </div>
                <router-view :valueSearch="valueSearch"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue';
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
import BodyDetailDokter from '@/components/BodyDetailDokter.vue';
import { debounce } from 'lodash';

export default {
    data() {
        return {
            search: '',
            dokterLimit: 4,
            specialistLimit: 12,
            isLoading: false,
            isSearching: false,
            valueSearch: []
        }
    },
    components: {
        HeaderComponent,
        FooterComponent,
        SkeletonLoading,
        BodyDetailDokter,
        LoadingComponent,
        InputField
    },
    watch: {
        search: debounce(function (val) {
            if (val !== '') {
                this.$router.push({
                    path: '/chat-dokter/cari',
                    query: { search: val }
                });
                this.searchKeahlian();
            } else {
                if (this.$route.path === '/chat-dokter/cari') {
                    this.$router.replace({ query: null });
                } else {
                    this.$router.push('/chat-dokter/dokter');
                }
            }
        }, 1000),
    },
    methods: {
        searchKeahlian() {
            if (this.isLoading) return; // Prevent concurrent API requests
            this.isLoading = true;

            let type = "postData";
            let url = [
                "master/cari/keahlian",
                { nama_keahlian: this.search,
                 },
                {}
            ];

            this.$store.dispatch(type, url)
                .then((result) => {
                    console.log(result);
                    this.isLoading = false;
                    this.valueSearch = result.data
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                });
        }
    }
}
</script>

<style>
.section-bg {
    background-color: #f1f7fd;
}
</style>