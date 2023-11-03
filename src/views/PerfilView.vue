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
          <div class="img-div"><v-img class="imgprofile" :src="profileImageUser"></v-img></div>

          <h1 class="profile-name">
            {{ profileName }}
          </h1>
        </div>
        <div></div>
        <div class="divPostNew" v-if="profileUser === userDisplayUserLocal">
          <PostNew
            :profileName="userDisplayName"
            :profileUser="userDisplayUser"
            :img="userDisplayImage"
            :message="message"
            @sendMessages="sendMessages"
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
            :postId="message.id"
            :profileUser="message.user"
            :img="message.profileImage"
            @deleteMessages="deleteMessages"
            @editMessages="editMessages"
          />
        </div>
      </div>
    </div>
    <v-main></v-main>
    <ButtomScrollToTop></ButtomScrollToTop>
  </v-app>
</template>

<style>
.postagens {
  margin-left: 1% ;
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

@media (min-width: 1721px) and (max-width:2000px ) {
  .div-imagem-profilename {
    width: 15%;
    padding-top: 5px;
  }
 
  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile{
    width: 180px;
    height: 180px;
  }
  .divPostNew{
    width:100%;
    margin-left: -px;
    margin-top: 11px;
  }

}


@media (min-width: 1200px) and (max-width:1721px ) {
  .div-imagem-profilename {
    width: 20%;
    padding-top: 5px;
  }
 
  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile{
    width: 165px;
    height: 165px;
  }
  .divPostNew{
    width:90%;
    margin-left: -px;
    margin-top: 7px;
  }

}

@media (min-width: 950px) and (max-width:1200px ) {
  .div-imagem-profilename {
    width: 27%;
    padding-top: 5px;
  }
 
  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile{
    width: 160px;
    height: 160px;
  }

}



@media (min-width: 770px) and (max-width:950px ) {
  .div-imagem-profilename {
    width: 27%;
    padding-top: 5px;
  }
 
  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile{
    width: 150px;
    height: 150px;
  }

}
@media (min-width: 650px) and (max-width:770px ) {
  .div-imagem-profilename {
    width: 32%;
    padding-top: 5px;
  }
 
  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile{
    width: 145px;
    height: 145px;
  }


}
@media (min-width: 570px) and (max-width:650px ) {
  .div-imagem-profilename {
    width: 36%;
    padding-top: 5px;
  }
 
  .divPostNew {
    width: 90%;
    margin-left: 3px;
  }
  .imgprofile{
    width: 140px;
    height: 140px;
  }

}

@media (min-width: 490px) and (max-width:570px ) {
  .div-imagem-profilename {
    width: 36%;
    padding-top: 5px;
  }
 
  .divPostNew {
    width: 80%;
    margin-left: 3px;
  }
  .imgprofile{
    width:140px;
    height: 140px;

  }
  img-div{
    width: 80%;
    height: 80%;
  
  }

}
@media (min-width: 430px) and (max-width:490px ) {
  .div-imagem-profilename {
    width: 36%;
    padding-top: 5px;
  }
 
  .divPostNew {
    width: 80%;
    margin-left: 3px;
  }
  .imgprofile{
    width:130px;
    height: 130px;

  }
  img-div{
    width: 70%;
    height: 70%;
    padding-top: 10px;
  }
  .profile-name{
    font-size: 14px;
    margin-top: 10px;
  }

}
@media (min-width: 395px) and (max-width:430px ) {
  .div-imagem-profilename {
    width: 36%;
    padding-top: 5px;
  }
 
  .divPostNew {
    width: 80%;
    margin-left: 3px;
  }
  .imgprofile{
    width:120px;
    height: 120px;

  }
  img-div{
    width: 70%;
    height: 70%;
    padding-top: 10px;
  }
  .profile-name{
    font-size: 14px;
    margin-top: 10px;
  }

}


@media (min-width: 380px) and (max-width:395px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:65px;
    height: 65px;
    margin-left: 490%;
    margin-top: 1px;

  }
 
  .profile-name{
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
  gap: 5px;}

}


@media (min-width: 364px) and (max-width:380px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:60px;
    height: 60px;
    margin-left: 525%;
    margin-top: 6px;

  }
 
  .profile-name{
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
  gap: 5px;}

}
@media (min-width: 346px) and (max-width:364px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:60px;
    height: 60px;
    margin-left: 495%;
    margin-top: 7px;

  }
 
  .profile-name{
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
  gap: 5px;}

}

