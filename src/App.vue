<template>
  <div id="app">
  
    <div class="custom-alert" v-if="showAlert" >
    
      <div class="custom-alert-content">
        {{ alertMessage }}
        <button class="custom-alert-button" @click="closeAlert">OK</button>
      </div>
    </div>
    <link href="https://cdn.materialdesignicons.com/5.6.55/css/materialdesignicons.min.css" rel="stylesheet">
    <nav v-if="$route.path !== '/login' && this.$route.path !== '/cadastro'">
      <div class="nav-content">
        <div class="nav-links">
          <router-link :to="{ path: '/' }">
            <i id="i" class="mdi mdi-home"></i>
            <span class="hide-text-on-small-screen">Home</span>
          </router-link> |

          <router-link :to="'/perfil/' + userProfile.nome + '/' +  userProfile.user">
            <i id="i" class="mdi mdi-account"></i>
            <span class="hide-text-on-small-screen">Perfil</span>
          </router-link> |

          <router-link :to="{ path: '/usuarios' }">
            <i  id="i" class="mdi mdi-account-group"></i>
            <span class="hide-text-on-small-screen">Usuários</span>
          </router-link> |

          <router-link :to="{ path: '/configuracoes' }">
            <i id="i" class="mdi mdi-cog"></i>
            <span class="hide-text-on-small-screen">Configurações</span>
          </router-link>
        </div>
        <div class="div-btn-sair">
  <v-btn class="logout-button" @click="sair">
    <i style="font-size: 19px;" class="mdi mdi-logout"></i>
    <span class="hide-text-on-small-screen-sair">Sair</span>
  </v-btn>
</div>
      </div>
    </nav>

    
    <router-view />
    <LoadingComponent v-if="isLoading" :loadingText="loadingText" />
  </div>
</template>


<script>
import LoadingComponent from "@/components/LoadingComponent.vue";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./config/index";
export default {
  components: {
    LoadingComponent
  },
  data() {
    return {
      showAlert: false,
      alertMessage: "",
      isLoading: true, 
      loadingText: 'Aguarde...',
      userProfile: null,
      users: [ ],
      user: null
    };
  },
  beforeCreate() {
    this.$store.dispatch("fetchUser");

     /* eslint-disable no-unused-vars */
    this.$router.beforeEach((to, from, next) => {
      this.startLoading();
      next();
    });

    this.$router.afterEach((to, from) => {
      this.stopLoading();
    });
    /* eslint-enable no-unused-vars */
  },
 
 
  methods: {
    async updateProfileApp() {
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    const currentUserEmail = auth.currentUser.email;
    const userDoc = querySnapshot.docs.find((doc) => doc.data().email === currentUserEmail);

    if (userDoc) {
      this.userProfile = userDoc.data();
      console.log("Dados do perfil após a atualização appvue:", this.userProfile);
    } else {
      console.log("Usuário não encontrado na coleção 'users'.");
    }
  } catch (error) {
    console.error("Erro ao obter dados da coleção 'users':", error);
  }
},

    sair() {
      this.startLoading();
      this.$store.dispatch("logout").then(() => {
        localStorage.clear();
        this.openAlert("Você foi desconectado com sucesso!");
      });
    },
    openAlert(message) {
      this.alertMessage = message;
      this.showAlert = true;
    },
    closeAlert() {
      this.showAlert = false;
    },
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
  },
  mounted() {
  this.updateProfileApp();
}
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #05080b;
}

nav {
  padding: 20px;
  background-color: rgb(148, 20, 114);
  text-align: center;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  a {
    font-weight: bold;
    color: #0b1724;
    text-decoration: none;
    margin-right: 15px; 
  }
  .router-link-exact-active {
    color: #ffffff;
  }
}

.logout-button {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: small;
   
}

.router-view {
  position: relative; 
  z-index: 1; 
}

.custom-alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.custom-alert-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.custom-alert-button {
  background-color: pink;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}


@media (min-width : 450px) and (max-width: 650px){
  .hide-text-on-small-screen {
    display: none;
  }
  #i{
    font-size: 22px;
  }

}
@media (min-width : 0px) and (max-width: 450px){
  .hide-text-on-small-screen-sair {
    display: none;
  }
  .hide-text-on-small-screen {
    display: none;
  }
  #i{
    font-size: 22px;
  }
  .logout-button{
    .span{
      font-size: 13px;
    }
  }
 

}
</style>