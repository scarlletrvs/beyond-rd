<template>
  <div>
    <div class="user-profile">
      <div class="div-image-buttom">
        <div
          style="background-color: #f9e1df; width: 100%"
          class="info-row-image"
        >
          <div class="info-image">
            <img
              class="img"
              :src= "profileImageUser()"  

              alt="Foto do usuário"
            />
          </div>
          <div class="buttom-edit-image">
            <v-btn class="btn-editar" @click="toggleEdit('name')">Editar</v-btn>
          </div>
        </div>
        <div class="div-btn-exluir">
          <v-btn
            style="color: red !important; font-size: small; font-weight: bolder"
            @click="exluirConta()"
            class="buttom-excluir"
            >Excluir conta</v-btn
          >
        </div>
      </div>

      <div class="user-info">
        <div class="dados">
          <div class="info-row">
            <div class="info-column">
              <h2>Nome:</h2>
              <p>{{  this.userProfileData.nome  }}</p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="openNomeModal" >Editar</v-btn>
            </div>
          </div>
        </div>

           <ModalEditNome v-if="showNomeModal"   @close="closeNomeModal" @save="updateName"></ModalEditNome>   

        <div style="background-color: #f9e1df" class="dados">
          <div class="info-row" style="background-color: #f9e1df">
            <div style="background-color: #f9e1df" class="info-column">
              <h2>Nome de Usuário:</h2>
              <p>{{  this.userProfileData.user }}</p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="openUserModal" 
                >Editar</v-btn
              >
            </div>
          </div>
        </div>
        <ModalEditUser  v-if="showUserModal"   @close="closeUserModal"></ModalEditUser>

        <div class="dados">
          <div class="info-row">
            <div class="info-column">
              <h2>Email:</h2>
              <p>{{ this.userProfileData.email }}</p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="openEmailModal">Editar</v-btn>
            </div>
          </div>
        </div>

        <ModalEditarEmail
          v-if="showEmailModal"
          :userEmail="user.email"
          :newEmail="newEmail"
          @close="closeEmailModal"
          @save="updateEmail"
        ></ModalEditarEmail>

        <div style="background-color: #f9e1df" class="dados">
          <div style="background-color: #f9e1df" class="info-row">
            <div style="background-color: #f9e1df" class="info-column">
              <h2>Senha:</h2>
              <p>********</p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="openPasswordModal">Editar</v-btn>
            </div>
          </div>
        </div>

        <ModalEditSenha v-if="showPasswordModal" @close="closePasswordModal"></ModalEditSenha>


        <div class="dados">
          <div class="info-row">
            <div class="info-column">
              <h2>Telefone:</h2>
              <p>{{ this.userProfileData.telefone}} </p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="openTelefoneModal"
                >Editar</v-btn
              >
            </div>
          </div>
        </div>
<ModalEditTelefone  v-if="showTelefoneModal" @close="closeTelefoneModal" ></ModalEditTelefone>

        <div style="background-color: #f9e1df" class="dados">
          <div style="background-color: #f9e1df" class="info-row">
            <div style="background-color: #f9e1df" class="info-column">
              <h2>Idade:</h2>
              <p>{{  this.idade }} anos</p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="openIdadeModal"
                >Editar</v-btn
              >
            </div>
          </div>
        </div>
        <ModalEditIdade v-if="showIdadeModal" @close="closeIdadeModal"></ModalEditIdade>

      </div>
    </div>
  </div>
</template>



<script>
import { auth } from "../config/index";
import ModalEditarEmail from "../components/ModalEditarEmail.vue";
import ModalEditSenha from "../components/ModalEditSenha.vue";
import { collection, getDocs,  doc , updateDoc } from "firebase/firestore";
import { db } from "../config/index";
import ModalEditNome from "../components/ModalEditNome.vue";
import ModalEditUser from "../components/ModalEditUser.vue";
import ModalEditIdade from "../components/ModalEditIdade.vue";
import ModalEditTelefone from "../components/ModalEditTelefone.vue";

