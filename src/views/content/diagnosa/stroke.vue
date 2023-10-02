<template>
    <div class="container-fluid p-lg-4 bg-primary">
        <div class="container">
            <router-link style="text-decoration: none" to="/">
                <p class="text-light">
                    Home
                    /
                    <router-link to="/produk-obat" class="text-light" style="text-decoration: none">
                        {{ $route.name }}
                    </router-link>
                </p>
            </router-link>
            <div class="d-flex justify-content-between">
                <div class="text-light mb-3 d-none d-sm-block">
                    <h3>
                        Halaman Diagnosa Penyakit Stroke
                    </h3>
                </div>
            </div>
            <div class="d-flex justify-content-start pb-2"></div>
        </div>
    </div>
    <div class="container center text-center">

        <video v-if="!imageData.image" ref="video" class="camera-stream" />
        <img v-else :src="imageData.image" v-bind:style="{ transform: 'rotate(' + imageData.image_orientation + 'deg' }"
            class="camera-stream">
        <div class='ui divider'></div>

        <div class="icon-group">
            <div class="camera-icon text-center" @click="captureImage">
                <i class="fa-solid fa-camera"></i>
                <p>Take Picture</p>
            </div>
            <div class='camera-icon text-center' @click="uploadImage">
                <i class="fa-solid fa-check"></i>
                <p>Done</p>
            </div>
        </div>

        <img v-if="!imageData.image" class="camera-stream" src="../../../../public/image.png">
        <img v-else :src="imageData.image" class="camera-stream" />
    </div>
</template>

<script>
import axios from 'axios';
const API_IMAGE_ENDPOINT = 'https://localhost:8000/diagnosa-stroke';
export default {
    data() {
        return {
            defaultImage: '../../src/assets/image.png',
            mediaStream: null,
            imageData: {
                image: '',
                image_orientation: 0,
            },
        }
    },

    methods: {
        captureImage() {
            const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
            const imageCapture = new window.ImageCapture(mediaStreamTrack)
            let reader = new FileReader();
            return imageCapture.takePhoto().then(blob => {
                reader.readAsDataURL(blob)
                reader.onload = () => {
                    this.imageData.image = reader.result;
                }
            })
        },

        cancelImage() {
            this.imageData.image = null;
            this.showCameraModal = true;
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    this.$refs.video.srcObject = mediaStream;
                    this.$refs.video.play()
                    this.mediaStream = mediaStream
                })
        },

        async uploadImage() {
            // axios({ method: "POST", "url": API_IMAGE_ENDPOINT, "file": this.imageData })
            //     .then(response => {
            //         this.response = response.data;
            //     })

            // var formData = new FormData();
            // formData.append('file', this.imageData);
            // await axios({
            //     method: 'post',
            //     url: 'https://localhost:8000/diagnosa-stroke',
            //     data: formData,
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'multipart/form-data'
            //     },
            // })
            // .then(response => {
            //     console.log(response);
            // })

            // .catch(error => {
            //     console.error(error);
            // });

            let formData = new FormData();
            formData.append('file', this.imageData);
            await axios.post('http://localhost:8000/diagnosa-stroke',
                formData,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    console.log(response);
                })

                .catch(error => {
                    console.error(error);
                });
        },

    },
    mounted() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(mediaStream => {
                this.$refs.video.srcObject = mediaStream;
                this.$refs.video.play()
                this.mediaStream = mediaStream
            })
    },
}
</script>

<style>
.icon-group {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 12px auto;
}

.camera-icon {
    width: 15%;
    vertical-align: middle;
    margin: auto;
}

.camera-stream {
    margin: 120px 170px;
    width: 50%;
}
</style>