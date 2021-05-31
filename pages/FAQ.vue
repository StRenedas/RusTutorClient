<template>
  <div class="container">
    <faq-container />
  </div>
</template>

<script>
import FAQContainer from "@/components/FAQContainer"

export default {
  components: {
    'faq-container': FAQContainer
  },
  computed: {

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
