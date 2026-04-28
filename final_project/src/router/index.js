import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import ProductDetails from "../views/ProductDetails.vue";
import NotFound from "../views/NotFound.vue";
import CRUD from "../views/CRUD.vue";
import Login from "../components/Login.vue";

import { useAuthStore } from '../stores/auth';

const routes = [
    { path: "/", component: Home },

    { path: "/products", component: Products },

    { path: "/products/:id", component: ProductDetails },

    { path: "/crud", component: CRUD, meta: { requiresAuth: true } },

    { path: "/:pathMatch(.*)*", component: NotFound },

    { path: "/login", component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        next("/login");
    } else {
        next();
    }
});

export default router;