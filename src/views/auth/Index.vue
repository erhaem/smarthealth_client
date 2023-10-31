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
                <div :class="['col-md-6', { 'has-error': submitted && !form.nomorHp }]">
                  <label for="nomor hp" class="form-label">Nomor HP</label>
                  <input type="text" class="form-control" v-model="form.nomorHp" />
                </div>
              </div>
              <div class="row mb-3">
                <div :class="['col-md-6', { 'has-error': submitted && !form.password }]">
                  <label for="name" class="form-label">Password</label>
                  <input type="password" class="form-control" v-model="form.password" />
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
                <label for="selectOption" class="form-label">Jenis Akun</label>
                <select id="selectOption" class="form-select" v-model="form.option">
                  <option value="" disabled>----Pilih Jenis Akun----</option>
                  <option v-for="data in akun" :value="data.value" :key="data.value">
                    {{ data.label }}
                  </option>
                </select>
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
              <div ref="modalButton" class="text-center">
                <button class="btn w-100 btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Modal -->
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
                  @click="handleSubmit"
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
        nomorHp: '',
        password: '',
        jenisKelamin: '',
        option: 'dokter',
        foto: null,
        fileDokumen: null,
        noKtp: ''
      },
      akun: [
        { value: 'perawat', label: 'Perawat' },
        { value: 'dokter', label: 'Dokter' },
        { value: 'rumah_sakit', label: 'Rumah Sakit' },
        { value: 'apotek', label: 'Apotek' }
      ],
      submitted: false
    }
  },
  methods: {
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
      formData.append('nomor_hp', this.form.nomorHp)
      formData.append('password', this.form.password)
      formData.append('option', this.form.option)
      formData.append('jenis_kelamin', this.form.jenisKelamin)
      formData.append('no_ktp', this.form.noKtp)

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
            // this.$nextTick(() => {
            //   $(this.$refs.otpModal).modal('show')
            // })
            const resdat = result.data
            this.$swal({
              icon: 'error',
              title: result.message,
              text: Object.keys(resdat)
                .map((dat) => resdat[dat])
                .join(' ')
            })
          } else {
            this.$nextTick(() => {
              $(this.$refs.otpModal).modal('show')
            })
            // this.$swal({
            //   icon: 'success',
            //   title: 'Berhasil melakukan registrasi'
            // }).then(() => {
            //   // this.$router.push({ name: 'LoginUser' });
            // })
          }
        })
        .catch((err) => {
          console.log(err)
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

.has-error select {
  border-color: red;
}
</style>
