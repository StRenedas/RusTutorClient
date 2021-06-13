import Vue from 'vue';
import Vuex from 'vuex';
import tasks from './modules/tasks'
import user from './modules/user'
import teacher from "./modules/teacher";
Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    tasks,
    user,
    teacher
  },
});
export default store
