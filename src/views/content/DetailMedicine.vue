<template>
    <div class="container col-sm-12 col-xl-10 px-4 py-4 border-top">
        <!-- <div class="row align-items-top g-lg-5">
            <div class="col-lg-4 px-4 py-4">
                <img src="../../assets/images/obat.jpg" class="img-fluid img-thumbnail rounded w-75" alt="">
            </div>
            <div class="col-lg-4 px-4 py-4">
                <div class="header">
                    <h5>Paracetamol</h5>
                    <h6 class="text-secondary">Rp. 20.000</h6>
                    <p class="fw-1">Harga tiap apotek berbeda</p>
                </div>
                <div class="d-inline-flex grip-4 pb-3">
                    <button class="btn btn-sm btn-outline-primary px-2 me-2">
                        Add to cart
                    </button>
                    <button class="btn btn-sm btn-danger px-4">
                        + 1 -
                    </button>
                </div>
                <div class="body py-2 border-top">
                    <h6>Deskripsi</h6>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum at porro quis odit eaque assumenda expedita eius, laudantium iusto molestiae ad veritatis praesentium. Blanditiis laudantium ratione soluta, debitis nemo explicabo!</p>
                </div>
                <div class="body py-2 border-top">
                    <h6>Indikasi Umum</h6>
                    <p>laudantium iusto molestiae ad veritatis praesentium. Blanditiis laudantium ratione soluta, debitis nemo explicabo!</p>
                </div>
                <div class="body py-2 border-top">
                    <h6>Komposisi</h6>
                    <p class="" style="font-size: 13px; color: gray">laudantium iusto molestiae ad veritatis praesentium. Blanditiis laudantium ratione soluta, debitis nemo explicabo!</p>
                </div>
            </div>
            <div class="col-lg-4 px-4 py-4">
                <div class="header">
                    <h5>Obat yang mirip</h5>
                </div>
                <div class="card border-0 mb-3 py-2">
                    <div class="row g-0">
                      <div class="col-sm-4 align-items-center">
                        <img src="https://d2qjkwm11akmwu.cloudfront.net/products/665462_20-3-2023_14-10-30.png" class="img-fluid rounded" alt="...">
                      </div>
                      <div class="col-md-8">
                          <h6 class="mb-0">Paracemenk</h6>
                          <p class="text-primary">Rp. 25.000</p>
                          <p><small class="btn btn-sm btn-outline-danger">tambah</small></p>
                      </div>
                    </div>
                </div>
                <div class="card border-0 mb-3 py-2">
                    <div class="row g-0">
                      <div class="col-sm-4 align-items-center">
                        <img src="https://d2qjkwm11akmwu.cloudfront.net/products/665462_20-3-2023_14-10-30.png" class="img-fluid rounded" alt="...">
                      </div>
                      <div class="col-md-8">
                          <h6 class="mb-0">Paracemenk</h6>
                          <p class="text-primary">Rp. 25.000</p>
                          <p><small class="btn btn-sm btn-outline-danger">tambah</small></p>
                      </div>
                    </div>
                </div>
            </div>
        </div> -->
        <h3>
            {{ detailMedicines.id }}
        </h3>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            detailMedicines: '',
            id: ''
        }
    },
    created(){
        this.id = this.$route.params.id
        axios.get('https://berobatplus.shop/api/master/obat/data_obat?id=$(this.id)').then((response)=>{
            console.log(response);
        }).catch((err)=>{
            console.log(err);
        })
    }
}
</script>