@media (min-width: 339px) and (max-width:346px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:58px;
    height: 58px;
    margin-left: 502%;
    margin-top: 4px;

  }
 
  .profile-name{
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
  gap: 5px;}

}

@media (min-width: 320px) and (max-width:339px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:55px;
    height: 55px;
    margin-left: 495%;
    margin-top: 4px;

  }
 
  .profile-name{
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
  gap: 5px;}

}

@media (min-width: 315px) and (max-width:320px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:55px;
    height: 55px;
    margin-left: 478%;
    margin-top: 4px;

  }
 
  .profile-name{
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
  gap: 5px;}

}

@media (min-width: 305px) and (max-width:315px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:55px;
    height: 55px;
    margin-left: 465%;
    margin-top: 4px;

  }
 
  .profile-name{
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
  gap: 5px;}

}

@media (min-width: 297px) and (max-width:305px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:55px;
    height: 55px;
    margin-left: 455%;
    margin-top: 4px;

  }
 
  .profile-name{
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
  gap: 5px;}

}


@media (min-width: 290px) and (max-width:297px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:55px;
    height: 55px;
    margin-left: 440%;
    margin-top: 4px;

  }
 
  .profile-name{
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
  gap: 5px;}

}

@media (min-width: 273px) and (max-width:290px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:55px;
    height: 55px;
    margin-left: 413%;
    margin-top: 4px;

  }
 
  .profile-name{
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
  gap: 5px;}

}


@media (min-width: 265px) and (max-width:273px ) {
  .div-imagem-profilename {
    width: 0%;
    padding-top: 5px;
    flex-direction:column;
    gap: 10px;
    padding-left: 10px;
  }
 
  .divPostNew {
    width: 100%;
    margin-left: 3px;
    margin-left: -20px;
  }
  .imgprofile{
    width:55px;
    height: 55px;
    margin-left: 400%;
    margin-top: 4px;

  }
 
  .profile-name{
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
  gap: 5px;}

}









</style>

