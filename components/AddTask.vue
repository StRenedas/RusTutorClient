<template>
  <div class="new-task">
    <div class="new-task__container">
      <div class="new-task__type">
        <p class="new-task__description">Введите предложение для задания "Перевод слова"</p>
        <input class="new-task__text" type="text" v-model="task1.text" placeholder="Текст задания">
        <p class="new-task__tip">Выберите слово для перевода</p>
        <select class="new-task__selection" v-model="task1.word">
          <option v-for="word in splitTaskText1" :key="word">{{word}}</option>
        </select>
        <p class="new-task__tip">Введите правильный ответ на задание</p>
        <input class="new-task__answer" type="text" v-model="task1.answer">
        <p class="new-task__tip">Укажите уровень сложности</p>
        <select class="new-task__level" v-model="task1.level">
          <option v-for="level in levels" :key="level">{{level}}</option>
        </select>
        <p class="new-task__tip">Введите количество баллов за задание</p>
        <input class="new-task__points" type="text" v-model.trim="$v.task1.points.$model">
        <p class="new-task__pending" v-if="task1.pending !== ''">{{ task1.pending }}</p>
        <button class="new-task__submit" @click.prevent="addTaskType1">Добавить задание</button>
      </div>
      <div class="new-task__type">
        <p class="new-task__description">Введите слово для задания "Выбор варианта"</p>
        <input class="new-task__text" type="text" v-model="task3.word" placeholder="Слово для задания">
        <p class="new-task__tip">Введите варианты ответа через пробел</p>
        <input type="text" class="new-task__options" v-model="task3.options">
        <p class="new-task__tip">Выберите правильный ответ из введенных слов</p>
        <select class="new-task__selection" v-model="task3.selectedWord">
          <option v-for="option in splitTaskText3" :key="option">{{option}}</option>
        </select>
        <p class="new-task__tip">Укажите уровень сложности</p>
        <select class="new-task__level" v-model="task3.level">
          <option v-for="level in levels" :key="level">{{level}}</option>
        </select>
        <p class="new-task__tip">Введите количество баллов за задание</p>
        <input class="new-task__points" type="text" v-model.trim="$v.task3.points.$model">
        <p class="new-task__pending" v-if="task3.pending !== ''">{{ task3.pending }}</p>
        <button class="new-task__submit" @click.prevent="addTaskType3">Добавить задание</button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {numeric} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      levels:[1, 2, 3],
      task1: {
        text: '',
        splitText: [],
        word: '',
        answer: '',
        level: 0,
        points: 0,
        pending: ''
      },
      task3: {
        word: '',
        options: '',
        selectedWord: '',
        splitOptions: [],
        level: 0,
        points: 0,
        pending: ''
      }
    }
  },
  validations: {
    task1: {
      points: { numeric },
    },
    task3: {
      points: { numeric }
    }
  },
  methods: {
    ...mapMutations(['checkAuth', 'checkAdmin']),
    async addTaskType1() {
      this.task1.text = this.task1.text.replace(this.task1.word, "<b>"+this.task1.word+"</b>");
      this.task1.pending = 'Отправка..';
      await this.$axios.$post("https://rustutor-backend.herokuapp.com/task",{
        token: this.$auth.strategy.token.get(),
        text: this.task1.text,
        answer: this.task1.answer,
        level: this.task1.level,
        points: this.task1.points,
        type: 1
      });
      this.task1.text = '';
      this.task1.word = '';
      this.task1.answer = '';
      this.task1.pending = 'Задание добавлено!';
    },
    async addTaskType3 () {
      this.task3.splitOptions = this.task3.splitOptions.filter(word => word !== this.task3.selectedWord);
      this.task3.pending = 'Отправка..';
      await this.$axios.$post("https://rustutor-backend.herokuapp.com/task",{
        token: this.$auth.strategy.token.get(),
        text: this.task3.word,
        answer: this.task3.selectedWord,
        options: this.task3.splitOptions,
        level: this.task3.level,
        points: this.task3.points,
        type: 3
      })
      this.task3.options = '';
      this.task3.word = '';
      this.task3.selectedWord = '';
      this.task3.splitOptions = [];
      this.task3.points = '';
      this.task3.level = '';
      this.task3.pending = 'Задание добавлено!';
    },
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin']),
    splitTaskText1: function() {
      return this.task1.splitText = this.task1.text.split(' ');
    },
    splitTaskText3: function() {
      return this.task3.splitOptions = this.task3.options.split(' ');
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
  height: auto;
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
  height: auto;
  min-height: 850px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.new-task__type {
  height: 500px;
  width: 500px;
  border: 3px solid white;
  border-radius: 10px;
  box-shadow: 0 4px 50px -11px rgb(0,0,0);
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.new-task__selection {
  width: 300px;
  padding: 5px;
}
.new-task__text {
  width: 300px;
  padding: 10px;
}
.new-task__options {
  width: 300px;
  padding: 5px;
}
.new-task__answer {
  width: 300px;
}
.new-task__level {
  width: 50px;
}
.new-task__points {
  width: 50px;
}
.new-task__pending {
  font-size: 22px;
}
.new-task__submit {
  width: 200px;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid white;
  border-radius: 5px;
  background-color: #25618C;
  color: white;
}
.new-task__submit:hover {
  background-color: darkseagreen;
  color: black;
  cursor: pointer;
}

@media (max-width: 1235px) {
  .new-task {
    flex-direction: column;
    align-items: center;
  }
  .new-task__container {
  }
  .new-task__type {
    width: 400px;
    height: 400px;
  }
  .new-task__tip {
    font-size: 18px;
  }
  .new-task__pending {
    font-size: 18px;
  }
  .new-task__description {
    font-size: 20px;
  }
}
@media (max-width: 880px) {
  .new-task__container {
    flex-direction: column;
  }
  .new-task__type {
    margin: 10px;
  }
}
@media (max-width: 424px) {
  .new-task__tip {
    font-size: 16px;
  }
  .new-task__description {
    font-size: 16px;
  }
  .new-task__type {
    width: 300px;
    height: auto;
  }
  .new-task__text {
    width: 250px;
    padding: 5px;
  }
  .new-task__options {
    width: 250px;
  }
}
</style>
