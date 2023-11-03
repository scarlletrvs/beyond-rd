<template>
  <v-app>
    <div class="timeline">
      <BarraMenu
        :message="message"
        @deleteAllMessages="deleteAllMessages($event)"
      />
      <BarraPesquisa @search-posts="performSearch"  :search="search" />
      <div style="margin-top: 3px">
        <PostNew
          :profileName="userDisplayName"
          :profileUser="userDisplayUser"
          @sendMessages="sendMessages"
          :img="img"
          :message="message"
        />
      </div>
      <div
        v-for="message in filteredMessages"
        :key="message.id"
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

    <ButtomScrollToTop></ButtomScrollToTop>
  </v-app>
</template>

<style>
.post-card-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 1% auto;
  width: 100%;
}

.postagens {
  margin: 0.4% auto;
}
</style>

<script>
import { format } from "date-fns";

import PostCard from "@/components/PostCard.vue";
import BarraMenu from "@/components/BarraMenu.vue";
import PostNew from "@/components/PostNew.vue";
import BarraPesquisa from "@/components/BarraPesquisa.vue";
import ButtomScrollToTop from "@/components/ButtomScrollToTop.vue";

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
      defaultUserProfileImage:
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
      textInput: "",
      imageInput: null,
      editingImage: null,
      search: "",
      img: '',
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
    userDisplayUser() {
      const user = localStorage.getItem("userlocal");
      const email = localStorage.getItem("email");
      return user || "@" + email.slice(0, email.indexOf("@"));
    },
    userDisplayImage() {
      const image = localStorage.getItem("userimage");
      return image || this.defaultUserProfileImage;
    },

    checkInput() {
      const imagem = this.imageInput;
      const texto = this.textInput;
      return imagem || texto.length > 0 ? false : true;
    },

    filteredMessages() {
    if (this.search) {
      const searchTerm = this.search.toLowerCase();
      return this.messages.filter((message) => {
        return (
          (message.text.toLowerCase().includes(searchTerm) ||
            message.user.toLowerCase().includes(searchTerm) ||
            message.name.toLowerCase().includes(searchTerm)) &&
          !message.privado 
        );
      });
    } else {
      return this.messages.filter((message) => !message.privado); 
    }
  },
  },
  methods: {
    associateProfileImageToMessage() {
      const user = this.users.find((u) => u.user === this.message.user);
      if (user) {
        this.$set(
          this.message,
          "profileImage",
          user.userProfileImage || this.defaultUserProfileImage
        );
      } else {
        this.$set(this.message, "profileImage", this.defaultUserProfileImage);
      }
    },
    sendMessages(newMessage) {
      const email = localStorage.getItem("email");
      const nome =
        localStorage.getItem("nome") ||
        (email ? email.slice(0, email.indexOf("@")) : null);
      const user =
        localStorage.getItem("userlocal") ||
        (email ? "@" + email.slice(0, email.indexOf("@")) : null);
      const img =
        localStorage.getItem("userImage") ||
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png";
      const id = this.messages.length;
      if (newMessage.text || newMessage.image) {
        const timestamp = format(new Date(), "dd/MM/yy HH:mm:ss");
        this.messages.unshift({
          id: id,
          name: nome,
          user: user,
          text: newMessage.text,
          image: newMessage.image
            ? URL.createObjectURL(newMessage.image)
            : null,
          img: img,
          timestamp: timestamp,
        });
        console.log("img home:", img);
        console.log("id home:", id);
      }
    },
    performSearch(term) {
      this.search = term;
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
   

  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  mounted() {},
};
</script>
