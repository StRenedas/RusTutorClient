<template>
    <div class="container">
        <levels-container />
    </div>
</template>

<script>
import LevelsContainer from "@/components/LevelsContainer.vue"
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {

    }
  },
  middleware: 'auth',
  components: {
      'levels-container': LevelsContainer
  },
  methods: {
    ...mapMutations(['checkAuth', 'checkAdmin'])
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin'])
  },
  async mounted() {
/*    this.checkAuth();*/
    this.checkAdmin();
    if (!this.authenticated) {
      await this.$router.push({ path: '/' });
    }
    else if (this.authenticated && !this.isadmin){
      await this.$router.push({path: '/Levels'})
    }
    else if (this.authenticated && this.isadmin){
      await this.$router.push({path: '/Teacher'})
    }
  },
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}
@media (max-width: 800px) {
  .container {
    height: auto;
  }
}
</style>
