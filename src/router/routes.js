import Register from "./modules/register";
import LoginUser from "./modules/auth";
import DetailArtikel from "./modules/artikel"
import TokoKesehatan from "./modules/medicine"
import ReservasiDokter from "./modules/dokter"
import ReservasiPerawat from "./modules/nurse"
import IndexHome from "@/views/content/IndexHome.vue"
const routes = [
    ...Register,
    ...DetailArtikel,
    ...ReservasiDokter,
    ...ReservasiPerawat,
    ...TokoKesehatan,
    ...LoginUser,
    {
        path: '/',
        name: 'IndexHome',
        component: IndexHome
    }
]

export default routes