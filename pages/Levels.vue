<template>
    <div class="container">
        <levels-container />
    </div>
</template>

<script>
import LevelsContainer from "@/components/LevelsContainer.vue"
    export default {
        components: {
            'levels-container': LevelsContainer
        },
        data() {
            return {

            }
        },
    }
</script>

<style scoped>
.container {
  height: 800px;
  width: 100%;
}
</style>
