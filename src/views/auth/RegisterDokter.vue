<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6 mt-3">
                <h4>Welcome <span class="text-primary">back</span></h4>
                <p class="text-secondary">
                    <small>
                        start the adventure
                    </small>
                </p>
                <div class="card shadow">
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">Register</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="registerUser">
                            <div class="row mb-3">
                                <div :class="['col-md-6', { 'has-error': submitted && !form.nama }]">
                                    <label for="name" class="form-label">Nama</label>
                                    <input type="text" id="name" class="form-control" v-model="form.nama">
                                </div>
                                <div :class="['col-md-6', { 'has-error': submitted && !form.nomorHp }]">
                                    <label for="nomor hp" class="form-label">Nomor HP</label>
                                    <input type="text" class="form-control" v-model="form.nomorHp">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div :class="['col-md-6', { 'has-error': submitted && !form.password }]">
                                    <label for="name" class="form-label">Password</label>
                                    <input type="password" class="form-control" v-model="form.password">
                                </div>
                                <div class="col-md-6">
                                    <label for="selectOption" class="form-label">Jenis Kelamin</label>
                                    <select class="form-select" v-model="form.jenisKelamin">
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
                                    <option value="dokter">Dokter</option>
                                    <option value="perawat">Perawat</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="fileInput" class="form-label me-2">Foto Pribadi *formal</label> <br>
                                <input type="file" class="form-control-file" @change="handleFoto">
                            </div>
                            <div class="mb-3">
                                <label for="fileInput" class="form-label me-2">Dokumen Pendukung STR atau STRP</label>
                                <input type="file" class="form-control-file" @change="handleFileDokumen">
                            </div>
                            <div class="text-center">
                                <button class="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 d-none d-sm-block mt-5">
                <img src="../../assets/images/register.png" class="img-fluid" alt="">
            </div>
        </div>
    </div>
</template>
  
<script>
import iziToast from 'izitoast';
export default {
    data() {
        return {
            form: {
                nama: '',
                nomorHp: '0812',
                password: '',
                jenisKelamin: '',
                option: '',
                foto: null,
                fileDokumen: null
            },
            submitted: false
        };
    },
    computed: {
        formData() {
            const formData = new FormData()

            formData.append('nama', this.form.nama)
            formData.append('nomor_hp', this.form.nomorHp)
            formData.append('password', this.form.password)
            formData.append('option', this.form.option)
            formData.append('jenis_kelamin', this.form.jenisKelamin)
            formData.append('foto', this.form.foto)
            formData.append('file_dokumen', this.form.fileDokumen)

            return formData

        }
    },
    methods: {
        registerUser() {
            this.submitted = true; // Set submitted to true at the beginning of the method
            const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            const file = this.form.foto;
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (file && allowedFormats.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    this.$store
                        .dispatch("postDataUpload", {
                            url: "autentikasi/register",
                            formData: this.formData
                        })
                        .then((result) => {
                            iziToast.success({
                                title: 'Success',
                                position: 'topRight',
                                message: 'Data Artikel Berhasil Ditambahkan',
                                timeout: 1000
                            });
                            // this.goBack();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: 'Maaf, ukuran file gambar terlalu besar. Maksimum ukuran file adalah 5MB.',
                        position: 'topRight'
                    });
                }
            } else {
                iziToast.error({
                    title: 'Error',
                    message: 'Maaf, format yang diperbolehkan hanya jpg, png, jpeg',
                    position: 'topRight'
                });
            }
        },
        handleFoto(event) {
            this.form.foto = event.target.files[0];
        },
        handleFileDokumen(event) {
            this.form.fileDokumen = event.target.files[0];
        }
    },
};
</script>
  
<style scoped>
.has-error input {
    border-color: red;
  }
</style>
  