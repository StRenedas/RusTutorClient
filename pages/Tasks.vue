<template>
  <div class='container'>
    <tasks-container />
  </div>
</template>

<script>
import TasksContainer from '@/components/TasksContainer'
import { mapGetters, mapMutations } from "vuex";
export default {
  middleware: 'auth',
  components: {
    "tasks-container": TasksContainer,
  },
  methods: {
    ...mapMutations(['checkAuth'])
  },
  computed: {
    ...mapGetters(['isadmin', 'authenticated', 'getType', 'getLevel'])
  },
  async mounted() {
/*    this.checkAuth()*/
    if (this.getType === 0 || this.getLevel === 0) {
      await this.$router.push('/Levels');
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
}
</style>
