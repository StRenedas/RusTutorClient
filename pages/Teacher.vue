<template>
  <div class="container">
    <teacher-container />
  </div>
</template>

<script>
import TeacherContainer from "@/components/TeacherContainer";
import { mapGetters, mapMutations } from "vuex";
export default {
  middleware: ['auth'],
  components: {
    "teacher-container": TeacherContainer
  },
  methods: {
    ...mapMutations(['checkAuth', 'checkAdmin'])
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin'])
  },
  async mounted() {
    await this.checkAuth();
    await this.checkAdmin();
    if (!this.authenticated) {
      await this.$router.push({ path: '/' });
    }
    else if (this.authenticated && !this.isadmin) {
      await this.$router.push('/Levels');
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  min-height: auto;
}
@media (max-width: 880px) {
  .container {
    height: auto;
  }
}
</style>
