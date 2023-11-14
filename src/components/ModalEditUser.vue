<template>
    <div class="User-modal">
      <div class="modal-content">
        <h2>Editar usuário</h2>
        <input v-model="newUser" type="text" placeholder="Novo Usuário" />
        <div class="modal-buttons">
          <v-btn @click="closeModal">Cancelar</v-btn>
          <v-btn @click="saveUser">Salvar</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newUser: "", 
      };
    },
    methods: {
      closeModal() {
       
        this.$emit("close", this.newUser);
      },
      saveUser() {
  this.$emit("save", this.newUser);
},

    },
  };
  </script>
  