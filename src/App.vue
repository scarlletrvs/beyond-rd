<template>
  <div id="app">
    <nav v-if="$route.path!=='/' && this.$route.path !== '/cadastro'">
      <router-link to="/home">Home</router-link> |
      <router-link to="/perfil/Maria%20Luiza/@Malu10/0">Perfil</router-link> |
      <router-link to="/usuarios">Usuários</router-link>
    </nav>
    <router-view />
  </div>
</template>




<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #05080b;
}

nav {
  margin-bottom: 0.2%;
  padding: 20px;
  background-color: rgb(148, 20, 114);
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}
</style>







