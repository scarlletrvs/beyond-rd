<template>
  <v-app>
    <BarraPesquisa
      @search-posts="performSearch"
      :search="search"
      :profileUser="userUser"
    />
    <h1
      style=" color: black;
     font-size: 20px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
          sans-serif;
        margin: 0.8rem;
        align-items: center;
        display: flex;" >
      Usuários
    </h1>
    <div class="user-list">
      <div v-for="user in users" :key="user.id" class="user-item">
        <router-link
          :to="'/perfil/' + user.nome + '/' + user.user"
          style="color: rgb(247, 246, 246)"
        >
          <v-icon
            style="margin-left: 0.4rem; margin-right: 0.3rem"
            class="white--text"
            >mdi-account</v-icon
          >
          {{ user.nome }}
        </router-link>
      </div>
    </div>
  </v-app>
</template>

<script>
import BarraPesquisa from "@/components/BarraPesquisa.vue";
import { db } from "../config/index"; 
import { collection, getDocs } from "firebase/firestore";

import "firebase/firestore";

export default {
  components: {
    BarraPesquisa,
  },
  name: "APP",
  data() {
    return {
      search: "",
      userUser: {},
      users: [],
    };
  },
  computed: {
    displayedUsers() {
      return this.search ? this.filteredUsers : this.uniqueUsers;
    },
    filteredUsers() {
      const searchTerm = this.search.toLowerCase();
      return this.users.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchTerm) ||
          user.user.toLowerCase().includes(searchTerm)
        );
      });
    },
  },
  methods: {
    performSearch(term) {
      this.search = term;
    },

    async updateUserList() {
      try {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);

        this.users = querySnapshot.docs.map((doc) => doc.data());
      } catch (error) {
        console.error("Erro ao obter posts do Firestore:", error);
      }
    },
  },

  mounted() {
    this.updateUserList();

  },
};
</script>

<style>
.user-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.5rem;
}

.user-item {
  background-color: rgb(148, 20, 114);
  list-style-type: none;
  margin-bottom: 0.5rem;
}
</style>
