<template>
  <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-8 mb-5 mb-lg-0">
          <h1 class="my-2 display-5 fw-bold ls-tight">
            Log In to your Account <br />
            <span class="text-primary">Welcome back, you!</span>
          </h1>
          <p style="color: hsl(217, 10%, 50.8%)">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>
        </div>
        <div class="col-lg-4 mb-5 mb-lg-0">
          <div class="card">
            <div class="card-body py-5 px-md-5">
              <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors }">
                <div class="form-outline mb-2 text-start">
                  <label class="form-label" for="form3Example3">Phone number</label>
                  <InputField Name="phoneNumber" v-model="user.nomor_hp"/>
                  <span :class="[errorClass]">{{ errors.phoneNumber }}</span>
                </div>
                <div class="form-outline mb-2 text-start">
                  <label class="form-label" for="form3Example4">Password</label>
                  <InputField Name="password" v-model="user.password" type="password" />
                  <span :class="[errorClass]">{{ errors.password }}</span>
                </div>
                <button type="submit" class="btn btn-primary btn-block w-100 mb-2">
                  Sign In
                </button>
              </Form>
              <p class="text-center">dont have any account? <span class="text-primary"><router-link style="text-decoration: none;" to="/register">register</router-link></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import * as validate from 'yup'
import { Form } from 'vee-validate'
import InputField from '@/components/InputField.vue';
import iziToast from "izitoast";
export default {
  data() {
    return {
      user: {
        nomor_hp: '',
        password: ''
      },
      errorMsg: '',
      errorClass: 'text-danger'
    }
  },
  components: {
    Form, InputField
  },
  computed: {
    schema() {
      return validate.object({
        phoneNumber: validate.string().required('⚠ kolom password wajib diisi'),
        password: validate.string().required('⚠ kolom password wajib diisi').min(8, '⚠ password minimal 8 karakter').max(20, 'password maksimal 20 karakter')
      })
    }
  },
  methods: {
    handleSubmit() {
      let type = "postData"
      const data = {
        nomor_hp: this.user.nomor_hp,
        password: this.user.password
      }
      let url = [
        "autentikasi/login", data
      ]
      this.$store.dispatch(type, url).then((response) => {
        const cekRole = response.data.getRole.namaRole;
        if (cekRole == "Konsumen") {
          Cookies.set("token", response.data.token);
          Cookies.set("user", JSON.stringify(response));
          setTimeout(() => {
            iziToast.success({
              transitionIn: 'fadeInUp',
              timeout: 2000,
              title: "Berhasil",
              message: "Berhasil Login",
              position: "bottomCenter",
            })
            window.location = '/'
          }, 2000);
        } else {
          iziToast.error({
            transitionIn: 'fadeInUp',
            timeout: 2000,
            title: "Gagal",
            message: "Maaf, hanya role konsumen yang dapat login",
            position: "topCenter",
          })
        }
      }
      ).catch((err) => {
        console.log(err.response.data);
        iziToast.error({
          transitionIn: 'fadeInUp',
          timeout: 2000,
          title: "Gagal",
          message: "Periksa kembali nomor hp dan password",
          position: "topCenter",
        })
      })
    }
  },
}
</script>