<template>
    <v-card height="400" width="256" class="mx-auto">
      <v-navigation-drawer permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Application
            </v-list-item-title>
            <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <v-list dense nav>
          <v-list-item
            v-for="item in filteredItems"
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </template>
  
  <script>

  export default {
    data() {
      return {
        userDisplayName: "",
        userDisplayUserLocal: "",
        isUserLoggedIn: true,
        items: [
          { title: "Home", icon: "mdi-home", path: "/" },
          {
            title: "Perfil",
            icon: "mdi-account",
          },
          {
            title: "Usuários",
            icon: "mdi-account-group",
            path: "/usuarios",
          },
          {
            title: "Sair",
            icon: "mdi-logout",
            path: "/login",
            required: "/login",
          },
        ],
      };
    },
    computed: {
      filteredItems() {
        return this.items.filter((item) => {
          if (item.title === "Perfil") {
            return item.required ? this.isUserLoggedIn : true;
          } else if (item.title === "Sair") {
            return this.isUserLoggedIn;
          }
          return true;
        });
      },
    },
  };
  </script>
  