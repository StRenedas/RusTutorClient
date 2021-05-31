<template>
  <div class="header">
    <div class="header__container" v-if="$route.path==='/'">
      <img class="header__logo-big" src="../static/LogoImages/susuLogoBig.png" alt="SUSU Logo">
      <img class="header__logo-small" src="../static/LogoImages/susuLogoSmall.png" alt="SUSU Logo">
      <nav class="header__menu">
        <a
          class="header__link"
          v-for="link in headerLinks"
          :key="link.id"
          :href="link.url"
        >{{ link.description }}</a>
        <p class="header__loggedout">You're not logged in</p>
      </nav>
      <a class="header__burger" @click.prevent="toggleMobile"><img src="../static/burgerMenu.png" alt="burgerbutton" class="header__burger-img"></a>
    </div>
    <div class="header__container" v-else>
      <nuxt-link class="header__logo-link" to="/"><img class="header__logo-big" src="../static/LogoImages/susuLogoBig.png"></nuxt-link>
      <nuxt-link class="header__logo-link-small" to="/"><img class="header__logo-small" src="../static/LogoImages/susuLogoSmall.png"></nuxt-link>
      <nav class="header__menu">
        <a
          class="header__link"
          v-for="link in headerLinks"
          :key="link.id"
          :href="link.url"
        >{{ link.description }}</a>
        <p class="header__username">Hello, {{ this.$auth.$storage.getLocalStorage('username') }}</p>
        <button class="header__logout" @click.prevent="logoutUser">LOGOUT</button>
      </nav>
      <a class="header__burger" @click.prevent="toggleMobile"><img src="../static/burgerMenu.png" alt="burgerbutton" class="header__burger-img"></a>
    </div>
    <nav class="header__menu_mobile" v-if="showMobileMenu">
      <a class="header__link" v-for="link in headerLinks" :key="link.id" :href="link.url">{{ link.description }}</a>
      <p class="header__username" v-if="$auth.$storage.getLocalStorage('username')">Hello, {{ this.$auth.$storage.getLocalStorage('username') }}</p>
      <p class="header__username" v-if="$auth.$storage.getLocalStorage('username') === ''"></p>
      <button class="header__logout" @click.prevent="logoutUser">LOGOUT</button>
    </nav>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

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
          url: 'https://edu.susu.ru',
          description: 'E-SUSU',
        },
      ],
      showMobileMenu: false,
    };
  },
  methods: {
    ...mapMutations(['logoutUser']),
    toggleMobile() {
      this.showMobileMenu = !this.showMobileMenu;
    }
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
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.header__burger {
  display: none;
  width: 35px;
  height: 35px;
}
.header__burger-img {
  width: 35px;
  height: 35px;
}
.header__logo-big {
  display: block;
  height: 75px;
  width: 600px;
}
.header__logo-small {
  display: none;
  height: 75px;
  width: 75px;
}
.header__logo-link {
  height: 75px;
}
.header__logo-link-small {
  height: 75px;
  display: none;
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
  cursor: pointer;
  text-align: center;
}
.header__username {
  color: white;
  text-align: center;
  cursor: pointer;
}
.header__loggedout {
  text-align: center;
}
.header__logout {
  width: 150px;
  background-color: #111111;
  color: white;
  font-size: 22px;
  font-family: 'Open Sans', sans-serif;
  border: 2px solid white;
  border-radius: 10px;
}


.header__menu_mobile {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #111111;
  width: 100%;
  font-size: 20px;
}


@media (max-width: 1240px) {
  .header__container {
    flex-direction: row;
  }
  .header__logo-big {
    display: none;
  }
  .header__logo-small {
    display: block;
  }
  .header__logo-link {
    display: none;
  }
  .header__logo-link-small {
    display: block;
  }
  .header__burger {
    display: block;
  }
  .header__menu {
    display: none;
  }
  .header__logo-link {
    height: 75px;
    width: 75px;
  }
}
@media (min-width: 1240px) {
  .header__menu_mobile {
    display: none;
  }
}
</style>
