<template>
  <div class="page">
    <div class="login">
      <h1 class="title">LOGIN</h1>
      <h3 class="label">Email:</h3>
      <input v-model="user.email" type="text" placeholder="Digite seu email" class="input-field">
      <h3 class="label">Senha:</h3>
      <input v-model="user.password" type="password" placeholder="Digite sua senha" class="input-field">
      <div class="botoes">
        <v-btn style="width: 20%;" @click="logar"><p style="font-size: 0.8rem;">Logar</p></v-btn>
        <v-btn style="width: 20%" @click="cadastro"><p style="font-size: 0.8rem;">Cadastro</p></v-btn>
        <v-btn class="google-button" @click="handleGoogle"></v-btn>
    </div>

    
      </div>
  </div>
</template>

<style>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: pink;
}

.login {
  flex-direction: column;
  background-color: rgb(148, 20, 114);
  padding: 20px;
  display: flex;
  width: 60%;
  height: 55%;
  gap: 0.8rem;
  border-radius: 40px;
  border: 2px solid white;
}

.title {
  text-align: center;
  margin: 0;
  margin-bottom: 0.5rem;
  color: white;
  font-size: 1.5rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.label {
  font-size: 1.2rem;
}

p {
  font-size: 1.0rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
}

.input-field {
  padding: 0.5rem;
  margin: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: auto;
  background-color: aliceblue;
  color: black;
  font-size: 1.2rem;
  border: 1px solid black;
  padding-left: 0.3rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.botoes {
  flex-direction: row;
  display: flex;
  gap: 2%;
  margin-top: 2%;
  align-items: center;
  justify-content: center;
}

.google-button {
  background-image: url('~@/assets/google.png'); /* Use ~@ para indicar o diretório de ativos do Vue CLI */
  background-size: cover;
  
  width: 20%;
  

}
</style>

import {ref} from 'Vue';
import {useStore} from 'Vuex'

<script>
import router from '../router/index';
import handleGoogle from '../store/googleAuth';



export default {
data(){
return{
user: {},
}
},
mounted() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      router.push({ name: 'home' });
    }
  },
 methods: {

  handleGoogle() {
      handleGoogle(); // Chame a função handleGoogle para autenticar com o Google
    },

    async logar() {
  try {
    await this.$store.dispatch("login", this.user);
    const userAuth = this.$store.getters.userAuth;
    if (userAuth && userAuth.email) {
      const userEmail = userAuth.email;
      
   
      localStorage.setItem('email', userEmail);
      
     
      router.push({ name: 'home' });
    } else {
      console('Erro ao fazer login: Usuário não autenticado corretamente');
    }
  } catch (error) {
    console.error('Erro ao fazer login: ' + error.message);
  }
}
,



   cadastro() {
     router.push({ name: 'cadastro' });
   },
 },
};
</script>