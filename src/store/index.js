import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Vue from 'vue';
import Vuex from "vuex";
import {auth} from "../config/index.js";
import router from '../router/index.js';

function camposPreenchidos(name, user,email, password, repetirSenha) {
 
  return (
    name !== '' &&
    user !== '' &&
    email !== '' &&
    password !== '' &&
    repetirSenha !== ''
  );
}

// function validarNome(name) {
//   console.log(typeof name)
//   if (typeof name !== 'string' || name.length <= 1) {
//     return false; // Se o nome não for válido, retorne falso
//   }
//   return true; // Se o nome for válido, retorne verdadeiro
// }



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
     alert( 'A senha deve ter no minímo 8 caracteres!');      return;
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
    // Verificar se todos os campos do formulário foram preenchidos corretamente
    if (!camposPreenchidos(details.name, details.user, details.email, details.password, details.repetirSenha)) {
      console.log(details.name, details.user, details.email, details.password, details.repetirSenha)
      alert('Preencha todos os campos corretamente!');
      return;
    }

     
    // if (!validarNome(details.nome)) {
    //   alert('Preencha o campo nome corretamente!');
    //   return;
    // }
    
  
    if (!validarEmail(details.email)) {
      alert('Preencha um email válido!');
      return;
    }
  
    if (!validarSenha(details.password)) {
      alert('A senha deve ter no mínimo 8 caracteres!');
      return;
    }
  
    if (details.password !== details.repetirSenha) {
      alert('As senhas não coincidem!');
      return;
    }
   
  
    try {
      const email = details.email;
      const password = details.password;
  
      await createUserWithEmailAndPassword(auth, email, password);
      commit('SET_USER', auth.currentUser);
      alert('Usuário cadastrado com sucesso!');
      // Redireciona para a tela inicial (home) após o registro bem-sucedido
      router.push({ name: 'home' });
    } catch (error) {
      alert('Email já cadastrado, tente outro!');
      console.log(error.message);
    } finally {
      // Limpa os campos
      commit('reset');
    }
  }
  ,

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