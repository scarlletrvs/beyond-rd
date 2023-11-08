<template>
    <div class="password-modal">
      <div class="modal-content">
        <h2>Editar Senha</h2>
        <input v-model="currentPassword" type="password" placeholder="Senha Atual" />
        <input v-model="newPassword" type="password" placeholder="Nova Senha" />
        <input v-model="confirmPassword" type="password" placeholder="Confirmar Nova Senha" />
        <div class="modal-buttons">
          <div class="modal-buttons">
            <v-btn @click="closeModal">Cancelar</v-btn>
            <v-btn @click="updateUserPassword">Salvar</v-btn>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getAuth, updatePassword, signOut, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
  
  export default {
    data() {
      return {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
    },
    methods: {
      async updateUserPassword() {
        try {
          const currentPassword = this.currentPassword;
          const newPassword = this.newPassword;
          const confirmPassword = this.confirmPassword;
  
          if (newPassword.length < 8) {
            alert("A nova senha deve ter pelo menos 8 caracteres.");
            return;
          }
  
          if (newPassword !== confirmPassword) {
            alert("A nova senha e a confirmação da senha não coincidem.");
            return;
          }
  
          const auth = getAuth();
          const user = auth.currentUser;
  
          if (!user) {
            console.error("Usuário não está autenticado.");
            return;
          }
  
          try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
  
            await updatePassword(user, newPassword);
  
            await signOut(auth);
  
            if (this.$route.path !== '/login') {
         this.$router.push('/login');
}

            alert("Senha atualizada com sucesso!");
          } catch (error) {
            alert("Erro ao atualizar a senha:", error);
          }
        } catch (error) {
          console.error("Erro ao atualizar a senha:", error);
        }
      },
      closeModal() {
        this.$emit("close");
      },
    },
  };
  </script>
  