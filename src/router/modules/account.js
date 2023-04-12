export default [
    {
        path: '/profil',
        name: 'ProfilUser',
        component: () => import('@/views/content/ProfileUser.vue'),
        meta: {
            title: 'Profil'
        }
    },
    {
        path: '/account',
        name: 'AccountUser',
        component: () => import('@/views/content/SettingsAccount.vue'),
        meta: {
            title: 'Profil'
        }
    }

]