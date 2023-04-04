export default [{
    path: '/artikel/:slug',
    name:'DetailArtikel',
    component: () =>import('@/views/content/DetailArtikel.vue'),
    meta: {
        title: 'Artikel'
    }
}]