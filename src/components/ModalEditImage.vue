<template>
    <div class="Imagem-modal">
      <div class="modal-content">
        <h2>Editar Imagem</h2>
        <input type="file" @change="handleImageChange" accept="image/*"  />
        <div class="modal-buttons">
          <v-btn @click="closeModal">Cancelar</v-btn>
          <v-btn @click="saveImageProfile">Salvar</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newImageProfile: null, 
      };
    },
    methods: {
      closeModal() {
        this.$emit("close", this.newImageProfile); 
      },
      saveImageProfile() {
        this.$emit("save", this.newImageProfile); 
      },
      handleImageChange(event) {
        const file = event.target.files[0];
        
     
        this.newImageProfile = file;
      },
    },
  };
  </script>
  