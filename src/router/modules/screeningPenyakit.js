export default [
  {
    path: '/screening_penyakit',
    name: 'skrining_penyakit',
    component: () => import('@/views/content/screening-penyakit/index.vue')
  },

  {
    path: '/hasil_screening_penyakit',
    name: 'hasil_skrining',
    component: () => import('@/views/content/screening-penyakit/hasil.vue')
  },

  {
    path: '/detail_screening_penyakit/:id',
    name: 'detail_skrining',
    component: () => import('@/views/content/screening-penyakit/detail.vue'),
    props: true
  }
]
