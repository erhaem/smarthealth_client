export default [
  {
    path: '/stroke-analysis',
    name: 'Halaman Stroke Analysis',
    component: () => import('@/views/content/test-stroke/IndexTestStroke.vue')
  },
  {
    path: '/stroke-analysis/test',

    name: 'Onboarding Stroke Analysis',
    component: () => import('@/views/content/test-stroke/StartTest.vue')
  }
]
