    export default [{
        path: '/register',
        name: "Register",
        component: () => import('@/views/auth/IndexRegister.vue'),
    },
    {
        path: '/register-dokter/',
        name: "RegisterDokter",
        component: () => import('@/views/auth/RegisterDokter.vue')
    },
    {
        path: '/register-konsumen/',
        name: "RegisterKonsumen",
        component: () => import('@/views/auth/RegisterKonsumen.vue')
    },
    {
        path: '/register-perawat/',
        name: "RegisterPerawat",
        component: () => import('@/views/auth/RegisterPerawat.vue')
    }
    ]