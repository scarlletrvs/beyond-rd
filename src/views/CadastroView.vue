<template>
  <div class="page">
    <v-btn @click="voltar" class="voltar-button">Voltar</v-btn>
    <div class="cadastro">
      <h1 class="title">Cadastro</h1>
      <p class="description">Os campos marcados com '*' são obrigatórios.</p>
      <div class="form-container">
        <div class="form-column form-column-left">
          <div class="form-group">
            <label for="nome">Nome: *</label>
            <input
              v-model="user.nome"
              type="text"
              id="nome"
              placeholder="Digite seu nome"
              class="input-field"
            />
          </div>
          <div class="form-group">
            <label for="usuario">Usuário: *</label>
            <input
              v-model="user.user"
              type="text"
              id="usuario"
              placeholder="Digite seu usuário"
              class="input-field"
            />
          </div>
          <div class="form-group">
            <label for="email">Email: *</label>
            <input
              v-model="user.email"
              type="text"
              id="email"
              placeholder="Digite seu email"
              class="input-field"
            />
          </div>
          <div class="form-group">
            <label for="telefone">Telefone: *</label>
            <input
              v-model="user.telefone"
              type="phone"
              id="telefone"
              placeholder="Digite seu telefone"
              class="input-field"
            />
          </div>
        </div>
        <div class="form-column form-column-right">
          <div class="form-group">
            <label for="senha">Senha: *</label>
            <input
              v-model="user.password"
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              class="input-field"
            />
          </div>
          <div class="form-group">
            <label for="repetirSenha">Repetir Senha: *</label>
            <input
              v-model="user.repetirSenha"
              type="password"
              id="repetirSenha"
              placeholder="Repita sua senha"
              class="input-field"
            />
          </div>
          <div class="form-group">
            <label for="imagem">Imagem:</label>
            <input
              type="file"
              @change="processImage"
              id="imagem"
              class="input-field"
            />
          </div>
          <div class="form-group">
            <label for="dataNasc">Data de Nascimento: *</label>
            <input
              v-model="user.dataNasc"
              type="date"
              id="dataNasc"
              class="input-field"
            />
          </div>
        </div>
      </div>
      <button @click="cadastrar" class="save-button">Salvar</button>
    </div>
  </div>
</template>

<script>
import router from "../router/index";

export default {
  data() {
    return {
      user: {
        nome: "",
        user: "",
        email: "",
        password: "",
        repetirSenha: "",
        telefone: "",
        dataNasc: "",
      },
    };
  },
  methods: {
    processImage(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const base64Image = e.target.result;

          localStorage.setItem("userImage", base64Image);

          this.user.profileImage = base64Image;
        };

        reader.readAsDataURL(file);
      }

      this.calculateAge(this.user.dataNasc);
    },

    voltar() {
      router.push({ name: "login" });
    },
    async cadastrar() {
      localStorage.setItem("email", this.user.email);
      localStorage.setItem("nome", this.user.nome);
      localStorage.setItem("userlocal", "@" + this.user.user);
      localStorage.setItem("telefone", this.user.telefone);
      localStorage.setItem("birth", this.user.dataNasc);

      const aniversario = new Date(this.user.dataNasc);
      const dataAtual = new Date();

      // Calcula a idade
      const idade = this.calculateAge(aniversario, dataAtual);

      // Armazena a idade no localStorage
      localStorage.setItem("idade", idade);

      this.$store.dispatch("loadUsers");

      await this.$store.dispatch("register", this.user);
      if (this.$auth.isLoggedIn()) {
        const email = localStorage.getItem("email");

        if (!email) {
          console.log("Nenhum email armazenado no local storage.");
        } else {
          console.log("Email armazenado no local storage: " + email);
        }
      }
    },
    calculateAge(dateOfBirth, currentDate) {
      // Calcula a diferença em milissegundos
      const diff = currentDate - dateOfBirth;

      // Calcula a idade em milissegundos
      const idadeMilissegundos = diff;

      // Converte a idade de milissegundos para anos
      const idadeAnos = idadeMilissegundos / (1000 * 60 * 60 * 24 * 365.25);

      // Arredonda a idade para um número inteiro
      const idadeArredondada = Math.floor(idadeAnos);

      return idadeArredondada;
    },
  },
};
</script>

