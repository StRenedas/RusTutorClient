export default {
  state: {
    authenticated: false,
    admin: false,
  },
  mutations: {
    setUser(state, res) {
      this.$auth.$storage.setLocalStorage('username', res.username);
      this.$auth.$storage.setLocalStorage('rating', res.rating);
      this.$auth.$storage.setLocalStorage('userid', res.userid);
      this.$auth.$storage.setLocalStorage('isadmin', res.isadmin);
      if (res.admin === 0) {
        this.$router.push({path: '/Levels'});
      } else {
        this.$router.push({path: '/Teacher'});
      }
    },
    checkAuth(state) {
      state.authenticated = !!(this.$auth.$storage.getLocalStorage('username') !== '' && this.$auth.$storage.getLocalStorage('username'));
    },
    checkAdmin(state) {
      if (this.$auth.$storage.getLocalStorage('isadmin') === 1) {
        state.admin = true;
      } else this.state.admin = false;
    },
    logoutUser(state) {
      this.$auth.$storage.removeLocalStorage('username');
      this.$auth.$storage.removeLocalStorage('rating');
      this.$auth.$storage.removeLocalStorage('userid');
      this.$auth.$storage.removeLocalStorage('isadmin');
      state.username = ''
      this.$auth.logout();
    }
  },
  getters: {
    authenticated(state) {
      return state.authenticated;
    },
    isadmin(state) {
      return state.admin;
    },
  },
  actions: {
    async signin({commit}, payload) {
      try {
        const response = await this.$auth.loginWith('local', {data: payload});
        if(response.data.username) {
          commit('setUser', response.data)
          if (response.data.isadmin) {
            commit('checkAdmin', response.data)
          }
        } else {
          console.log('go away');
        }
      } catch (err) {
        console.log(err);
      }
    },
  }
}
