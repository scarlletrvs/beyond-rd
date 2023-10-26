<template>
  <v-app>
    <div class="timeline" style="flex-direction: column;">
      <BarraMenu :profileName="profileName" @deleteAllMessages="deleteAllMessages($event)" />
      <BarraPesquisa @search-posts="performSearch" />
      <div style="display:flex; flex-direction: row; justify-content: start; width: 100%; background-color:#F9E1DF ; border: 1px solid grey; margin-top: 0.3rem;">
        <div style="height: 20%; flex-direction: column; gap:2px; margin-left:  1.875rem; margin-top: 0.8rem; width:10%; display: flex; align-items: center;">
          <v-img style="width: 7.5rem; height: auto; border: 2px solid black; border-radius: 50%; overflow: hidden;" :src="require('@/assets/malubeyond.jpg')"></v-img>
          <h1 style="font-size: 3.5rem; color: black; font-size: medium; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
            {{ profileName }}
          </h1>
        </div>
        <div style="width: 94%;">
          <PostNew :profileName="profileName" :profile-user="profileUser" @sendMessages="sendMessages" />
        </div>
      </div>

      <div v-for="(message, index) in filteredMessages" :key="index" class="postagens">
        <div class="post-card-container">
          <PostCard :message="message" :index="index" @deleteMessages="deleteMessages($event)" @editMessages="editMessages($event)" :postId="message.id" :profileUser="message.user" v-if="!isProfilePrivate(profileUser)" />
        </div>
      </div>
    </div>
    <v-main></v-main>
  </v-app>
</template>

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
      profileName: this.$route.params.userName,
      profileUser: this.$route.params.userNick,
      users: [
        {
          id: 0,
          name: 'Maria Luiza',
          user: '@Malu10',
          privado: false,
        },
        {
          id: 1,
          name: 'Vitor',
          user: '@vt10',
          privado: false,
        },
        {
          id: 2,
          name: 'Pedro',
          user: '@pedro200',
          privado: true,
        },
        // Adicione outros usuários aqui
      ],
      messages: [
        {
          id: 0,
          name: 'Maria Luiza',
          user: '@Malu10',
          text: 'oi bom dia!',
          image: null,
        },
        {
          id: 1,
          name: 'Vitor Gabriel',
          user: '@vt10',
          text: 'sem bom dia!',
          image: null,
        },
        {
          id: 2,
          name: 'Pedro Lins',
          user: '@pedro200',
          text: 'bom dia!',
          image: null,
        },
        {
          id: 3,
          name: 'Maria Luiza',
          user: '@Malu10',
          text: 'oi gente!',
          image: null,
        },
        {
          id: 4,
          name: 'Maria Luiza',
          user: '@Malu10',
          text: 'tudo bom povo!',
          image: null,
        },
        {
          id: 5,
          name: 'Sergio Henrique',
          user: '@sh22',
          text: 'Eu amo front end',
          image: null,
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
        return this.filterMessagesBySearch(this.search.toLowerCase()); 
      } else {
        return this.filterMessagesByProfileName(this.profileName.toLowerCase()); 
      }
    },
  },
  methods: {
    performSearch(term) {
      this.search = term;
    },
    filterMessagesBySearch(searchTerm) {
      return this.messages.filter((message) => {
        return (
          message.text.toLowerCase().includes(searchTerm)
        );
      });
    },
    filterMessagesByProfileName(profileName) {
      return this.messages.filter((message) => message.name.toLowerCase() === profileName);
    },
    sendMessages(newMessage) {
      if (newMessage.text || newMessage.image) {
        this.messages.push({
          id: this.messages.length,
          name: this.profileName,
          user: this.profileUser,
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
    isProfilePrivate(profileUser) {
      const user = this.users.find((user) => user.user === profileUser);
      return user ? user.privado : false;
    },
  },
};
</script>
