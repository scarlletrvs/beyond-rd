<template>
  <v-app>
    <div class="timeline" style="flex-direction: column">
      <BarraMenu
        :profileName="profileName"
        @deleteAllMessages="deleteAllMessages($event)"
      />
      <BarraPesquisa @search-posts="performSearch" />
      <div class="perfil-postnew">
        <div class="div-imagem-profilename">
  <div class="img-div">
    <v-img class="imgprofile" :src="profileImageUser()"></v-img>
  </div>
  <h1 class="profile-name">
    {{ profileName }}
  </h1>
</div>

<div class="divPostNew" v-if="isCurrentUserProfileUser()">
      <PostNew
        @sendMessages="sendMessages"
        :message="message"
      />
    </div>

      </div>
      <div
        v-for="(message, id) in filteredMessages"
        :key="id"
        class="postagens"
      >
        <div class="post-card-container">
          <PostCard
            :message="message"
            :postId="String(message.id)"
            @deleteMessages="deleteMessages"
            @editMessages="editMessages"
            :img="message.img"
          />
        </div>
      </div>
    </div>
    <v-main></v-main>
    <ButtomScrollToTop></ButtomScrollToTop>
  </v-app>
</template>


<script>
import PostCard from "@/components/PostCard.vue";
import BarraMenu from "@/components/BarraMenu.vue";
import PostNew from "@/components/PostNew.vue";
import BarraPesquisa from "@/components/BarraPesquisa.vue";
import ButtomScrollToTop from "@/components/ButtomScrollToTop.vue";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
  runTransaction
} from "firebase/firestore";
import { auth } from "../config/index";
import { db } from "../config/index";


export default {
  components: {
    PostCard,
    BarraMenu,
    PostNew,
    BarraPesquisa,
    ButtomScrollToTop,
  },
  name: "APP",
  data() {
    return {
      textInput: "",
      imageInput: null,
      editingImage: null,
      search: "",
      message: this.messages,
      profileName: " ",
      userUser: this.$route.params.userNick,
      currentUserEmail: "",

      profileUndefined:
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
      users: [],
      messages: [  ],
      user: null,
    };
  },
  computed: {
 
 
  checkInput() {
    const imagem = this.imageInput;
    const texto = this.textInput;
    return imagem || texto.length > 0 ? false : true;
  },
  filteredMessages() {
    if (this.search) {
      return this.filterMessagesBySearch(
        this.search.toLowerCase(),
        this.profileUser
      );
    } else {
      return this.filterMessagesByProfileName(this.profileName.toLowerCase());
    }
  },
  
},

  methods: {

    isCurrentUserProfileUser() {
    if (this.userUser) {
      const userProfile = this.users.find((user) => user.user === this.userUser);

      if (userProfile) {
        const currentUserEmail = auth.currentUser.email;
        return userProfile.email === currentUserEmail;
      }
    }
    return false;
  },


  profileImageUser() {
    if (this.userUser) {
      const userProfile = this.users.find((user) => user.user === this.userUser);

     if(userProfile){
      return userProfile.profileImage
;
     }
        
      
    }
   
  },
    performSearch(term) {
      this.search = term;
    },
    filterMessagesBySearch(searchTerm, profileUser) {
      return this.messages.filter((message) => {
        return (
          message.user === profileUser &&
          message.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    },

    filterMessagesByProfileName(profileName) {
  return this.messages.filter(
    (message) => message.name && message.name.toLowerCase() === profileName
  );
},

    async sendMessages(newMessage) {
      try {
        const user = auth.currentUser;

        if (!user) {
          return;
        }

        const timestamp = format(new Date(), "dd/MM/yy HH:mm:ss");
        const userImage =
          localStorage.getItem("userImage") ||
          "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png";
        const text = newMessage && newMessage.text ? newMessage.text : "";
        const image =
          newMessage && newMessage.image
            ? URL.createObjectURL(newMessage.image)
            : null;

        const post = {
          name: localStorage.getItem("nome") || user.displayName,
          user:
            localStorage.getItem("userlocal") ||
            "@" + user.email.slice(0, user.email.indexOf("@")),
          text: text,
          image: image,
          img: userImage, 
          timestamp: timestamp,
          id: uuidv4(),
        };

        const PostsCollection = collection(db, "Posts");

        await setDoc(doc(PostsCollection, post.id), post);
        console.log("img post new ", userImage);

        console.log("Documento adicionado com ID: ", post.id);
        this.messages.push(post);
      } catch (error) {
        console.error("Erro ao adicionar post ao Firestore:", error);
      }
    },

    async deleteMessages(postId) {
  try {
    const PostsCollection = collection(db, "Posts");

    await deleteDoc(doc(PostsCollection, postId));

    this.messages = this.messages.filter((message) => message.id !== postId);
  } catch (error) {
    console.error("Erro ao excluir post do Firestore:", error);
  }
},
    editMessages({ id, novoTexto, editingImage }) {
      const post = this.messages.find((message) => message.id === id);
      post.text = novoTexto;
      if (editingImage) {
        post.image = URL.createObjectURL(editingImage);
      }
    },
    async deleteAllMessages() {
    try {
      const PostsCollection = collection(db, "Posts");

      await runTransaction(db, async (transaction) => {
        const querySnapshot = await getDocs(PostsCollection);

        querySnapshot.forEach((doc) => {
          transaction.delete(doc.ref);
        });
      });

      this.messages = [];
    } catch (error) {
      console.error("Erro ao excluir todos os posts do Firestore:", error);
    }
  },
    onImageChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.imageInput = selectedFile;
      }
    },
    isProfilePrivate(profileUser) {
      const user = this.users.find((user) => user.user === profileUser);
      return user ? user.privado : false;
    },
    async updateProfile() {
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    this.users = querySnapshot.docs.map((doc) => doc.data());
    
    const user = this.users.find((user) => user.user === this.profileUser);

    if (user) {
      this.profileName = user.name;

    } else {
      this.profileName = this.$route.params.userName;
    }

    console.log("Perfis após a atualização:");
    console.log(this.users);
  } catch (error) {
    console.error("Erro ao obter dados da coleção 'users':", error);
  }
},


  },
  async created() {
 
    this.updateProfile();
  },
  async mounted() {
  try {
    const PostsCollection = collection(db, "Posts");
    const querySnapshot = await getDocs(PostsCollection);

    // Inverta a ordem das mensagens para exibir a mais recente primeiro
    this.messages = querySnapshot.docs.map((doc) => doc.data()).reverse();
  } catch (error) {
    console.error("Erro ao obter posts do Firestore:", error);
  }
  console.log(auth.currentUser)
  console.log('userUser:',this.userUser)
},
};
</script>


