import Register from "./modules/Register";
import PageUser from "@/views/PageUser.vue"
const routes = [
    ...Register,
    {
        path: '/',
        name: 'PageUser',
        component: PageUser
    }
]

export default routes