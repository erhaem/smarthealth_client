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
                  <label for="name" class="form-label">Nomor Hp</label>
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
                  <label for="name" class="form-label">Verification Code</label>
                  <!-- <input type="text" class="form-control" v-model="form.nomor_hp" /> -->
                  <div class="input-group">
                    <input
                      type="text"
                      id="verificationCode"
                      class="form-control"
                      placeholder="Verification Code"
                      aria-label="Recipient's username with two button addons"
                    />
                    <button
                      v-if="!countingDown"
                      class="btn btn-outline-primary"
                      type="button"
                      @click="sendCode"
                    >
                      Send
                    </button>
                    <button
                      v-if="countingDown"
                      class="btn btn-outline-primary disabled"
                      type="button"
                    >
                      Sent ({{ countdownTime }})
                    </button>
                  </div>
                  <div v-if="showMessageWA && !showMessageMail" class="small">
                    <div class="text-success pb-2">{{ showMessageWA }}</div>
                    <span>Belum menerima kode ?</span>

                    <button
                      type="button"
                      class="btn btn-link text-decoration-none btn-sm"
                      @click="sendEmailCode"
                      :disabled="countingDown"
                    >
                      Kirim Kode Melalui Email
                    </button>
                  </div>
                  <div v-if="sendEmailCode && showMessageMail" class="small">
                    <div class="text-success pb-2">{{ showMessageMail }}</div>

                    <button
                      type="button"
                      class="btn btn-link text-decoration-none btn-sm"
                      @click="sendCode"
                      :disabled="countingDown"
                    >
                      Kirim Kode Melalui WhatsApp
                    </button>
                  </div>
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

      <!-- </template> -->

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
        status: ''
      },
      showMessageWA: null,
      showMessageMail: null,
      phoneError: null,
      emailError: null,
      countdownTime: 0,
      countingDown: false,
      sendEmail: false,
      submitted: false,
      otpCode: ''
    }
  },
  components: {},
  methods: {
    sendCode() {
      if (!this.form.nomor_hp) {
        this.phoneError = 'Phone number cannot be empty'
        return
      }
      this.showMessageWA = 'Verification code has been sent to your WhatsApp'
      this.countdown()
      this.phoneError = null
    },
    sendEmailCode() {
      if (!this.form.email) {
        this.emailError = 'Email cannot be empty'
        return
      }
      this.sendEmail = true
      this.showMessageMail = 'Verification code has been sent to your Email'
      this.countdown()
      this.emailError = null
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
    // TODO: bikin function handle submitan dari modal OTP
    //TODO: Bikin module terpisah untuk reusability modal
    handleSubmit() {
      this.submitted = true
      let type = 'postData'
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
      // this.$nextTick(() => {
      //         // pake function Bootstrap modal (jquery)
      //         $(this.$refs.otpModal).modal('show')
      //       })

      this.$store
        .dispatch(type, url)
        .then((result) => {
          if (result.success === false) {
            this.$swal({
              icon: 'error',
              title: 'gagal',
              text: 'Semua kolom wajib diisi'
            })
          } else {
            this.$nextTick(() => {
              // pake function Bootstrap modal (jquery)
              $(this.$refs.otpModal).modal('show')
            })
            // this.$refs.otpModal.show();

            this.$swal({
              icon: 'success',
              title: 'berhasil register'
            }).then(() => {
              this.$router.push({ name: 'LoginUser' })
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
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

.form-control:focus {
  box-shadow: none;
  border: 2px solid rgb(255, 255, 255);
}
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
