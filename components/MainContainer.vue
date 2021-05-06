<template>
  <div class="main-page" >
    <div class="main-page__forms" v-if="$route.path=='/'">
      <div class="signup">
        <p class="signup__description">Sign Up</p>
        <form class="signup__form">
          <input class="form-input" type="text" name="reg_login" placeholder="Login:" v-model="signUser.username">
          <input class="form-input" type="email" name="email" placeholder="E-mail:" v-model="signUser.email">
          <input class="form-input" type="password" name="reg_pass" placeholder="Password:" v-model="signUser.password">
          <input class="form-input" type="password" name="reg_pass_repeat" placeholder="Repeat password:">
          <button class="form-submit" @click.prevent="registerUser()" >SIGN UP</button>
        </form>
      </div>
      <div class="signin">
        <p class="signin__description">Sign In</p>
        <form class="signin__form">
          <input class="form-input" type="text" name="auth_login" placeholder="Login:" v-model="logUser.logusername">
          <input class="form-input" type="password" name="auth_pass" placeholder="Password:" v-model="logUser.logpassword">
          <button class="form-submit" @click.prevent="loginUser()">SIGN IN</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      signUser: {
        username: '',
        email: '',
        password: ''
      },
      logUser: {
        logusername: '',
        logpassword: ''
      }
    }
  },
  methods: {
    registerUser() {
      console.log(this.signUser);
      const res = fetch('http://localhost:3001/register', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.signUser),
    })
    },
    loginUser() {
      console.log(this.logUser);
      const res = fetch('http://localhost:3001/login', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.logUser),
    })
    }
  }
};
</script>

<style scoped>
.main-page {
  height: 800px;
  background-color: #0A132D;
}
.main-page__forms {
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}


.signup{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: #1E3878;
  border: 2px solid #ffffff;
  border-radius: 10px;
}
.signup__description {
  color: white;
  font-size: 36px;
  margin: 5px 0;
}
.signup__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
}



.signin{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: #1E3878;
  border: 2px solid #ffffff;
  border-radius: 10px;
}
.signin__description {
  color: white;
  font-size: 36px;
  margin: 5px 0;
}
.signin__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}


.form-input {
  width: 70%;
  margin-top: 4%;
  padding: 5px 0;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 20px;
}
.form-submit {
  width: 70%;
  margin: 4% 0 4%;
  padding: 5px 0;
  text-align: center;
  border: 1px solid #ffffff;
  border-radius: 10px;
  font-size: 20px;
  background-color: #1E3878;
  color: #AEA2A2
}
.form-submit:hover {
  background-color: chartreuse;
}
</style>

