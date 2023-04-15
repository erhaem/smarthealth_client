<template>
    <section id="services">
        <div class="container px-4 py-4 col-xxl-10">
            <div class="row g-4">
                <div class="col-md-4 col-lg-3 rounded" v-for="medicine in dataMedicines" :key="medicine.id">
                    <SkeletonLoading v-if="isLoading" />
                    <CardArtikel v-if="!isLoading" image="https://d2qjkwm11akmwu.cloudfront.net/products/665462_20-3-2023_14-10-30.png" textColor="text-dark" :title="medicine.namaObat" :description="medicine.deskripsi">
                        <template #anyText>
                            <p class="mb-1 text-secondary"><small>Rp. {{medicine.harga}}</small></p>
                            <button class="btn btn-outline-danger">Tambah +</button>
                            <router-link :to="'/toko-kesehatan/'+ medicine.idObat">show</router-link>
                        </template>
                    </CardArtikel>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import CardArtikel from '@/components/CardArtikel.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import ButtonLayanan from '@/components/ButtonLayanan.vue';
export default {
    components: {
        CardArtikel, SkeletonLoading, ButtonLayanan
    },
    data() {
        return {
            dataMedicines: [],
            isLoading: false,
            imageUrl: 'https://d2qjkwm11akmwu.cloudfront.net/products/665462_20-3-2023_14-10-30.png'
        }
    },
    created() {
        this.getMedicine()
    },
    methods: {
        getMedicine() {
            const selfGet = this
            let type = "getData"
            let url = [
                "master/obat/data_obat", {}
            ]
            selfGet.isLoading = true
            selfGet.$store.dispatch(type, url).then((result) => {
                console.log(result.data);
                selfGet.dataMedicines = result.data
                setTimeout(() => {
                    selfGet.isLoading = false
                }, 2000);
            }).catch((err) => {
                console.log(err);
            })
        },
    },
}
</script>