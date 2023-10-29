<template>
  <div style="display: flex; justify-content: space-around; align-items: center; width: 100%; background-color: rgb(148, 20, 114); padding: 10px; margin-top: 0.1rem;">
    <p style="font-size: 1.2rem;font-family: Avenir, Helvetica, Arial, sans-serif; font-weight: 300; margin: 0; text-decoration: none;">
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
