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
        <p class="header__username">Hello, {{ this.$auth.$storage.getLocalStorage('username') }}</p>
        <button class="header__logout" @click.prevent="logout()">LOGOUT</button>
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
  methods: {
    async logout() {
      this.$auth.$storage.removeLocalStorage('username');
      this.$auth.$storage.removeLocalStorage('rating');
      this.$auth.$storage.removeLocalStorage('userid');
      await this.$auth.logout();
    }
  }
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
.header__menu_mobile {
  width: 100%;
  font-size: 20px;
  flex-direction: column;
}
.header__link {
  text-decoration: none;
  color: white;
  cursor: pointer;
  text-align: center;
}
.header__loggedout {
  text-align: center;
}
.header__logout {
  background-color: #111111;
  color: white;
  font-size: 22px;
  font-family: 'Open Sans', sans-serif;
  border: 2px solid white;
  border-radius: 10px;
}
@media (max-width: 1250px) {
  .header__container {
    flex-direction: column;
  }
  .header__logo {
    width: 400px;
    height: 50px;
  }
  .header__logo-link {
    height: 50px;
  }
  .header__menu {
    width: 100%;
    flex-direction: column;
    font-size: 18px;
  }
}
</style>
