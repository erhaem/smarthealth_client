<template>
    <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32">
                    <use xlink:href="#bootstrap" />
                </svg>
                <span class="fs-4">Berobat+.</span>
            </a>
            <ul class="nav nav-pills">
                <li class="nav-item"><b><a href="/" class="nav-link" aria-current="page">Beranda</a></b></li>
                <li class="nav-item"><b><a href="#" class="nav-link">Artikel</a></b></li>
                <li class="nav-item"><b><a href="#" class="nav-link">Aplikasi</a></b></li>
                <li class="nav-item"><b><a href="#" class="nav-link">Riwayat</a></b></li>
                <li class="nav-item"><b><router-link class="nav-link" to="/register">Registrasi</router-link></b></li>
            </ul>
        </header>
    </div>
    <div class="b-example-divider"></div>
</template>