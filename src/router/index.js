import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';
import Cookies from 'js-cookie';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? 'Berobat +'
})

const allowedRoutes = ['Register', 'RegisterDokter', 'RegisterKonsumen', 'RegisterPerawat', 'LoginUser'];

router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get('user') != null;

  if (allowedRoutes.includes(to.name) && isAuthenticated) {
    next({ name: 'IndexHome' }); // Redirect to home page or other appropriate route
  } else {
    next(); // Allow access to the route
  }
});


router.beforeEach((to, from, next) => {
  const allowedRoles = ["RO-2003064"];
  const token = Cookies.get("token");

  if (to.name === 'ProfilUser') {
    if (!token) {
      // Redirect to the login page if the user is not logged in
      next({ name: "LoginUser" });
    } else {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        const user = JSON.parse(userCookie);
        const userRole = user.data.getRole.idRole;
        if (allowedRoles.includes(userRole)) {
          // Allow access to the route if the user has the required role
          next();
        } else {
          // Redirect to the login page or other appropriate route if the user does not have the required role
          next({ name: "LoginUser" });
        }
      } else {
        // Redirect to the login page if the user cookie is not available
        next({ name: "LoginUser" });
      }
    }
  } else {
    // Allow access to other routes
    next();
  }
});

export default router
