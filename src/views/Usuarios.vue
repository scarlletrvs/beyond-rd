<template>
  <v-app>
    <BarraPesquisa @search-posts="performSearch" />
    <h1 style="color: black; font-size: 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; margin: 0.8rem; align-items: center; display: flex;">
      Usuários
    </h1>
    <div class="user-list">
      <div v-for="user in displayedUsers" :key="user.id" class="user-item">
        <router-link :to="'/perfil/' + user.name + '/' + user.user + '/' + user.id" style="color: black;">
          <v-icon style=" margin-left: 0.4rem; margin-right: 0.3rem;">mdi-account</v-icon>{{ user.name }}
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
  background-color: pink;
  list-style-type: none; 
  margin-bottom: 0.5rem;
}
</style>

<script>
import BarraPesquisa from '@/components/BarraPesquisa.vue';

export default {
  components: {
    BarraPesquisa,
  },
  name: 'APP',
  data() {
    return {
      search: '',
      users: [
        {
          id: 0,
          name: 'Maria Luiza',
          user: '@Malu10',
          privado: false,
        },
        {
          id: 1,
          name: 'Vitor Gabriel',
          user: '@vt10',
          privado: false,
        },
        {
          id: 2,
          name: 'Pedro Lins',
          user: '@pedro200',
          privado: true,
        },
        {
          id: 5,
          name: 'Sergio Henrique',
          user: '@sh22',
          privado: false,
        },
      ],
    };
  },
  computed: {
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
        return user.name.toLowerCase().includes(searchTerm) || user.user.toLowerCase().includes(searchTerm);
      });
    },
  },
  methods: {
    performSearch(term) {
      this.search = term;
    },
  },
};
</script>
