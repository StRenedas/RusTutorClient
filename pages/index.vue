<template>
  <div class="container">
    <header-overall />
    <main-container />
    <footer-overall />
  </div>
</template>

<script>
import Header from "@/components/Header"
import MainContainer from "@/components/MainContainer"
import Footer from "@/components/Footer"
export default {
  components: {
    'header-overall': Header,
    'main-container': MainContainer,
    'footer-overall': Footer,
  }
}
</script>

<style>
.container {
  height: 100vh;
  width: 100%;
}
</style>
