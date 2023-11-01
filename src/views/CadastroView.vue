<template>
    
  <div class="page">
        <v-btn @click="voltar" class="voltar-button">Voltar</v-btn>
    <div class="cadastro">
      <h1 class="title">Cadastro</h1>
      <p style="font-size: 14px; color:black; font-weight: 200;">Os campos que possuem '*' são obrigatótios preencher!</p>
      <div class="form-container">
        <div class="form-column form-column-left">
          <div class="form-group">
            <label for="nome">Nome: *</label>
            <input v-model="user.name" type="text" id="nome" placeholder="Digite seu nome" class="input-field">
          </div>
          <div class="form-group">
            <label for="usuario">Usuário: *</label>
            <input v-model="user.user" type="text" id="usuario" placeholder="Digite seu usuário" class="input-field">
          </div>
          <div class="form-group">
            <label for="email">Email: *</label>
            <input v-model="user.email" type="text" id="email" placeholder="Digite seu email" class="input-field">
          </div>
        </div>
        <div class="form-column form-column-right">
          <div class="form-group">
            <label for="senha">Senha: *</label>
            <input v-model="user.password" type="password" id="senha" placeholder="Digite sua senha" class="input-field">
          </div>
          <div class="form-group">
            <label for="repetirSenha">Repetir Senha: *</label>
            <input  v-model="user.repetirSenha" type="password" id="repetirSenha" placeholder="Repita sua senha" class="input-field">
          </div>
          <div class="form-group">
            <label for="imagem">Imagem:</label>
            <input type="file"  @change="processImage" id="imagem" class="input-field">
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
  padding: 10px;
  display: flex;
  align-items: center;
  width: 55%;
  height: auto;
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
  gap: 3.0rem; }

.form-column-left {
  margin-right: .5%;
  width: 50%;
  
}

.form-column-right {
  margin-left: 8.5%;
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
  height: auto;
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
  // import firebase from 'firebase';

export default {
  
  data() {
    return {
    user: {
    nome: '',
    user: '',
    email: '',
    password: '',
    repetirSenha: '',
  }
    };
  },
  methods: {

    processImage(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;

        localStorage.setItem('userImage', base64Image);

       
        this.user.profileImage = base64Image;
      };

      reader.readAsDataURL(file);
    }
  },

    voltar() {
      router.push({ name: 'login' });
    },
    async cadastrar() {
 
      localStorage.setItem("email", this.user.email);
      localStorage.setItem("nome", this.user.name);
      localStorage.setItem("userlocal", ('@'+this.user.user));
     

      // Atualiza a tela de usuários
      this.$store.dispatch("loadUsers");

     
      await this.$store.dispatch('register', this.user);
      if (this.$auth.isLoggedIn()) {
  const email = localStorage.getItem('email');

  if (!email) {
    console.log('Nenhum email armazenado no local storage.');
  } else {
    console.log('Email armazenado no local storage: ' + email);
  }
}
    }
  }
};

  </script>
  