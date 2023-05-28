<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3">
      <router-link class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        :to="{ name: 'IndexHome' }">
        <span class="fs-4">Berobat+.</span>
      </router-link>
      <ul class="nav nav-pills">
        <NavItem>
          <template #router>
            <router-link to="/" class="nav-link">Beranda</router-link>
          </template>
        </NavItem>
        <NavItem>
          <template #router>
            <router-link :to="{ name: 'Halaman Artikel' }" class="nav-link">Artikel</router-link>
          </template>
        </NavItem>
        <NavItem>
          <template #router>
            <router-link :to="{ name: 'Download App' }" class="nav-link">Aplikasi</router-link>
          </template>
        </NavItem>
        <NavItem>
          <template #router>
            <router-link :to="{ name: 'Riwayat Konsumen' }" class="nav-link">Riwayat</router-link>
          </template>
        </NavItem>
        <li v-if="!isAuthenticated" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <b>Registrasi</b>
          </a>
          <DropdownItem>
            <template #item>
              <router-link to="/register" class="dropdown-item">Konsumen</router-link>
              <router-link to="/register-dokter" class="dropdown-item" href="#">Dokter</router-link>
            </template>
          </DropdownItem>
        </li>
        <div v-else>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <b>Profil</b>
            </a>
            <DropdownItem>
              <template #item>
                <router-link to="/profil" class="dropdown-item">Akun</router-link>
                <router-link to="/account" class="dropdown-item" href="#">Pengaturan</router-link>
                <li @click="logout" class="dropdown-item">Logout</li>
              </template>
          </DropdownItem>
          </li>
        </div>
        <div v-if="!isAuthenticated">
          <NavItem>
            <template #router>
              <router-link to="/login-user" class="nav-link">Login</router-link>
            </template>
          </NavItem>
        </div>
        <div v-else>
        </div>
        <div v-if="isAuthenticated && user.data.getRole.idRole === 'RO-2003064'">
            <NavItem>
              <template #router>
                <router-link to="/keranjang" class="nav-link">
                  <i class="fas fa-cart-shopping text-primary">
                    <span class="badge bg-primary">
                      {{ totalQuantity }}
                    </span>
                  </i>
                </router-link>
              </template>
            </NavItem>
        </div>
        <div v-else>
        </div>
      </ul>
    </header>
  </div>
  <div class="b-example-divider"></div>
</template>

<script>
import DropdownItem from '../header-components/DropdownItem.vue'
import NavItem from '../header-components/NavItem.vue'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      items: []
    }
  },
  computed: {
    isAuthenticated() {
      return Cookies.get('user') != null
    },
    user() {
      return JSON.parse(Cookies.get('user'));
    },
    totalQuantity() {
      if (!this.isAuthenticated || this.user.data.getRole.idRole !== 'RO-2003064') {
        return 0;
      }
      return this.items.reduce((total, item) => total + item.qty, 0);
    },
  },
  components: {
    NavItem, DropdownItem
  },
  mounted() {
    this.getItemsFromStorage()
  },
  methods: {
    logout() {
      let type = "getData"
      let url = [
        "logout", {}
      ]
      this.$store.dispatch(type, url).then((result) => {
        Cookies.remove('token')
        Cookies.remove('user')
        this.resetCart()
        window.location.replace('/')
      }).catch((err) => {
        console.log(err);
      })
    },
    resetCart() {
      this.cart = [];
      localStorage.removeItem('cart');
    },
    getItemsFromStorage() {
      const cartData = localStorage.getItem('cart');
      console.log(cartData)
      if (cartData) {
        this.items = JSON.parse(cartData);
      }
    }
  },
}
</script>