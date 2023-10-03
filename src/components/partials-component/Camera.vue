<template>
  <div class="container-fluid">
    <div class="row">
      <h4>Diagnosa Gejala Stroke Berdasarkan Wajah</h4>
      <h6 style="display: flex; justify-content: start">Kenali gejala stroke lebih awal.</h6>
      <div class="camera-box">
        <div style="display: flex; justify-content: center; background-color: rgb(210, 209, 212)">
          <i :class="'text-success ' + icon" v-if="isCameraOpen" @click="capture"></i>

          <div class="camera-button">
            <button
              type="button"
              class="button is-rounded cam-button"
              style="margin-left: 5%; background-color: rgb(241, 241, 241); border: 0px"
              @click="toggleCamera"
            >
              <span v-if="!isCameraOpen"
                >Open Camera <br /><i :class="'text-success ' + icon"></i
              ></span>
              <span v-else>Close Cameraa <br /><i class="fa-solid fa-circle-xmark"></i></span>
            </button>
          </div>
        </div>
        <div style="display: flex; height: 600px; justify-content: center">
          <div v-if="isCameraOpen" class="camera-canvas">
            <video ref="camera" :width="canvasWidth" :height="canvasHeight" autoplay></video>
            <canvas
              v-show="false"
              id="photoTaken"
              ref="canvas"
              :width="canvasWidth"
              :height="canvasHeight"
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String
    }
  },
  name: 'Camera',

  data() {
    return {
      isCameraOpen: false,
      canvasHeight: 500,
      canvasWidth: 490,
      isPhotoTaken: false
    }
  },
  methods: {
    uploadPhoto(dataURL) {
      let uniquePictureName = this.generateUniquePictureName()
      let capturedPhotoFile = this.dataURLtoFile(dataURL, uniquePictureName + '.jpg')
      let formData = new FormData()
      formData.append('file', capturedPhotoFile)
      // Upload api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    toggleCamera() {
      if (this.isCameraOpen) {
        ;(this.isCameraOpen = false), this.stopCameraStream()
      } else {
        this.isCameraOpen = true
        this.startCameraStream()
      }
    },
    startCameraStream() {
      const constraints = (window.constraints = {
        audio: false,
        video: true
      })
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera.srcObject = stream
        })
        .catch((error) => {
          alert("Browser doesn't support or there is some errors" + error)
        })
    },
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks()
      tracks.forEach((track) => {
        track.stop()
      })
    },
    capture() {
      const FLASH_TIMEOUT = 50
      let self = this
      setTimeout(() => {
        const context = self.$refs.canvas.getContext('2d')
        context.drawImage(self.$refs.camera, 0, 0, self.canvasWidth, self.canvasHeight)
        const dataUrl = self.$refs.canvas
          .toDataURL('image/jpeg')
          .replace('image/jpeg', 'image/octet-stream')
        self.addToPhotoGallery(dataUrl)
        self.uploadPhoto(dataUrl)
        self.isCameraOpen = false
        self.stopCameraStream()
      }, FLASH_TIMEOUT)
    },
    addToPhotoGallery(dataUrl) {
      //displaying
    },
    uploadPicture(dataUrl) {
      let name = this.generateUniquePictureName()
      let capturedFile = this.dataUrlToFile(dataUrl, name)
      let formData = new FormData()
      formData.append('file', capturedFile)

      console.log('File : ', capturedFile)
    },
    generateUniquePictureName() {
      return Math.random().toString(36).substring(2, 15)
    },
    dataUrlToFile(dataUrl, filename) {
      let arr = dataUrl.split(','),
        mime = arr[0].match(/;(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }
  }
}
</script>

<style scoped>
.camera-box {
  border: 1px dashed #d6d6d6;
  border-radius: 4px;
  padding: 2px;
  width: 80%;
  min-height: 300px;
}
</style>
