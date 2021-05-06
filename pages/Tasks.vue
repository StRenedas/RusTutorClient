<template>
    <div class="container">
        <tasks-container />
    </div>
</template>

<script>
import TasksContainer from "@/components/TasksContainer"
    export default {
        components: {
            'tasks-container': TasksContainer
        },
        data() {
            return {

            }
        },
    }
</script>

<style scoped>
.container {
  height: 85vh;
  width: 100%;
}
</style>