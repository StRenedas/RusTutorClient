export default {
  state: {
    teacherActionPicked: 0
  },
  mutations: {
    setTeacherAction(state, res) {
      state.teacherActionPicked = res;
    },
  },
  getters: {
    getTeacherAction(state) {
      return state.teacherActionPicked;
    },
  },
}
