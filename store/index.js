import Vue from 'vue';
import Vuex from 'vuex';
import tasks from './modules/tasks'
import user from './modules/user'
Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    tasks,
    user
  },
});
export default store
