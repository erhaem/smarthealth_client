<template>
    <div class="container col-xl-10 col-xxl-10 px-4 py-5">
        <div class="row align-items-top g-lg-5">
            <div class="col-lg-6 text-center text-lg-start">
                <h5 class="display-5 fw-bold lh-1 mb-3 text-primary">Personal Info</h5>
                <p class="col-lg-10 fs-5 text-secondary">Provide Your Personal Info</p>
            </div>
            <div class="col-md-10 mx-auto col-lg-6">
                <Form @submit="handleSubmit">
                    <input type="hidden" v-model="user.id_dokter" />
                    <div class="row">
                        <div class="d-flex align-items-center">
                            <InputField name="nomor" class="input me-2" v-model="nomor_str" placeHolder="nomor_str" />
                        </div>
                    </div>
                    <InputField name="nama" v-model="user.nama" placeHolder="nama" />
                    <InputField name="jenis_kelamin" v-model="user.jenis_kelamin" placeHolder="jenis_kelamin" />
                    <div class="row">
                        <div class="d-flex align-items-center">
                            <InputField name="email" class="me-2" v-model="user.email" placeHolder="email" />
                            <InputField name="nomor_hp" v-model="user.nomor_hp" placeHolder="nomor_hp" />
                        </div>
                    </div>
                    <InputField name="password" v-model="user.password" placeHolder="password" />
                    <InputField name="alamat" v-model="user.alamat" placeHolder="alamat" />
                    <InputField name="tempat_lahir" v-model="user.tempat_lahir" placeHolder="tempat lahir" />
                    <InputField name="tanggal_lahir" v-model="user.tanggal_lahir" type="date" placeHolder="tanggal lahir" />
                    <div class="">
                        <ButtonComponent Label="Submit" type="submit" />
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import InputField from '@/components/partials-component/InputField.vue';
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue';
import iziToast from 'izitoast'
import { Form } from 'vee-validate'
export default {
    data() {
        return {
            nomor_str: '',
            kelas: 1,
            user: {
                nama: '',
                email: '',
                nomor_hp: '',
                tempat_lahir: '',
                tanggal_lahir: '',
                alamat: '',
                jenis_kelamin: '',
                password: '',
            }
        }
    },
    methods: {
        handleSubmit() {
            const selfPost = this
            const data = {
                nomor_str: selfPost.nomor_str,
                kelas: selfPost.kelas,
                nama: selfPost.user.nama,
                email: selfPost.user.email,
                nomor_hp: selfPost.user.nomor_hp,
                alamat: selfPost.user.alamat,
                jenis_kelamin: selfPost.user.jenis_kelamin,
                tempat_lahir: selfPost.user.tempat_lahir,
                tanggal_lahir: selfPost.user.tanggal_lahir,
                password: selfPost.user.password
            }
            let type = "postData"
            let url = [
                "akun/dokter", data
            ]
            selfPost.$store.dispatch(type, url).then((result) => {
                console.log(result);
                iziToast.success({
                transitionIn: 'fadeInUp',
                timeout: 2000,
                message: "Data kamu sudah tersimpan. silahkan menunggu untuk aktivasi",
                position: "topCenter",
            }).then(function () {
                    window.location = "/register-dokter"
                })
            }).catch(error => {
                console.log(error);
            })
        }
    },
    components: {
        InputField, Form, ButtonComponent
    }
}
</script>

<style>
.form-select:focus {
    border-color: #4538db;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(95, 124, 218, 0.6);
}
</style>