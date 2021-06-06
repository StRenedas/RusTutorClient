<template>
  <div class="popup" v-if="msg!==''" @click.prevent="closePopup">
    <p class="popup__text">{{msg}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'KEKWAITKEKWAITEKEKWAITKEKWAITEKEKWAITKEKWAITEKEKWAITKEKWAITEKEKWAITKEKWAITEKEKWAITKEKWAITE'
    }
  },
  methods: {
    closePopup() {
      this.msg = '';
    }
  }
};
</script>

<style scoped>
.popup {
  display: block;
  position: relative;
  width: 50%;
  height: auto;
  border: 2px solid white;
  background-color: darkred;
  color: white;
}
</style>
