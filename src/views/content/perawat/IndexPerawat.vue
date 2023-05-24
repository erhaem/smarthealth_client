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
                            <img src="../../../assets/images/dokter.jpg" class="d-block w-100" alt="...">
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
                    <BodyDetailDokter />
                    <BodyDetailDokter />
                </div>
            </div>
            <div class="col-md-10 mx-auto col-lg-7 overflow-auto" data-aos="fade-up" data-aos-duration="500">
                <div class="text-start ms-2 ">
                    <p class="fs-4 mb-0"><b>Rekomendasi Perawat</b></p>
                    <p>Perawatan dengan perawat ahli
                    </p>
                </div>
                <div class="row row-cols-1 row-cols-md-2 g-3">
                    <div class="col" v-for="data in nurses">
                        <div class="card border-0">
                            <div class="row">
                                <div class="col-6 py-2">
                                    <img src="../../../assets/images/avaperawat.jpg" class="img-fluid rounded" alt="...">
                                </div>
                                <div class="col-6 py-3 px-3">
                                    <p class="mb-1" style="font-size: 14px;"><b>{{data.getUser.nama}}</b>
                                    </p>
                                    <p class="text-secondary text-sm mb-1" style="font-size: 12px;">Dokter Umum</p>
                                    <div class="d-flex justify-content-start text-primary">
                                        <p class="rounded mb-1 me-1" style="font-size: 10px;"><i
                                                class="ms-1 fa-solid fa-briefcase"></i> 1 tahun &nbsp;</p>
                                        <p class="rounded mb-1" style="font-size: 10px;"><i
                                                class="ms-1 fa-solid fa-thumbs-up"></i> 100% &nbsp;</p>
                                    </div>
                                    <p class="mb-1" style="font-size: 12px;">Rp. 30.000
                                    </p>
                                    <div class="pt-3">
                                        <button class="btn btn-sm btn-danger w-50" style="font-size: 12px;">Chat</button>
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
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
import BodyDetailDokter from '@/components/BodyDetailDokter.vue';
export default {
    data() {
        return {
            nurses: [],
            isLoading: false
        }
    },
    created() {
        this.getDokter()
    },
    components: {
        HeaderComponent, FooterComponent, SkeletonLoading, BodyDetailDokter
    },
    methods: {
        getDokter() {
            this.isLoading = true
            let type = "getData"
            let url = [
                "akun/perawat", {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.nurses = result.data
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>

<style>
.section-bg {
    background-color: #f1f7fd;
}
</style>