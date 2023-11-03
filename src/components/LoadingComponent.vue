<template>
  <div class="loading">
    <div class="loading-spinner"></div>
    <p class="loading-text">{{ loadingText }}</p>
  </div>
</template>

<style>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: rgb(148, 20, 114); /* Altere a cor de fundo */
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 10px;
  font-weight: bold;
  color: #fff; 
  font-size: 20px; 
}
</style>

<script>
export default {
  props: {
    loadingText: {
      type: String,
      default: 'Carregando...',
    },
  },
};
</script>
