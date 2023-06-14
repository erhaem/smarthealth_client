<template>
    <div class="container py-3 mb-5">
      <h3 class="text-center mb-2">Registrasi Akun</h3>
      <p class="text-center text-secondary">Silahkan pilih ingin mendaftar akun sebagai apa?</p>
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title text-start">Konsumen</h5>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ipsum non dolor maximus suscipit.</p>
              <a href="#" class="btn btn-primary btn-sm btn-block">Register Now</a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title text-start">Perawat & Dokter</h5>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ipsum non dolor maximus suscipit.</p>
              <router-link to="/register-dokter">
                  <button class="btn btn-primary btn-sm btn-block">Register Now</button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title text-start">Owner Apotek</h5>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ipsum non dolor maximus suscipit.</p>
              <a href="#" class="btn btn-primary btn-sm btn-block">Register Now</a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title text-start">Owner Rumah Sakit</h5>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ipsum non dolor maximus suscipit.</p>
                <a href="#" class="btn btn-primary btn-sm btn-block">Register Now</a>
              </div>
            </div>
          </div>
      </div>
    </div>
  </template>
  
  <style>
  .card {
    margin-bottom: 30px;
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  
  .card-title {
    font-size: 20px;
    font-weight: bold;
  }
  
  .card-text {
    font-size: 14px;
    color: #888;
  }
  </style>
  