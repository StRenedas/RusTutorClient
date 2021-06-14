export default {
  state: {
    questions: [],
    options: [],
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
    setOptions(state, res) {
      state.options = res.map(item => item.options);
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
/*        for (let i = 0; i < questions.length; i++) {
          questions[i].options = await this.$axios.$post('https://rustutor-backend.herokuapp.com/options', {id: questions[i].id});
        }*/
        if (!questions.empty) {
          commit('setQuestions', questions);
/*          commit('setOptions', questions);*/
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
