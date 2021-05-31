<template>
  <div>
    <header-overall />
    <Nuxt />
    <footer-overall />
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default {
  components: {
    'header-overall': Header,
    'footer-overall': Footer,
  }
}
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
  font-weight: 200;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #0A132D;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  /* border: 1px solid red; */
}

</style>
