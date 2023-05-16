export default [{
    path: '/artikel/:slug',
    name: 'Detail Artikel',
    component: () => import('@/views/content/artikel/DetailArtikel.vue')
},
{
    path: '/tanya-dokter/',
    component: () => import('@/views/content/dokter/IndexDokter.vue'),
    children: [
        {
            path: 'tes',
            component: () => import('@/views/content/dokter/SpesialisDokter.vue')
        },
        {
            path: ':id',
            name: 'Detail Dokter',
            component: () => import('@/views/content/dokter/DetailDokter.vue')
        },
    ]
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
    component: () => import('@/views/content/perawat/IndexNurse.vue')
},
{
    path: '/produk_kategori/:id',
    name: 'Kategori Produk',
    component: () => import('@/views/content/obat-produk/KategoriProduk.vue')
},
{
    path: '/apotek',
    name: 'Apotek Terdekat',
    component: () => import('@/views/content/apotek/IndexApotek.vue')
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