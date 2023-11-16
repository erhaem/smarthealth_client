export default [
  {
    path: '/stroke-analysis',
    name: 'Halaman Stroke Analysis',
    component: () => import('@/views/content/test-stroke/IndexTestStroke.vue')
  },
  {
    path: '/stroke-analysis/test',

    name: 'Tes Risiko Stroke',
    component: () => import('@/views/content/test-stroke/StartTest.vue')
  }
]
