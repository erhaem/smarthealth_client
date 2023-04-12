import Register from "./modules/register";
import LoginUser from "./modules/auth";
import DetailArtikel from "./modules/artikel"
import TokoKesehatan from "./modules/medicine"
import ReservasiDokter from "./modules/dokter"
import ReservasiPerawat from "./modules/nurse"
import ProfilUser from "./modules/account"
import HospitalName from "./modules/hospital"
import IndexHome from "@/views/content/IndexHome.vue"
import PageNotFound from "@/views/not-found-page/NotFound.vue"
const routes = [
    ...Register,
    ...DetailArtikel,
    ...ReservasiDokter,
    ...ReservasiPerawat,
    ...TokoKesehatan,
    ...LoginUser,
    ...ProfilUser,
    ...HospitalName,
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