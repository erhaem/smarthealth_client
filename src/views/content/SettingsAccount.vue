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
                    <Form @submit="changePassword">
                        <div class="row">
                            <div class="col-sm-6 col-6">
                                <label for="" class="mb-2">Password Baru</label>
                                <InputField type="password" Name="newPass" v-model="newPass"  class="w-100"/>
                            </div>
                            <div class="col-sm-6 col-6">
                                <label for="" class="mb-2">Konfirmasi Password</label>
                                <InputField type="password" Name="confirmPassword" v-model="confirmPassword" class="w-100" />
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
import {Form} from 'vee-validate';
export default {
    data(){
        return {
            newPass: '',
            confirmPassword: '' 
        }
    },
    components: {
        InputField, Form,
    },
    mounted() {
        this.getUser()
    },
    methods: {
        getUser(){
            let type = "getData"
            let url = [
                "akun/profil/konsumen/profil", []
            ]
            this.$store.dispatch(type, url).then((result)=>{
            }).catch((err)=>{
                console.log(err);
            })
        },
        changePassword(){
            let type = "putData"
            let url = [
                "akun/change_password", {
                    password_baru: this.newPass,
                    konfirmasi_password: this.confirmPassword
                }
            ]
            this.$store.dispatch(type, url).then((result)=>{
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
}
</script>