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
  height: 850px;
  width: 100%;
}
</style>
