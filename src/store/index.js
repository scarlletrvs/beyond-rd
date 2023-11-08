import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../config/index.js";
import router from "../router/index.js";


function camposPreenchidos(name, user, email, password, repetirSenha, telefone, dataNasc) {
  return (
    name !== "" &&
    user !== "" &&
    email !== "" &&
    password !== "" &&
    repetirSenha !== "" &&
    telefone !== "" &&
    dataNasc !== "" 
  );
}

function validarTelefone(telefone) {
  // Remova espaços em branco e caracteres especiais do número de telefone
  const numeroLimpo = telefone.replace(/\D/g, "");
  
  // A expressão regular valida o formato desejado: 2 dígitos aleatórios + "9" + 8 dígitos aleatórios
  const regex = /^\d{2}9\d{8}$/;
  
  if (!regex.test(numeroLimpo)) {
    alert("Preencha um número de telefone válido no formato correto: DD9XXXXXXXX (sem espaço ou caracteres especiais).");
    return false;
  }
  
  return true;
}



function calcularIdade(dataNasc) {
  const dataNascimento = new Date(dataNasc);
  const dataAtual = new Date();

  // Calcula a idade do usuário
  const diferencaAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();

  // Verifique se o usuário tem pelo menos 14 anos
  if (diferencaAnos < 14) {
    alert("Você deve ter pelo menos 14 anos para se cadastrar.");
    return false;
  }

  // Verifique se o usuário já fez aniversário este ano
  if (
    diferencaAnos === 14 &&
    dataNascimento.getMonth() > dataAtual.getMonth()
  ) {
    alert("Você deve ter pelo menos 14 anos para se cadastrar.");
    return false;
  }

  if (
    diferencaAnos === 14 &&
    dataNascimento.getMonth() === dataAtual.getMonth() &&
    dataNascimento.getDate() > dataAtual.getDate()
  ) {
    alert("Você deve ter pelo menos 14 anos para se cadastrar.");
    return false;
  }

  return true;
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
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    CLEAR_USER(state) {
      state.user = null;
    },
  },

  actions: {
    async login({ commit }, details) {
      const email = details.email || "";
      const password = details.password || "";
      localStorage.setItem("email", details.email);

      if (email === "" && password === "") {
        alert("Preencha os campos antes de logar");
        return;
      }

      if (email === "") {
        alert("Preencha o email!");
        return;
      }

      if (password === "") {
        alert("Preencha o  campo senha! ");
        return;
      }

      const emailIsValid = validarEmail(email);
      const passwordIsValid = validarSenha(password);

      if (!emailIsValid && !passwordIsValid) {
        alert("Preencha os campos email e senha  corretamente!");
        return;
      }

      if (!emailIsValid && passwordIsValid) {
        alert("Preencha um email valido!");
        return;
      }

      if (!passwordIsValid && emailIsValid) {
        alert("A senha deve ter no minímo 8 caracteres!");
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('authregister', auth.currentUser);
      } catch (error) {
        if (error.code === "auth/invalid-login-credentials") {
          alert("As credenciais email e senha estão incorretas!");
        } else {
          alert(error.message);
        }
        return;
      }   

      commit("SET_USER", auth.currentUser);
    },

    async register({ commit }, details) {
      if (!camposPreenchidos(
        details.name,
        details.user,
        details.email,
        details.password,
        details.repetirSenha,
        details.telefone,
        details.dataNasc
      )) {
        console.log(
          details.name,
          details.user,
          details.email,
          details.password,
          details.repetirSenha,
          details.telefone,
          details.dataNasc
        );
        alert("Preencha todos os campos corretamente!");
        return;
      }
      if (!calcularIdade(details.dataNasc)) {
        return; // Encerre o registro se a idade não atender aos requisitos
      }
    
      if (!validarEmail(details.email)) {
        alert("Preencha um e-mail válido!");
        return;
      }
      if (!validarTelefone(details.telefone)) {
       
        return;
      }
    
      if (!validarSenha(details.password)) {
        alert("A senha deve ter no mínimo 8 caracteres!");
        return;
      }
    
      if (details.password !== details.repetirSenha) {
        alert("As senhas não coincidem!");
        return;
      }

     

      
    
      try {
        const email = details.email;
        const password = details.password;
    
       
        await createUserWithEmailAndPassword(auth, email, password)
        commit("SET_USER", auth.currentUser);
        alert("Usuário cadastrado com sucesso!");

        router.go(0); // Isso recarregará a página atual
      } catch (error) {
        alert("Email já cadastrado, tente outro!");
        console.log(error.message);
      }
    },
    
    async logout({ commit }) {
      await signOut(auth);

      if (router.currentRoute.name !== "login") {
        router.push({ name: "login" });
      }
      localStorage.clear();

      commit("CLEAR_USER");
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);

          if (router.currentRoute.name === "login") {
            router.push({ name: "home" });
          }
        }
      });
    },
  },
});

export { store };