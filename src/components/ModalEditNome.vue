<template>
  <div class="Nome-modal">
    <div class="modal-content">
      <h2>Editar Nome</h2>
      <input v-model="newNome" type="text" placeholder="Novo Nome" />
      <div class="modal-buttons">
        <v-btn @click="closeModal">Cancelar</v-btn>

        <v-btn @click="saveNome">Salvar</v-btn>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newNome: "", 
    };
  },
  methods: {
    closeModal() {
      this.$emit("close", this.newNome);
    },
    saveNome() {
      this.$emit("save", this.newNome);
    },
  },
};
</script>
