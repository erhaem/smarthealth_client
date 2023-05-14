export default [
    {
        path: '/profil',
        name: 'ProfilUser',
        component: () => import('@/views/content/profile-page/ProfileUser.vue'),
        meta: {
            title: 'Profil'
        }
    },
    {
        path: '/account',
        name: 'AccountUser',
        component: () => import('@/views/content/profile-page/SettingsAccount.vue'),
        meta: {
            title: 'Profil'
        }
    }

]