<template>
  <header class="header">
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
      <a class="header__burger" @click.prevent="toggleMobile"><img src="../static/burgerMenu.png" alt="burger-button" class="header__burger-img"></a>
    </div>
    <div class="header__container" v-else>
      <img class="header__logo-big" src="../static/LogoImages/susuLogoBig.png" @click.prevent="logoAction()" alt="SUSU Logo">
      <img class="header__logo-small" src="../static/LogoImages/susuLogoSmall.png" @click.prevent="logoAction()" alt="SUSU Logo">
      <nav class="header__menu">
        <a
          class="header__link"
          v-for="link in headerLinks"
          :key="link.id"
          :href="link.url"
        >{{ link.description }}</a>
        <p class="header__username" v-if="$auth.loggedIn">Hello, {{ $auth.$storage.getLocalStorage('username') }}</p>
        <button class="header__logout" v-if="$auth.loggedIn" @click.prevent="logoutUser">LOGOUT</button>
      </nav>
      <a class="header__burger" @click.prevent="toggleMobile"><img src="../static/burgerMenu.png" alt="burger-button" class="header__burger-img"></a>
    </div>
    <nav class="header__menu_mobile" v-if="showMobileMenu">
      <a class="header__link header__link_mobile" v-for="link in headerLinks" :key="link.id" :href="link.url">{{ link.description }}</a>
      <p class="header__username header__username_mobile" v-if="$auth.$storage.getLocalStorage('username')">Hello, {{ $auth.$storage.getLocalStorage('username') }}</p>
      <p class="header__username header__username_mobile" v-if="$auth.$storage.getLocalStorage('username') === ''"></p>
      <button class="header__logout header__logout_mobile" v-if="$auth.$storage.getLocalStorage('username')" @click.prevent="logoutUser">LOGOUT</button>
    </nav>
  </header>
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
          description: 'edu@SUSU',
        },
      ],
      showMobileMenu: false,
    };
  },
  methods: {
    ...mapMutations(['logoutUser', 'setLevel', 'setType', 'setTeacherAction']),
    toggleMobile() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    revertLT() {
      if (this.$route.path === "/Tasks") {
        this.$router.push("/Levels")
      }
      this.setType(0);
      this.setLevel(0);
    },
    logoAction() {
      if (this.$route.path === '/Levels' || this.$route.path === '/Tasks') {
        this.revertLT();
      }
      else if (this.$route.path === "/Teacher"){
        this.setTeacherAction(0);
      }
      else {
        if (this.$auth.$storage.getLocalStorage('isadmin')===true) {
          this.$router.push('/Teacher')
        }
        this.$router.push('/Levels');
      }
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
  width: 40px;
  height: 40px;
  margin-right: 30px;
}
.header__burger-img {
  width: 40px;
  height: 40px;
}
.header__logo-big {
  display: block;
  height: 70px;
  width: 600px;
  padding-left: 30px;
  cursor: pointer;
}
.header__logo-small {
  display: none;
  height: 70px;
  width: 70px;
  margin-left: 30px;
  cursor: pointer;
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
  cursor: default;
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
  cursor: pointer;
}
.header__logout:hover {
  color: black;
  border: 2px solid black;
  background-color: white;
}


.header__menu_mobile {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #111111;
  width: 100%;
  font-size: 22px;
}
.header__link_mobile {
  padding: 3px;
}
.header__username_mobile {
  padding: 3px;
}
.header__logout_mobile {
  margin: 5px;
}

@media (max-width: 1260px) {
  .header__container {
    justify-content: space-between;
  }
  .header__logo-big {
    display: none;
  }
  .header__logo-small {
    display: block;
  }
  .header__burger {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header__menu {
    display: none;
  }
}
@media (min-width: 1260px) {
  .header__menu_mobile {
    display: none;
  }
}
</style>
