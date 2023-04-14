export default [{
    path: '/hospital',
    name: "HospitalName",
    component: () => import('@/views/content/IndexHospital.vue')
},
{
    path: '/hospital/:id/:slug',
    name: "SpecialistSlug",
    component: () => import('@/views/content/SpecialistDetail.vue')
},
{
    path: '/hospital/:id',
    name: 'DetailHospital',
    component: () => import('@/views/content/DetailHospital.vue'),
},
]