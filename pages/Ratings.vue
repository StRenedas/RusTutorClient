<template>
  <div class="container">
    <ratings-container />
  </div>
</template>

<script>
import RatingsContainer from "@/components/RatingsContainer";
export default {
  components: {
    "ratings-container" : RatingsContainer
  }
};
</script>

<style scoped>
  .container {
    width: 100%;
    height: 800px;
  }
</style>
