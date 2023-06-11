<template>
    <section id="services" class="services">
      <div class="container">
        <h5>Topik Terkini</h5>
        <div class="d-flex justify-content-start">
          <div v-for="data in kategoriArtikel">
            <p class="me-2 rounded border px-3">
              {{ data.namaKategori }}
            </p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-4 col-lg-3 rounded" v-for="(item, index) in visibleData" :key="index">
            <template v-if="isLoading">
                <SkeletonLoading/>
            </template>
            <template v-if="!isLoading">
                <CardArtikel :title="item.title" :description="item.description"></CardArtikel>
            </template>
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-sm btn-primary" v-if="hasMoreData" @click="loadMore">lihat selanjutnya</button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import CardArtikel from '@/components/card/CardArtikel.vue';
  import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
  export default {
    components: {
      CardArtikel, SkeletonLoading
    },
    data() {
      return {
        data: [
          { title: 'judul 1', description: 'deskripsi 1' },
          { title: 'judul 2', description: 'deskripsi 2' },
          { title: 'judul 3', description: 'deskripsi 3' },
          { title: 'judul 4', description: 'deskripsi 4' },
          { title: 'judul 5', description: 'deskripsi 5' },
          { title: 'judul 6', description: 'deskripsi 6' },
          { title: 'judul 7', description: 'deskripsi 7' },
          { title: 'judul 8', description: 'deskripsi 8' },
          { title: 'judul 9', description: 'deskripsi 9' },
          { title: 'judul 10', description: 'deskripsi 10' },
        ],
        kategoriArtikel: [],
        visibleData: [],
        currentIndex: 0,
        increment: 4,
        isLoading: false
      };
    },
    computed: {
      hasMoreData() {
        return this.currentIndex < this.data.length;
      }
    },
    created(){
      this.getKategori()
    },
    methods: {
      loadMore() {
        this.isLoading = true
        setTimeout(() => {
            this.isLoading = false
        }, 1000);
        this.visibleData = this.data.slice(0, this.currentIndex + this.increment);
        this.currentIndex += this.increment;
      },
      getKategori(){
        let type = "getData"
        let url = [
          "master/kategori_artikel", {}
        ]
        this.$store.dispatch(type, url).then((result)=>{
          this.kategoriArtikel = result.data
          console.log(result);
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.loadMore();
    }
  };
  </script>
  