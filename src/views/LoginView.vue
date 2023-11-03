<template>
  <div class="page">
    <div class="login">
      <h1 class="title">LOGIN</h1>
      <h3 class="label">Email:</h3>
      <input
        v-model="user.email"
        type="text"
        placeholder="Digite seu email"
        class="input-field"
      />
      <h3 class="label">Senha:</h3>
      <input
        v-model="user.password"
        type="password"
        placeholder="Digite sua senha"
        class="input-field"
      />
      <div class="botoes">
        <v-btn class="botao1"  @click="logar"
          ><p style="font-size: 0.8rem">Logar</p></v-btn
        >
        <v-btn class="botao2" @click="cadastro"
          ><p style="font-size: 0.8rem">Cadastro</p></v-btn
        >
        <v-btn class="google-button" @click="handleGoogle"
          >Entrar com
          <v-icon style="margin-left: 3px; color: rgb(148, 20, 114)"
            >mdi-google</v-icon
          ></v-btn
        >
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.label {
  font-size: 1.2rem;
}

p {
  font-size: 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.botoes {
  flex-direction: row;
  display: flex;
  gap: 2%;
  margin-top: 2%;
  align-items: center;
  justify-content: center;
  font-size: medium;
}

.google-button {

  flex-direction: row !important;
  display: flex !important;
  gap: 6px !important;
  height: 100% !important;
  width: 30%;
}
.botao1 {
width: 25%;
}
.botao2 {
width: 25%;
}

@media (min-width: 750px) and (max-width:1245px ) {
 
  .google-button {

width: 35%;
}


.botoes {
  flex-direction: row;
  display: flex;
  gap: 2%;
  margin-top: 2%;
  align-items: center;
  justify-content: center;
  font-size: small;
  width: 100%;
  margin-left: 2px;
}
.botao1 {
width: 30%;
}
.botao2 {
width: 30%;
}
.label {
  font-size: 1.1rem;
}
}

@media (min-width: 650px) and (max-width:750px ) {
 
 .google-button {

width: 40%;
font-size: 0.8rem !important;
}
.botao1 {
width: 28%;
}
.botao2 {
width:28%;
}
.botoes {

  margin-left: 1.5%;
}
.login {
  flex-direction: column;
  background-color: rgb(148, 20, 114);
  padding: 20px;
  display: flex;
  width:80% !important;
  height: 55%;
  gap: 0.8rem;
  border-radius: 40px;
  border: 2px solid white;
}

}





@media (min-width: 300px) and (max-width:650px ) {
 
 .google-button {

width: 100%;
font-size: 0.7rem !important;
height: 40% !important;
font-weight: 550;
}

.botoes {
  flex-direction: column;
  display: flex;
  gap: 2%;
  margin-top: 2%;
  align-items: center;
  justify-content: center;
  font-size: small;
  width: 105%;
  margin-left: -8px;
  gap: 8px;
  margin-top: 6%;
  padding-left: 2%;
  padding-right: 2%;
}
.botao1 {
width: 100% !important;
font-size: 0.6rem !important;
font-weight: 500;
height: 10%;
}
.botao2 {
width: 100%;
font-size: 0.6rem !important;
font-weight: 500;
}
.label {
  font-size: 0.9rem;

}
.input-field {
  
  width: 102%;
   margin-left: -0.5%;
  padding-left: 2% !important;
  padding-right: 2% !important;
  
}
.login {
  flex-direction: column;
  background-color: rgb(148, 20, 114);
  padding: 20px;
  display: flex;
  width:80% !important;
  height: 70%;
  gap: 0.8rem;
  border-radius: 40px;
  border: 2px solid white;
}


}
</style>

<script>
import router from "../router/index";
import handleGoogle from "../store/googleAuth";

export default {
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      router.push({ name: "home" });
    }
  },
  methods: {
    handleGoogle() {
      handleGoogle();
    },

    async logar() {
      try {
        await this.$store.dispatch("login", this.user);
        const userAuth = this.$store.getters.userAuth;
        if (userAuth && userAuth.email) {
          const userEmail = userAuth.email;

          localStorage.setItem("email", userEmail);

          router.push({ name: "home" });
        } else {
          console("Erro ao fazer login: Usuário não autenticado corretamente");
        }
      } catch (error) {
        console.error("Erro ao fazer login: " + error.message);
      }
    },
    cadastro() {
      router.push({ name: "cadastro" });
    },
  },
};
</script>
