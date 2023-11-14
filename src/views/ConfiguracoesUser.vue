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
            <v-btn class="btn-editar" @click="openImageProfileModal">Editar</v-btn>
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
           <ModalEditImage   v-if="showImageProfileModal"   @close="closeImageProfileModal" @save="updateImageProfile"/>

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
        <ModalEditUser  v-if="showUserModal"   @close="closeUserModal" @save="updateUser"></ModalEditUser>

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
<ModalEditTelefone  v-if="showTelefoneModal" @close="closeTelefoneModal"  @save="updatePhone"></ModalEditTelefone>

        <div style="background-color: #f9e1df" class="dados">
          <div style="background-color: #f9e1df" class="info-row">
            <div style="background-color: #f9e1df" class="info-column">
              <h2>Idade:</h2>
              <p> {{this.idade + ' anos'}}</p></div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="openIdadeModal"
                >Editar</v-btn
              >
            </div>
          </div>
        </div>
        <ModalEditIdade v-if="showIdadeModal" @close="closeIdadeModal"></ModalEditIdade>

        <div class="dados">
          <div class="info-row">
            <div class="info-column">
              <h2>Data de nascimento:</h2>
              <p>{{ this.userProfileData.dataNasc}} </p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="openDataNascModal"
                >Editar</v-btn
              >
            </div>
          </div>
        </div>
        <ModaleEditDataNasc   v-if="showDataNascModal" @close="closeDataNascModal" @save="updateDataNasc"></ModaleEditDataNasc>

      </div>
    </div>
  </div>
</template>



<script>
import { auth } from "../config/index";
import ModalEditarEmail from "../components/ModalEditarEmail.vue";
import ModalEditSenha from "../components/ModalEditSenha.vue";
import { collection, getDocs,  doc , updateDoc, getDoc} from "firebase/firestore";
import { db } from "../config/index";
import ModalEditNome from "../components/ModalEditNome.vue";
import ModalEditUser from "../components/ModalEditUser.vue";
import ModalEditIdade from "../components/ModalEditIdade.vue";
import ModalEditTelefone from "../components/ModalEditTelefone.vue";
import ModaleEditDataNasc from "../components/ModaleEditDataNasc.vue";
import ModalEditImage from "../components/ModalEditImage.vue";


