<template>
  <button class="scroll-to-top" @click="scrollToTop" v-show="showScrollButton">
    <v-icon>mdi-arrow-up</v-icon>
  </button>
</template>

<style>
.scroll-to-top {
  position: fixed;
  bottom: 75px;
  right: 20px;
  background-color: rgb(148, 20, 114);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: rgb(  167, 73, 142 ) !important; 
}
</style>

<script>
export default {
  data() {
    return {
      showScrollButton: false,
    };
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 400) {
        this.showScrollButton = true;
      } else {
        this.showScrollButton = false;
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>
