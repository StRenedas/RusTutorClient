<template>
  <div class="task">
    <div class='task__type' v-if="getType === 1">
      <p class='task__description' v-if="!loading">Translate the highlighted word into Russian</p>
      <p class="task__loading" v-if="loading">Loading...</p>
      <p class="task__resolved" v-if="everythingResolved!==''">{{everythingResolved}}</p>
      <div class="task__itself" v-for="question in getQuestions" :key="question.id">
        <div class='task__place' v-html="question.value"></div>
        <div class='task__points' >Points for this task: {{ question.points }}</div>
        <input type='text' class='task__answer' @change="setAnswer($event, question.id, question.value)" >
      </div>
      <button class='task__submit' v-if="everythingResolved==='' && !loading" @click="sendAnswers">Submit all</button>
    </div>

    <div class='task__type' v-if="getType === 2">
      <p class='task__description' v-if="!loading">Choose one picture</p>
      <p class="task__loading" v-if="loading">Loading...</p>
      <p class="task__resolved" v-if="everythingResolved!==''">{{everythingResolved}}</p>
      <div class="task__itself" v-for="(question,index) in getQuestions" :key="question.id">
        <div class='task__place' v-html="question.value"></div>
        <div class='task__points' >Points for this task: {{ question.points }}</div>
        <div class="task__pictures">
          <div class="task__picture" v-for="option in getOptions[index]">
            <input type="radio" class="task__picture_button" id="choice" :name="getOptions[index]" :value="option" @change="setAnswer($event, question.id, question.value)">
            <label class="task__picture_label" for="choice"><img class="task__picture_image" :src="option" alt=""></label>
          </div>
        </div>
      </div>
      <button class='task__submit' v-if="everythingResolved==='' && !loading" @click="sendAnswers">Submit all</button>
    </div>

    <div class='task__type' v-if="getType === 3">
      <p class='task__description' v-if="!loading">Choose the right translation</p>
      <p class="task__loading" v-if="loading">Loading...</p>
      <p class="task__resolved" v-if="everythingResolved!==''">{{everythingResolved}}</p>
      <div class="task__itself" v-for="(question, index) in getQuestions" :key="question.id">
        <div class='task__place' v-html="question.value"></div>
        <div class='task__points' >Points for this task: {{ question.points }}</div>
        <select class="task__select" @change="setAnswer($event, question.id, question.value)">
          <option class="task__options" v-for="option in getOptions[index]">{{option}}</option>
        </select>
      </div>
      <button class='task__submit' v-if="everythingResolved==='' && !loading" @click="sendAnswers">Submit all</button>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      answers: [],
      everythingResolved: '',
      answersDirty: false,
      loading: true,
    }
  },
  methods: {
    ...mapActions(["getQuestionsFromServer"]),
    setAnswer(e, id, value) {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].qid === id) {
          this.answers[i].ans = e.target.value;
          break;
        }
      }
    },
    async sendAnswers() {
      const payload = {
        token: this.$auth.strategy.token.get(),
        userid: this.$auth.$storage.getLocalStorage('userid'),
        answers: this.answers,
        rating: this.$auth.$storage.getLocalStorage('rating'),
      };
      const res = await this.$axios.$post('https://rustutor-backend.herokuapp.com/process', payload);
      const rat = await this.$axios.$post('https://rustutor-backend.herokuapp.com/rating', payload);
      await this.$auth.$storage.setLocalStorage('rating', rat.updatedRating);
      await this.$router.push('/Levels');
    }
  },
  computed: {
    ...mapGetters(["getQuestions", "getLevel", "getType", "getOptions"]),
  },
  async created() {
      await this.getQuestionsFromServer({
        token: this.$auth.strategy.token.get(),
        level: this.getLevel,
        type: this.getType,
        userid: this.$auth.$storage.getLocalStorage('userid'),
      });
      this.loading = false;
      if (this.getQuestions.length === 0) {
        this.everythingResolved = 'You\'ve successfully resolved all questions from this block!';
      }
      else {
        for (let i = 0; i < this.getQuestions.length; i++) {
          this.answers.push({qid: this.getQuestions[i].id, ans: ''})
        }
      }
  }
}
</script>

<style scoped>
.task {
  width: 100%;
  height: 100%;
}
.task__type {
  width: 100%;
  min-height: 850px;
  height: auto;
  background-color: #0A132D;
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
.task__loading {
  color: white;
  font-size: 28px;
  text-align: center;
}
.task__resolved {
  color: white;
  font-size: 28px;
  text-align: center;
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
  border: 3px solid white;
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
  outline: none;
  border: 2px solid white;
  border-radius: 5px;
}

.task__pictures {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.task__picture {
  display: flex;
  align-items: center;
  flex: 1 1 25%;
}
.task__picture_image {
  height: 100px;
  width: 100px;
  border-radius: 10px;
}
.task__select {
  min-width: 200px;
  padding: 10px;
  font-size: 22px;
  outline: none;
  border: 2px solid white;
  border-radius: 5px;
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
  cursor: pointer;
}

@media(max-width: 1020px) {
  .task__description {
    font-size: 36px;
  }
}
@media(max-width: 540px) {
  .task__pictures {
    flex-direction: column;
  }
}
</style>
