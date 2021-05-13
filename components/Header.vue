<template>
  <div class="header">
    <div class="header__container" v-if="$route.path=='/'">
      <img class="header__logo" src="../static/susuLogoBig.png" alt="SUSU logo">
      <nav class="header__menu">
        <a
          class="header__link"
          v-for="link in headerLinks"
          :key="link.id"
          :href="link.url"
        >{{ link.description }}</a>
        <p class="header__loggedout">You're not logged in</p>
      </nav>
    </div>
    <div class="header__container" v-else>
      <nuxt-link class="header__logo-link" to="/"><img class="header__logo" src="../static/susuLogoBig.png" alt="SUSU logo"></nuxt-link>
      <nav class="header__menu">
        <a
          class="header__link"
          v-for="link in headerLinks.slice(1)"
          :key="link.id"
          :href="link.url"
        >{{ link.description }}</a>
        <p class="header__loggedout">{{ this.$auth.$storage.getLocalStorage('username') }}</p>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerLinks: [
        {
          id: 1,
          url: 'FAQ',
          description: 'FAQ',
        },
        {
          id: 2,
          url: 'http://edu.susu.ru',
          description: 'E-SUSU',
        },
      ],
    };
  },
};
</script>

<style scoped>

.header {
  width: 100%;
}
.header__container {
  background-color: #111111;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.header__logo {
  height: 75px;
  width: 600px;
}
.header__logo-link {
  height: 75px;
}
.header__menu {
  width: 50%;
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 28px;
}
.header__link {
  text-decoration: none;
  color: white;
}
</style>
