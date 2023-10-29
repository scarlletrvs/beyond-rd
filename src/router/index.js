import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '../config/index'



Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta:{
      requiresAuth: false
    } 
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/CadastroView.vue'),
    meta:{
      requiresAuth: false
    } 
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta:{
      requiresAuth: true
    } 
  },
  
  { name: 'perfil',
    path: '/perfil/:userName/:userNick',
    
  component: () => import(/* webpackChunkName: "about" */ '../views/PerfilView.vue'),
  meta:{
    requiresAuth: true
  }
  },
  {  name: 'usuarios',
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
    
    next("/login");
  } else if (to.path === "/login" && auth.currentUser && from.path !== '/') {
    
    next("/");
  } else {
   
    next();
  }
});



export default router