<script>
import PostCard from "@/components/PostCard.vue";
import BarraMenu from "@/components/BarraMenu.vue";
import PostNew from "@/components/PostNew.vue";
import BarraPesquisa from "@/components/BarraPesquisa.vue";
import ButtomScrollToTop from "@/components/ButtomScrollToTop.vue";
import { format } from "date-fns";

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
      profileImageUser: "",
      search: "",
      message: this.messages,
      profileName: this.$route.params.userName,
      profileUser: this.$route.params.userNick,
      userUser: this.$route.params.userNick,

      profileUndefined:
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
      users: [
        {
          id: 0,
          name: "Maria Luiza",
          user: "@Malu10",
          privado: false,
          userProfileImage:
            "https://i.pinimg.com/originals/04/19/4b/04194ba6662d1620d7533dab19ccf61a.jpg",
        },
        {
          id: 1,
          name: "Vitor",
          user: "@vt10",
          privado: false,
          userProfileImage:
            "https://img.freepik.com/fotos-premium/um-personagem-de-desenho-animado-com-um-capacete-branco-e-oculos_625492-10145.jpg",
        },
        {
          id: 2,
          name: "Pedro",
          user: "@pedro200",
          privado: true,
          userProfileImage:
            "https://i.pinimg.com/474x/fb/ec/7f/fbec7fd8ed507cae788b0c8e310a32df.jpg",
        },
        {
          id: 5,
          name: "Sergio Henrique",
          user: "@sh22",
          privado: false,
          userProfileImage:
            "https://i.pinimg.com/564x/10/f0/d5/10f0d53a1a1bb3263af8663459404ba8.jpg",
        },
      ],
      messages: [
        {
          id: 0,
          name: "Maria Luiza",
          user: "@Malu10",
          text: "oi bom dia!",
          image: null,
          privado: false,
          timestamp: "22/10/23  20:52:01",
          profileImage:
            "https://i.pinimg.com/originals/04/19/4b/04194ba6662d1620d7533dab19ccf61a.jpg",
        },
        {
          id: 1,
          name: "Vitor Gabriel",
          user: "@vt10",
          text: "sem bom dia!",
          image: null,
          privado: false,
          timestamp: "25/10/23  10:52:01",
          profileImage:
            "https://img.freepik.com/fotos-premium/um-personagem-de-desenho-animado-com-um-capacete-branco-e-oculos_625492-10145.jpg",
        },
        {
          id: 2,
          name: "Pedro Lins",
          user: "@pedro200",
          text: "bom dia!",
          image: null,
          privado: true,
          timestamp: "29/10/23  13:10:01",
          profileImage:
            "https://i.pinimg.com/474x/fb/ec/7f/fbec7fd8ed507cae788b0c8e310a32df.jpg",
        },
        {
          id: 3,
          name: "Maria Luiza",
          user: "@Malu10",
          text: "oi gente!",
          image: null,
          privado: false,
          timestamp: "30/10/23  01:10:01",
          profileImage:
            "https://i.pinimg.com/originals/04/19/4b/04194ba6662d1620d7533dab19ccf61a.jpg",
        },
        {
          id: 4,
          name: "Maria Luiza",
          user: "@Malu10",
          text: "tudo bom povo!",
          image: null,
          privado: false,
          timestamp: "31/10/23  03:10:01",
          profileImage:
            "https://i.pinimg.com/originals/04/19/4b/04194ba6662d1620d7533dab19ccf61a.jpg",
        },
        {
          id: 5,
          name: "Sergio Henrique",
          user: "@sh22",
          text: "Eu amo front end",
          image: null,
          privado: false,
          timestamp: "31/10/23  00:20:01",
          profileImage:
            "https://i.pinimg.com/564x/10/f0/d5/10f0d53a1a1bb3263af8663459404ba8.jpg",
        },
      ],
    };
  },
  computed: {
    userDisplayUser() {
      const user = localStorage.getItem("userlocal");
      const email = localStorage.getItem("email");
      return user || "@" + email.slice(0, email.indexOf("@"));
    },
    userDisplayName() {
      const name = localStorage.getItem("nome");
      const email = localStorage.getItem("email");
      return name || (email ? email.slice(0, email.indexOf("@")) : null);
    },
    userDisplayUserLocal() {
      const user = localStorage.getItem("userlocal");
      const email = localStorage.getItem("email");
      return user || "@" + email.slice(0, email.indexOf("@"));
    },
    userDisplayImage() {
      const image = localStorage.getItem("photoURL");
      return image || this.defaultUserProfileImage;
    },

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
    getUserProfileImage(profileUser) {
      const user = this.users.find((user) => user.user === profileUser);

      if (user) {
        return user.userProfileImage || this.profileUndefined;
      } else {
        return this.profileUndefined;
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
        (message) => message.name.toLowerCase() === profileName
      );
    },
    sendMessages(newMessage) {
      if (newMessage.text || newMessage.image) {
        const img = localStorage.getItem("userImage") || this.profileUndefined;
        const timestamp = format(new Date(), "dd/MM/yy HH:mm:ss");

        this.messages.unshift({
          id: this.messages.length,
          name: this.profileName,
          user: this.profileUser,
          text: newMessage.text,
          image: newMessage.image
            ? URL.createObjectURL(newMessage.image)
            : null,
          timestamp: timestamp,
          img: img,
        });
        console.log("img perfil", img);
      }
    },

    deleteMessages(id) {
      this.messages = this.messages.filter((message) => message.id !== id);
    },
    editMessages({ id, novoTexto, editingImage }) {
      const post = this.messages.find((message) => message.id === id);
      post.text = novoTexto;
      if (editingImage) {
        post.image = URL.createObjectURL(editingImage);
      }
    },
    deleteAllMessages() {
      this.messages = [];
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
    updateProfile() {
      const name = localStorage.getItem("nome");
      const user = localStorage.getItem("userlocal");
      const email = localStorage.getItem("email");
      const profileImage = localStorage.getItem("userImage");

      console.log("Dados do Local Storage para o perfil:");
      console.log("Nome:", name);
      console.log("Usuário:", user);
      console.log("Email:", email);
      console.log("Imagem de perfil:", profileImage);

      const existingProfile = this.users.find(
        (profile) => profile.user === user
      );

      if (existingProfile) {
        existingProfile.name =
          name || (email ? email.slice(0, email.indexOf("@")) : "");
        if (profileImage) {
          existingProfile.userProfileImage = profileImage;
        }
      } else {
        this.users.push({
          id: this.users.length,
          name: name || (email ? email.slice(0, email.indexOf("@")) : ""),
          user: user || (email ? "@" + email.slice(0, email.indexOf("@")) : ""),
          privado: false,
          userProfileImage: profileImage || this.profileUndefined,
        });
      }

      console.log("Perfis após a atualização:");
      console.log(this.users);
    },
  },
  created() {
    this.updateProfile();
    this.profileImageUser = this.getUserProfileImage(this.profileUser);
  },
};
</script>
