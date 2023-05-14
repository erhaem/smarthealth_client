import Register from "./modules/register";
import LoginUser from "./modules/auth";
import ProfilUser from "./modules/account"
import IndexHome from "@/views/content/IndexHome.vue"
import PageNotFound from "@/views/not-found-page/NotFound.vue"
import PublicRoutes from "./modules/publicRoutes";
const routes = [
    ...PublicRoutes,
    ...Register,
    ...LoginUser,
    ...ProfilUser,
    {
        path: '/',
        name: 'IndexHome',
        component: IndexHome
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'PageNotFound', 
        component: PageNotFound 
    },

]

export default routes