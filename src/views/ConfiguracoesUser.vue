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
              :src="user.userProfileImage"
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
              <p>{{ editingName ? editedName : user.name }}</p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar">Editar</v-btn>
            </div>
          </div>
        </div>

        <div style="background-color: #f9e1df" class="dados">
          <div class="info-row" style="background-color: #f9e1df">
            <div style="background-color: #f9e1df" class="info-column">
              <h2>Nome de Usuário:</h2>
              <p>{{ editingUsername ? editedUsername : user.username }}</p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="toggleEdit('username')"
                >Editar</v-btn
              >
            </div>
          </div>
        </div>

        <div class="dados">
          <div class="info-row">
            <div class="info-column">
              <h2>Email:</h2>
              <p>{{ editingEmail ? editedEmail : user.email }}</p>
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
              <h2>Telefone:</h2>
              <p>{{ editingPhone ? editedPhone : user.phone }}</p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="toggleEdit('phone')"
                >Editar</v-btn
              >
            </div>
          </div>
        </div>

        <div class="dados">
          <div class="info-row">
            <div class="info-column">
              <h2>Idade:</h2>
              <p>{{ editingAge ? editedAge : user.age }} anos</p>
            </div>
            <div class="buttom-edit">
              <v-btn class="btn-editar" @click="toggleEdit('age')"
                >Editar</v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { auth } from "../config/index";
import ModalEditarEmail from "../components/ModalEditarEmail.vue";
export default {
  components: {
    ModalEditarEmail,
  },
  data() {
    return {
      user: {
        name: localStorage.getItem("nome") || (localStorage.getItem("email") ?  localStorage.getItem("email").slice(0, localStorage.getItem("email").indexOf("@")): null),
        username: localStorage.getItem("userlocal") || (localStorage.getItem("email") ? ( '@' + localStorage.getItem("email").slice(0, localStorage.getItem("email").indexOf("@"))) : null),
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("telefone") ? localStorage.getItem("telefone") : "(**) *****-****",
        age: localStorage.getItem("idade") || "**",
        userProfileImage:
          localStorage.getItem("userImage") ||
          "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
      },
      editingEmail: false,
      editedEmail: "",
      showEmailModal: false,
      newEmail: "",
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

    exluirConta() {
      auth.currentUser.delete();
      alert("Conta Exluida com sucesso!")
    },
  },
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

