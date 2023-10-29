import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Vue from 'vue';
import Vuex from "vuex";
import {auth} from "../config/index.js";
import router from '../router/index.js';



function validarEmail(email) {
  
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function validarSenha(password) {
 
  return password.length >= 8;
}

Vue.use(Vuex);



const store = new Vuex.Store({ 
  state: {
    emailExists: null,
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
    const email = details.email || '' ;
    const password = details.password || '';
    localStorage.setItem('email', details.email);
    
  
    if (email === '' && password === '' ) {
    alert('Preencha os campos antes de logar');      return;
    }
  

    if (email === '') {
      alert('Preencha o email!');      return;
    }
  
    if (password === '') {
     alert( 'Preencha o  campo senha! ');      return;
    }
  
    const emailIsValid = validarEmail(email);
    const passwordIsValid = validarSenha(password);
  
    
    if (!emailIsValid && !passwordIsValid) {
     alert( 'Preencha os campos email e senha  corretamente!');      return;
    }
  
    if (!emailIsValid && passwordIsValid) {
    alert( 'Preencha um email valido!');   
      return;
    }

    if (!passwordIsValid && emailIsValid) {
     alert( 'A senha deve ter no minímo 9 caracteres!');      return;
    }
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
     alert('As credenciais email e senha estão incorretas!');
      
      } else {
        alert( error.message);      }
      return;
    }
  
    
    commit('SET_USER', auth.currentUser);
  },
  
  
  async register({ commit }, details) {
    const email = details.email || '';
    const password = details.password || '';
  
    if (email === '' && password === '') {
alert( 'Preencha os campos antes de cadastrar!');      return;
    }
    

    if (email === '') {
      alert( 'Preencha o email!');      return;
      
    }
  
    if (password === '') {
   alert( 'Preencha o campo senha');
      return;
    }
  
    const emailIsValid = validarEmail(email);
    const passwordIsValid = validarSenha(password);
  
    
    if (!emailIsValid && !passwordIsValid) {
     alert('Preencha os email e senha corretamente!');      return;
      
    }
  
    if (!emailIsValid && passwordIsValid) {
      alert('Preencha os campo email corretamente');      return;
   
      
    }

    if (!passwordIsValid && emailIsValid) {
      alert('A senha deve ter no minímo 8 caracteres!');      return;
      
    }
  
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
  
      commit('SET_USER', auth.currentUser);
  
     alert('Usuário cadastrado com sucesso!');      
  
      // Redireciona para a tela inicial (home) após o registro bem-sucedido
      router.push({ name: 'home' });
    } catch (error) {
     alert( 'Não possivél concluir o cadastrao, verifique as informações e tente novamente!');      
      
      console.log(error.message);
    } finally {
      // Limpa os campos
      commit('reset');
    }
  },

  async logout({ commit }) {
    await signOut(auth);
  
    
    if (router.currentRoute.name !== 'login') {
      router.push({ name: 'login' });
    }
    localStorage.clear();
  
    commit('CLEAR_USER');
  },
  
  fetchUser({ commit }) {
    auth.onAuthStateChanged(async (user) => {
       
      if (user === null) {
        commit('CLEAR_USER');
      } else {
        commit('SET_USER', user);
  
        
        if (router.currentRoute.name === 'login') {
          router.push({ name: 'home' });
        }
      }
    });
  }
  
}})


 
export { store } 