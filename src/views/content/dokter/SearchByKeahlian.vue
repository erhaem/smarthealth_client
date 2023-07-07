<template>
    <div v-if="valueSearch.length < 1">
        <div class="col-lg-12 col-md-12">
            <div class="card alert alert-dark border-0 shadow">
                <div class="card-body">
                    <div class="align-items-center">
                        <div class="text-dark text-center">
                            <img src="../../../assets/images/28.png" class="img-fluid h-75 w-75 mb-0" alt="">
                            <p class="mb-0">
                                <b>
                                Hasil tidak ditemukan
                                </b>
                            </p>
                            <p class="mb-2">
                                <b>
                                    Cek ejaan atau coba gunakan istilah yang lebih umum.
                                </b>
                            </p>
                            <ButtonComponent @click="$redirect('dokter')" Color="btn-danger" Label="Kembali"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <button class="btn btn-sm btn-outline-dark shadow" @click="this.$router.back()">
            <i class="fas fa-arrow-left">
            </i>
        </button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-3">
        <div class="col" v-for="data in valueSearch">
            <div class="card border-0">
                <div class="row">
                    <div class="col-6 py-2">
                        <div>
                            <img src="../../../assets/images/avadoktercowo.png" class="img-fluid rounded" alt="">
                        </div>
                    </div>
                    <div class="col-6 py-3 px-3">
                        <p class="mb-1" style="font-size: 14px;"><b>dr. {{ data.userId.nama }}</b></p>
                        <p class="text-secondary text-sm mb-1" style="font-size: 12px;">
                            Dokter Umum
                        </p>
                        <div class="d-flex justify-content-start text-primary">
                            <p class="rounded mb-1 me-1" style="font-size: 10px;"><i class="ms-1 fa-solid fa-briefcase"></i>
                                1 tahun
                                &nbsp;</p>
                            <p class="rounded mb-1" style="font-size: 10px;"><i class="ms-1 fa-solid fa-thumbs-up"></i>
                                100% &nbsp;</p>
                        </div>
                        <p class="mb-1" style="font-size: 12px;">Rp. 20.000</p>
                        <div class="pt-3">
                            <button class="btn btn-sm btn-danger w-50" style="font-size: 12px;">Chat</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
export default {
    props: {
        valueSearch: {
            type: Array,
            default: () => []
        }
    },
    components: {
        ButtonComponent
    }
}
</script>  