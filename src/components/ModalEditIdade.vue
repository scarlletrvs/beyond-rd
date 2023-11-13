<template>
    <div class="Idade-modal">
      <div class="modal-content">
        <h2>Editar Idade</h2>
        <input v-model="newAge" type="text" placeholder="Nova Idade" />
        <div class="modal-buttons">
          <v-btn @click="closeModal">Cancelar</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newIdade: "", 
      };
    },
    methods: {
      closeModal() {
      
        this.$emit("close", this.newIdade);
      },
    },
  };
  </script>
  