<template>
  <div
    class="modal fade"
    :id="otpModal"
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
</template>

<script>
export default {
  name: 'ModalOtp',
  props: {
    otpModal: String
  },
  methods: {
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
      this.$nextTick(() => {
        // pake function Bootstrap modal (jquery)
        $(this.$refs.otpModal).modal('show')
      })

        // this.$store
        //   .dispatch(type, url)
        //   .then((result) => {
        //     if (result.success === false) {
        //       this.$nextTick(() => {
        //         // pake function Bootstrap modal (jquery)
        //         $(this.$refs.otpModal).modal('show')
        //       })

        //       // this.$swal({
        //       //   icon: 'error',
        //       //   title: 'gagal',
        //       //   text: 'Semua kolom wajib diisi'
        //       // })
        //     } else {
        //       // this.$refs.otpModal.show();

        //       this.$swal({
        //         icon: 'success',
        //         title: 'berhasil register'
        //       }).then(() => {
        //         this.$router.push({ name: 'LoginUser' })
        //       })
        //     }
        //   })
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
