export default {
  state: {
    authenticated: false,
  },
  mutations: {
    setUser(state, res) {
      this.$auth.$storage.setLocalStorage('username', res.username);
      this.$auth.$storage.setLocalStorage('rating', res.rating);
      this.$auth.$storage.setLocalStorage('userid', res.userid);
      this.$router.push({path: '/Levels'});
    },
    checkAuth(state) {
      state.authenticated = !!(this.$auth.$storage.getLocalStorage('username') !== '' && this.$auth.$storage.getLocalStorage('username'));
    }
  },
  getters: {
    authenticated(state) {
      return state.authenticated;
    }
  },
  actions: {
    async signin({commit}, payload) {
      try {
        const response = await this.$auth.loginWith('local', {data: payload});
        if(response.data.username) {
          commit('setUser', response.data)
        } else {
          console.log('go away');
        }
      } catch (err) {
        console.log(err);
      }
    },
  }
}
