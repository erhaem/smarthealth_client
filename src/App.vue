<template>
  <HeaderComponent />
  <router-view></router-view>
  <FooterComponent />
</template>

<script>
import Cookies from 'js-cookie'
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'
export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      let type = "getData"
      let url = [
        "create-api", {}
      ]
      this.isLoading = true
      this.$store.dispatch(type, url).then((result) => {
        if (Cookies.get("user") != undefined) {
          Cookies.set("user", Cookies.get("user"))
        } else {
          if (Cookies.get("token") == undefined) {
            Cookies.set("token", result.token);
          }
        }
        this.users = Cookies.get("token");
        setTimeout(() => {
          this.isLoading = false
        }, 1000);
      }).catch((err) => {
        console.log(err);
      })
    },
  },
}
</script>
