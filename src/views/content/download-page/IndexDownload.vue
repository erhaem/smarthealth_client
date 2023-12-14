<template>
  <div class="container-fluid col-xxl-12 body px-4 my-5 py-2" id="heri">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-2">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="../../../assets/images/foto.png" data-aos="fade-left" data-aos-duration="1000"
          class="mx-auto d-block img-fluid animated" width="300" height="100" alt="Bootstrap Themes" loading="lazy">
      </div>
      <div class="col-lg-5" data-aos="fade-right" data-aos-duration="1000">
        <h1 class="display-5 fw-bold lh-1 mb-3">Berobat<span class="text-primary">Plus</span>.</h1>
        <p class="lead">
          Berobatplus merupakan layanan kesehatan yang dapat diakses kapanpun dan di manapun.
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" id="downloadButton" class="btn btn-primary btn-sm" @click="downloadFile">Download Apps</button>

          <button type="button" class="btn btn-outline-secondary btn-sm">Baca Lebih Lanjut</button>
        </div>
      </div>
    </div>
    <div class="row flex-lg-row-reverse align-items-center g-5">
      <div class="col-lg-6">
        <h2 class="text-primary"><b>Fitur Unggulan</b></h2>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Informasi Klinis Rumah Sakit dan Apotek
          Terdekat</p>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Konsultasi Chat sama Dokter dan Perawat</p>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Buat Janji Ketemu Dokter di Rumah Sakit</p>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Informasi Klinis Rumah Sakit dan Apotek
          Terdekat</p>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Rawat Jalan oleh Perawat Terdekat</p>
        <p class="mb-0"><b><i class="fas fa-check text-secondary"></i></b> Beli obat dan vitamin di apotek terdekat</p>
      </div>
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="../../../assets/images/foto.png" class="mx-auto d-block img-fluid animated" width="300" height="100"
          alt="Bootstrap Themes" loading="lazy">
      </div>
    </div>
  </div>
</template>
<style>
#heri .animated {
  animation: up-down 1s ease-in-out infinite alternate-reverse both;
}

@keyframes up-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
</style>

<script>
export default {
    methods: {
      downloadFile () {
                const url = 'https://doc-04-5o-docs.googleusercontent.com/docs/securesc/pbm8s28p0k2boj5tcgluf8fb4ctgj78s/q6q90s5t65o8s5v9mct092jpmidigcd3/1702555575000/03333918100342897382/03333918100342897382/1MBHO0K3tdpO20mMAEp-eqvfDs2E9KdAL?e=download&ax=AEqgLxkyJN3NG_SwbQmTWLv3-x2OzBeMITWgCorLHoE7TuWU2KKESPzv9ppLZ64mOC7RGS-9uAMptnCS-1Aic_EfgFO46hkyHVpCMNwynSEFjiu9l7k5Fi8r0Box-YXu-7czCvmTz_z4WosKylXPcHGWWc1cCq-fjIGkT1uzQe7OIMII9uLJD-y8U2m9lHg4fSH1m1_XEuIXw4ax_LSmdmwCgR66h2XSMQ7Hr2NJCdxHuVP4IWhuDEEBsb74_RgrD1XwdEbHShA08PSXXEpa5Kpy0zGVsa3_TtTVkgL9deZjD4wmIOGFPPJhU69yf8z5QNEXYZvsotGl7QcZp-vojbynsx6-t9KXX9RS384iTwm406eELzEbxLEvhrav2Q0lFcnD9CCpFX4XgqUdx6AOittvkbGG_lkLbYDd1nBDKtHHD60toRKHTo7tKwIqKXkHZJENooQQrkOcynQp_qkxYgn27RX9rfvbEnXPAySSCN_bw8lxE1ZPYgLkY9as_XlDNY7YzaPHSUNM3o8W-HxDHvhbZkgEzUWfPB4o258jnd58apMFEyRN7E4r7VLNJYRXWgoO8XBH35k7L3Ba6PcfXz0I9cpwkXc-G8wGuuzaJZ_RfDT1GsHStt6_jzv8mUmLCpPixwdI4ou7A3o_oa1R9OkFAmEGNzntIDey4Pxmlkz7WmUr6NPL9n9nCJueTnMHdVxP53Y4mR3o2tv91wg9am5HDSfYdZrU0Jt8HpjR1rKzoSmS0hqEdgx7mCOks52wFjT_nytSn1RXIexVAesvs4I46BH7fdpC0Oy0oIAKth5s3KFz16VetN1Dd9lNAu4G-5Sy53fRYec9HO_lcklALFLazxHp7tGmE9GpVFm78Vg9GtpntWy2NJb9VACLt2SdmN9B6ObFXs-gfubZfE1EhuevJjI-5Xe9o-K21b4gPGdmbMBDJqfsXoQR1oATRj8DSjltcsF4wWndvlkPqgaT5-QBVNeoiHQh_pPBtNwou1aL3dhwlmjDh-h50BBCD5-Mu3LzqBctvIQ6HX7HBM7sziUzbPjf8eBEEdObNeI33YAmkTtjUQP6trhZcvFlq0sdE8MKRWQ&uuid=1f2ff582-73f1-4eb6-adc4-4b296dff6944&authuser=0&nonce=edllvfpgh871s&user=03333918100342897382&hash=qcdeeos4h865qmrm7nh9gcvntu84731f';
                window.location.href = url;
            }
        },
  }

</script>