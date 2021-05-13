<template>
  <div class="container">
    <faq-container />
  </div>
</template>

<script>
import MainContainer from "@/components/MainContainer"
import FAQContainer from "@/components/FAQContainer"

export default {
  components: {
    'main-container': MainContainer,
    'faq-container': FAQContainer
  }
}
</script>

<style scoped>
  .container {
      height: 800px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #ECEFF6;
  }
</style>
