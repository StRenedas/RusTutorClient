<template>
  <div class="main-container" >
    <div class="main-container__forms" v-if="$route.path=='/'">
      <div class="signup">
        <p class="signup__description">Sign Up</p>
        <form class="signup__form">
          <input class="form-input" type="text" name="reg_login" required placeholder="Login:">
          <input class="form-input" type="email" name="email" required placeholder="E-mail:">
          <input class="form-input" type="password" name="reg_pass" required placeholder="Password:">
          <input class="form-input" type="password" name="reg_pass_repeat" required placeholder="Repeat password:">
          <button class="form-submit" type="submit">SIGN UP</button>
        </form>
      </div>
      <div class="signin">
        <p class="signin__description">Sign In</p>
        <form class="signin__form">
          <input class="form-input" type="text" name="auth_login" required placeholder="Login:">
          <input class="form-input" type="password" name="auth_pass" required placeholder="Password:">
          <button class="form-submit" type="submit">SIGN IN</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    } 
  },
};
</script>

<style scoped>
.main-container {
  height: 800px;
  background-color: #d7e0f5;
}
.main-container__forms {
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
