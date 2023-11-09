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
            <form @submit.prevent="post">
              <div class="row mb-3">
                <div :class="['col-md-6', { 'has-error': submitted && !form.nama }]">
                  <label for="name" class="form-label">Nama</label>
                  <input type="text" id="name" class="form-control" v-model="form.nama" />
                </div>
                <div :class="['col-md-6', { 'has-error': submitted && !form.nomor_hp }]">
                  <label for="nomor_hp" class="form-label">Nomor HP</label>
                  <input type="text" class="form-control" v-model="form.nomor_hp" />
                  <div class="text-danger small" v-if="phoneError">{{ phoneError }}</div>
                </div>
              </div>
              <div class="row mb-3">
                <div :class="['col-md-6', { 'has-error': submitted && !form.password }]">
                  <label for="name" class="form-label">Password</label>
                  <input type="password" class="form-control" v-model="form.password" />
                </div>
                <div :class="['col-md-6', { 'has-error': submitted && !form.email }]">
                  <label for="name" class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="form.email" />
                  <div class="text-danger small" v-if="emailError">{{ emailError }}</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="selectOption" class="form-label">Jenis Akun</label>
                  <select id="selectOption" class="form-select" v-model="form.option">
                    <option value="" disabled>----Pilih Jenis Akun----</option>
                    <option v-for="data in akun" :value="data.value" :key="data.value">
                      {{ data.label }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="selectOption" class="form-label">Jenis Kelamin</label>
                  <select
                    :class="[
                      'form-select select',
                      { 'has-error': submitted && !form.jenisKelamin }
                    ]"
                    v-model="form.jenisKelamin"
                  >
                    <option value="" disabled>----Pilih Jenis Kelamin----</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label for="fotoInput" class="form-label me-2">Foto Pribadi *formal</label> <br />
                <input type="file" id="fotoInput" class="form-control-file" @change="handleFoto" />
              </div>
              <div class="mb-3">
                <label for="fileInput" class="form-label me-2"
                  >Dokumen Pendukung STR, STRP, atau Bukti Kepemilikan</label
                >
                <br />
                <input
                  type="file"
                  id="fileInput"
                  class="form-control-file"
                  @change="handleFileDokumen"
                />
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
              <div ref="modalButton" class="text-center">
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
      form: {
        nama: '',
        nomor_hp: '',
        email: '',
        password: '',
        jenisKelamin: '',
        option: 'dokter',
        foto: null,
        fileDokumen: null,
        noKtp: '',
        verificationCode: ''
      },
      akun: [
        { value: 'perawat', label: 'Perawat' },
        { value: 'dokter', label: 'Dokter' },
        { value: 'rumah_sakit', label: 'Rumah Sakit' },
        { value: 'apotek', label: 'Apotek' }
      ],
      submitted: false,
      showMessageWA: null,
      showMessageMail: null,
      phoneError: null,
      emailError: null,
      countdownTime: 0,
      countingDown: false,
      sendEmail: false,
      sendSuccess: false,
      sendProceed: false
    }
  },
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
    changeRoute() {
      this.$router.push('RegisterKonsumen')
    },
    handleFoto(event) {
      this.form.foto = event.target.files[0]
    },
    handleFileDokumen(event) {
      this.form.fileDokumen = event.target.files[0]
    },
    async post() {
      this.submitted = true
      const formData = new FormData()
      formData.append('nama', this.form.nama)
      formData.append('nomor_hp', this.form.nomor_hp)
      formData.append('email', this.form.email)
      formData.append('password', this.form.password)
      formData.append('option', this.form.option)
      formData.append('jenis_kelamin', this.form.jenisKelamin)
      formData.append('no_ktp', this.form.noKtp)
      formData.append('verificationCode', this.form.verificationCode)

      const fotoFile = this.form.foto
      if (fotoFile && (fotoFile.type === 'image/png' || fotoFile.type === 'image/jpeg')) {
        formData.append('foto', fotoFile)
      } else {
        this.$swal({
          icon: 'error',
          title: 'Format Foto Invalid',
          text: 'Foto harus berformat PNG atau JPEG.'
        })
        return
      }
      const fileDokumenFile = this.form.fileDokumen
      if (fileDokumenFile && fileDokumenFile.type === 'application/pdf') {
        formData.append('file_dokumen', fileDokumenFile)
      } else {
        this.$swal({
          icon: 'error',
          title: 'Format File Invalid',
          text: 'Dokumen harus berformat .PDF'
        })
        return
      }
      this.$store
        .dispatch('postDataUpload', ['autentikasi/register', formData])
        .then((result) => {
          console.log(result.success)
          if (result.success === false) {
            const resdat = result.data
            this.$swal({
              icon: 'error',
              title: 'Failed!',
              text: !!resdat
                ? Object.keys(resdat)
                    .map((dat) => resdat[dat])
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
    }
  },
  mounted() {}
}
</script>

<style>
.has-error input {
  border-color: red;
}

.has-error select {
  border-color: red;
}
</style>
