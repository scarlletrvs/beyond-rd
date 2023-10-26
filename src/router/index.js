import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView'
import {auth} from '../config/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/CadastroView.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta:{
      requiresAuth: true
    } 
  },
  {
    path: '/perfil/Maria%20Luiza/@Malu10/0 ',
    name: 'perfilMalu10',
    component: () => import(/* webpackChunkName: "about" */ '../views/PerfilView.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/perfil/:userName/:userNick/:postID',
    
  component: () => import(/* webpackChunkName: "about" */ '../views/PerfilView.vue'),
  meta:{
    requiresAuth: true
  }
  },
  {
    path: '/usuarios',
    
  component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios.vue'),
  meta:{
    requiresAuth: true
  }
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.currentUser) {
    // Se a rota requer autenticação e o usuário não está autenticado, redireciona para a tela de login
    next("/login");
  } else if (to.path === "/login" && auth.currentUser && from.path !== '/') {
    // Se a rota é a tela de login e o usuário já está autenticado, redireciona para a tela home
    next("/");
  } else {
    // Em outros casos, continua a navegação normalmente
    next();
  }
});



export default router
