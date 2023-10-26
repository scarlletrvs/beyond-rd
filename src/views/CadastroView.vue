<template>
    <div class="page">
      <v-btn @click="voltar" class="voltar-button">Voltar</v-btn>
      <div class="cadastro">
        <h1 class="title">Cadastro</h1>
        <div class="form-container">
          <div class="form-column">
            <div class="form-group">
              <label for="nome">Nome:</label>
              <input  type="text" id="nome" placeholder="Digite seu nome" class="input-field">
            </div>
            <div class="form-group">
              <label for="usuario">Usuário:</label>
              <input type="text" id="usuario" placeholder="Digite seu usuário" class="input-field">
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input v-model="user.email" type="text" id="email" placeholder="Digite seu email" class="input-field">
            </div>
          </div>
          <div class="form-column">
            <div class="form-group">
              <label for="senha">Senha:</label>
              <input  v-model="user.senha" type="password" id="senha" placeholder="Digite sua senha" class="input-field">
            </div>
            <div class="form-group">
              <label for="repetirSenha">Repetir Senha:</label>
              <input type="password" id="repetirSenha" placeholder="Repita sua senha" class="input-field">
            </div>
            <div class="form-group">
              <label for="imagem">Imagem:</label>
              <input type="file" id="imagem" class="input-field">
            </div>
          </div>
        </div>
        <button @click="cadastrar" class="save-button">Salvar</button>
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
  
  .cadastro {
    flex-direction: column;
    background-color: rgb(148, 20, 114);
    padding: 20px;
    display: flex;
    align-items: center;
    width: 50%;
    height: auto;
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
  
  .voltar-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center; 
  }
  
  .form-column {
    display: flex;
    flex-direction: column;
    gap: 1.0rem; 
    margin-right: 1.6rem; 
    margin-left: 0.6rem;
    width: 50%;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  label {
    font-size: 1.2rem;
    color: black;
    margin-left: 0.2rem;
  }
  
  
  .input-field {
    width: 100%;
    height: 2.3rem;
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 4px;
    background-color: aliceblue;
    color: black;
    font-size: 1.2rem;
    padding-left: 0.3rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
 
  
  p {
    font-size: 1.0rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-align: center;
  }
  
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }


  .save-button {
    width: 25%; 
    margin-top: 0.9rem; 
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    color: black; 
    font-size: 1.2rem;
    background-color: white;
  }
  </style>
  
  <script>
  import router from '../router/index';
  
  export default {
    data(){
     return{
      user : {}
     }
    },
    methods: {
      voltar() {
        router.push({ name: 'login' });
      },
      cadastrar() {
   
    this.$store.dispatch("register", this.user);
    },
    },
  };
  </script>
  