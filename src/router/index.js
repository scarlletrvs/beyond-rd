import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../config/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: () => import("../views/CadastroView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    name: "perfil",
    path: "/perfil/:userName/:userNick",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PerfilView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "usuarios",
    path: "/usuarios",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Usuarios.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    name: "configurações",
    path: "/configuracoes",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ConfiguracoesUser.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (to.path === "/login" && user) {
      console.log('authregister',auth.currentUser); 
     
      return;
    }
    if (to.path === "/cadastro" && user) {
      console.log('authregister',auth.currentUser); 
     
      return;
    }
    if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
      next("login");
      return;
    }
    next();
  });
});

export default router;
