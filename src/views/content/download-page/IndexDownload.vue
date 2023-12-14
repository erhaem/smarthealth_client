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
        const url = 'https://doc-04-5o-docs.googleusercontent.com/docs/securesc/pbm8s28p0k2boj5tcgluf8fb4ctgj78s/dcqfn99dau9v0rt8adoeqn0rhjeid5sc/1702557825000/03333918100342897382/03333918100342897382/1MBHO0K3tdpO20mMAEp-eqvfDs2E9KdAL?e=download&ax=AEqgLxm07rj0vXsZNEFr7kaqjrtxtYrrCkdLjm_hPRIW6EICgXgp4Hg7cxhtIONIJguBKXDbNz5f9_DhRWj9wDr6-rluQslpzVM9HhD_ITXhcr9PJ_q8oQ6WvMQxyqam54k52ldsflKgbWGZDmm3Lf2ce5hXJ1DTgpqJUMuMiKwortL8TKNlTMtWJAmexGSIS1TRhsT-QaZMpeGMGsgNtVhLK2u66XR-PnI480gR2MFjjb6H7JM16ID8uylDNGBRYYLKrI8WLClJnVbi1H5yxQrPZmlKrNz0Df71YqWJHIwgQgSw79liO_hvxEsc7jwHqQICXg4mADiM8gVe5glpnODpzcwMdFwX_P9-4R504F_mCTA9HYzaDAjYLB3l7nmUf_BfeRLJLZv0DNwqK0QGmuNiJTOzsdHNKlsPoFkAG9YEzJo5NI6G12HR3xJXoFOwXl7NTFnYFsfjswMfXZZqary9SkpVUsVKY90srQ_untOmQc7ifygUYRgrdxYToNVK4blXgcdklwKwPaUAAwkMyDz0qV8O-9D910Ot7CPqmemTryDAzKDDG0wTtModCtFFLBxf9fn0X05jaUy1lALbZY9hx4D0VGgoBiHEmks0kX8kwRymLlS8wzMMJzPp6yZ-R4RreNp3z2_h543EMWlzXwSW4NJbJ6GCkeXO9PL8x4l-S0VcF_6o8fMwcrLf2MabV-HbkDpd7B62IziPZugPRZs8VNuUq9Iy6CUYhdBPsi0SlNnNx02n7RHqqOC9p7WsvKhEV7Q5SmlDOvTFHoMQg-sO4nTnXP1yWRUn-bedR1Em3yEjzv0YeFVr-CcuXvYZsv7T7WKjijoBp08S_UbRL8G9-lCbRhSEtlQ1GKbnoEetNmSiVKHx6xrEbqGXY8iZqM7trWqIjkKPdjq1jmDbtS1bbp_UMY_bI7LapYX-UmhY32ifyZrIF7tN1OlSTsfvknq0KlpQm0WXjasqTHAdG6Gg7LanQjTvxp_1_l3QDltSHVQLmzGP-tmL6k2YlaPPAGcIrV8e0trNABDx72hxog34MA08cfSXKseZNueLO9fpOZZ256uhdX7Xk0eK5tYjcRwWOEs&uuid=7bbb6221-07b6-42b9-8edd-e7ed79be8b60&authuser=0&nonce=6unpjk8mroeko&user=03333918100342897382&hash=kj89h72o6qhmhgh12tb25a51uav8f598';
                window.location.href = url;
            }
        },
  }

</script>