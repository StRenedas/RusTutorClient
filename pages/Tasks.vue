<template>
  <div class='container'>
    <tasks-container />
  </div>
</template>

<script>
import TasksContainer from '@/components/TasksContainer'
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    "tasks-container": TasksContainer,
  },
  methods: {
    ...mapMutations(['checkAuth'])
  },
  computed: {
    ...mapGetters(['isadmin', 'authenticated'])
  },
/*  async mounted() {
    this.checkAuth()
    if (!this.authenticated) {
      await this.$router.push({ path: '/' });
    }
    else if (this.authenticated && this.isadmin){
      await this.$router.push({path: '/Levels'})
    }
    else if (this.authenticated && !this.isadmin){
      await this.$router.push({path: '/Teacher'})
    }
  }*/
}
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
}
</style>
