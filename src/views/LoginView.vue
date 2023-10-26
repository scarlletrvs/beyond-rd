<template>
   <div class="page">
     <div class="login">
       <h1 class="title">LOGIN</h1>
       <h3 class="label">Email:</h3>
       <input type="text" placeholder="Digite seu email" class="input-field">
       <h3 class="label">Senha:</h3>
       <input type="password" placeholder="Digite sua senha" class="input-field">
       <div class="botoes">
         <v-btn @click="logar"><p>Logar</p></v-btn>
         <v-btn @click="cadastro"><p>Cadastro</p></v-btn>
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
  height: 50%;
  gap: 0.8rem;
  border-radius: 40px;
  border: 2px solid white;
}

.title {
  text-align: center; /* Centralize o título horizontalmente */
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
  gap: 0.8rem;
  margin-top: 1.2rem;
  align-items: center;
  justify-content: center; /* Centralize horizontalmente */
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>

<script>
import router from '../router/index';

export default {
  methods: {
    logar() {
      router.push({ name: 'home' });
    },
    cadastro() {
      router.push({ name: 'cadastro' });
    },
  },
};
</script>
