<template>
  <div class="email-modal">
    <div class="modal-content">
      <h2>Editar Email</h2>
      <input v-model="newEmail" type="text" placeholder="Novo Email" />
      <div class="modal-buttons">
        <v-btn @click="closeModal">Cancelar</v-btn>
        <v-btn @click="sendEmailVerification"
          >Enviar Email de Verificação</v-btn
        >
        <v-btn @click="updateEmail" v-if="isVerified">Salvar</v-btn>
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
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async sendEmailVerification() {
      const auth = getAuth();

      try {
        await sendEmailVerification(auth.currentUser);
        this.isVerified = true; // Marcar o e-mail como verificado
        console.log("Email de verificação enviado com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar o email de verificação:", error);
      }
    },
    async updateEmail() {
      if (this.isVerified) {
        const auth = getAuth();

        try {
          await updateEmail(auth.currentUser, this.newEmail);
          this.closeModal();
          console.log("Email atualizado com sucesso!");
        } catch (error) {
          console.error("Erro ao atualizar o email:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.email-modal {
  width: 70%;
  height: auto;
}
.modal-content {
  flex-direction: column;
  gap: 10px;
  padding: 10px auto;
}
input {
  width: 100%;
}
.modal-buttons {
  width: 20%;
}
</style>
