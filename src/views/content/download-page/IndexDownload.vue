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
        const url = 'https://doc-04-5o-docs.googleusercontent.com/docs/securesc/pbm8s28p0k2boj5tcgluf8fb4ctgj78s/3ar8iche97og0ul93iei6ivmoa8mn2ns/1702556550000/03333918100342897382/03333918100342897382/1MBHO0K3tdpO20mMAEp-eqvfDs2E9KdAL?e=download&ax=AEqgLxnIkt9hxIq9la-TPDzO_u2-Xe63Rz30owKUxx2qF4JOBPwclcg9Aq3wpb4kDOCbFR5zE2Cmz7OscLQ1qbabJ38fsrucPPFHVr7IhUY4U5PuNSInI7Nxtwft-Hv1Qs4hAeXN-DZJaXv3T3KPTj6XbpIVzpJ5W2pdySGMGMferaXA0ckF2_HbhHDQkPsn5lysQIeITyPsCJPmR5uhuSK3Wardmi_Qxkyn4w4qyPeQ_jwKY2_T8iySBiatv7lZurAeK63GLuGtvH3lepECYXZZ8QB-JrbYnlh6KBl5ttfGHRKvo9Uee926MwXdR735eUB2mkWSz5enuAWXfWmds3IUHdyYcx9OBnUnYg9Nm9gVvGsrIO59aff2SsxhfvWFbFiXfHTwkaRe6gD-aeOElHA-5NJsaohL4cb5x9ywZgH8XxxlVqHGDBpeYf6xEzwjEA7nEKR-WJl8u8_XAfRPJuP8Ozh65G7ZZAuTkFYaGL3KUol961c2HMSB-0j2VJqCerzX-_0gvlrkoOkHU0g6XpGSbjIMoCQZSpjuvBRVwociswUP5O4IbBzQ3oMcqqOt15dQkrWcjuVWOui-8VIC5ZL_2i4l8_5T51FOqmVthXM9YOQ5WHb_IvknKEZEok8uyV4Ar5kheYOOnq4PldB7wTQfU8McgSDIHXGALIXmdtm13oWXuuy70f6PXhcXXmNjnbMnE8YXFqrq92w7MLo5XJG9RdotHwzyAlJ9bDNb1cKnWnvKgPkOyY-1Cj0jRNhLB8wN9G4sdfSy1btAMdQslORfB3jKW1e8jUezcD6Geel3AMt3Tb5JqUMQ7O10V19jjGY1A190r8kZ5tOboum2VB1po-0muUvVk8ONlhACGUD9Pzhk0xo8qtRgU2ehfckGEh3a4GKy0AzU8LVBEvZpN8FFqJoW8eTDEwEoME1liT8NSlL-Beunswn6cHGaAa1xL5yM9eDRDhGuwCDqQXnT3GHmmJNSTi-ifyLpIbF7L3D14L91YmF9hmHVNg4Ti8r2NMMpoE0LGsmCC425n40sJ_0uI83kDpUvMt2hnvRJU-IbW7nmH4I0uGu4gP_xNfRl5578cyM&uuid=abed81ff-a656-4258-8a42-ae12ce89e1df&authuser=0&nonce=i0refscjt7pua&user=03333918100342897382&hash=g603cdbcjlbgbv14cnu4fcdfn536m7um';
                window.location.href = url;
            }
        },
  }

</script>