<template>
  <v-card style="width: 98%; height: 30%; flex-direction: column; box-shadow: inset; background-color:#F9E1DF;">
    <v-card-subtitle style="font-weight: bold; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: black; font-size: 0.9rem; margin-top: 0px;">
      <router-link :to="'/perfil/' + message.name + '/' +message.user +'/' + message.id" style="color: black;">{{ message.name }}</router-link>
    </v-card-subtitle>
    <v-card-text style="color: grey; font-size: 0.7rem; font-weight: bold; margin-top: -1.2rem;">
      <router-link :to="'/perfil/' + message.name +'/' +message.user +'/'  + message.id"  style="color: black;">{{ message.user }}</router-link>
    </v-card-text>
    <v-card-text style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: black; font-size: 0.9rem; margin-left: 5px; margin-top: -1.4rem;">
      {{ message.text }}
    </v-card-text>
    <v-img v-if="message.image" :src="message.image" max-width="100%" max-height="auto"></v-img>
    <v-row style="display: flex; flex-direction: row; gap:10px; justify-content: right; margin-right: 20px; margin-left: 10px; padding-bottom: 20px;">
      <v-btn @click="openDialog()" style="width: 10%; height: 90%;" v-if="message.id === postId">Editar</v-btn>
      <v-btn @click="deleteMessages(message.id)" style="width: 10%; height: 90%;">Excluir</v-btn>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edite sua postagem</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formData.NovoTextInput" label="Digite nova postagem" required></v-text-field>
          <v-file-input v-model="formData.editingImage" label="Editar imagem" accept="image/*"></v-file-input>
        </v-card-text>
        <v-btn color="blue darken-1" text @click="closeDialog(index)">Close</v-btn>
        <v-btn color="blue darken-1" text @click="editMessages(message.id, formData.NovoTextInput, index, formData.editingImage)">Save</v-btn>
      </v-card>
    </v-dialog>
    </v-row>
  </v-card>
</template>


<script>
export default {
  data() {
    return {
      dialog: false,
      formData: {
        NovoTextInput: '',
        editingImage: '',
      },
    };
  },
  

  methods: {
    navigateToProfile() {
      this.$emit("navigateToProfile", this.message.name, this.message.user, this.message.id);
    },
    deleteMessages(id) {
      this.$emit("deleteMessages", id);
    },
    editMessages(id, novoTexto, index, editingImage) {
      this.$emit("editMessages", { id, novoTexto, editingImage, index });
      this.closeDialog();
    },
    openDialog() {
      this.formData.NovoTextInput = this.message.text;
      this.dialog = true;
    },
    closeDialog() {
      this.formData.NovoTextInput = '';
      this.dialog = false;
    },
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    postId: {
      type: Number,
      required: true,
    },
    profileUser:{
      type:String,
      required: true
    },
 
  },
};
</script>