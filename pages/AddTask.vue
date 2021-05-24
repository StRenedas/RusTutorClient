<template>
  <div class="container">
    <add-task-container />
  </div>
</template>

<script>
import AddTaskContainer from "@/components/AddTaskContainer";
export default {
  components: {
    "add-task-container": AddTaskContainer
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 800px;
}
@media (max-width: 800px) {
  .container {
    height: auto;
  }
}
</style>
