<template>
  <div style="height: 3.5rem; background-color:   pink !important; display: flex; align-items: center; justify-content: center; flex-direction: row;">
    <v-container style="width: 18rem; height: 1.4rem; display: flex; align-items: center; justify-content: center; " >
      <v-text-field style="font-size: 14px;" v-model="search" label="Pesquisar" solo hide-details
      :style="{ fontSize: '12px' }" append-icon="mdi-magnify" @input="performSearch"></v-text-field>
    </v-container>
  </div>
</template>

  <script>
  import '@mdi/font/css/materialdesignicons.css';
  
  export default {
    data() {
      return {
        search: '',
      };
    },
    methods: {
      performSearch() {
        this.$emit('search-posts', this.search); 
      },
    },
    message: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  };
  </script>
  