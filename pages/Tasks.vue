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
    this.checkAuth()
    if (this.getType === 0 || this.getLevel === 0) {
      await this.$router.push('/Levels');
    }
  }
}
</script>

<style scoped>
.container {
  min-height: calc(100vh - 100px);
  height: auto;
  width: 100%;
}
</style>
