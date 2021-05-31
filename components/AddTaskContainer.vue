<template>
  <div class="new-task">
    <div class="new-task__container">
      <div class="new-task__first-type">
        <p class="new-task__description">Введите предложение для задания "Перевод слова"</p>
        <input class="new-task__text" type="text" v-model="textTask1" placeholder="Текст задания">
        <p class="new-task__tip">Выберите слово для перевода</p>
        <select class="new-task__selection" v-model="wordTask1">
          <option v-for="word in splitTaskText1" :key="word">{{word}}</option>
        </select>
        <p class="new-task__tip">Укажите уровень сложности</p>
        <select class="new-task__level" v-model="levelTask1">
          <option v-for="level in levels" :key="level">{{level}}</option>
        </select>
        <p class="new-task__answer-description">Введите правильный ответ на задание</p>
        <input class="new-task__answer" type="text" v-model="answerTask1">
        <button class="new-task__submit" @click.prevent="addTaskType1">Добавить задание</button>
      </div>
      <div class="new-task__third-type">
        <p class="new-task__description">Введите слово для задания "Выбор варианта"</p>
        <input class="new-task__text" type="text" v-model="wordTask3" placeholder="Слово для задания">
        <p class="new-task__tip">Введите варианты ответа через пробел</p>
        <input type="text" class="new-task__options" v-model="optionsTask3">
        <p class="new-task__tip">Выберите правильный ответ из введенных слов</p>
        <select class="new-task__selection" v-model="selectedWordTask3">
          <option v-for="option in splitTaskText3" :key="option">{{option}}</option>
        </select>
        <p class="new-task__tip">Укажите уровень сложности</p>
        <select class="new-task__level" v-model="levelTask3">
          <option v-for="level in levels" :key="level">{{level}}</option>
        </select>
        <button class="new-task__submit" @click.prevent="addTaskType3">Добавить задание</button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      levels:[1, 2, 3],

      textTask1: '',
      splitTextTask1: [],
      wordTask1: '',
      answerTask1: '',
      levelTask1: 0,

      wordTask3: '',
      optionsTask3: '',
      selectedWordTask3: '',
      splitOptionsTask3: [],
      levelTask3: 0,
    }
  },
  methods: {
    ...mapMutations(['checkAuth', 'checkAdmin']),
    async addTaskType1() {
      this.textTask1 = this.textTask1.replace(this.wordTask1, "<b>"+this.wordTask1+"</b>")
      await this.$axios.$post("http://127.0.0.1:3001/task",{
        text: this.textTask1,
        answer: this.answerTask1,
        level: this.levelTask1,
        type: 1
      });
      this.textTask1 = '';
      this.wordTask1 = '';
      this.answerTask1 = '';
    },
    async addTaskType3 () {
      this.splitOptionsTask3 = this.splitOptionsTask3.filter(word => word !== this.selectedWordTask3);
      await this.$axios.$post("http://127.0.0.1:3001/task",{
        text: this.wordTask3,
        answer: this.selectedWordTask3,
        options: this.splitOptionsTask3,
        level: this.levelTask3,
        type: 3
      })
    },
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin']),
    splitTaskText1: function() {
      return this.splitTextTask1 = this.textTask1.split(' ');
    },
    splitTaskText3: function() {
      return this.splitOptionsTask3 = this.optionsTask3.split(' ');
    }
  },
  async mounted() {
    this.checkAuth();
    this.checkAdmin();
    if(!this.authenticated || !this.isadmin) {
      await this.$router.push({path: '/'});
    }
  }
};
</script>

<style scoped>
.new-task {
  width: 100%;
  height: 100%;
  background-color: #25618C;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.new-task__container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.new-task__first-type {
  height: 500px;
  width: 500px;
  border: 2px solid white;
  border-radius: 10px;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.new-task__third-type {
  height: 500px;
  width: 500px;
  border: 2px solid white;
  border-radius: 10px;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.new-task__selection {
  width: 200px;
  padding: 5px;
}
.new-task__text {
  width: 300px;
  padding: 10px;
}

@media (max-width: 1235px) {
  .new-task {
    flex-direction: column;
    align-items: center;
    text-align: left;
  }
  .new-task__container {
    flex-direction: column;
  }
  .new-task__first-type {

  }
  .new-task__third-type {

  }
}
</style>
