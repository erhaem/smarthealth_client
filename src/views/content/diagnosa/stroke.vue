<template>
    <div class="container-fluid p-lg-4 bg-primary" >
        <div class="container">
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
                       Dokter Spesialis dan Perawat Terbaikk
                    </h3>
                    <h4>
                        Pelayanan medis yang akurat
                    </h4>
                </div>
            </div>
            <div class="d-flex justify-content-start pb-2"></div>
        </div>
    </div>
    <div class="container">
        <div class="row align-items-top py-2">
            <div class="col-lg-4 col-md-6">
                <h4><b>BerobatPlus</b></h4>
                <p class="mb-0">
                    Berobatplus merupakan layanan kesehatan yang dapat diakses kapanpun dan di manapun. Beragam pelayanan kesehatan tersedia dalam satu aplikasi.
                </p>
                <img src="../../../assets/images/injury-rafiki.png" class="img-fluid animated" alt="">
                <ul>
                    <li>Cepat dan Mudah</li>
                    <li>Tersedia dokter dan perawat terbaik</li>
                    <li>Dokter spesialis yang professional</li>
                </ul>
            </div>
            <div class="col-md-6 col-lg-8" data-aos="fade-up" data-aos-duration="500"
                style="overflow-y: auto; max-height: 600px">
                <router-view :valueSearch="valueSearch"></router-view>
            </div>
        </div>
    </div>
</template>