<style>
.postagens {
  margin-left: 1%;
  margin-top: 1.3%;

  width: 100%;
}
.imgprofile {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid black;
  margin-top: -5px;
}
.divPostNew {
  width: 100%;
  height: 100%;
}
.profile-name {
  font-size: 3.5rem;
  color: black;
  font-size: medium;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.div-imagem-profilename {
  width: 15%;
  flex-direction: column;
  gap: 2px;
  margin-top: 1%;
  margin-bottom: 0.5%;
  display: flex;
  align-items: center;
}
.perfil-postnew {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #f9e1df;
  border: 1px solid grey;
  margin-top: 0.3rem;
  justify-content: center;
  display: flex;
}
.post-card-container{
  margin-bottom: 1.7%;
}

@media (min-width: 1721px) and (max-width: 2000px) {
  .div-imagem-profilename {
    width: 15%;
    padding-top: 5px;
  }

  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile {
    width: 180px;
    height: 180px;
  }
  .divPostNew {
    width: 100%;
    margin-left: -px;
    margin-top: 11px;
  }
  .post-card-container{
  margin-bottom: 1.9%;
}
}

@media (min-width: 1200px) and (max-width: 1721px) {
  .div-imagem-profilename {
    width: 20%;
    padding-top: 5px;
  }

  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile {
    width: 165px;
    height: 165px;
  }
  .divPostNew {
    width: 90%;
    margin-left: -px;
    margin-top: 7px;
  }
  .post-card-container{
  margin-bottom: 1.9%;
}
}

@media (min-width: 950px) and (max-width: 1200px) {
  .div-imagem-profilename {
    width: 27%;
    padding-top: 5px;
  }

  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile {
    width: 160px;
    height: 160px;
  }
  .post-card-container{
  margin-bottom: 2.1%;
}
}

@media (min-width: 770px) and (max-width: 950px) {
  .div-imagem-profilename {
    width: 27%;
    padding-top: 5px;
  }

  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile {
    width: 150px;
    height: 150px;
  }
    .post-card-container{
  margin-bottom: 2.6%;
}
}
@media (min-width: 650px) and (max-width: 770px) {
  .div-imagem-profilename {
    width: 32%;
    padding-top: 5px;
  }

  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile {
    width: 145px;
    height: 145px;
  }
  .post-card-container{
  margin-bottom: 2.9%;
}

}
@media (min-width: 570px) and (max-width: 650px) {
  .div-imagem-profilename {
    width: 36%;
    padding-top: 5px;
  }

  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile {
    width: 140px;
    height: 140px;
  }
  .post-card-container{
  margin-bottom: 3.5%;
}
}

@media (min-width: 490px) and (max-width: 570px) {
  .div-imagem-profilename {
    width: 36%;
    padding-top: 5px;
  }

  .divPostNew {
    width: 80%;
    margin-left: 3px;
  }
  .imgprofile {
    width: 140px;
    height: 140px;
  }
  img-div {
    width: 80%;
    height: 80%;
  }
  .post-card-container{
  margin-bottom: 4.1%;
}
}
@media (min-width: 430px) and (max-width: 490px) {
  .div-imagem-profilename {
    width: 36%;
    padding-top: 5px;
  }

  .divPostNew {
    width: 80%;
    margin-left: 3px;
  }
  .imgprofile {
    width: 130px;
    height: 130px;
  }
  img-div {
    width: 70%;
    height: 70%;
    padding-top: 10px;
  }
  .profile-name {
    font-size: 14px;
    margin-top: 10px;
  }
  .post-card-container{
  margin-bottom: 4.3%;
}
}
@media (min-width: 395px) and (max-width: 430px) {
  .div-imagem-profilename {
    width: 36%;
    padding-top: 5px;
  }

  .divPostNew {
    width: 80%;
    margin-left: 3px;
  }
  .imgprofile {
    width: 120px;
    height: 120px;
  }
  img-div {
    width: 70%;
    height: 70%;
    padding-top: 10px;
  }
  .profile-name {
    font-size: 14px;
    margin-top: 10px;
  }
  .post-card-container{
  margin-bottom: 4.6%;
}
}

@media (min-width: 380px) and (max-width: 395px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 65px;
    height: 65px;
    margin-left: 490%;
    margin-top: 1px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 4.8%;
}
}

