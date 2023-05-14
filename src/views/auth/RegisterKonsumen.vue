<template>
    <div class="container col-xxl-8 px-5 py-5">
        <form autocomplete="on">
            <input type="hidden" v-model="user.id_konsumen" />
            <InputField name="nomor" v-model="nik" placeHolder="nik" />
            <InputField name="nama" v-model="user.nama" placeHolder="nama" />
            <InputField name="email" v-model="user.email" placeHolder="email"  />
            <InputField name="nomor_hp" v-model="user.nomor_hp" placeHolder="nomor_hp"  />
            <InputField name="alamat" v-model="user.alamat" placeHolder="alamat"  />
            <button class="btn btn-sm btn-primary" type="submit" @submit="handleSubmit">submit</button>
        </form>
    </div>
</template>

<script>
import InputField from '@/components/partials-component/InputField.vue';
import iziToast from 'izitoast'
export default {
    data() {
        return {
            nik: '',
            user: {
                nama: '',
                email: '',
                nomor_hp: '',
                alamat: '',
            }
        }
    },
    methods: {
        handleSubmit() {
            const selfPost = this
            const data = {
                nik: selfPost.nik,
                nama: selfPost.user.nama,
                email: selfPost.user.email,
                nomor_hp: selfPost.user.nomor_hp,
                alamat: selfPost.user.alamat,
            }
            let type = "postData"
            let url = [
                "akun/konsumen", data
            ]
            selfPost.$store.dispatch(type, url).then((response) => {
                console.log(response);
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
        InputField
    }
}
</script>