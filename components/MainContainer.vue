<template>
  <div class="main-page" >
    <div class="main-page__forms">
      <div class="form">
        <p class="form__description">Sign Up</p>
        <form class="form__sign">
          <input class="form-input" type="text" name="reg_login" placeholder="Login:" v-model.trim="$v.signUser.username.$model">
          <input class="form-input" type="email" name="email" placeholder="E-mail:" v-model.trim="$v.signUser.email.$model">
          <input class="form-input" type="password" name="reg_pass" placeholder="Password:" v-model.trim="$v.signUser.password.$model">
          <input class="form-input" type="password" name="reg_pass_repeat" placeholder="Repeat password:" v-model.trim="$v.signUser.repPassword.$model">
          <error v-if="!$v.signUser.username.minLength" :error-description='"Username must be at least 8 characters long!"'></error>
          <error v-if="!$v.signUser.email.email" :error-description='"Please submit a correct e-mail!"'></error>
          <error v-if="!$v.signUser.password.minLength" :error-description='"Password must be at least 8 characters long!"'></error>
          <error v-if="!$v.signUser.repPassword.sameAs" :error-description='"Passwords must match!"'></error>
          <button class="form-submit" @click.prevent="registerUser()" :disabled="$v.signUser.invalid">SIGN UP</button>
        </form>
      </div>
      <div class="form">
        <p class="form__description">Sign In</p>
        <form class="form__sign">
          <input class="form-input" type="text" name="auth_login" placeholder="Login:" v-model.trim="$v.logUser.logusername.$model">
          <input class="form-input" type="password" name="auth_pass" placeholder="Password:" v-model.trim="$v.logUser.logpassword.$model">
          <error v-if="!$v.logUser.logusername.minLength" :error-description='"Username must be at least 8 characters long!"'></error>
          <error v-if="!$v.logUser.logpassword.minLength" :error-description='"Password must be at least 8 characters long!"'></error>
          <button class="form-submit" @click.prevent="loginAuth()" :disabled='$v.logUser.invalid'>SIGN IN</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import {required, minLength, email, sameAs} from 'vuelidate/lib/validators'
import Error from '@/components/ui/Error'
export default {
  components: {
    'error': Error
  },
  data() {
    return {
      signUser: {
        username: '',
        email: '',
        password: '',
        repPassword: ''
      },
      logUser: {
        logusername: '',
        logpassword: ''
      },
      errorText: '',
    }
  },
  validations: {
    signUser: {
      username: {
        required,
        minLength: minLength(8),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      repPassword: {
        required,
        minLength: minLength(8),
        sameAs: sameAs(function() {return this.signUser.password}),
      }
    },
    logUser: {
      logusername: {
        required,
        minLength: minLength(8)
      },
      logpassword: {
        required,
        minLength: minLength(8)
      }
    }
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin'])
  },
  methods: {
    ...mapMutations(['checkAuth']),
    ...mapActions(['signin']),
    async loginAuth() {
      await this.signin(this.logUser);
    },
    async registerUser() {
      let isRegistered = await this.$axios.$post('https://rustutor-backend.herokuapp.com/register', this.signUser);
      this.signUser.username = ''
      this.signUser.email = ''
      this.signUser.password = ''
      this.signUser.repPassword = ''
      console.log(isRegistered);
    },
  },
};
</script>

<style scoped>
.main-page {
  height: 100%;
  background-color: #0A132D;
}
.main-page__forms {
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}


.form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: #1E3878;
  border: 2px solid #ffffff;
  border-radius: 10px;
}
.form__description {
  color: white;
  font-size: 36px;
  margin: 5px 0;
}
.form__sign {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
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
@media (max-width: 1250px) {
  .main-page__forms {
    flex-direction: column;
  }
  .form__description {
    font-size: 24px;
  }
  .form-input {
    font-size: 16px;
  }
  .form-submit {
    font-size: 16px;
  }
}
@media (max-width: 380px) {
  .form__sign {
    width: 250px;
  }
}
</style>

