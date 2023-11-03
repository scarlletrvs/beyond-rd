<template>
  <v-app>
    <BarraPesquisa
      @search-posts="performSearch"
      :search="search"
      :profileUser="userUser"
    />
    <h1
      style="
        color: black;
        font-size: 20px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
          sans-serif;
        margin: 0.8rem;
        align-items: center;
        display: flex;
      "
    >
      Usuários
    </h1>
    <div class="user-list">
      <div v-for="user in displayedUsers" :key="user.id" class="user-item">
        <router-link
          :to="'/perfil/' + user.name + '/' + user.user"
          style="color: rgb(247, 246, 246)"
        >
          <v-icon
            style="margin-left: 0.4rem; margin-right: 0.3rem"
            class="white--text"
            >mdi-account</v-icon
          >
          {{ user.name }}
        </router-link>
      </div>
    </div>
  </v-app>
</template>

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

<script>
import BarraPesquisa from "@/components/BarraPesquisa.vue";

export default {
  components: {
    BarraPesquisa,
  },
  name: "APP",
  data() {
    return {
      search: "",
      userUser: {},

      users: [
        {
          id: 0,
          name: "Maria Luiza",
          user: "@Malu10",
          privado: false,
        },
        {
          id: 1,
          name: "Vitor Gabriel",
          user: "@vt10",
          privado: false,
        },
        {
          id: 2,
          name: "Pedro Lins",
          user: "@pedro200",
          privado: true,
        },
        {
          id: 5,
          name: "Sergio Henrique",
          user: "@sh22",
          privado: false,
        },
      ],
    };
  },
  computed: {
    userDisplayName() {
      const name = localStorage.getItem("nome");
      return name || localStorage.getItem("email");
    },
    userDisplayUserLocal() {
      const user = localStorage.getItem("userlocal");
      return user || localStorage.getItem("email");
    },

    uniqueUsers() {
      const uniqueNames = new Map();
      for (const user of this.users) {
        if (!uniqueNames.has(user.name)) {
          uniqueNames.set(user.name, user);
        }
      }
      return Array.from(uniqueNames.values());
    },
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

    updateUserList() {
      const name = localStorage.getItem("nome");
      const user = localStorage.getItem("userlocal");
      const email = localStorage.getItem("email");

      this.users.push({
        id: this.users.length,
        name: name || (email ? email.slice(0, email.indexOf("@")) : ""),
        user: user || (email ? "@" + email.slice(0, email.indexOf("@")) : ""),
        privado: false,
      });
    },
  },
  mounted() {
    this.updateUserList();
  },
};
</script>
