<template>
    <div class="dataNasc-modal">
      <div class="modal-content">
        <h2>Editar Data de Nascimento:</h2>
        <input v-model="newDataNasc" type="date" placeholder="Nova Data de Nascimento" />
        <div class="modal-buttons">
          <v-btn @click="closeModal">Cancelar</v-btn>
          <v-btn @click="saveDataNasc">Salvar</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        newDataNasc: "", 
      };
    },
    methods: {
      closeModal() {
        this.$emit("close", this.newDataNasc);
      },
      saveDataNasc() {
  this.$emit("save", this.newDataNasc);
},
    },
  };
  </script>
  