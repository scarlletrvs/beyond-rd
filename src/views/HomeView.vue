<template>
  <v-app>
    <div class="timeline">
     
      <BarraMenu :message="message" :index="index" @deleteAllMessages="deleteAllMessages($event)" />
      <BarraPesquisa @search-posts="performSearch" :search="search" />
      <div style="margin-top: 3px; ">
        <PostNew :profileName="profileName" @sendMessages="sendMessages" />
      </div>
      <div v-for="message in filteredMessages" :key="message.id" class="postagens">
  <div class="post-card-container">
    <postCard :message="message" :index="message.id" @deleteMessages="deleteMessages($event)" @editMessages="editMessages($event)" :postId="message.id" :profileUser="message.user" :search="search" />
  </div>
</div>

    </div>
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
      
      textInput: '',
      imageInput: null,
      editingImage: null,
      search: '',
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
    performSearch(term) {
      this.search = term;
    },
    navigateToProfile(username) {
      
      this.$router.push(`/perfil/${username}`);
    },
    sendMessages(newMessage) {
      if (newMessage.text || newMessage.image) {
        this.messages.push({
          id: this.messages.length,
          name: 'Maria Luiza',
          user: '@malu10',
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
