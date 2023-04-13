<template>
    <div class="container col-md-10 col-xxl-10 py-4 px-4 border-top">
        <div class="row">
            <div class="col-lg-5">
                <div class="header">
                    <h6>
                        Change Password
                    </h6>
                </div>
                <div class="py-3 align-items-start">
                    <Form @submit="changePassword" :validation-schema="schema" v-slot="{ errors }">
                        <div class="row">
                            <div class="col-sm-6 col-6">
                                <label for="" class="mb-2">Password Baru</label>
                                <InputField type="password" Name="newPass" :value="newPass" v-model="newPass"
                                    class="w-100" />
                                <span>{{ errors.newPass }}</span>
                            </div>
                            <div class="col-sm-6 col-6">
                                <label for="" class="mb-2">Konfirmasi Password</label>
                                <InputField type="password" Name="confirmPassword" :value="confirmPassword"
                                    v-model="confirmPassword" class="w-100" />
                                {{ errors.confirmPassword }}
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-sm btn-primary w-25">Save</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputField from '@/components/InputField.vue';
import axios from 'axios'
import Cookies from 'js-cookie'
import iziToast from 'izitoast'
import { Form } from 'vee-validate';
import * as validate from 'yup'
export default {
    data() {
        return {
            newPass: '',
            confirmPassword: ''
        }
    },
    components: {
        InputField, Form,
    },
    computed: {
        schema() {
            return validate.object({
                newPass: validate.string().required('wajib diisi'),
                confirmPassword: validate.string().required('wajib diisi'),
            })
        }
    },
    mounted() {
        this.getUser()
    },
    methods: {
        setPassword(event) {
            this.newPass = event
        },
        setConfirmPassword(event) {
            this.confirmPassword = event
        },
        logout() {
            axios.get(
                "https://berobatplus.shop/api/logout", {},
                {
                    headers: {
                        Authorization: "Bearer" + Cookies.get('token')
                    }
                }
            ).then(() => {
                Cookies.remove('token')
                Cookies.remove('user')
                window.location.replace('/')
            })
        },
        getUser() {
            let type = "getData"
            let url = [
                "akun/profil/konsumen/profil", []
            ]
            this.$store.dispatch(type, url).then((result) => {
            }).catch((err) => {
                console.log(err);
            })
        },
        changePassword() {
            let type = "putData"
            if (this.newPass) {
                if (this.confirmPassword !== this.newPass) {
                    iziToast.error({
                        title: "galat",
                        message: "Password tidak sama",
                        position: "topRight"
                    })
                } else {
                    let url = [
                        "akun/change_password", {
                            password_baru: this.newPass,
                            konfirmasi_password: this.confirmPassword
                        }
                    ]
                    this.$store.dispatch(type, url).then((result) => {
                        iziToast.success({
                            title: "berhasil",
                            message: "password diubah",
                            position: "topRight",
                            onOpened: () => {
                            },
                        })
                        // this.logout()
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            }
        }
    },
}
</script>