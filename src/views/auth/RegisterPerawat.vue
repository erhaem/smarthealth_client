<template>
    <div class="container col-xl-10 col-xxl-10 px-4 py-5">
        <div class="row align-items-top g-lg-5">
            <div class="col-lg-6">
                <h5 class="display-5 fw-bold lh-1 mb-3 text-primary">Personal Info</h5>
                <p class="col-lg-10 fs-5 text-secondary">Provide Your Personal Info</p>
                <div class="mx-auto md-block">
                    <img src="../../assets/images/28.png" class="img-fluid" alt="">
                </div>
            </div>
            <div class="col-md-10 mx-auto col-lg-6">
                <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors }">
                    <input type="hidden" v-model="user.id_perawat" />
                    <div class="row">
                        <div class="col-sm-6 col-6">
                            <LabelInput Name="nip" />
                            <InputField name="nip" class="input me-2" v-model="nip" placeHolder="nip" />
                            <div :class="[error]">
                                <span>{{ errors.nip }}</span>
                            </div>
                        </div>
                        <div class="col-sm-6 col-6">
                            <LabelInput Name="nama" />
                            <InputField name="nama" v-model="user.nama" placeHolder="nama" />
                            <div :class="[error]">
                                <span>{{ errors.nama }}</span>
                            </div>
                        </div>
                    </div>
                    <LabelInput Name="jenis kelamin" />
                    <InputField name="jenisKelamin" v-model="user.jenis_kelamin" placeHolder="jenis_kelamin" />
                    <div :class="[error]">
                        <span>{{ errors.jenisKelamin }}</span>
                    </div>
                    <div class="row">
                        <div class="col-6 col-sm-6">
                            <LabelInput Name="email" />
                            <InputField name="email" class="me-2" v-model="user.email" placeHolder="email" />
                            <div :class="[error]">
                                <span>{{ errors.email }}</span>
                            </div>
                        </div>
                        <div class="col-sm-6 col-6">
                            <LabelInput Name="nomor hp" />
                            <InputField name="nomorHp" v-model="user.nomor_hp" placeHolder="nomor_hp" />
                            <div :class="[error]">
                                <span>{{ errors.nomorHp }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-6">
                            <LabelInput Name="alamat" />
                            <InputField name="alamat" v-model="user.alamat" placeHolder="alamat" />
                            <div :class="[error]">
                                <span>{{ errors.alamat }}</span>
                            </div>

                        </div>
                        <div class="col-sm-6 col-6">
                            <LabelInput Name="password" />
                            <InputField name="password" v-model="user.password" placeHolder="password" />
                            <div :class="[error]">
                                <span>{{ errors.password }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-6">
                            <LabelInput Name="tempat lahir" />
                        <InputField name="tempatLahir" v-model="user.tempat_lahir" placeHolder="tempat lahir" />
                        <div :class="[error]">
                            <span>{{ errors.tempatLahir }}</span>
                        </div>
                        </div>
                        <div class="col-6">
                            <LabelInput Name="tanggal lahir" />
                            <InputField name="tanggalLahir" v-model="user.tanggal_lahir" type="date" placeHolder="tanggal lahir" />
                            <div :class="[error]">
                                <span>{{ errors.tanggalLahir }}</span>
                            </div>
                        </div>
                        <div class="">
                            <ButtonLayanan Label="Submit" class="btn-primary" type="submit" />
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import InputField from '@/components/InputField.vue';
import LabelInput from '@/components/LabelInput.vue';
import ButtonLayanan from '@/components/ButtonLayanan.vue';
import iziToast from 'izitoast'
import { Form } from 'vee-validate'
import * as validate from 'yup'
export default {
    data() {
        return {
            nip: '',
            user: {
                nama: '',
                email: '',
                nomor_hp: '',
                tempat_lahir: '',
                tanggal_lahir: '',
                alamat: '',
                jenis_kelamin: '',
                password: ''
            },
            error: ['text-danger', 'mb-3'],
        }
    },
    computed: {
        schema() {
            let req = 'kolom form wajib diisi'
            let min = "minimal 8 karakter"
            let max = "maksimal 13 karakter"
            return validate.object({
                nama: validate.string().required(req),
                nip: validate.string().required(req).min(8, min).max(13, max),
                email: validate.string().required(req),
                nomorHp: validate.string().required(req).min(8, min).max(13, max),
                tanggalLahir: validate.string().required(req),
                tempatLahir: validate.string().required(req),
                alamat: validate.string().required(req),
                jenisKelamin: validate.string().required(req),
                password: validate.string().required(req).min(8, min).max(13, max),
            })
        }
    },
    methods: {
        handleSubmit() {
            const selfPost = this
            const data = {
                nip: selfPost.nip,
                nama: selfPost.user.nama,
                email: selfPost.user.email,
                nomor_hp: selfPost.user.nomor_hp,
                alamat: selfPost.user.alamat,
                jenis_kelamin: selfPost.user.jenis_kelamin,
                tempat_lahir: selfPost.user.tempat_lahir,
                tanggal_lahir: selfPost.user.tanggal_lahir,
                password: selfPost.user.password,
            }
            let type = "postData"
            let url = [
                "akun/perawat", data
            ]
            selfPost.$store.dispatch(type, url).then((result) => {
                console.log(result);
                iziToast.success({
                    transitionIn: 'fadeInUp',
                    timeout: 2000,
                    message: "Data kamu sudah tersimpan. silahkan menunggu untuk aktivasi",
                    position: "topCenter",
                }),
                    window.location = "/register-perawat"
            }).catch(error => {
                console.log(error);
            })
        }
    },
    components: {
        InputField, Form, ButtonLayanan, LabelInput
    }
}
</script>

<style>
.form-select:focus {
    border-color: #4538db;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(95, 124, 218, 0.6);
}
</style>