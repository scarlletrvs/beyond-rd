import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Vue from 'vue';
import Vuex from "vuex";
import {auth} from "../config/index.js";
import router from '../router/index.js';



Vue.use(Vuex);

const store = new Vuex.Store({ 
state:{
  user:null,
},
mutations:{
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_USER(state){
    state.user = null;
  }
},
actions:{
  async login({ commit }, details) {
    const { email, password } = details;
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.code);
      return;
    }
  
    commit("SET_USER", auth.currentUser);
  }, 

async register({ commit }, details) {
  const { email, password } = details;

  try {
    
    await createUserWithEmailAndPassword(auth, email, password);

   
    commit('SET_USER', auth.currentUser);

    
    console.log('User account created successfully!');
  } catch (error) {
  
    console.log(error.message);
  }
},
  async logout ({commit}){
  await signOut(auth);

  commit("CLEAR_USER");
  router.push("/login");
 },
 fetchUser({commit}) {
auth.onAuthStateChanged(async (user) => {
  if (user === null) {
    commit("CLEAR_USER");
  } else {
    commit("SET_USER", user );

    if(router.currentRoute.path === "/login" ) {
      router.push("/");
    }
  }
})
 }} })

 
export { store }