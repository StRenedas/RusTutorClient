export default {
  state: {
    questions: [],
    correct: [],
    uncorrects: [],
    levelPicked: 0,
    typePicked: 0,
  },
  mutations: {
    setQuestions(state, res) {
      state.questions = res;
    },
    setLevel(state, res) {
      state.levelPicked = res;
    },
    setType(state, res) {
      state.typePicked = res;
    },
    revertQuestions(state) {
      state.questions = [];
    },
    setCorrects(state, res) {
      state.correct = res;
    },
    revertCorrects(state) {
      state.correct = [];
    },
    setUncorrects(state) {
      state.uncorrects = state.questions.filter(({id}) => !state.correct.find(other => other.corrid === id));
    },
    revertUncorrects(state, res) {
      state.uncorrects = [];
    }
  },
  getters: {
    getQuestions(state) {
      return state.questions;
    },
    getLevel(state) {
      return state.levelPicked;
    },
    getType(state) {
      return state.typePicked;
    },
    getCorrects(state) {
      return state.correct
    },
    getUncorrects(state) {
      return state.uncorrects;
    }
  },
  actions: {
    async getQuestionsFromServer ({commit}, payload) {
      try {
        commit('revertQuestions');
        const questions = await this.$axios.$post("https://rustutor-backend.herokuapp.com/questions", payload, {headers: {'User-Role': this.$auth.$storage.getLocalStorage('isadmin')}});
        if (!questions.empty) {
          commit('setQuestions', questions);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getCorrectsFromServer({commit}, payload) {
      try {
        commit('revertCorrects');
        commit('revertUncorrects');
        const corrects = await this.$axios.$post("https://rustutor-backend.herokuapp.com/results", payload, {headers: {'User-Role': this.$auth.$storage.getLocalStorage('isadmin')}});
        commit('setCorrects', corrects);
        commit('setUncorrects');
      } catch (err) {
        console.log(err);
      }
    }
  },
}
