export default {
  state: {
    questions: [],
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
    getOptions(state) {
      return state.options;
    },
  },
  actions: {
    async getQuestionsFromServer ({commit}, payload) {
      try {
        commit('revertQuestions');
        const questions = await this.$axios.$post("https://rustutor-backend.herokuapp.com/questions", payload);
        if (!questions.empty) {
          commit('setQuestions', questions);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
