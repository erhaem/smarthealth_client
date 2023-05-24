export default [
    {
        path: '/artikel',
        name: 'Detail Artikel',
        component: () => import('@/views/content/artikel/DetailArtikel.vue'),
        children: [
            {
                path: 'kategori/:id',
                name: 'Kategori Artikel',
                component: () => import('@/views/content/artikel/ArtikelByKategori.vue')
            },
            {
                path: ':slug',
                component: () => import('@/views/content/artikel/ArtikelBySlug.vue'),
            },
            {
                path: 'kategori/*', // Catch-all route for "/artikel/kategori/*"
                component: () => import('@/views/content/not-found-page/NotFound.vue')
            }
        ]
    },
    {
        path: '/chat-dokter/',
        component: () => import('@/views/content/dokter/IndexDokter.vue'),
        children: [
            {
                path: '',
                redirect: 'dokter',
            },
            {
                path: 'dokter',
                component: () => import('@/views/content/dokter/SpesialisDokter.vue'),
            },
            {
                path: 'dokter/:id',
                name: 'Detail Dokter',
                component: () => import('@/views/content/dokter/DetailDokter.vue'),
            },
        ],
    },

    {
        path: '/toko-kesehatan',
        name: 'Toko Kesehatan',
        component: () => import('@/views/content/obat-produk/IndexShop.vue')
    },
    {
        path: '/toko-kesehatan/detail-medicine/:id',
        name: 'Detail Medicine',
        component: () => import('@/views/content/obat-produk/DetailMedicine.vue')
    },
    {
        path: '/hospital',
        name: "Hospital Name",
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
        path: '/reservasi-perawat',
        name: 'Reservasi Perawat',
        component: () => import('@/views/content/perawat/IndexPerawat.vue')
    },
    {
        path: '/produk_kategori/:id',
        name: 'Kategori Produk',
        component: () => import('@/views/content/obat-produk/KategoriProduk.vue')
    },
    {
        path: '/produk-obat',
        name: 'Apotek Terdekat',
        component: () => import('@/views/content/apotek/IndexApotek.vue')
    },
    {
        path: '/produk-obat/:id',
        name: 'Detail Produk',
        component: () => import('@/views/content/apotek/DetailProduk.vue')
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