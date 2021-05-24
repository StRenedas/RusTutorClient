export default {
  state: {
    questions: [],
    levelPicked: 0,
    typePicked: 0
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
  },
  actions: {
    async getQuestionsFromServer ({commit}, payload) {
      try {
        const questions = await this.$axios.$post("http://127.0.0.1:3001/tasks", payload);
        console.log(questions);
        if (!questions.empty) commit('setQuestions', questions)
        else console.log('Something is wrong');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
