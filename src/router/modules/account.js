export default [
    {
        path: '/profil',
        name: 'ProfilUser',
        component: () => import('@/views/content/profile-page/ProfileUser.vue'),
        meta: {
            title: 'Profil',
            requiresAuth: true
        }
    },
    {
        path: '/account',
        name: 'AccountUser',
        component: () => import('@/views/content/profile-page/SettingsAccount.vue'),
        meta: {
            title: 'Profil',
            requiresAuth: true
        }
    }

]