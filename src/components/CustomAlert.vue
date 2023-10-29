<template>
    <div class="custom-alert" v-if="showAlert">
      <div class="custom-alert-content">
        {{ alertMessage }}
        <button class="custom-alert-button" @click="closeAlert">OK</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showAlert: Boolean,
      alertMessage: String,
    },
    methods: {
      closeAlert() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-alert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .custom-alert-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .custom-alert-button {
    background-color: pink;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  </style>
  