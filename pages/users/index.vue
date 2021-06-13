<template>

</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  middleware: 'auth',
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
    else if (this.authenticated && this.isadmin) {
      await this.$router.push('/Teacher');
    }
  },
};
</script>

<style scoped>

</style>
