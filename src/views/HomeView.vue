<template>
  <v-app
      :message="message"
      :index="index"
      @sendMessages="sendMessages"
    >
    <div class="timeline">
     
      <BarraMenu :message="message" :index="index" @deleteAllMessages="deleteAllMessages($event)" />   
      <BarraPesquisa @search-posts="performSearch" :search="search" :profileUser="userUser" />
      <div style="margin-top: 3px; ">
        <PostNew :profileName="userName" :profileUser="userUser" @sendMessages="sendMessages"  message="message"/>

      </div>
      <div v-for="message in filteredMessages" :key="message.id" class="postagens">
  <div class="post-card-container">
    <PostCard
  :message="message"
  :index="index"
  :profileImage="profileImage"
  @deleteMessages="deleteMessages($event)"
  @editMessages="editMessages($event)"
  :postId="message.id"
  :profileUser="message.user"
/> </div>
</div>

    </div>

    <button class="scroll-to-top" @click="scrollToTop" v-show="showScrollButton">
      <v-icon>mdi-arrow-up</v-icon>
    </button>
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

.scroll-to-top {
  position: fixed;
  bottom: 75px;
  right: 20px;
  background-color: rgb(148, 20, 114);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: pink; /* Altere a cor ao passar o mouse, se desejar */
}


</style>

<script>
import PostCard from '@/components/PostCard.vue'; 
import BarraMenu from '@/components/BarraMenu.vue';
import PostNew from '@/components/PostNew.vue';
import BarraPesquisa from '@/components/BarraPesquisa.vue';



export default {
  components: {
    PostCard,
    BarraMenu,
    PostNew,
    BarraPesquisa,
    
},
  name: 'APP',
  data() {
    return {
      showScrollButton: false,
      defaultUserProfileImage: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png',  
      textInput: '',
      imageInput: null,
      editingImage: null,
      search: '',
      users: [
        {
          id: 0,
          name: 'Maria Luiza',
          user: '@Malu10',
          privado: false,
          userProfileImage: 'https://i.pinimg.com/originals/04/19/4b/04194ba6662d1620d7533dab19ccf61a.jpg',
        },
        {
          id: 1,
          name: 'Vitor',
          user: '@vt10',
          privado: false,
          userProfileImage: 'https://img.freepik.com/fotos-premium/um-personagem-de-desenho-animado-com-um-capacete-branco-e-oculos_625492-10145.jpg',
        },
        {
          id: 2,
          name: 'Pedro',
          user: '@pedro200',
          privado: true,
          userProfileImage: 'https://i.pinimg.com/474x/fb/ec/7f/fbec7fd8ed507cae788b0c8e310a32df.jpg',
        },
        {
          id: 5,
          name: 'Sergio Henrique',
          user: '@sh22',
          privado: false,
          userProfileImage: 'https://i.pinimg.com/564x/10/f0/d5/10f0d53a1a1bb3263af8663459404ba8.jpg',
        },
      ],
      messages: [
      {
          id: 0,
          name: 'Maria Luiza',
          user: '@Malu10',
          text: 'oi bom dia!',
          image: null,
          privado: false,
        },
        {
          id: 1,
          name: 'Vitor Gabriel',
          user: '@vt10',
          text: 'sem bom dia!',
          image: null,
          privado: false,
        },
        {
          id: 2,
          name: 'Pedro Lins',
          user: '@pedro200',
          text: 'bom dia!',
          image: null,
          privado: true,
        },
        {
          id: 3,
          name: 'Maria Luiza',
          user: '@Malu10',
          text: 'oi gente!',
          image: null,
          privado: false,
        },
        {
          id: 4,
          name: 'Maria Luiza',
          user: '@Malu10',
          text: 'tudo bom povo!',
          image: null,
          privado: false,
        },
        {
          id: 5,
          name: 'Sergio Henrique',
          user: '@sh22',
          text: 'Eu amo front end',
          image: null,
          privado: false,
        }
      ],
    };
  },

 
  computed: {
    profileImage() {
      // Encontre o usuário correspondente ao usernick da rota
      const user = this.users.find((user) => user.user === this.profileUser);

      // Verifique se o usuário foi encontrado
      if (user) {
        // Verifique se o usuário tem uma imagem de perfil definida
        if (user.userProfileImage) {
          // Retorne a imagem de perfil do usuário encontrado
          return user.userProfileImage;
        } else {
          // Se o usuário não tiver imagem de perfil, retorne a imagem padrão
          return 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png';
        }
      } else {
        // Se o usuário não for encontrado, retorne a imagem padrão
        return 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png';
      }
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
  created() {
    this.updateUserNameAndUserUser();
    window.addEventListener('scroll', this.handleScroll);
  },
  watch: {
    '$data.messages': 'updateUserNameAndUserUser',
  },

  methods: {

    associateProfileImageToMessage() {
  const user = this.users.find((u) => u.user === this.message.user);
  if (user) {
    // Use a URL de userProfileImage se estiver definida, caso contrário, use defaultUserProfileImage.
    this.$set(this.message, 'profileImage', user.userProfileImage || this.defaultUserProfileImage);
  } else {
    // Se o usuário não for encontrado, use a imagem padrão.
    this.$set(this.message, 'profileImage', this.defaultUserProfileImage);
  }
},


    handleScroll() {
    const scrollPosition = window.scrollY;

    // Defina 500 para o valor desejado em pixels
    if (scrollPosition > 500) {
      this.showScrollButton = true;
    } else {
      this.showScrollButton = false;
    }
  },

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
    performSearch(term) {
      this.search = term;
    },
    navigateToProfile(username) {
      
      this.$router.push(`/perfil/${username}`);
    },
    updateUserNameAndUserUser() {
  this.userName = localStorage.getItem('nome') || (localStorage.getItem('email') ? localStorage.getItem('email').slice(0, localStorage.getItem('email').indexOf('@')) : '');
  this.userUser = localStorage.getItem('user') || (localStorage.getItem('email') ? ('@' + localStorage.getItem('email').slice(0, localStorage.getItem('email').indexOf('@'))) : '');
}
,
    sendMessages(newMessage) {
      const nome = this.userName || this.userEmail;
      const user = this.userUser || this.userEmail;

      if (newMessage.text || newMessage.image) {
        this.messages.push({
          id: this.messages.length,
          name: nome,
          user: user,
          text: newMessage.text,
          image: newMessage.image ? URL.createObjectURL(newMessage.image) : null,
        });
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
   
  },
};
</script>