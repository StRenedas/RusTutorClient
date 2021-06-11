<template>
  <div class="container">
    <main-container />
  </div>
</template>

<script>

import MainContainer from "@/components/MainContainer"
import { mapGetters, mapMutations } from "vuex";

export default {
  layout: 'authreg',
  components: {
    'main-container': MainContainer
  },
  methods: {
    ...mapMutations(['checkAuth'])
  },
  computed: {
    ...mapGetters(['isadmin', 'authenticated'])
  },
  async mounted() {
    await this.checkAuth()
    if (this.authenticated && this.isadmin) {
      await this.$router.push('/Teacher');
    }
    else if (this.authenticated && !this.admin) {
      await this.$router.push('/Levels');
    }
  },
}

</script>

<style>
.container {
  height: calc(100vh - 100px);
  width: 100%;
}
@media (max-width: 540px) {
  .container {
    min-height: calc(100vh - 100px);
    height: auto;
  }
}
</style>
