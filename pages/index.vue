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

<style>
.container {
  height: 800px;
  width: 100%;
}
</style>
