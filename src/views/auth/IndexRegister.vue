<template>
  <div class="container py-3 mb-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 mt-3">
        <h4>Halo!</h4>
        <p class="text-secondary">
          <small> Silakan registrasi terlebih dulu </small>
        </p>
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Register</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row mb-3">
                <div :class="['col-md-6', { 'has-error': submitted && !form.nama }]">
                  <label for="name" class="form-label">Nama</label>
                  <input type="text" id="name" class="form-control" v-model="form.nama" />
                </div>
                <div :class="['col-md-6', { 'has-error': submitted && !form.email }]">
                  <label for="email" class="form-label">Email</label>
                  <input type="text" class="form-control" v-model="form.email" />
                </div>
              </div>
              <div class="row mb-3">
                <div :class="['col-md-6', { 'has-error': submitted && !form.password }]">
                  <label for="name" class="form-label">Password</label>
                  <input type="password" class="form-control" v-model="form.password" />
                </div>
                <div :class="['col-md-6', { 'has-error': submitted && !nik }]">
                  <label for="nik" class="form-label">NIK</label>
                  <input type="text" class="form-control" v-model="nik" />
                </div>
              </div>
              <div class="row mb-3">
                <div :class="['col-md-6', { 'has-error': submitted && !form.nomor_hp }]">
                  <label for="name" class="form-label">Nomor Hp</label>
                  <input type="text" class="form-control" v-model="form.nomor_hp" />
                </div>
                <div :class="['col-md-6', { 'has-error': submitted && !form.alamat }]">
                  <label for="alamat" class="form-label">Alamat</label>
                  <input type="text" class="form-control" v-model="form.alamat" />
                </div>
              </div>
              <div class="text-center">
                <button class="btn w-100 btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- MODAL OTP -->
      <!-- <template> -->
      <div
        class="modal fade"
        id="otpModal"
        ref="otpModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <!-- <div class="modal-header"> -->

            <!-- <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> -->
            <!-- </div> -->
            <div class="modal-body">
              <div class="container-fluid text-center p-4">
                <h5 class="modal-title mb-4" id="exampleModalLabel">
                  <b>Masukkan kode verifikasi</b>
                </h5>
                <p><b>Kode 6 digit verifikasi</b> telah dikirimkan melalui Nomor Whatsapp</p>
                <div
                  id="otp"
                  class="inputs d-flex flex-row justify-content-center mt-2"
                  style="height: 100px"
                >
                  <input
                    class="m-2 text-center form-control rounded"
                    type="text"
                    id="first"
                    maxlength="1"
                  />
                  <input
                    class="m-2 text-center form-control rounded"
                    type="text"
                    id="second"
                    maxlength="1"
                  />
                  <input
                    class="m-2 text-center form-control rounded"
                    type="text"
                    id="third"
                    maxlength="1"
                  />
                  <input
                    class="m-2 text-center form-control rounded"
                    type="text"
                    id="fourth"
                    maxlength="1"
                  />
                  <input
                    class="m-2 text-center form-control rounded"
                    type="text"
                    id="fifth"
                    maxlength="1"
                  />
                  <input
                    class="m-2 text-center form-control rounded"
                    type="text"
                    id="sixth"
                    maxlength="1"
                  />
                </div>
                <a href="#" class="text-decoration-none ms-3">Kirim Ulang(1/3)</a>
              </div>
              <div class="content d-flex justify-content-center align-items-center">
                <span>Belum menerima kode ?</span>
                <a href="#" class="text-decoration-none ms-2">Kirim Kode Melalui Email</a>
              </div>
              <div class="d-grid mx-auto mt-4 pb-4" style="width: 400px">
                <button
                  @click="handleSubmitOTP"
                  class="btn btn-primary"
                  style="height: 60px; border-radius: 25px"
                >
                  Verifikasi
                </button>
              </div>
            </div>

            <!-- <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div> -->
          </div>
        </div>
      </div>
      <!-- </template> -->

      <div class="col-lg-6 d-none d-sm-block mt-5">
        <img src="../../assets/images/register.png" class="img-fluid" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import InputField from '@/components/partials-component/InputField.vue'
