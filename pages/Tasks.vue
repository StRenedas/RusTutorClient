<template>
  <div class='container'>
    <div class='task__type' v-if="getType === 1">
      <p class='task__description' v-if="!loading">Translate the highlighted word into Russian</p>
      <p class="task__resolved" v-if="error!==''">{{error}}</p>
      <div class="task__block">
        <div class="task__itself" v-for="question in getQuestions" :key="question.id">
          <div class='task__place' v-html="question.value"></div>
          <input type='text' class='task__answer' @change="setAnswer($event, question.id, question.value)">
          <div class='task__points' >Points: {{ question.points }}</div>
        </div>
      </div>
      <p class="task__loading" v-if="loading">Loading...</p>
      <button class='task__submit' v-if="error==='' && !loading" @click="sendAnswers">Submit all</button>
    </div>

    <div class='task__type' v-if="getType === 2">
      <p class='task__description' v-if="!loading">Choose one picture</p>
      <p class="task__resolved" v-if="error!==''">{{error}}</p>
      <div class="task__block-pictures">
        <div class="task__itself_pictures" v-for="(question,index) in getQuestions" :key="question.id">
          <div class='task__place' v-html="question.value"></div>
          <div class="task__pictures">
            <div class="task__picture" v-for="option in getQuestions[index].options">
              <label class="task__picture_label" for="choice"><img class="task__picture_image" :src="option" alt=""></label>
              <input type="radio" class="task__picture_button" id=choice :name="index" :value="option" @change="setAnswer($event, question.id, question.value)">
            </div>
          </div>
          <div class='task__points' >Points: {{ question.points }}</div>
        </div>
      </div>
      <p class="task__loading" v-if="loading">Loading...</p>
      <button class='task__submit' v-if="error==='' && !loading" @click="sendAnswers">Submit all</button>
    </div>

    <div class='task__type' v-if="getType === 3">
      <p class='task__description' v-if="!loading">Choose the right translation</p>
      <p class="task__resolved" v-if="error!==''">{{error}}</p>
      <div class="task__block">
        <div class="task__itself_choice" v-for="(question, index) in getQuestions" :key="question.id">
          <div class='task__place_choice' v-html="question.value"></div>
          <select class="task__select" @change="setAnswer($event, question.id, question.value)">
            <option
              value="none" selected disabled hidden>
            </option>
            <option class="task__options" v-for="option in getQuestions[index].options">{{option}}</option>
          </select>
          <div class='task__points' >Points: {{ question.points }}</div>
        </div>
      </div>
      <p class="task__loading" v-if="loading">Loading...</p>
      <button class='task__submit' v-if="error==='' && !loading" @click="sendAnswers">Submit all</button>
    </div>

    <div class="task__type" v-if="getType === -1">
      <h2 class="task__stats" v-if="getUncorrects.length !== 0">You've answered these questions wrong</h2>
      <div class="task__block" v-if="getUncorrects.length !== 0">
        <div class="task__itself_simple" v-for="uncorrect in getUncorrects" :key="uncorrect.id">
          <div class='task__place_uncorr' v-html="uncorrect.value"></div>
        </div>
      </div>
      <h2 class="task__stats" v-if="getCorrects.length !== 0">You've answered these questions correct</h2>
      <div class="task__block" v-if="getCorrects.length !== 0">
        <div class="task__itself_simple" v-for="correct in getCorrects" :key="correct.corrid">
          <div class='task__place_corr' v-html="correct.value"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      answers: [],
      error: '',
      answersDirty: false,
      loading: true,
    }
  },
  middleware: ['auth', 'student'],
  methods: {
    ...mapMutations(['checkAuth', 'setType']),
    ...mapActions(["getQuestionsFromServer", "getCorrectsFromServer"]),
    setAnswer(e, id, value) {
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].qid === id) {
          this.answers[i].ans = e.target.value;
          break;
        }
      }
    },
    async sendAnswers() {
      this.loading = true;
      const payload = {
        userid: this.$auth.$storage.getLocalStorage('userid'),
        answers: this.answers,
/*        rating: this.$auth.$storage.getLocalStorage('rating'),*/
      };
      const corr = await this.$axios.$post('https://rustutor-backend.herokuapp.com/check', payload, {headers: {'User-Role': this.$auth.$storage.getLocalStorage('isadmin')}});
      const rat = await this.$axios.$get(`https://rustutor-backend.herokuapp.com/rating/${payload.userid}`, {headers: {'User-Role': this.$auth.$storage.getLocalStorage('isadmin')}});
      await this.$auth.$storage.setLocalStorage('rating', rat.updatedRating);
      await this.getCorrectsFromServer({ corrs: corr });
      await this.setType(-1);
    }
  },
  computed: {
    ...mapGetters(['isadmin', 'authenticated', 'getType', 'getLevel', 'getQuestions', 'getCorrects', 'getUncorrects'])
  },
  async mounted() {
/*    this.checkAuth()*/
    if (this.getType === 0 || this.getLevel === 0) {
      await this.$router.push('/Levels');
    }
  },
  async created() {
    if (this.getType !== 0 && this.getLevel !== 0 ) {
      await this.getQuestionsFromServer({
        level: this.getLevel,
        type: this.getType,
        userid: this.$auth.$storage.getLocalStorage('userid'),
      });
      this.loading = false;
      if (this.getQuestions.length === 0) {
        this.error = 'An error occurred, please try again later';
      }
      else {
        for (let i = 0; i < this.getQuestions.length; i++) {
          this.answers.push({qid: this.getQuestions[i].id, ans: ''})
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  min-height: calc(100vh - 100px);
  height: auto;
  width: 100%;
}
.task__type {
  width: 100%;
  min-height: calc(100vh - 100px);
  height: auto;
  background-color: #0A132D;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.task__description {
  color: white;
  font-size: 42px;
  font-weight: 400;
  text-align: center;
  padding-top: 10px;
}
.task__stats {
  text-align: center;
  padding-top: 10px;
  font-size: 32px;
  color: white;
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
.task__block {
  width: 100%;
/*  display: grid;
  grid-template-columns: 1fr 1fr 1fr;*/
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
}
.task__block-pictures {
  width: 100%;
  /*display: grid;
  grid-template-columns: 1fr 1fr;*/
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  height: auto;
}
.task__itself {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  padding: 30px;
  height: 330px;
}
.task__itself_simple {
  height: auto;
  padding: 10px;
}
.task__place_corr {
  background-color: darkseagreen;
  color: black;
  width: 250px;
  padding: 10px 10px;
  border: 3px solid white;
  border-radius: 10px;
  font-size: 26px;
  font-weight: 300;
  height: 150px;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.task__place_uncorr {
  background-color: indianred;
  color: black;
  width: 250px;
  padding: 10px 10px;
  border: 3px solid white;
  border-radius: 10px;
  font-size: 26px;
  font-weight: 300;
  height: 150px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}
.task__itself_pictures {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  padding: 30px;
  height: auto;
}
.task__itself_choice {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  padding: 20px;
  height: 200px;
}
.task__place {
  width: 250px;
  padding: 10px 10px;
  background-color: white;
  border: 3px solid white;
  border-radius: 10px;
  font-size: 26px;
  font-weight: 300;
  height: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.task__place_choice {
  width: 250px;
  padding: 10px 10px;
  background-color: white;
  border: 3px solid white;
  border-radius: 10px;
  font-size: 26px;
  font-weight: 300;
  height: 70px;
}
.task__points {
  color: white;
  font-size: 25px;
/*  margin-top: 10px;*/
}
.task__answer {
/*  margin-top: 20px;*/
  width: 250px;
  height: 50px;
  font-size: 26px;
  outline: none;
  border: 2px solid white;
  border-radius: 5px;
}

.task__pictures {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.task__picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 10px 0;
}
.task__picture_image {
  height: 100px;
  width: 100px;
  border: 2px solid white;
  border-radius: 10px;
}
.task__picture_button {
  width: 20px;
  height: 20px;
}
.task__select {
  margin-top: 20px;
  min-width: 250px;
  padding: 10px;
  font-size: 22px;
  outline: none;
  border: 2px solid white;
  border-radius: 5px;
  background-color: white;
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
@media (max-width: 1100px) {
/*  .task__block-pictures {
    grid-template-columns: 1fr;
  }*/
}
@media(max-width: 1020px) {
  .task__description {
    font-size: 28px;
    padding: 10px 15px 0;
  }
  .task__block {
    /*grid-template-columns: 1fr 1fr;*/
  }
}

@media (max-width: 640px) {
  .task__block {
    /*grid-template-columns: 1fr;*/
  }
}
@media(max-width: 540px) {
  .task__pictures {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .task__block-pictures {
    height: auto;
  }
}
</style>
