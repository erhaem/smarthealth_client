export default [
  {
    path: '/stroke-analysis',
    name: 'Halaman Stroke Analysis',
    component: () => import('@/views/content/test-stroke/IndexTestStroke.vue'),
    meta: {
      title: 'Tes Risiko Stroke',
      requiresAuth: true /** 29/11/23
        got no idea if this 'requiresAuth' will take any effect :))
        found no 'requiresAuth' used in router/index.js LOL

        it seems you only need to assign the page name, in this case: Halaman Stroke Analysis
        to routeName there in router/index.js
        */
    }
  },
  {
    path: '/stroke-analysis/test',

    name: 'Tes Risiko Stroke',
    component: () => import('@/views/content/test-stroke/StartTest.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stroke-analysis/test/antrean',

    name: 'Buat Antrean Tes',
    component: () => import('@/views/content/test-stroke/IndexAntreanTes.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      /*page antrean requires query `dokter_id`*/
      if (!to.query.dokter_uid) {
        next('/stroke-analysis/test')
      } else {
        next()
      }
    }
  }
]
