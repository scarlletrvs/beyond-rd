<template>
  <div class="post">
    <div class="profiles">
      <p class="profilename">{{ userDisplayName }}</p>
      <p class="profileuser">{{ userDisplayUserLocal }}</p>
    </div>

    <v-text-field
      v-model="textInput"
      solo
      hide-details="faça uma postagem!"
      placeholder="Digite aqui sua postagem!"
      class="text-field"
      :style="{ border: 'none' }"
    ></v-text-field>

    <div class="image-button">
      <v-file-input
        label="adicione uma foto"
        accept="image/png, image/jpeg, image/bmp"
        hide-input
        truncate-length="20"
        v-model="imageInput"
        @change="onImageChange"
        :prepend-icon="'mdi-camera'"
        class="custom-file-input"
      ></v-file-input>

      <v-btn :disabled="checkInput" @click="sendMessages" class="btn-postar">
        Postar
      </v-btn>
    </div>
  </div>
</template>

<style>
.post {
  display: flex;
  flex-direction: column;
  height: 40%;
  width: 99%;
  margin: 0.5% auto;
  background-color: rgb(148, 20, 114);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
}

.profiles {
  display: flex;
  justify-content: start !important;
  flex-direction: column;
  height: auto;
  width: 100%;
  padding-top: 0.8rem;
  padding-left: 2%;
}

.profilename {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: black;
  font-weight: 400;
  font-size: medium;
  text-align: start;
}

.profileuser {
  color: gray;
  font-size: small;
  margin-bottom: 0rem;
  margin-top: -1rem;
  text-align: start;
}
/* .divtextfield{
   height: auto;
   margin-top: 0.4 rem;
   display: flex;
  padding: 0.4re, auto;
  align-items: center;
  */

/* } */
.text-field {
  margin-bottom: 0.2rem;
  width: 96%;
  border: 2px solid #938a8a;
  height: auto;
  font-size: 12px;
  margin-top: -0.4rem;
}

.image-button {
  flex-direction: row;
  display: flex;
  width: 100%;
  margin-top: 0.4rem;
  align-self: flex-end;
  justify-content: space-around;
  padding-left: 2.5%;
  padding-right: 2%;
}
.custom-file-input {
  margin-top: -0.6rem;
  flex-grow: 1;
}

.custom-file-input .v-icon {
  color: white;
  font-size: 2.6rem;
  transition: color 0.3s;
}
.btn-postar {
  width: 30%;
  height: auto;
  border: 2px solid #938a8a;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: bold;
  margin-bottom: 0.8rem;
}
</style>

<script>
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs } from "firebase/firestore";
import { db , auth} from "../config/index";


export default {
  
  data() {
    return {
      textInput: "",
      imageInput: null,
      checkInput: false,
      userDisplayName: "", 
      userDisplayUserLocal: "",
      profileUndefined:
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
    };
  },
  
  methods: {
    async updateProfile() {
      try {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);

        const currentUserEmail = auth.currentUser.email;
        const userDoc = querySnapshot.docs.find((doc) => doc.data().email === currentUserEmail);

        if (userDoc) {
          this.userProfileData = userDoc.data();
          console.log("Dados do perfil após a atualização postnew:", this.userProfileData);
          console.log("nome no console postnew:", this.userProfileData && this.userProfileData.nome || 'Nome não disponível');

          this.userDisplayName = this.userProfileData.nome;
          this.userDisplayUserLocal = this.userProfileData.user;
        } else {
          console.log("Usuário não encontrado na coleção 'users'.");
        }
      } catch (error) {
        console.error("Erro ao obter dados da coleção 'users':", error);
      }
    },

    profileImageUser() {
      if (this.userProfileData && this.userProfileData.profileImage) {
        return this.userProfileData.profileImage;
     } else {
         return "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png";
        }
      },


    async sendMessages() {
      const post = {
        name:this.userProfileData.nome ,
        user: this.userProfileData.user ,
        email: this.userProfileData.email ,
        timestamp: new Date().toLocaleString(),
        img: this.profileImageUser(),
        id: uuidv4(),
       
      };

      this.$emit("saveMessages", post);

      this.$emit("sendMessages", { text: this.textInput, image: this.imageInput });

      this.textInput = "";
      this.imageInput = null;
    },
    onImageChange(event) {
  if (event && event.target) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.imageInput = selectedFile;
    }
  }
}
  },
  mounted() {
  this.updateProfile();
},
 
};
</script>
