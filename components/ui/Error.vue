<template>
  <div class='error'>
    <p class='error__text'>{{errorDescription}}</p>
  </div>
</template>

<script>
export default {
  props: ['errorDescription']
}
</script>

<style scoped>
.error__text {
  padding-top: 10px;
  color: white;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
}
</style>
