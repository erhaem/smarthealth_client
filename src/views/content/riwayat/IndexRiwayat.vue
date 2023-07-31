<template>
    <div class="container py-3">
        <div class="mb-3">
            <h4><b>Riwayat Kunjungan</b></h4>
        </div>
        <div class="input-group mb-3 w-50">
            <span class="input-group-text border-0 bg-warning" id="search-addon">
                <i class="fas fa-magnifying-glass text-light"></i>
            </span>
            <input type="search" class="form-control rounded p-2" placeholder="Cari transaksimu di sini" />
        </div>
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col mb-2" v-for="data in antrian">
                <template v-if="isLoading">
                    <SkeletonLoading />
                </template>
                <div v-else :class="['card rounded shadow']" data-aos="fade-right" data-aos-duration="500">
                    <div class="card-body">
                        <p>
                            <b class="me-2">Kunjungan untuk dr. {{ data.ahli }}</b>| <span class="me-2">
                                {{ data.detail.tanggal }}
                            </span>
                            <span class="bg-warning pe-2 ps-2 me-2 text-light rounded" v-if="data.status == 1">
                                <small>
                                    belum kunjungan
                                </small>
                            </span>
                        </p>
                        <p class="mb-0">
                            <i class="fas fa-hospital me-2"></i>
                            <b> {{ data.lokasi.namaRs }}</b>
                        </p>
                        <p class="mb-0">
                            <i class="fas fa-location-dot me-3 text-danger"></i>
                        <b class="text-secondary"> {{ data.lokasi.alamatRs }}</b>
                        </p>
                        <p class="mb-0">
                            <i class="fas fa-clock me-3 text-success"></i>
                            <span class="text-secondary"> {{ data.detail.mulaiJam }} s/d
                                {{ data.detail.selesaiJam }}</span>
                        </p>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target="#detailQr"
                                @click="lihat(data.idJadwalAntrian)">
                                Lihat QR Code
                            </button>
                            <button class="btn btn-sm btn-danger" @click="cancelJanji(data.idJadwalAntrian)">Batalkan Kunjungan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ModalComponent id="detailQr" modalTitle="Tata Cara Kunjungan">
        <template #modal>
            <div>
                <p class="mb-0">1. Datang ke Administrasi</p>
                <p class="mb-0">2. Scan QR Code</p>
                <p class="mb-0">3. Bayar</p>
            </div>
            <div class="text-center mb-4">
                <template v-if="loadingQr">
                    <LoadingComponent/>
                </template>
                <img v-else :src="convert(qr.qrCode)" alt="">
            </div>
            <div class="d-flex justify-content-center">
                <a href="#" class="btn btn-sm btn-dark mx-auto" @click="downloadImage">Download Image</a>
            </div>
    </template>
    </ModalComponent>
</template>
<script>
import LoadingComponent from '@/components/partials-component/LoadingComponent.vue'
import SkeletonLoading from '@/components/partials-component/SkeletonLoading.vue'
import ModalComponent from '@/components/partials-component/ModalComponent.vue'
export default {
    data() {
        return {
            antrian: {},
            qr: {},
            isLoading: false,
            loadingQr: false
        }
    },
    created() {
        this.getAntrian(),
        this.lihat()
    },
    methods: {
        convert(svgCode) {
            return `data:image/svg+xml;base64,${btoa(svgCode)}`
        },
        getAntrian() {
            let type = "getData"
            let url = [
                `master/ahli/jadwal_antrian/all`, {}
            ]
            this.isLoading = true
            this.$store.dispatch(type, url).then((result) => {
                this.antrian = result.data
                this.isLoading = false
            }).catch((err) => {
                console.log(err);
            })
        },
        lihat(idJadwalAntrian) {
            let type = "getData"
            let url = [
                `qr/${idJadwalAntrian}`, {}
            ]
            this.loadingQr = true
            this.$store.dispatch(type, url).then((result) => {
                // this.antrian = result
                this.loadingQr = false
                this.qr = result
            }).catch((err) => {
                console.log(err);
            })
        },
        downloadImage() {
            // Get the SVG code from the antrian object
            let svgCode = this.qr.qrCode;

            // Convert the SVG code to a data URI with base64 encoding
            let dataUri = this.convert(svgCode);

            // Create an anchor element with the data URI as the href attribute
            let link = document.createElement('a');
            link.href = dataUri;

            // Set the filename for the downloaded image (you can modify this if needed)
            let filename = 'antrian_image.svg';
            link.setAttribute('download', filename);

            // Append the anchor element to the DOM and click it to trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the DOM
            document.body.removeChild(link);
        },
        cancelJanji(idJadwalAntrian){
            let type = "deleteData"
            let url = [
                `master/ahli/jadwal_antrian/${idJadwalAntrian}`, {}
            ]
            this.$swal({
                icon: 'question',
                title: 'Apakah Yakin Batalkan Janji Kunjungan',
                confirm
            })
            this.$store.dispatch(type, url).then((result)=>{
                console.log(result);
            })
        }
    },
    components: {
        ModalComponent, SkeletonLoading, LoadingComponent
    }
}
</script>