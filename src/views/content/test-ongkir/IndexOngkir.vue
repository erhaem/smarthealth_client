<template>
    <div class="container px-3 py-3">
        <div class="form-group">
            <select class="form-select w-50" v-model="selectedProvinsi" @change="showKabupaten">
                <option value="">pilih provinsi</option>
                <option :value="data.id" v-for="data in provinsi">{{ data.nama }}</option>
            </select>
            <br>
            <select class="form-select w-50 mb-3" :disabled="isKotaDisabled" @change="showKecamatan" v-model="selectedKota"
                id="kota" placeholder="pilih kota">
                <option value="" selected>pilih kota</option>
                <option :value="data.id" v-for="data in kota">{{ data.nama }}</option>
            </select>
            <select class="form-select w-50 mb-3" :disabled="isKecamatanDisabled" v-model="selectedKecamatan" id="kecamatan"
                @change="showKelurahan" placeholder="pilih kecamatan">
                <option value="" selected>pilih kecamatan</option>
                <option :value="data.id" v-for="data in kecamatan">{{ data.nama }}</option>
            </select>
            <select class="form-select w-50 mb-3" :disabled="isKelurahanDisabled" v-model="selectedKelurahan" id="kelurahan"
                placeholder="pilih kelurahan">
                <option value="">pilih kelurahan</option>
                <option :value="data.id" v-for="data in kelurahan">{{ data.nama }}</option>
            </select>
        </div>
    </div>
    <textarea class="form-control mt-2" rows="4" :value="selectedLocations"></textarea>
</template>
<script>
import axios from 'axios';
import LoadingComponent from '../../../components/partials-component/LoadingComponent.vue';
import { Form } from 'vee-validate'
export default {
    data() {
        return {
            provinsi: [],
            kota: [],
            kecamatan: [],
            kelurahan: [],
            selectedKota: null,
            selectedProvinsi: null,
            selectedKecamatan: null,
            selectedKelurahan: null,
            isLoading: false,
        }
    },
    computed: {
        isKotaDisabled() {
            return !this.selectedProvinsi;
        },
        isKecamatanDisabled() {
            return !this.selectedKota
        },
        isKelurahanDisabled() {
            return !this.selectedKecamatan
        },
        selectedLocations() {
            const selectedProvinsiName = this.getSelectedName(this.selectedProvinsi, this.provinsi);
            const selectedKotaName = this.getSelectedName(this.selectedKota, this.kota);
            const selectedKecamatanName = this.getSelectedName(this.selectedKecamatan, this.kecamatan);
            const selectedKelurahanName = this.getSelectedName(this.selectedKelurahan, this.kelurahan);

            return `${selectedProvinsiName}, ${selectedKotaName}, ${selectedKecamatanName}, ${selectedKelurahanName}`;
        }
    },
    created() {
        this.getProvinsi()
    },
    methods: {
        getSelectedName(selectedId, data) {
            if (!selectedId || !data) return ''; // Return an empty string if no data or ID is selected
            const selectedData = data.find(item => item.id === selectedId);
            return selectedData ? selectedData.nama : ''; // Return the name or an empty string if not found
        },
        getProvinsi() {
            axios({
                method: "get",
                url: "http://dev.farizdotid.com/api/daerahindonesia/provinsi"
            }).then((result) => {
                this.provinsi = result.data.provinsi
            })
        },
        showKabupaten() {
            const idProvinsi = this.selectedProvinsi;
            axios({
                method: "get",
                url: `http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvinsi}`
            }).then((result) => {
                this.kota = result.data.kota_kabupaten
            })
        },
        showKecamatan() {
            const idKabupaten = this.selectedKota;
            axios({
                method: "get",
                url: `http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${idKabupaten}`
            }).then((result) => {
                this.kecamatan = result.data.kecamatan
            })
        },
        showKelurahan() {
            const idKecamatan = this.selectedKecamatan
            axios({
                method: "get",
                url: `http://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKecamatan}`
            }).then((result) => {
                this.kelurahan = result.data.kelurahan
                console.log(result);
            })
        },
    },
    components: {
        Form, LoadingComponent
    }
}
</script>