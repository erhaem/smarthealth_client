<template>
    <div class="body">

        <div class="container col-xxl-10 col-xl-10 px-4 py-4">
            <div class="row align-items-top g-lg-5 py-5">
                <div class="col-lg-5">
                    <div class="d-flex justify-content-center">
                        <img src="../../assets/images/Untitled-1.png" class="w-50 h-50" alt="">
                    </div>
                    <Form class="px-4 py-4" @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors }">
                        <label for="" class="mb-1">Nama Lengkap</label>
                        <InputField placeholder="e.g rafli" Name="nama" v-model="form.nama" />
                        <p class="mb-0 mt-0 text-end text-danger">{{ errors.nama }}</p>
                        <label for="" class="mb-1">Email</label>
                        <InputField placeholder="rafli@gmail.com" Name="email" v-model="form.email" />
                        <p class="mb-0 mt-0 text-end text-danger">{{ errors.email }}</p>
                        <div class="row">
                            <div class="col-lg-6">
                                <label for="" class="mb-1">NIK</label>
                                <InputField placeholder="32424172718" Name="nik" v-model="nik" />
                                <p class="mb-0 mt-0 text-end text-danger">{{ errors.nik }}</p>
                                <label for="" class="mb-1">Alamat</label>
                                <InputField placeholder="Tangerang" Name="alamat" v-model="form.alamat" />
                                <p class="mb-1 mt-0 text-end text-danger">{{ errors.alamat }}</p>
                            </div>
                            <div class="col-lg-6">
                                <label for="" class="mb-1">Nomor HP</label>
                                <InputField placeholder="081727172809" Name="nomorHp" v-model="form.nomor_hp" />
                                <p class="mb-0 mt-0 text-end text-danger">{{ errors.nomorHp }}</p>
                                <label for="" class="mb-1">Password</label>
                                <InputField placeholder="*********" Name="password" v-model="form.password" />
                                <p class="mb-1 mt-0 text-end text-danger">{{ errors.password }}</p>
                            </div>
                        </div>
                        <ButtonLayanan class="btn-primary p-lg-2 rounded-2 py-2 w-100" Label="Register" />
                    </Form>
                </div>
                <div class="col-lg-7">
                    <div class="text-center">
                        <img src="../../assets/images/register.png" class="img-fluid h-75 w-75" alt="">
                    </div>
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
import ButtonLayanan from '@/components/ButtonLayanan.vue';
import * as validate from 'yup'
import { Form } from 'vee-validate'
export default {
    data() {
        return {
            nik: '',
            form: {
                nama: '',
                email: '',
                nomor_hp: '',
                password: '',
                alamat: '',
                status: ''
            }
        }
    },
    components: {
        InputField, SelectOption, HeaderComponent, FooterComponent, Form, ButtonLayanan
    },
    computed: {
        schema(){
            return validate.object({
                nik: validate.string().required('nik wajib diisi'),
                nama: validate.string().required('nama wajib diisi'),
                email: validate.string().required('email wajib diisi'),
                nomorHp: validate.string().required('nomor hp wajib diisi'),
                password: validate.string().required('passwor wajib diisi'),
                alamat: validate.string().required('alamat wajib diisi')
            })
        }
    },
    methods: {
        handleSubmit() {
            let type = "postData"
            const data = {
                nik: this.nik,
                nama: this.form.nama,
                email: this.form.email,
                alamat: this.form.alamat,
                nomor_hp: this.form.nomor_hp,
                password: this.form.password,
                status: 1
            }
            let url = [
                "akun/konsumen", data
            ]
            this.$store.dispatch(type, url).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>

<style>
.body {
    background: rgb(255, 255, 255);
    background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(248, 254, 255, 1) 23%, rgba(230, 247, 255, 1) 45%, rgba(237, 250, 255, 1) 67%, rgba(230, 245, 255, 1) 91%, rgba(227, 231, 255, 1) 100%);
}
</style>