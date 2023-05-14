<template>
  <HeaderComponent />
  <router-view></router-view>
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'
export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>
