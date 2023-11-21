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
                  <div class="text-danger small" v-if="emailError">{{ emailError }}</div>
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
                  <label for="name" class="form-label">Nomor Hp (WhatsApp)</label>
                  <input type="text" class="form-control" v-model="form.nomor_hp" />
                  <div class="text-danger small" v-if="phoneError">{{ phoneError }}</div>
                </div>
                <div :class="['col-md-6', { 'has-error': submitted && !form.alamat }]">
                  <label for="alamat" class="form-label">Alamat</label>
                  <input type="text" class="form-control" v-model="form.alamat" />
                </div>
              </div>
              <div class="row mb-3">
                <div :class="['col-md-12', { 'has-error': submitted && !form.nomor_hp }]">
                  <label for="name" class="form-label">Kode Verifikasi</label>
                  <!-- <input type="text" class="form-control" v-model="form.nomor_hp" /> -->
                  <div class="input-group">
                    <input
                      type="text"
                      v-model="form.verificationCode"
                      id="verificationCode"
                      class="form-control"
                    />
                    <button
                      v-if="!countingDown"
                      class="btn btn-outline-primary"
                      type="button"
                      @click="sendCode"
                    >
                      Kirim
                    </button>
                    <button
                      v-if="countingDown"
                      class="btn btn-outline-primary disabled"
                      type="button"
                    >
                      Kirim Ulang ({{ countdownTime }})
                    </button>
                  </div>
                  <div v-if="sendProceed" class="small">
                    <div :class="`text-${sendSuccess ? 'success' : 'danger'} pb-2`">
                      {{ showMessageWA || showMessageMail }}
                    </div>
                  </div>
                  <div class="small mt-2">
                    <span>Kirim kode verifikasi ke email?</span>

                    <button
                      class="btn btn-link btn-sm text-decoration-none"
                      style="cursor: pointer"
                      @click.prevent="sendEmailCode"
                      :disabled="countingDown"
                    >
                      Klik di sini
                    </button>
                  </div>
                  <!-- <div v-if="sendEmailCode && showMessageMail" class="small">
                    <div class="text-success pb-2">{{ showMessageMail }}</div>

                    <button
                      type="button"
                      class="btn btn-link btn-sm"
                      @click="sendCode"
                      :disabled="countingDown"
                    >
                      Kirim Kode Melalui WhatsApp
                    </button>
                  </div> -->
                </div>
              </div>
              <div class="text-center">
                <button class="btn w-100 btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-lg-6 d-none d-sm-block mt-5">
        <img src="../../assets/images/register.png" class="img-fluid" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
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
        status: '',
        verificationCode: ''
      },
      showMessageWA: null,
      showMessageMail: null,
      phoneError: null,
      emailError: null,
      countdownTime: 0,
      countingDown: false,
      sendEmail: false,
      sendSuccess: false,
      sendProceed: false,
      submitted: false
    }
  },
  components: {},
  methods: {
    sendCode() {
      this.sendProceed = true
      this.showMessageWA = null
      this.showMessageMail = null

      if (!this.form.nomor_hp) {
        this.phoneError = 'Mohon isi nomor hp'
        return
      }

      this.phoneError = null

      let type = 'postData'

      const data = {
        to: this.form.nomor_hp,
        user_id: this.user_id
      }

      let url = ['send-otp-wa', data]

      this.$store.dispatch(type, url).then((result) => {
        //REFACTOR - 06/11/23
        // this.sendSuccess = !!result.success
        // this.showMessageMail = result.message

        if (result.success == false) {
          this.sendSuccess = false
          this.showMessageWA = result.message ?? 'Kode verifikasi gagal dikirim ke WhatsApp Anda'
        } else {
          this.sendSuccess = true
          this.showMessageWA = result.message ?? 'Kode verifikasi berhasil dikirim ke WhatsApp Anda'
          this.countdown()
        }

      })
    },
    sendEmailCode() {
      this.sendProceed = true
      this.showMessageMail = null
      this.showMessageWA = null

      if (!this.form.email) {
        this.emailError = 'Mohon isi alamat email anda'
        return
      }

      this.emailError = null

      let type = 'postData'

      const data = {
        email: this.form.email
      }

      let url = ['send-otp-email', data]

      this.$store.dispatch(type, url).then((result) => {
        //TODO: tambahin http status sebagai penentu error (opsional)
        //REFACTOR - 06/11/23
        // this.sendSuccess = !!result.success
        // this.showMessageMail = result.message

        if (result.success == false) {
          this.sendSuccess = false
          this.showMessageMail = result.message ?? 'Kode verifikasi gagal dikirim ke email Anda'
        } else {
          this.sendSuccess = true
          // this.sendEmail = true
          this.showMessageMail = result.message ?? 'Kode verifikasi berhasil dikirim ke email Anda'
          this.countdown()
        }

      })
    },
    countdown() {
      this.countingDown = true
      this.countdownTime = 30
      var intervalId = setInterval(() => {
        this.countdownTime -= 1
        if (this.countdownTime <= 0) {
          clearInterval(intervalId)
          this.countingDown = false
        }
      }, 1000)
    },

    handleSubmit() {
      this.submitted = true
      let type = 'postData'

      //TODO: validasi form

      // if (this.nik == '') {
      //   this.$swal({
      //     icon: 'error',
      //     title: 'Failed!',
      //     text: 'NIK masih kosong'
      //   })

      //   return
      // }

      // if (this.email == '') {
      //   this.$swal({
      //     icon: 'error',
      //     title: 'Failed!',
      //     text: 'Email masih kosong'
      //   })

      //   return
      // } // etc..

      let data = {
        nik: this.nik,
        nama: this.form.nama,
        email: this.form.email,
        alamat: this.form.alamat,
        nomor_hp: this.form.nomor_hp,
        password: this.form.password,
        status: 1
      }
      data['verificationCode'] = this.form.verificationCode

      let url = ['akun/konsumen', data]

      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (result.success === false) {
            this.$swal({
              icon: 'error',
              title: 'Failed!',
              text: !!result.data
                ? Object.keys(result.data)
                    .map((err) => result.data[err])
                    .join(', ')
                : result.message
            })
          } else {
            this.$swal({
              icon: 'success',
              title: 'Success!',
              text: 'Verifikasi berhasil! Akun anda berhasil terdaftar'
            }).then(() => {
              this.$router.push({ name: 'LoginUser' })
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    sendOTP() {}
  },

  mounted() {}
}
</script>

<style>
.inputs input {
  width: 50px;
  height: 50px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

/* .form-control:focus {
  box-shadow: none;
  border: 2px solid rgb(255, 255, 255);
} */
.validate {
  border-radius: 20px;
  height: 40px;
  border: 1px solid rgb(255, 255, 255);
  width: 140px;
}
.has-error input {
  border-color: red;
}
</style>
