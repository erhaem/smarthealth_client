<template>
    <div class="container col-xxl-8 px-5 py-5">
        <Form @submit="handleSubmit">
            {{ user }}
            <input type="hidden" v-model="user.id_dokter" />
            <InputField name="nomor" v-model="nomor_str" placeHolder="nomor_str" />
            <InputField name="kelas" v-model="kelas" placeHolder="kelas" />
            <InputField name="nama" v-model="user.nama" placeHolder="nama" />
            <InputField name="jenis_kelamin" v-model="user.jenis_kelamin" placeHolder="jenis_kelamin" />
            <InputField name="email" v-model="user.email" placeHolder="email"  />
            <InputField name="nomor_hp" v-model="user.nomor_hp" placeHolder="nomor_hp"  />
            <InputField name="alamat" v-model="user.alamat" placeHolder="alamat"  />
            <InputField name="tempat_lahir" v-model="user.tempat_lahir" placeHolder="tempat lahir"  />
            <InputField name="tanggal_lahir" v-model="user.tanggal_lahir" type="date" placeHolder="tanggal lahir"  />
            <div class="">
                <ButtonLayanan Label="Submit" type="submit" />
            </div>
        </Form>
    </div>
</template>

<script>
import InputField from '@/components/InputField.vue';
import ButtonLayanan from '@/components/ButtonLayanan.vue';
import iziToast from 'izitoast'
import {Form} from 'vee-validate'
export default {
    data() {
        return {
            nomor_str: '',
            kelas: '',
            user: {
                nama: '',
                email: '',
                nomor_hp: '',
                tempat_lahir: '',
                tanggal_lahir: '',
                alamat: '',
                jenis_kelamin: '',
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
                    title: "Berhasil",
                    message: "Data berhasil ditambah",
                    position: "topCenter",
                })
            }).catch(error => {
                console.log(error);
            })
        }
    },
    components: {
        InputField, Form, ButtonLayanan
    }
}
</script>