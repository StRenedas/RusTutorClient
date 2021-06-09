<template>
  <div class="container">
    <faq-container />
  </div>
</template>

<script>
import FAQContainer from "@/components/FAQContainer"
import { mapGetters, mapMutations } from "vuex";

export default {
/*  middleware: 'authentication',*/
  components: {
    'faq-container': FAQContainer
  },
  methods: {
    ...mapMutations(['checkAuth', 'checkAdmin'])
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin'])
  },
  async mounted() {
    /*await this.checkAuth();
    await this.checkAdmin();*/
/*    if (this.authenticated) {
      await this.$router.push('/Levels');
    }*/
  }
}
</script>

<style scoped>
  .container {
      height: 800px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #ECEFF6;
  }
</style>
