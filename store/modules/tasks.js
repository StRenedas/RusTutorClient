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
    removeFirstQuestion(state, res) {
      state.questions.shift();
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
    getFirstQuestion(state) {
      return state.questions[0];
    }
  },
  actions: {
    async getQuestionsFromServer ({commit}, payload) {
      try {
        const questions = await this.$axios.$post("http://127.0.0.1:3001/tasks", payload);
        console.log(questions);
        if (!questions.empty) commit('setQuestions', questions)
        else console.log('you dumb fucker');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
