<template>
    <div class="post" style="justify-content: center; gap: 3px; display: flex; align-items: flex-start; margin-top: 0.3rem; margin-bottom: 3px;">
      <v-card style="width: 98%; height: 45%; background-color: rgb(148, 20, 114);">
        <div style="display: flex; flex-direction: column; gap: 2px;">
          
          <v-card-subtitle
          style="font-weight: bold; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: black; font-size: 16px; margin-top: 0px;"
        >
          {{ profileName }}
        </v-card-subtitle>
          
          <v-text-field
            v-model="textInput"
            solo
            hide-details="faça uma postagem!"
            style="width: 95%; height: 10%; display: flex; margin: 5px auto; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; color: black; font-size: 14px; margin-bottom: 10px;"
          ></v-text-field>
          <div style="display: flex; margin-bottom: 10px; justify-content: right; margin-right: 3%;">
            <v-file-input
              label="adicione uma foto"
              accept="image/png, image/jpeg, image/bmp"
              filled
              v-model="imageInput"
              @change="onImageChange"
            ></v-file-input>
            <v-btn :disabled="checkInput" @click="sendMessages" style="width: 10%; height: 12%;">Postar</v-btn>
          </div>
        </div>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        textInput: '',
        imageInput: null,
        checkInput: false,
      
      };
    },
    methods: {

  sendMessages() {
    this.$emit('sendMessages', {
      name: this.profileName,
      user:this.profileUser,
      text: this.textInput,
      image: this.imageInput,

    });
    this.textInput = '';
    this.imageInput = null;
  },
  onImageChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.imageInput = selectedFile;
      }
    },
},
    props: {
      profileName: {
        type: String,
        required: true,
      },
      profileUser:{
        type:String,
        required: true
      }
    },
  };
  </script>
  
  