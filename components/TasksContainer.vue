<template>
  <div class='task'>
    <p class='task__description'>Translate the highlighted word into Russian</p>
    <div class="task__itself" v-for="question in getQuestions" :key="question.id">
      <div class='task__place' v-html="question.value"></div>
      <div class='task__points' >Points for this task: {{ question.points }}</div>
      <input type='text' class='task__answer' @change="setAnswer($event, question.id, question.value)" >
    </div>
    <button class='task__submit' @click="sendAnswers">Submit all</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      answers: []
    }
  },
  methods: {
    ...mapActions(["getQuestionsFromServer"]),
    setAnswer(e, id, value) {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].qid === id) {
          this.answers[i].ans = e.target.value;
          console.log(this.answers);
          break;
        }
      }
    },
    async sendAnswers() {
      const payload = {
        userid: this.$auth.$storage.getLocalStorage('userid'),
        answers: this.answers,
        rating: this.$auth.$storage.getLocalStorage('rating'),
      }
      const res = await this.$axios.$post('http://localhost:3001/process', payload );
      this.$auth.$storage.setLocalStorage('rating', res.updatedRating);
      await this.$router.push('/Levels');
    }
  },
  computed: {
    ...mapGetters(["getQuestions", "getLevel", "getType"]),
  },
  async created() {
      await this.getQuestionsFromServer({
        level: this.getLevel,
        type: this.getType,
        userid: this.$auth.$storage.getLocalStorage('userid')
      });
      for (let i = 0; i < this.getQuestions.length; i++) {
        this.answers.push({qid: this.getQuestions[i].id, ans: ''})
      }
      console.log(this.answers);
  }
}
</script>

<style scoped>
.task {
  width: 100%;
  min-height: 800px;
  height: auto;
  background-color: #25618C;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.task__description {
  color: white;
  font-size: 46px;
  font-weight: 400;
  text-align: center;
  padding-top: 10px;
}
.task__itself {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px;
}
.task__place {
  padding: 20px 20px;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 30px;
  font-weight: 300;
}
.task__points {
  color: white;
  font-size: 25px;
}
.task__answer {
  width: 300px;
  height: 50px;
  font-size: 26px;
}
.task__submit {
  font-size: 30px;
  font-weight: 300;
  padding: 20px 50px;
  background-color: white;
  border: 2px solid darkseagreen;
  border-radius: 10px;
  margin-bottom: 10px;
}
.task__submit:hover {
  background-color: darkseagreen;
}

@media(max-width: 1020px) {
  .task__description {
    font-size: 36px;
  }
}
</style>
