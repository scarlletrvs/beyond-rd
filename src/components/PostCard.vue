<template>
  <v-card class="card">
    <div
      style="
        flex-direction: row;
        gap: 1px;
        display: flex;
        justify-content: flex-start;
        align-self: flex-start;
        margin-top: 2%;
        margin-left: 1%;
        width: 100%;
      "
    >
      <div style="">
        <v-img
         
          :src="img"
          style="
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 2px solid black;
          "
        ></v-img>
      
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 2px;
          width: 100%;
          margin-top: -1%;
        "
      >
        <v-card-subtitle class="card-subtitle" style="white-space: nowrap">
          <router-link
            :to="'/perfil/' + message.name + '/' + message.user"
            style="color: black"
            >{{ message.name }}</router-link
          >
        </v-card-subtitle>
        <v-card-text class="card-text1">
          <router-link
            :to="'/perfil/' + message.name + '/' + message.user"
            style="color: gray"
            >{{( '@'+ message.user) }}</router-link
          >
        </v-card-text>
      </div>
      <v-card-text>{{ message.timestamp }}</v-card-text>
    </div>
    <v-card-text
      style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: black;
        font-size: 0.9rem;
        margin-left: 5px;
        margin-top: -1.4rem; " >
      {{ message.text }}
    </v-card-text>
    <v-img v-if="message.image" :src="message.image" class="v-img"></v-img>
    <v-row class="v-row">
      <v-btn
        @click="openDialog()"
        v-if=" isCurrentUserProfileUser() "
        class="v-btn1"
        icon
      >
        <v-icon> mdi-pencil </v-icon>
      </v-btn>

      <v-btn
        @click="deleteMessages(message.id)"
        v-if=" isCurrentUserProfileUser() "
        class="v-btn2"
        icon
      >
        <v-icon> mdi-delete </v-icon>
      </v-btn>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent content-class="my-dialog-content">
        <div class="post">
          <div class="profiles">
            <p class="profilename-dialog">Edite sua postagem</p>
          </div>

          <v-text-field
            v-model="formData.NovoTextInput"
            solo
            hide-details="faça uma postagem!"
            placeholder="Digite aqui sua postagem!"
            class="text-field"
            :style="{ border: 'none' }"
          ></v-text-field>

          <div class="image-button-dialog">
            <v-file-input
              label="adicione uma foto"
              accept="image/png, image/jpeg, image/bmp"
              hide-input
              truncate-length="20"
              v-model="formData.editingImage"
              @change="onImageChange"
              :prepend-icon="'mdi-camera'"
              class="custom-file-input-dialog"
            ></v-file-input>

            <v-btn
              @click="closeDialog(message)"
              style="color: red !important; margin-right: 5px"
              class="btn-postar-dialog"
            >
              Fechar
            </v-btn>

            <v-btn
              style="color: blue !important"
              @click="
                editMessages(
                  message.id,
                  formData.NovoTextInput,
                  formData.editingImage
                )
              "
              class="btn-postar-dialog"
            >
              Salvar
            </v-btn>
          </div>
        </div>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>

import 'firebase/firestore';
import { auth } from "../config/index";
import { db } from "../config/index";
import {
  collection,
  getDocs,
 
} from "firebase/firestore";


export default {
  data() {
    return {
      dialog: false,
      formData: {
        NovoTextInput: "",
        editingImage: "",
        defaultUserProfileImage:
          "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
      },
      users: [ ],
      messages:[],
      user: null,
    };
  },

  computed: {
    userDisplayUserLocal() {
      const user = localStorage.getItem("userlocal");
      const email = localStorage.getItem("email");
      return user || "@" + email.slice(0, email.indexOf("@"));
    },
  },
  methods: {


    async updateProfile() {
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    this.users = querySnapshot.docs.map((doc) => doc.data());
    
    const user = this.users.find((user) => user.user === this.profileUser);

    if (user) {
      this.profileName = user.name;

    } else {
      this.profileName = this.$route.params.userName;
    }

    console.log("Perfis após a atualização:");
    console.log(this.users);
  } catch (error) {
    console.error("Erro ao obter dados da coleção 'users':", error);
  }
},
    
    isCurrentUserProfileUser() {
    if (this.message.user) {
      const userProfile = this.users.find((user) => user.user === this.message.user);

      if (userProfile) {
        const currentUserEmail = auth.currentUser.email;
        return userProfile.email === currentUserEmail;
      }
    }
    return false;
  },
   
 navigateToProfile() {
      this.$emit(
        "navigateToProfile",
        this.message.name,
        this.message.user,
        this.message.id
      );
    },
    deleteMessages(id) {
    this.$emit("deleteMessages", id);

    console.log(`Excluir mensagem com ID: ${id}`);
},

    editMessages(id, novoTexto, editingImage) {
      this.$emit("editMessages", { id, novoTexto, editingImage });
      this.closeDialog();
    },
    openDialog() {
      this.formData.NovoTextInput = this.message.text;
      this.dialog = true;
    },
    closeDialog() {
      this.formData.NovoTextInput = "";
      this.dialog = false;
    },
    onImageChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.$emit("imageChange", selectedFile);
      }
    },
  },
  async created() {
 
 this.updateProfile();
},
  props: {
    postId: {
      type: String,
      required: true,
    },
   
    img: {
      type: String,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
   
} 
};
</script>

<style>
.card {
  width: 98%;
  height: 30%;
  flex-direction: column;
  background-color: pink !important;
  padding-top: 1.5px;
}

.card-subtitle {
  font-weight: bold;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: black;
  font-size: 0.9rem;
  margin-top: 0px;
}

.card-text1 {
  color: grey;
  font-size: 0.7rem;
  font-weight: bold;
  margin-top: -1.2rem;
}

.v-img {
  display: flex;
  align-items: center;
  max-width: 100%;
  max-height: auto;
}

.v-row {
  display: flex;
  flex-direction: row;
  gap: 0px;
  justify-content: flex-end;
  margin-left: 1px;
  padding-bottom: 20px;
  width: 100%;
  padding-right: 2%;
}

.v-btn1 {
  width: 4% !important;
  height: 90%;
  color: blue !important;
  font-size: small;
}

.v-btn2 {
  width: 4% !important;
  height: auto !important;
  color: red !important;
  font-size: small;
}

.v-dialog {
  max-width: 70%;
  height: auto;
}
.profilename-dialog {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: black;
  font-weight: 400;
  font-size: medium;
  text-align: start;
}
.image-button-dialog {
  flex-direction: row;
  display: flex;
  width: 100%;
  margin-top: 0.4rem;
  align-self: flex-end;
  justify-content: space-around;
  padding-left: 2.5%;
  padding-right: 2%;
}
.custom-file-input-dialog {
  margin-top: -0.6rem;
  flex-grow: 1;
}
.custom-file-input-dialog .v-icon {
  color: white;
  font-size: 2.6rem;
  transition: color 0.3s;
}
.btn-postar-dialog {
  width: 15% !important;
  height: auto;
  border: 2px solid #938a8a;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: bold;
  margin-bottom: 0.8rem;
}
</style>
