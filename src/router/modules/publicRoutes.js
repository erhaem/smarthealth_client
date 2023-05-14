export default [{
    path: '/artikel/:slug',
    name:'Detail Artikel',
    component: () =>import('@/views/content/artikel/DetailArtikel.vue')
},
{
    path: '/tanya-dokter',
    name: 'Reservasi Dokter',
    component: () =>import('@/views/content/dokter/IndexDokter.vue')
},
{
    path: '/toko-kesehatan',
    name: 'Toko Kesehatan',
    component: () =>import('@/views/content/obat-produk/IndexShop.vue')
},
{
    path: '/toko-kesehatan/detail-medicine/:id',
    name: 'Detail Medicine',
    component: () =>import('@/views/content/obat-produk/DetailMedicine.vue')
},
{
    path: '/hospital',
    name: "Hospital Name",
    component: () => import('@/views/content/rumah-sakit/IndexHospital.vue')
},
{
    path: '/hospital/:id',
    name: 'Detail Hospital',
    component: () => import('@/views/content/rumah-sakit/DetailHospital.vue'),
},
{
    path: '/reservasi-perawat',
    name: 'Reservasi Perawat',
    component: () =>import('@/views/content/perawat/IndexNurse.vue')
}
]