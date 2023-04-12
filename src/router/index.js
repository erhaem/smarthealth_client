import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';
import Cookies from "js-cookie";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  document.title  = to.meta?.title ?? 'Berobat +'
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get("token")
  if (to.name === 'ProfileUser' && token) next({ name: "IndexHome" });
  else next()
})
export default router
