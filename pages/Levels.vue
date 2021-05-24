<template>
    <div class="container">
        <levels-container />
    </div>
</template>

<script>
import LevelsContainer from "@/components/LevelsContainer.vue"
import { mapGetters, mapMutations } from "vuex";
    export default {
        components: {
            'levels-container': LevelsContainer
        },
        methods: {
          ...mapMutations(['checkAuth'])
        },
        computed: {
          ...mapGetters(['authenticated'])
        },
        async mounted() {
          this.checkAuth()
          if (!this.authenticated) {
            await this.$router.push({ path: '/' });
          }
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
@media (max-width: 800px) {
  .container {
    height: auto;
  }
}
</style>
