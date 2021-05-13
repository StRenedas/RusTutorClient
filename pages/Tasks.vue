<template>
  <div class='container'>
    <tasks-container />
  </div>
</template>

<script>
import TasksContainer from '@/components/TasksContainer'
export default {
  components: {
    "tasks-container": TasksContainer,
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 800px;
}
</style>