import SelectOption from '@/components/partials-component/SelectOption.vue'
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'
import ButtonComponent from '@/components/partials-component/ButtonComponent.vue'
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
      },
      submitted: false,
      otpCode: '',
      user_id: ''
    }
  },
  components: {
    InputField,
    SelectOption,
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  },
  methods: {
    handleSubmit() {
      this.submitted = true
      let type = 'postData'

      //TODO: validasi form

      if (this.nik == '') {
        this.$swal({
          icon: 'error',
          title: 'Failed!',
          text: 'NIK masih kosong'
        })

        return
      }

      if (this.email == '') {
        this.$swal({
          icon: 'error',
          title: 'Failed!',
          text: 'Email masih kosong'
        })

        return
      } // etc..

      const data = {
        nik: this.nik,
        nama: this.form.nama,
        email: this.form.email,
        alamat: this.form.alamat,
        nomor_hp: this.form.nomor_hp,
        password: this.form.password,
        status: 1
      }
      let url = ['akun/konsumen', data]
      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (result.success === false) {
            this.$swal({
              icon: 'error',
              title: 'Failed!',
              text: Object.keys(result.data)
                .map((err) => result.data[err])
                .join(', ')
            })
          } else {
            this.user_id = result.user

            this.sendOTP()

            // this.$swal({
            //   icon: 'success',
            //   title: 'berhasil register'
            // }).then(() => {
            //   this.$router.push({ name: 'LoginUser' })
            // })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    verifyOTP() {
      let type = 'postData'

      const data = {
        verification_code: this.otpCode,
        user_id: this.user_id
      }

      let url = ['verify-otp-wa', data]

      this.$store.dispatch(type, url).then((result) => {
        if (result.success == false) {
          this.$swal({
            icon: 'error',
            title: 'Gagal memverifikasi'
          })
          console.log('verifyotp: gagal, ', result.message)
        } else {
          console.log('verifyotp: sukses', result.message)
          this.$swal({
            icon: 'success',
            title: 'Verifikasi sukses! Anda berhasil register'
          }).then(() => {
            this.$router.push({ name: 'LoginUser' })
          })
        }
      })
    },
    sendOTP() {
      let type = 'postData'

      const data = {
        to: this.form.nomor_hp,
        user_id: this.user_id
      }

      let url = ['send-otp-wa', data]

      this.$store.dispatch(type, url).then((result) => {
        if (result.success == false) {
          console.log('sendOTP: gagal, ', result.message)
        } else {
          console.log('sendOTP: sukses', result.message)
          // this.$swal({
          //   icon: 'success',
          //   title: 'Success!',
          //   text: 'Verifikasi berhasil! Akun anda berhasil terdaftar'
          // })

          //malah ga munculll
          this.$nextTick(() => {
            // pake function Bootstrap modal (jquery)
            $(this.$refs.otpModal).modal('show')
          })
        }
      })
    }
  },

  mounted() {
    function OTPInput() {
      const inputs = document.querySelectorAll('#otp > *[id]')
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keydown', function (event) {
          if (event.key === 'Backspace') {
            inputs[i].value = ''
            if (i !== 0) inputs[i - 1].focus()
          } else {
            if (i === inputs.length - 1 && inputs[i].value !== '') {
              return true
            } else if (event.keyCode > 47 && event.keyCode < 58) {
              inputs[i].value = event.key
              if (i !== inputs.length - 1) inputs[i + 1].focus()
              event.preventDefault()
            } else if (event.keyCode > 64 && event.keyCode < 91) {
              inputs[i].value = String.fromCharCode(event.keyCode)
              if (i !== inputs.length - 1) inputs[i + 1].focus()
              event.preventDefault()
            }
          }
        })
      }
    }

    OTPInput()
  }
}
</script>

<style>
.has-error input {
  border-color: red;
}
</style>
