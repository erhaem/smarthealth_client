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
        const url = 'https://doc-04-5o-docs.googleusercontent.com/docs/securesc/pbm8s28p0k2boj5tcgluf8fb4ctgj78s/mnk471t2t0om4nvql42mmr2t2oq3a3ap/1702556850000/03333918100342897382/03333918100342897382/1MBHO0K3tdpO20mMAEp-eqvfDs2E9KdAL?e=download&ax=AEqgLxkVAMdjZ584e7wq5lHQ3d0opW4eI3C-LVqHcNmFPYLunuY9a2hVRlG03DejfTbdxMR0UCUIJ4ePTyfXoe8sH2STXAttac1Oyg9hfZo89hoEHQlqi_eXzSgeq-vkFo3Mg_UGst3rAiOgYFsCB2n45kGDjkoi9hjKb1tEX-H3YsGcs1oCMhLnpiivTqXeuHnJTa2x9YwkStsHPlyoQf36HNfVC5bcs8iyVNv4uvwXfgGk0oQVFIui4PUpF-u5WmMyWYgmhm0Iyj5IvCshR66-_VSjoKD4qbobxewPAbsI6zNL-RF-QMYi9lTR32TPj1dTGCRgZopweBgf_zlkMWWc4TAZx13dSHoT0CnHGuKSwH6mgRogTH-RNyKeQTX1tysH6BBzIIw61i39B_8q7SeIFUkMOsB6KDnaQNaHT2YnrTHf-CxwdU6oroNBcxmDaCT9Qc4wdGBFGA4w5LcFhIUM0kKa4948iEFOBzHfIhgJHREqyVKH-VJ_-6GkZkdtg564i4q1ZBdPFdfhp2qJ1prq-3ygeRFXxhIvpfMNnEVrqLgvGU4z4aNKFQFkGk8J7Ll57H9wLZ5pPdpsTGpL9ppBEqyI8p7pMdU9y4dTV0A9XFVwhSRUZdQW0My5UugBYqlv-94q5t4k7PSuO4yjRFuy3tdVBi3Snw25DNnmNN3r6eyclORBGRp-5GmoCG7_AnYNVrEZYGwHUptN9Pit95FeuwUphAexO2R4WXQxcSUubvhO01NY5smSTiHexClZVtZJi75Ac7LMVShRvXGzYlFEVV-wiq2_0PbHPVib98eajdnBKN-fzWdn-Rm5aBImnVhYe5_jSoAjpO_R6WQxf08nSgCyVkrZtk6wHFrqTGkhJpygvgTyrlHwr452ry-dp4sKcOwRhvB7KuGUJsque8DJz8R7pbD-8P6ruUg6DA9mwJhSHELgjEnQEu6d8aq5pLxNjfJUzOvhFFgD4MbV_UWqsxZciaL5CuRlaNWPLJjoIFXFBb0UZ6e4PfdGkn-3mfDPTwj7Jkzl5E-6JqwilU4ynyuRrn-nu9a-tgU5B8ysUnIznABH0Ei2vVkCK1yyEBg_XO4&uuid=4c4e0536-a5b7-481d-bb5d-7459ea016824&authuser=0&nonce=t70953up3824a&user=03333918100342897382&hash=jb19o48eqt41djt8cvt5jqarf32vm2gh';
                window.location.href = url;
            }
        },
  }

</script>