<template>
    <div class="text-start ms-2">
        <p class="fs-4 mb-0"><b>Rekomendasi Dokter</b></p>
        <p>Konsultasikan keluhanmu dengan dokter kami
        </p>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-3">
        <div class="col" v-for="data in dokters" :key="data.id">
            <template v-if="isLoading">
                <div class="col">
                    <SkeletonLoading />
                </div>
            </template>
            <template v-else-if="!isLoading && data.biaya">
                <CardDokter :namaDokter="data.userId.nama" :biaya="data.biaya.biaya"  @click="$redirect('/detail/' + data.idDokter + '/' + data.userId.id)" />
            </template>
            <template v-else>
                <div v-if="dokters.length === 0">
                    <div class="alert alert-info text-center">
                        <i><strong>data tidak ada</strong></i>
                    </div>
                </div>
                <div v-else>
                    <p>ga ada</p>
                </div>
            </template>
        </div>
    </div>
    <div class="text-start ms-2 pt-4">
        <p class="fs-4 mb-0"><b>Cari Dokter Spesialis</b></p>
        <p>Mau langsung sembuh? yuk cari spesialis yang diinginkan
        </p>
    </div>
    <div v-if="isLoading">
        <LoadingComponent />
    </div>
    <template v-else>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 text-center">
            <div class="col-6 col-md-3 col-lg-2" v-for="data in limitData.specialist" :key="data.id">
                <div class="d-flex flex-column align-items-center"
                    @click="$redirect('/chat-dokter/dokter/' + data.idSpesialisPenyakit)">
                    <i :class="data.icon + ' p-3 rounded-circle fs-2 text-light'" style="background-color: #46458C"></i>
                    <p>{{ data.namaSpesialis }}</p>
                </div>
            </div>
        </div>
    </template>
    <div class="text-start ms-2 ">
        <p class="fs-4 mb-0"><b>Rekomendasi Perawat</b></p>
        <p>Butuh perawatan? tenang, ada perawat-perawat terbaik
        </p>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-3">
        <template v-if="isLoading">
            <SkeletonLoading />
        </template>
        <div v-else-if="!isLoading" class="col" v-for="data in nurses">
            <CardDokter :namaDokter="data.user.nama"  @click="$redirect('/chat-dokter/perawat/' + data.idPerawat + '/' + data.user.id)" />
        </div>
    </div>
</template>
<script>
import CardDokter from '../../../components/card/CardDokter.vue';
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue';
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue';
import BodyDetailDokter from '@/components/BodyDetailDokter.vue';
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    data() {
        return {
            dokters: [],
            specialist: [],
            keahlian: [],
            nurses: [],
            dokterLimit: 2,
            specialistLimit: 12,
            isLoading: false,
            idAhkii: []
        }
    },
    mounted() {
        this.getPerawat(),
            this.getDokter()
    },
    created() {
        this.getSpesialis()
    },
    computed: {
        limitData() {
            return {
                dokters: this.dokters.slice(0, this.dokterLimit),
                specialist: this.specialist.slice(0, this.specialistLimit)
            }
        },
        filteredDokter() {
            const dokterUmum = this.dokters.filter((d) => d.getKeahlian.namaKeahlian === 'Dokter Umum');
            return dokterUmum.sort((a, b) => a.getDokter.nama.localeCompare(b.getDokter.nama));
        },
        idAhli() {
            return {
                idAhkii: this.dokters[0].userId
            }
        }
    },
    components: {
        HeaderComponent,
        FooterComponent,
        SkeletonLoading,
        BodyDetailDokter,
        LoadingComponent,
        ButtonComponent,
        CardDokter
    },
    methods: {
        getDokter() {
            let type = "getData"
            let url = [
                "akun/dokter", {}
            ]
            this.$store.dispatch(type, url).then((result)=>{
                this.dokters = result.data
                console.log(result);
            }).catch((err)=>{
                console.log(err);
            })
        },
        getSpesialis() {
            let type = "getData"
            let url = [
                "master/penyakit/spesialis_penyakit", {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.isLoading = false
                this.specialist = result.data
            }).catch((err) => {
                console.log(err);
            })
        },
        getPerawat() {
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
        },
    },
}
</script>