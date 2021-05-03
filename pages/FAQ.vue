<template>
    <div class="container">
        <main-container />
  </div>
</template>

<script>
import MainContainer from "@/components/MainContainer"
export default {
  components: {
    'main-container': MainContainer
  }
}
</script>

<style scoped>
    .container {
        height: 85vh;
        width: 100%;
    }
</style>