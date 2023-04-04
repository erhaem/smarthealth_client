<template>
    <div class="px-2 py-2 my-5 text-center">
        <img class="d-block mx-auto mb-4 w-25 h-25" src="../../assets/register.png">
        <h1 class="display-5 fw-bold">Pendaftaran Akun</h1>
        <div class="col-lg-2 mx-auto">
            <p class="lead mb-2">Silahkan Pilih Role Akun</p>
            <div class="w-100 justify-content-sm-center">
                <!-- Example single danger button -->
                <div class="btn-group">
                    <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Pilih Role Akun
                    </button>
                    <ul class="dropdown-menu">
                        <li><router-link to="" class="dropdown-item">Umum</router-link></li>
                        <li><router-link to="/register-dokter" class="dropdown-item">Dokter</router-link></li>
                        <li><router-link to="" class="dropdown-item">Perawat</router-link></li>
                        <li><router-link to="" class="dropdown-item">Apotek</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import InputField from '@/components/InputField.vue';
import SelectOption from '@/components/SelectOption.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
export default {
    data() {
        return {
            bodyStyle: {
                'container': true,
                'pt-5': true,
            },
            inputStyle: {
                'pt-3': true
            }
        }
    },
    components: {
        InputField, SelectOption, HeaderComponent, FooterComponent
    }
}
</script>