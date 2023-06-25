export default [
    {
        path: '/artikel',
        name: 'Halaman Artikel',
        component: ()=>import('@/views/content/artikel/IndexArtikel.vue'),
    },
    {
        path: '/artikel/:slug',
        name: 'Isi Artikel',
        component: ()=>import('@/views/content/artikel/ArtikelBySlug.vue')
    },
    {
        path: '/artikel/:idKategori/:idGroupingArtikel',
        name: 'Isi Kategori Artikel',
        component: ()=>import('@/views/content/artikel/ArtikelByKategori.vue')
    },
    {
        path: '/download-app',
        name: 'Download App',
        component: ()=>import('@/views/content/download-page/IndexDownload.vue')
    },
    {
        path: '/riwayat',
        name: 'Riwayat Konsumen',
        component: ()=>import('@/views/content/riwayat/IndexRiwayat.vue')
    },
    {
        path: '/chat-dokter/',
        component: () => import('@/views/content/dokter/IndexDokter.vue'),
        children: [
            {
                path: '',
                redirect: '/',
            },
            {
                path: 'dokter',
                component: () => import('@/views/content/dokter/SpesialisDokter.vue'),
            },
            {
                path: 'dokter/:idDokter/:idAhli',
                name: 'Detail Dokter',
                component: () => import('@/views/content/dokter/DetailDokter.vue'),
            },
            {
                path: 'dokter/:idPerawat/:idAhli',
                name: 'Detail Dokter',
                component: () => import('@/views/content/perawat/IndexPerawat.vue'),
            },
            {
                path: 'cari',
                name: 'Cari Keahlian',
                component: ()=>import('@/views/content/dokter/SearchByKeahlian.vue'),
                params: true
            }
        ],
    },
    {
        path: '/hospital',
        name: "Rumah Sakit Terdekat",
        component: () => import('@/views/content/rumah-sakit/IndexHospital.vue')
    },
    {
        path: '/detail_rumah_sakit/:id',
        name: 'Detail Hospital',
        component: () => import('@/views/content/rumah-sakit/DetailHospital.vue'),
    },
    {
        path: '/detail_rumah_sakit/:idPenyakit/:id',
        name: 'Detail Spesialis Rs',
        component: () => import('@/views/content/rumah-sakit/DetailSpesialisRs.vue'),
    },
    {
        path: '/detail_rumah_sakit/buat_janji/:idAhli/:idDetailPraktek',
        name: 'Detail Janji Rs',
        component: () => import('@/views/content/rumah-sakit/IndexJanjiRs.vue'),
    },
    {
        path: '/tes/:idAhli/:idJadwalPraktek',
        name: 'Detail Janji',
        component: () => import('@/views/content/rumah-sakit/DetailJanjiRs.vue'),
        // meta: {
        //     requiresAuth: true
        // }
    },
    {
        path: '/reservasi-perawat',
        name: 'Reservasi Perawat',
        component: () => import('@/views/content/perawat/IndexPerawat.vue')
    },
    {
        path: '/produk-obat',
        name: 'Obat dan Vitamin',
        component: () => import('@/views/content/apotek/IndexApotek.vue')
    },
    {
        path: '/produk-obat/:id',
        name: 'Detail Produk',
        component: () => import('@/views/content/apotek/DetailProduk.vue')
    },
    {
        path: '/produk-obat/apotek/:id',
        name: 'Produk Apotek',
        component: () => import('@/views/content/apotek/IndexObatApotek.vue')
    },
    {
        path: '/test_ongkir',
        component: () => import('@/views/content/test-ongkir/IndexOngkir.vue')
    },
    {
        path: '/keranjang',
        component: () => import('@/views/content/checkout-page/IndexCheckout.vue')
    }
]