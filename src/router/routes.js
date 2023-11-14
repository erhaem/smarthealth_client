import Register from './modules/register'
import LoginUser from './modules/auth'
import ProfilUser from './modules/account'
import ArtikelModules from './modules/artikel'
import DokterModules from './modules/dokter'
import RumahSakitModules from './modules/rumahSakit'
import IndexHome from '@/views/content/IndexHome.vue'
import PageNotFound from '@/views/not-found-page/NotFound.vue'
import PublicRoutes from './modules/publicRoutes'
import ScreeningStroke from './modules/screeningStroke'
import TestStrokeModules from './modules/test-stroke'
import screeningPenyakit from './modules/screeningPenyakit'

const routes = [
  ...PublicRoutes,
  ...Register,
  ...LoginUser,
  ...ProfilUser,
  ...ArtikelModules,
  ...DokterModules,
  ...RumahSakitModules,
  ...screeningPenyakit,
  ...ScreeningStroke,
  ...TestStrokeModules,
  {
    path: '/',
    name: 'IndexHome',
    component: IndexHome
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

export default routes
