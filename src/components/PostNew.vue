<template >
  <div class="post">
  <div class="profiles"> <p class="profilename">{{ profileName }}</p>
     <p class="profileuser">{{ profileUser }}</p></div>
    
     <v-text-field
   v-model="textInput"
   solo
   hide-details="faça uma postagem!"
   placeholder="Digite aqui sua postagem!"
   class="text-field"
   :style="{ border: 'none' }" 
 ></v-text-field>
  
   <div class="image-button">
     <v-file-input
           label="adicione uma foto"
           accept="image/png, image/jpeg, image/bmp"
           hide-input
           truncate-length="20"
           v-model="imageInput"
           @change="onImageChange"
           :prepend-icon="'mdi-camera'"
           class="custom-file-input"
         ></v-file-input>
     
         <v-btn  :disabled="checkInput" @click="sendMessages"   class="btn-postar">
         Postar
         </v-btn>
 
   </div>
 
  </div>
 </template>
 
 <style>
 .post {
   display: flex;
   flex-direction: column;
   height: 40%;
   width: 99%;
   margin: 0.5% auto ;
   background-color: rgb(148, 20, 114);
   border-radius: 10px;
    justify-content: center;
    align-items: center;
    
  
  
 }
 
 .profiles{
   display: flex;
   justify-content: start !important;
   flex-direction: column;
   height: auto;
   width:100%;
   padding-top: 0.8rem;
   padding-left: 2%;
   
   
 } 
 
 .profilename{
 font-family: Avenir, Helvetica, Arial, sans-serif;
 color: black;
 font-weight: 400;
 font-size: 20px;
 text-align: start;
 
 
 }
 
 .profileuser{
 color:  gray;
 font-size: 15px;
 margin-bottom: 0rem;
 margin-top: -1.0rem;
 text-align: start;
 
 
 
 
 }
 /* .divtextfield{
   height: auto;
   margin-top: 0.4 rem;
   display: flex;
  padding: 0.4re, auto;
  align-items: center;
  */
 
 /* } */
 .text-field{
   margin-bottom: 0.2rem;
   width: 96%;
   border: 2px solid #938a8a;
   height: auto;
   font-size: 12px;
   margin-top: -0.4rem;
 
    
 }
 
 
 .image-button{
 
   flex-direction: row;
   display: flex;
   width: 100%;
   margin-top: 0.4rem;
   align-self: flex-end;
  justify-content: space-around;
  padding-left: 2.5%;
  padding-right: 2%;
   
   
 }
 .custom-file-input{
  margin-top:-0.6rem ;
 flex-grow: 1;
 
 
 }
 
 .custom-file-input .v-icon {
   color: white; 
   font-size: 2.6rem;
   transition: color 0.3s; 
   
   &:hover {
     color: pink; 
   }
 }
 .btn-postar{
   width: 30%;
   height: auto;
   border: 2px solid #938a8a;
   font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    margin-bottom: 0.8rem;
 
 
 }
 
 
 
 </style>
 
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
    const name = localStorage.getItem('nome');
    const user = localStorage.getItem('userlocal');
    const email = localStorage.getItem('email');

   
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString(); 
    
    this.$emit('sendMessages', {
      name: name || (email ? email.slice(0, email.indexOf('@')) : null),
      user: user || (email ? email.slice(0, email.indexOf('@')) : null),
      text: this.textInput,
      image: this.imageInput,
      userProfileImage: this.userProfileImage,
      timestamp: timestamp, 
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
       required: true
     },
     profileUser: {
       type: String,
       required: true
     },
     message: {
       type: Object,
       required: true,
     },
     index: {
       type: Number,
       required: true,
     },
     userProfileImage: {
       type : String ,
       required: true
 
     },
     
 

     
   },
 };
 </script>