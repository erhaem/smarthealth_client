<template>
  <div class="container py-5">
    <h2 class="text-center mb-4 fw-semibold">SKRINING PENYAKIT</h2>

    <div class="text-center mb-3">
      <router-link
        to="/hasil_screening_penyakit"
        class="btn btn-primary btn-sm"
        style="color: white; box-shadow: 2px 2px black"
        >Lihat Hasil Skrining</router-link
      >
    </div>
    <!-- Error Alert -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="card shadow-lg p-3 mb-5 bg-white rounded">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <p>Pilih gejala yang sedang dirasakan.</p>
          <div class="row">
            <div
              class="col-md-6"
              style="font-weight: bold"
              v-for="(item, index) in gejala"
              :key="index"
            >
              <div class="form-group">
                <label
                  ><b>{{ item.nama }}</b>
                </label>
                <select
                  v-model="diagnosa[item.id]"
                  class="form-control select-control"
                  :class="getBorderColor(diagnosa[item.id])"
                >
                  <option :value="null" disabled :selected="!diagnosa[item.id]">
                    Pilihlah Opsi Gejala
                  </option>
                  <option :value="`${item.id}+-1`">Pasti tidak</option>
                  <option :value="`${item.id}+-0.8`">Hampir pasti tidak</option>
                  <option :value="`${item.id}+-0.6`">Kemungkinan besar tidak</option>
                  <option :value="`${item.id}+-0.4`">Mungkin tidak</option>
                  <option :value="`${item.id}+0.4`">Mungkin</option>
                  <option :value="`${item.id}+0.6`">Sangat mungkin</option>
                  <option :value="`${item.id}+0.8`">Hampir pasti</option>
                  <option :value="`${item.id}+1`">Pasti</option>
                </select>
              </div>
            </div>
          </div>

          <div class="text-center mt-3">
            <button
              type="submit"
              class="btn btn-primary btn-outline-dark"
              style="color: white; box-shadow: 2px 2px black"
              :disabled="isLoading"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      gejala: [],
      diagnosa: {},
      error: null,
      isLoading: false
    }
  },
  methods: {
    loadGejala() {
      axios
        .get('/diagnosa')
        .then((response) => {
          this.gejala = response.data
          this.gejala.forEach((item) => {
            this.$set(this.diagnosa, item.id, null)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    submitForm() {
      this.isLoading = true
      axios
        .post('diagnosa', {
          diagnosa: Object.values(this.diagnosa)
        })
        .then((response) => {
          this.isLoading = false
          this.$router.push({ name: 'hasil_skrining' })
        })
        .catch((error) => {
          this.isLoading = false
          this.error = 'Data tidak terkirim. Silakan refresh halaman'
        })
    },
    getBorderColor(value) {
      return value === '' ? 'border-danger' : 'border-success'
    }
  },
  mounted() {
    this.loadGejala()
  }
}
</script>

<style scoped>
h2 {
  text-shadow: 1px 1px #0099ff;
  color: rgb(0, 0, 0);
}
.container {
  max-width: 800px;
  margin: auto;
}

p {
  font-weight: bold;
}
.select-control:focus {
  outline: none;
  box-shadow: none !important;
}
.border-danger {
  border-color: #dc3545 !important;
}
.border-success {
  border-color: #28a745 !important;
}
</style>