export default {
  components: {
    ModalEditarEmail,
    ModalEditSenha,
    ModalEditNome,
    ModalEditUser,
    ModalEditTelefone,
    ModalEditIdade,
  },
  data() {
    return {
      users: [],
      user:{},
      userUser: localStorage.getItem("userlocal") ,
   
      editedEmail: "",
      showEmailModal: false,
      showNomeModal: false,
      newEmail: "",
      showPasswordModal: false,
      showIdadeModal: false,
      showTelefoneModal: false,
      userProfileData: '',
      showUserModal: false,
      profileUndefined: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
      idade: localStorage.getItem("idade"),
      
    };
  },

   
  methods: {
    openEmailModal() {
      this.showEmailModal = true;
    },
    closeEmailModal() {
      this.showEmailModal = false;
    },

    updateEmail(newEmail) {
      this.user.email = newEmail;
    },
    openNomeModal() {
      this.showNomeModal = true;
    },
    closeNomeModal() {
      this.showNomeModal = false;
    },

    exluirConta() {
      auth.currentUser.delete();
      alert("Conta Exluida com sucesso!")
    },
    openPasswordModal() {
    this.showPasswordModal = true;
  },
  closePasswordModal() {
    this.showPasswordModal = false;
  },

  openUserModal() {
      this.showUserModal = true;
    },
    closeUserModal() {
      this.showUserModal = false;
    },
    openTelefoneModal() {
      this.showTelefoneModal = true;
    },
    closeTelefoneModal() {
      this.showTelefoneModal = false;
    },
    openIdadeModal() {
      this.showIdadeModal = true;
    },
    closeIdadeModal() {
      this.showIdadeModal = false;
    },

  async updateProfile() {
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    const currentUserEmail = auth.currentUser.email;
    const userDoc = querySnapshot.docs.find((doc) => doc.data().email === currentUserEmail);

    if (userDoc) {
      this.userProfileData = userDoc.data();
      console.log("Dados do perfil após a atualização:", this.userProfileData);
      console.log("nome no console:", this.userProfileData && this.userProfileData.nome || 'Nome não disponível');

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


async updateNameInFirestore(newName) {
  try {
    const usersCollection = collection(db, "users");
    const currentUserEmail = auth.currentUser.email;
    const userDocRef = doc(usersCollection, currentUserEmail);

    await updateDoc(userDocRef, {
      nome: newName,
    });

    this.userProfileData.nome = newName;

    console.log("Nome atualizado no Firestore!");
  } catch (error) {
    console.error("Erro ao atualizar nome no Firestore:", error);
  }
},


async updateName(newName) {
  try {
    if (auth.currentUser) {
      await this.updateNameInFirestore(newName);
      this.showNomeModal = false;
    } else {
      console.error("Usuário não autenticado. Não é possível atualizar o nome.");
    }
  } catch (error) {
    console.error("Erro ao atualizar nome no Firestore:", error);
  }
}
  },
 mounted() {
  this.updateProfile();
}

};
</script>


<style>
v-btn {
  width: 10% !important;
  background-color: rgb(148, 20, 114) !important;
  color: black !important;
  height: 15% !important;
  border-radius: 30px !important;
  margin-top: 5px;
}
.user-avatar {
  width: 20% !important;
  height: auto !important;
}
.user-profile {
  flex-direction: column !important;
  display: flex !important;
  gap: 4px !important ;
  width: 100%;
  height: auto;
  padding-top: 0.4rem;
}
.info-row {
  gap: 10px;
  flex-direction: row !important;
  display: flex;
  width: 100%;
  padding-left: 1.4%;
  background-color: pink;
  align-items: center;
}
.info-column {
  gap: 0.6rem;
  flex-direction: column;
  display: flex;
  width: 89%;
  background-color: pink;
  text-align: start !important;
  padding-left: 1%;
  padding-top: 1rem;
  align-items: flex-start;
}

.dados {
  background-color: pink;
  height: 5.3rem;
  width: 100%;
  display: flex !important;
  align-items: center !important;
  justify-content: right;
  margin-bottom: 0.5rem;
}
h2 {
  font-size: medium;
}

p {
  font-size: medium;
  margin-bottom: 35px;
}
.info-image {
  height: auto;
}
.buttom-edit-image {
  display: flex;
  align-items: end;
  padding-bottom: 3%;
  align-self: self-end;
}

.buttom-exluir {
  display: flex;
  align-items: end;
}

.div-image-buttom {
  flex-direction: row;
  justify-content: space-around;
  display: flex;
  width: 100%;
  background-color: #f9e1df;
  padding-right: 1.3%;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
}
.user-info {
  margin-bottom: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 0.4rem;
}
.div-btn-exluir {
  height: 100%;
  display: flex;
  align-self: end;
  padding-bottom: 1.5%;
}
.buttom-edit {
  display: flex;
  margin-right: -4%;
  padding-left: 3%;
}

.info-row-image {
  gap: 10px;
  flex-direction: row !important;
  display: flex;
  width: 100%;
  padding-left: 1.4%;
  background-color: pink;
  align-items: center;
}
.btn-editar {
  font-size: small !important;
  font-weight: 600 !important ;
  color: blue !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

@media (min-width: 1100px) and (max-width: 1614px) {
  .buttom-edit {
    display: flex;
    margin-right: 10px;
    padding-left: 0%;
  }
  .img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 2px solid black;
    object-fit: cover;
  }
}

@media (min-width: 480px) and (max-width: 1100px) {
  .buttom-edit {
    display: flex;
    margin-right: 1.8%;
  }
  .img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 2px solid black;
    object-fit: cover;
  }
}
@media (min-width: 434px) and (max-width: 480px) {
  .buttom-edit {
    display: flex;
    margin-right: 1.8%;
  }
  .info-row-image {
    display: flex;
    flex-direction: column !important ;
    align-items: flex-start;
  }
  .buttom-edit-image {
    display: flex;
    align-self: self-start;
    margin-left: 14%;
  }
  .img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid black;
    object-fit: cover;
  }
}