@media (min-width: 364px) and (max-width: 380px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 60px;
    height: 60px;
    margin-left: 525%;
    margin-top: 6px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 4.9%;
}
}
@media (min-width: 346px) and (max-width: 364px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 60px;
    height: 60px;
    margin-left: 495%;
    margin-top: 7px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 5.1%;
}
}

@media (min-width: 339px) and (max-width: 346px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 58px;
    height: 58px;
    margin-left: 502%;
    margin-top: 4px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 5.3%;
}
}

@media (min-width: 320px) and (max-width: 339px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 55px;
    height: 55px;
    margin-left: 495%;
    margin-top: 4px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 5.6%;
}
}

@media (min-width: 315px) and (max-width: 320px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 55px;
    height: 55px;
    margin-left: 478%;
    margin-top: 4px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 5.9%;
}
}

@media (min-width: 305px) and (max-width: 315px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 55px;
    height: 55px;
    margin-left: 465%;
    margin-top: 4px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 6.1%;
}
}

@media (min-width: 297px) and (max-width: 305px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 55px;
    height: 55px;
    margin-left: 455%;
    margin-top: 4px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 6.3%;
}
}

@media (min-width: 290px) and (max-width: 297px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 55px;
    height: 55px;
    margin-left: 440%;
    margin-top: 4px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 6.5%;
}
}

@media (min-width: 273px) and (max-width: 290px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 55px;
    height: 55px;
    margin-left: 413%;
    margin-top: 4px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 6.9%;
}
}

@media (min-width: 265px) and (max-width: 273px) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;
  }

  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile {
    width: 55px;
    height: 55px;
    margin-left: 400%;
    margin-top: 4px;
  }

  .profile-name {
    font-size: 0px;
    margin-top: 14px;
  }
  .perfil-postnew {
    display: flex;
    flex-direction: row;
    width: 100%;

    background-color: #f9e1df;
    border: 1px solid grey;
    margin-top: 0.3rem;
    gap: 5px;
  }
  .post-card-container{
  margin-bottom: 7.2%;
}
}
</style>