<style>
.page {
  display: flex;
  align-items: center;
  justify-content: center;

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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  gap: 3rem;
}

.form-column-left {
  margin-right: 0.5%;
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

p {
  font-size: 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  padding-bottom: 1.5%;
}

@media (min-width: 800px) and (max-width: 870px) {
  .cadastro {
    flex-direction: column;
    background-color: rgb(148, 20, 114);
    padding: 10px;
    display: flex;
    align-items: center;
    width: 65%;
    height: auto;
    border-radius: 40px;
    border: 2px solid white;
  }
  .page {
    height: 100%;
  }
}

@media (min-width: 700px) and (max-width: 912px) {
  .cadastro {
    flex-direction: column;
    background-color: rgb(148, 20, 114);
    padding: 10px;
    display: flex;
    align-items: center;
    width: 70%;
    height: auto;
    border-radius: 40px;
    border: 2px solid white;
  }
  .page {
    height: 100%;
  }
}

@media (min-width: 650px) and (max-width: 700px) {
  .cadastro {
    flex-direction: column;
    background-color: rgb(148, 20, 114);
    padding: 10px;
    display: flex;
    align-items: center;
    width: 75%;
    height: auto;
    border-radius: 40px;
    border: 2px solid white;
  }
  .page {
    height: 100%;
  }
}
@media (min-width: 600px) and (max-width: 650px) {
  .cadastro {
    flex-direction: column;
    background-color: rgb(148, 20, 114);
    padding: 10px;
    display: flex;
    align-items: center;
    width: 80%;
    height: auto;
    border-radius: 40px;
    border: 2px solid white;
  }
}

@media (min-width: 530px) and (max-width: 600px) {
  .cadastro {
    flex-direction: column;
    background-color: rgb(148, 20, 114);
    padding: 10px;
    display: flex;
    align-items: center;
    width: auto;
    height: auto;
    border-radius: 40px;
    border: 2px solid white;
  }
  .label {
    font-size: 1rem;
    color: black;
    margin-left: 0.2rem;
    margin-bottom: 0.5rem;
  }

  .p {
    margin-bottom: 0.4rem;
  }
  .title {
    font-size: 24px;
  }
  .page {
    height: 100%;
  }
}

@media (min-width: 400px) and (max-width: 530px) {
  .cadastro {
    flex-direction: column;
    background-color: rgb(148, 20, 114);
    padding: 10px;
    display: flex;
    align-items: center;
    width: 83%;
    height: auto;
    border-radius: 40px;
    border: 2px solid white;
    margin-top: 15%;
    margin-bottom: 10px;
  }
  .label {
    font-size: 1rem;
    color: black;
    margin-left: 0.2rem;
    margin-bottom: 0.5rem;
  }

  .p {
    margin-bottom: 0.4rem;
  }
  .title {
    font-size: 24px;
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
    flex-direction: column;
  }

  .form-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-column-left {
    width: 100%;
  }

  .form-column-right {
    margin-left: -0.5%;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .page {
    flex-direction: column;
    height: 100%;
  }
  .save-button {
    width: 30%;
  }
}

@media (min-width: 280px) and (max-width: 400px) {
  .cadastro {
    flex-direction: column;
    background-color: rgb(148, 20, 114);
    padding: 10px;
    display: flex;
    align-items: center;
    width: 83%;
    height: auto;
    border-radius: 40px;
    border: 2px solid white;
    margin-top: 54px;
    margin-bottom: 10px;
  }
  .label {
    font-size: 1rem;
    color: black;
    margin-left: 0.2rem;
    margin-bottom: 0.5rem;
  }

  .p {
    margin-bottom: 0.4rem;
  }
  .title {
    font-size: 24px;
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
    flex-direction: column;
  }

  .form-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-column-left {
    width: 100%;
  }

  .form-column-right {
    margin-left: -0.5%;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .page {
    flex-direction: column;
    height: 100%;
  }
  .p {
    font-size: 10px;
  }
  .save-button {
    width: 35%;
  }
}
</style>