@media (min-width: 350px) and (max-width: 434px) {
  .buttom-edit {
    display: flex;
    margin-right: 2.5%;
  }
  .info-row-image {
    display: flex;
    flex-direction: column !important ;
    align-items: flex-start;
  }
  .buttom-edit-image {
    display: flex;
    align-self: self-start;
    margin-left: 1.5%;
    font-size: small !important;
  }

  .div-btn-exluir {
    margin-right: 1%;
  }
  p {
    font-size: 15px;
  }
  .buttom-edit {
    font-size: 12px !important;
  }
  .btn-editar {
    font-size: 12px !important;
  }
  .buttom-exluir {
    font-size: 10px !important;
  }
  h2 {
    font-size: 15px;
  }
  .img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 2px solid black;
    object-fit: cover;
  }
}

@media (min-width: 0px) and (max-width: 350px) {
  .buttom-edit {
    display: flex;
    margin-right: 2.5%;
  }
  .info-row-image {
    display: flex;
    flex-direction: column !important ;
    align-items: flex-start;
    margin-left: 6%;
  }
  .buttom-edit-image {
    display: flex;
    align-self: self-start;
    font-size: small !important;
  }

  .div-btn-exluir {
    margin-right: 1%;
  }
  p {
    font-size: 15px;
  }
  .buttom-edit {
    font-size: 10px !important;
  }
  .btn-editar {
    font-size: 10px !important;
  }
  .buttom-exluir {
    font-size: 10px !important;
    width: 15%;
  }
  h2 {
    font-size: 13px;
  }
  .img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 2px solid black;
    object-fit: cover;
  }
}
</style>
