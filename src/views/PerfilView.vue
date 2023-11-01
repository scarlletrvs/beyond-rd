<template>
  <v-app>
    <div class="timeline" style="flex-direction: column;">
      <BarraMenu :profileName="profileName" @deleteAllMessages="deleteAllMessages($event)" />
      <BarraPesquisa @search-posts="performSearch" />
      <div style="display:flex; flex-direction: row; justify-content: space-around; width: 100%; background-color:#F9E1DF ; border: 1px solid grey; margin-top: 0.3rem;  ">
        <div style="width: 20%; flex-direction: column; gap:2px; margin-top: 1%; margin-bottom: 0.5%;  display: flex; align-items: center;">
          <v-img
  v-if="profileUser"
  :src="getUserProfileImage(profileUser)"
  style="width: 160px; height: 160px; object-fit: cover; border-radius: 50%; border: 2px solid black;"
></v-img>
<v-img
  v-else
  :src="formData.defaultUserProfileImage"
  style="width: 140px; height: 140px; object-fit: cover; border-radius: 50%; border: 2px solid black;"
></v-img>        
        <h1 style="font-size: 3.5rem; color: black; font-size: medium; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
            {{ profileName }}
          </h1>
      </div>
      <div>
        
        </div>
        <div style="width: 85%; height: 100%;">
  <PostNew :profileName="profileName" :profileUser="profileUser" @sendMessages="sendMessages" v-if="profileUser === userDisplayUserLocal" />
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
      profileImage: '',
      profileUndefined: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png',      
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
          userProfileImage:'https://i.pinimg.com/474x/fb/ec/7f/fbec7fd8ed507cae788b0c8e310a32df.jpg',
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
    userDisplayUserLocal() {
      const user = localStorage.getItem('userlocal');
      const email = localStorage.getItem('email');
      return user ||  ('@'+email.slice(0, email.indexOf('@')))
;
    },

    checkInput() {
      const imagem = this.imageInput;
      const texto = this.textInput;
      return imagem || texto.length > 0 ? false : true;
    },
    filteredMessages() {
      if (this.search) {
        return this.filterMessagesBySearch(this.search.toLowerCase(), this.profileUser);
      } else {
        return this.filterMessagesByProfileName(this.profileName.toLowerCase());
      }
    },
  },
  methods: {
    getUserProfileImage(username) {
      const user = this.users.find((user) => user.user === username);
      return user.userProfileImage ? user.userProfileImage : 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png'; // Retorna a URL da imagem de perfil do usuário ou uma string vazia se não encontrada
    },
    performSearch(term) {
      this.search = term;
    //   this.filteredMessages = this.filterMessagesBySearch(this.search.toLowerCase(), this.profileUser);
    },
  filterMessagesBySearch(searchTerm, profileUser) {
  return this.messages.filter((message) => {
    return message.user === profileUser && message.text.toLowerCase().includes(searchTerm.toLowerCase());
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
      updateProfile() {
      const name = localStorage.getItem('nome');
      const user = localStorage.getItem('userlocal');
      const email = localStorage.getItem('email');
      const profileImage = localStorage.getItem('userImage');

      console.log('Dados do Local Storage para o perfil:');
      console.log('Nome:', name);
      console.log('Usuário:', user);
      console.log('Email:', email);
      console.log('Imagem de perfil:', profileImage);

      // Verifica se o perfil já existe na lista com base no nome de usuário.
      const existingProfile = this.users.find((profile) => profile.user === user);

      if (existingProfile) {
        // Atualiza os campos do perfil, incluindo a imagem do perfil, se disponível.
        existingProfile.name = name || (email ? email.slice(0, email.indexOf('@')) : '');
        if (profileImage) {
          existingProfile.userProfileImage = profileImage;
        }
      } else {
        // Adicione o novo perfil à lista com base nos dados do Local Storage.
        this.users.push({
          id: this.users.length,
          name: name || (email ? email.slice(0, email.indexOf('@')) : ''),
          user: user || (email ? '@' + email.slice(0, email.indexOf('@')) : ''),
          privado: false,
          userProfileImage: profileImage || '',
        });
      }

      console.log('Perfis após a atualização:');
      console.log(this.users);
    },
  },
  created() {
    // Chame a função updateProfile no gancho created
    this.updateProfile();
  },
  };
</script>