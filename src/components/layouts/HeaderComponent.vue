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
        <li v-if="!isAuthenticated" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <b>Registrasi</b>
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link to="/register" class="dropdown-item" href="#">Konsumen</router-link></li>
            <li><router-link to="/register-dokter" class="dropdown-item" href="#">Dokter</router-link></li>
          </ul>
        </li>
        <div v-else>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <b>Profil</b>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link to="/profil" class="dropdown-item">Akun</router-link></li>
              <li><router-link to="/account" class="dropdown-item" href="#">Pengaturan</router-link></li>
              <li @click="logout" class="dropdown-item">Logout</li>
            </ul>
          </li>
        </div>
        <div v-if="!isAuthenticated">
          <li class="nav-item"><b><router-link to="/login-user" class="nav-link">Login</router-link></b></li>
        </div>
        <div v-else>
        </div>
      </ul>
    </header>
  </div>
  <div class="b-example-divider"></div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  computed:{
    isAuthenticated(){
      return Cookies.get('user') != null
    },
    user() {
      return JSON.parse(Cookies.get('user'));
    },
  },
  methods: {
    logout(){
      let type = "getData"
      let url = [
        "logout", {}
      ]
      this.$store.dispatch(type, url).then((result)=>{
        Cookies.remove('token')
        Cookies.remove('user')
        window.location.replace('/')
      }).catch((err)=>{
        console.log(err);
      })
    },
  },
}
</script>