export default {
  components: {
    ModalEditarEmail,
    ModalEditSenha,
    ModalEditNome,
    ModalEditUser,
    ModalEditTelefone,
    ModalEditIdade,
    ModaleEditDataNasc ,
    ModalEditImage,
  },
  data() {
    return {
      users: [],
      user:{},
      userUser: localStorage.getItem("userlocal") ,
      showDataNascModal: false,
      editedEmail: "",
      showEmailModal: false,
      showNomeModal: false,
      newEmail: "",
      showImageProfileModal: false,
      showPasswordModal: false,
      showIdadeModal: false,
      showTelefoneModal: false,
      userProfileData: '',
      showUserModal: false,
      idade: 0,
      profileUndefined: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
    
      
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

        // Calcula a idade e atualiza a propriedade 'idade'
        this.idade = this.calculateAgeFromBirthdate(this.userProfileData.dataNasc);

        console.log("Dados do perfil após a atualização:", this.userProfileData);
        console.log("Nome no console:", this.userProfileData && this.userProfileData.nome || 'Nome não disponível');

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

openImageProfileModal() {
      this.showImageProfileModal = true;
    },
    closeImageProfileModal() {
      this.showImageProfileModal = false;
    },

    openEmailModal() {
      this.showEmailModal = true;
    },
    closeEmailModal() {
      this.showEmailModal = false;
    },
    openDataNascModal() {
      this.showDataNascModal = true;
    },
    closeDataNascModal() {
      this.showDataNascModal = false;
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
  
    if (auth.currentUser && auth.currentUser.providerData.some(provider => provider.providerId === 'password')) {
    
      this.showPasswordModal = true;
    } else {
   
      alert("Não é possível alterar a senha. Conta cadastrada com conta do Google.");
    }
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



    
    async updateImageProfile({ newImageProfile }) {
      try {
        console.log("Novo perfil de imagem:", newImageProfile);        if (newImageProfile !== undefined) {
          const usersCollection = collection(db, "users");
          const currentUserEmail = auth.currentUser.email;
          const userDocRef = doc(usersCollection, currentUserEmail);

          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const updateData = {
              profileImage: newImageProfile,
            };

            await updateDoc(userDocRef, updateData);

const updatedUser = { ...userDoc.data(), ...updateData };
console.log("Usuário atualizado no Firestore:", updatedUser);

this.userProfileData = updatedUser;

          } else {
            console.error("Documento do usuário não encontrado no Firestore:", currentUserEmail);
          }
        } else {
          console.error("Imagem de edição indefinida. Não foi possível atualizar no Firestore.");
        }
      } catch (error) {
        console.error("Erro ao editar imagem de perfil no Firestore:", error);
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
      if (!newName || newName.trim() === "") {
        alert("Nome não pode ser nulo ou vazio.");
        return;
      }

      await this.updateNameInFirestore(newName);
      this.showNomeModal = false;
    } else {
      console.error("Usuário não autenticado. Não é possível atualizar o nome.");
    }
  } catch (error) {
    console.error("Erro ao atualizar nome no Firestore:", error);
  }
},

async updateUserInFirestore(newUser) {
  try {
    if (newUser !== undefined) { 
      const usersCollection = collection(db, "users");
      const currentUserEmail = auth.currentUser.email;
      const userDocRef = doc(usersCollection, currentUserEmail);

      await updateDoc(userDocRef, {
        user: newUser,
      });

      this.userProfileData.user = newUser;

      console.log("Usuário atualizado no Firestore!");
    } else {
      console.error("Novo usuário é undefined. Não foi possível atualizar no Firestore.");
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário no Firestore:", error);
  }
}
,

async updateUser(newUser) {
  try {
    if (auth.currentUser) {
      if (!newUser || newUser.trim() === "") {
        alert("Usuário não pode ser nulo ou vazio.");
        return;
      }

      await this.updateUserInFirestore(newUser);
      this.showUserModal = false;
    } else {
      console.error("Usuário não autenticado. Não é possível atualizar o usuário.");
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário no Firestore:", error);
  }
},


async updatePhoneInFirestore(newPhone) {
  try {
    const usersCollection = collection(db, "users");
    const currentUserEmail = auth.currentUser.email;
    const userDocRef = doc(usersCollection, currentUserEmail);

    await updateDoc(userDocRef, {
      telefone: newPhone,
    });

    this.userProfileData.telefone= newPhone;

    console.log("telefone atualizado no Firestore!");
  } catch (error) {
    console.error("Erro ao atualizar telefone no Firestore:", error);
  }
},




async updatePhone(newPhone) {
  try {
    if (auth.currentUser) {
      if (!newPhone || newPhone.trim() === "") {
        alert("Número de telefone não pode ser nulo ou vazio.");
        return;
      }

      const numeroLimpo = newPhone.replace(/\D/g, "");

      const regex = /^\d{2}9\d{8}$/;
      if (!regex.test(numeroLimpo)) {
        alert("Número de telefone inválido. Deve seguir o padrão: DD9XXXXXXXX");
        return;
      }

      await this.updatePhoneInFirestore(newPhone);
      this.showTelefoneModal = false;
    } else {
      console.error("Usuário não autenticado. Não é possível atualizar o telefone.");
    }
  } catch (error) {
    console.error("Erro ao atualizar telefone no Firestore:", error);
  }
},



async updateDataNasc(newDataNasc) {
  try {
    if (auth.currentUser) {
      if (!newDataNasc || newDataNasc.trim() === "") {
        alert("Data de nascimento não pode ser nula ou vazia.");
        return;
      }

      await this.updateDataNascInFirestore(newDataNasc);
      await this.updateProfile();

      // Atribua o valor retornado à variável 'idade'
      const idade = this.calculateAge(newDataNasc);

      if (!idade) {
        return;
      }

      this.idade = idade;

      this.showDataNascModal = false;
    } else {
      console.error(
        "Usuário não autenticado. Não é possível atualizar a Data de Nascimento."
      );
    }
  } catch (error) {
    console.error(
      "Erro ao atualizar a Data de Nascimento no Firestore:",
      error
    );
  }
},

    async updateDataNascInFirestore(newDataNasc) {
      try {
        if (newDataNasc !== undefined) {
          const usersCollection = collection(db, "users");
          const currentUserEmail = auth.currentUser.email;
          const userDocRef = doc(usersCollection, currentUserEmail);

          await updateDoc(userDocRef, {
            dataNasc: newDataNasc,
          });

          this.userProfileData.dataNasc = newDataNasc;

          console.log("Data de Nascimento atualizada no Firestore!");
        } else {
          console.error(
            "Nova Data de Nascimento é undefined. Não foi possível atualizar no Firestore."
          );
        }
      } catch (error) {
        console.error(
          "Erro ao atualizar a Data de Nascimento no Firestore:",
          error
        );
      } finally {
    this.calculateAge(newDataNasc);
  }
    },

    calculateAge(dataNasc) {
  const dataNascimento = new Date(dataNasc);
  const dataAtual = new Date();

  const diferencaAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();

  if (diferencaAnos < 14) {
    alert("Usuários com menos de 14 anos não são permitidos.");
    return null;
  }

  if (
    diferencaAnos === 14 &&
    dataNascimento.getMonth() > dataAtual.getMonth()
  ) {
    alert("Usuários com menos de 14 anos não são permitidos.");
    return null;
  }

  if (
    diferencaAnos === 14 &&
    dataNascimento.getMonth() === dataAtual.getMonth() &&
    dataNascimento.getDate() > dataAtual.getDate()
  ) {
    alert("Usuários com menos de 14 anos não são permitidos.");
    return null;
  }

  return diferencaAnos;
},
calculateAgeFromBirthdate(dataNasc) {
    if (!dataNasc) {
      return "**"; 
    }

    const dataNascObj = new Date(dataNasc);
    const dataAtual = new Date();

    const idade = dataAtual.getFullYear() - dataNascObj.getFullYear();
    const diffMes = dataAtual.getMonth() - dataNascObj.getMonth();

    if (diffMes < 0 || (diffMes === 0 && dataAtual.getDate() < dataNascObj.getDate())) {
      return idade - 1;
    }

    return idade;
  },



},
 mounted() {
  this.updateProfile();
  this.calculateAge(this.userProfileData.dataNasc);


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
