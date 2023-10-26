import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/CadastroView.vue'),
   
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
   
   
  },
  
  {
    path: '/perfil/Maria%20Luiza/@Malu10/0 ',
    name: 'perfilMalu10',
    component: () => import(/* webpackChunkName: "about" */ '../views/PerfilView.vue'),
   
  
  },
  {
    path: '/perfil/:userName/:userNick/:postID',
    
  component: () => import(/* webpackChunkName: "about" */ '../views/PerfilView.vue'),
 
 
  },
  {
    path: '/usuarios',
    
  component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios.vue'),
 
 
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
