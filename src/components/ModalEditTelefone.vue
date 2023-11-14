<template>
    <div class="Telefone-modal">
      <div class="modal-content">
        <h2>Editar Telefone</h2>
        <input v-model="newPhone" type="text" placeholder="Novo Telefone" />
        <div class="modal-buttons">
          <v-btn @click="closeModal">Cancelar</v-btn>
          <v-btn @click="savePhone">Salvar</v-btn>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newPhone: "", 
      };
    },
    methods: {
      closeModal() {
        this.$emit("close", this.newPhone);
      },
      savePhone() {
  this.$emit("save", this.newPhone);
},
    },
  };
  </script>
  