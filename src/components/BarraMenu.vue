<template>
  <div style="display: flex; justify-content: space-around; align-items: center; width: 100%; background-color: rgb(148, 20, 114); padding: 10px;">
    <p style="font-size: 1.2rem; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-weight: bold; margin: 0;">
      Rede Social
    </p>
    <v-btn @click="deleteAllMessages" class="delete-button">
      <p style="margin: 0;">Delete</p>
    </v-btn>
  </div>
</template>

<style>
.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
  padding: 0;
}
</style>


<script>
export default {
  data() {
    return {
      mensagens: [],
    };
  },
  methods: {
    deleteAllMessages() {
      this.$emit('deleteAllMessages');
    },
  },
};
</script>
