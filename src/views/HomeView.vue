<template>
  <v-app>
    <div class="timeline">
      <BarraMenu
        :message="message"
        @deleteAllMessages="deleteAllMessages($event)"
      />
      <BarraPesquisa @search-posts="performSearch" :search="search" />
      <div style="margin-top: 3px">
        <PostNew
          @sendMessages="sendMessages"
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
            :postId="String(message.id)"
            @deleteMessages="deleteMessages"
            @editMessages="editMessages"
            :img="message.img"
          />
        </div>
      </div>
    </div>

    <ButtomScrollToTop></ButtomScrollToTop>
  </v-app>
</template>

<script>
import 'firebase/firestore';
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import PostCard from "@/components/PostCard.vue";
import BarraMenu from "@/components/BarraMenu.vue";
import PostNew from "@/components/PostNew.vue";
import BarraPesquisa from "@/components/BarraPesquisa.vue";
import ButtomScrollToTop from "@/components/ButtomScrollToTop.vue";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
  runTransaction,
  updateDoc,
  getDoc,
  query ,
  orderBy
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
      defaultUserProfileImage:
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
      textInput: "",
      imageInput: null,
      editingImage: null,
      search: "",
      users: [],
      messages: [],
    };
  },

  computed: {
    userDisplayName() {
     return auth.currentUser.displayName
    },
    userDisplayUserLocal() {
      const user = localStorage.getItem("userlocal");
      const email = localStorage.getItem("email");
      return user || (email ? "@" + email.slice(0, email.indexOf("@")) : null);
    },
    userDisplayImage() {
      const image = localStorage.getItem("userimage");
      return image || this.defaultUserProfileImage;
    },
    userDisplayUser() {
      return auth.currentUser.user
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
  (message.text && message.text.toLowerCase().includes(searchTerm) ||
   message.user && message.user.toLowerCase().includes(searchTerm) ||
   message.name && message.name.toLowerCase().includes(searchTerm)) &&
  !message.privado
);
      });
    } else {
      return this.messages.filter((message) => !message.privado);
    }
  }
    },
  
  created() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Dados do currentUser:", user);
        console.log("Nome do usuário:", user.displayName);
        console.log("Email do usuário:", user.email);
        console.log("UID do usuário:", user.uid);
      } else {
        console.log("Nenhum usuário autenticado.");
      }
    });
  },
  methods: {

    async sendMessages(newMessage) {
  try {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    const usersCollection = collection(db, "users");
    const userQuery = await getDocs(usersCollection);
    const currentUserData = userQuery.docs.find(doc => doc.data().email === user.email)?.data();

    const timestamp = format(new Date(), "dd/MM/yy HH:mm:ss");
    const userImage = currentUserData?.profileImage || "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png";
    const text = newMessage && newMessage.text ? newMessage.text : "";
    const image = newMessage && newMessage.image ? URL.createObjectURL(newMessage.image) : null;

    const post = {
      name: currentUserData?.nome || "Nome não disponível",
      user: currentUserData?.user || "Usuário não disponível",
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
    this.messages.unshift(post);
  } catch (error) {
    console.error("Erro ao adicionar post ao Firestore:", error);
  }
},


performSearch(term) {
  console.log("Termo de pesquisa:", term);
  this.search = term;
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


    
async editMessages({ id, novoTexto, editingImage }) {
  try {
    const PostsCollection = collection(db, "Posts");
    const postDocRef = doc(PostsCollection, id);

    const postDoc = await getDoc(postDocRef);

    if (postDoc.exists()) {
      const updateData = {
        text: novoTexto,
      };

      if (editingImage) {
        updateData.image = URL.createObjectURL(editingImage);
      }

      await updateDoc(postDocRef, updateData);

      const updatedPost = { ...postDoc.data(), ...updateData };
      const index = this.messages.findIndex((message) => message.id === id);

      if (index !== -1) {
        this.$set(this.messages, index, updatedPost);
      }
    } else {
      console.error("Documento não encontrado no Firestore:", id);
    }
  } catch (error) {
    console.error("Erro ao editar post no Firestore:", error);
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
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  async mounted() {
  try {
    const PostsCollection = collection(db, "Posts");
    const querySnapshot = await getDocs(query(PostsCollection, orderBy('timestamp', 'desc')));

    this.messages = querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Erro ao obter posts do Firestore:", error);
  }
},


};
</script>

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
