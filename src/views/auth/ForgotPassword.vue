<template>
    <div class="container py-5">
        <div class="col-12 col-md-6 mx-auto">
            <div class="card shadow">
                <div class="card-body">
                    <h5 class="mb-3">Forgot Password</h5>
                    <InputField v-model="form.email" placeholder="masukkan email anda yang terdaftar" />
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-sm btn-primary" type="submit" @click="postEmail">
                                submit
                            </button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
export default {
    data() {
        return {
            form: {
                email: ''
            }
        }
    },
    components: {
        InputField
    },
    methods: {
        postEmail() {
            let type = "postData"
            let url = [
                "autentikasi/confirm_email", this.form, {}
            ]
            this.$store.dispatch(type, url).then((result) => {
                this.$swal({
                    icon: 'success',
                    title: 'Cek Email Anda',
                    text: 'verifikasi email Anda'
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    },
}
</script>