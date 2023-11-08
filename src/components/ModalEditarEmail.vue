<template>
  <div class="email-modal">
    <div class="modal-content">
      <h2>Editar Email</h2>
      <input v-model="newEmail" type="text" placeholder="Novo Email" />
      <div class="modal-buttons">
        <v-btn @click="closeModal">Cancelar</v-btn>
        <v-btn @click="sendEmailVerification">Enviar Email de Verificação</v-btn>
        <v-btn @click="updateEmail">Salvar</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, sendEmailVerification, updateEmail } from "firebase/auth";

export default {
  props: ["userEmail"],
  data() {
    return {
      isVerified: false,
      newEmail: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async sendEmailVerification() {
      try {
        const auth = getAuth();
        
        if (this.newEmail) {
          await sendEmailVerification(auth.currentUser, {
            requestType: "VERIFY_EMAIL",
            newEmail: this.newEmail,
          });

          console.log("Email de verificação enviado com sucesso!");
          this.isVerified = true;
        } else {
          console.error("O novo email não é válido.");
        }
      } catch (error) {
        console.error("Erro ao enviar o email de verificação:", error);
      }
    },
    async updateEmail() {
      if (this.isVerified) {
        const auth = getAuth();
        const user = auth.currentUser;

        try {
          await updateEmail(user, this.newEmail);

          this.closeModal();
          console.log("Email atualizado com sucesso!");
          console.log(this.newEmail);
          console.log(auth.currentUser);

          this.$emit("updateEmail", this.newEmail);
        } catch (error) {
          console.error("Erro ao atualizar o email:", error);
        }
      } else {
        console.error("Você deve verificar o novo email primeiro.");
      }
    },
  },
};
</script>
