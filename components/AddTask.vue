<template>
  <div class="new-task">
    <div class="new-task__container">
      <div class="new-task__type">
        <p class="new-task__description">Предложение для задания "Перевод слова"</p>
        <input class="new-task__input" type="text" v-model.trim="$v.task1.text.$model" placeholder="Введите текст задания">
        <p class="new-task__tip">Выберите слово для перевода</p>
        <select class="new-task__input" v-model.trim="$v.task1.word.$model">
          <option v-for="word in splitTaskText1" :key="word">{{word}}</option>
        </select>
        <p class="new-task__tip">Правильный ответ</p>
        <input class="new-task__input" type="text" v-model.trim="$v.task1.answer.$model" placeholder="Введите правильный ответ">
        <p class="new-task__tip">Укажите уровень сложности</p>
        <div class="new-task__levels">
          <div class="new-task__level" v-for="level in levels" :key="level">
            <label class="new-task__level_label" for="levels1">{{level}}</label>
            <input type="radio" class="new-task__level_button" id="levels1" :name="levels" :value="level" v-model.trim="$v.task1.level.$model">
          </div>
        </div>
        <p class="new-task__tip">Баллы за задание</p>
        <input class="new-task__input-small" type="text" v-model.trim="$v.task1.points.$model">
        <p class="new-task__pending" v-if="task1.pending !== ''">{{ task1.pending }}</p>
        <button class="new-task__submit" @click.prevent="addTaskType1" :disabled="$v.task1.$anyError" :class="{'new-task__submit-allowed': !$v.task1.$anyError }">Добавить задание</button>
      </div>
      <div class="new-task__type">
        <p class="new-task__description">Слово для задания "Выбор варианта"</p>
        <input class="new-task__input" type="text" v-model.trim="$v.task3.word.$model" placeholder="Введите слово для задания">
        <p class="new-task__tip">Варианты ответа (через пробел)</p>
        <input type="text" class="new-task__input" v-model.trim="$v.task3.options.$model" placeholder="Введите варианты ответа">
        <p class="new-task__tip">Правильный ответ</p>
        <select class="new-task__input" v-model.trim="$v.task3.selectedWord.$model">
          <option v-for="option in splitTaskText3" :key="option">{{option}}</option>
        </select>
        <p class="new-task__tip">Укажите уровень сложности</p>
        <div class="new-task__levels">
          <div class="new-task__level" v-for="level in levels" :key="level">
            <label class="new-task__level_label" for="levels3">{{level}}</label>
            <input type="radio" class="new-task__level_button" id="levels3" :name="levels" :value="level" v-model.trim="$v.task3.level.$model">
          </div>
        </div>
        <p class="new-task__tip">Баллы за задание</p>
        <input class="new-task__input-small" type="text" v-model.trim="$v.task3.points.$model">
        <p class="new-task__pending" v-if="task3.pending !== ''">{{ task3.pending }}</p>
        <button class="new-task__submit" @click.prevent="addTaskType3" :disabled="$v.task3.$anyError" :class="{'new-task__submit-allowed': !$v.task3.$anyError }">Добавить задание</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {numeric, required} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      levels:[1, 2, 3],
      task1: {
        text: '',
        splitText: [],
        word: '',
        answer: '',
        level: undefined,
        points: undefined,
        pending: ''
      },
      task3: {
        word: '',
        options: '',
        selectedWord: '',
        splitOptions: [],
        level: undefined,
        points: undefined,
        pending: ''
      }
    }
  },
  validations: {
    task1: {
      text: { required },
      word: {required},
      answer: {required},
      level: {required, numeric},
      points: { numeric, required },
    },
    task3: {
      word: {required},
      options: {required},
      selectedWord: {required},
      level: {required, numeric},
      points: { numeric, required}
    }
  },
  methods: {
    ...mapMutations(['checkAuth', 'checkAdmin']),
    async addTaskType1() {
      this.$v.task1.$touch();
      if (this.$v.task1.$invalid) {
        this.task1.pending = 'Заполните все поля!';
      }
      else {
        this.task1.text = this.task1.text.replace(this.task1.word, "<b>"+this.task1.word+"</b>");
        this.task1.pending = 'Отправка..';
        await this.$axios.$post("https://rustutor-backend.herokuapp.com/task",{
          text: this.task1.text,
          answer: this.task1.answer,
          level: this.task1.level,
          points: this.task1.points,
          type: 1,
        }, {headers: {'User-Role': this.$auth.$storage.getLocalStorage('isadmin')}});
        this.task1.text = '';
        this.task1.word = '';
        this.task1.answer = '';
        this.task1.pending = 'Задание добавлено!';
      }
    },
    async addTaskType3 () {
      this.$v.task3.$touch();
      if (this.$v.task3.$invalid) {
        this.task3.pending = 'Заполните все поля!';
      }
      else {
        this.task3.splitOptions = this.task3.splitOptions.filter(word => word !== this.task3.selectedWord);
        this.task3.pending = 'Отправка..';
        await this.$axios.$post("https://rustutor-backend.herokuapp.com/task",{
          text: this.task3.word,
          answer: this.task3.selectedWord,
          options: this.task3.splitOptions,
          level: this.task3.level,
          points: this.task3.points,
          type: 3,
        }, {headers: {'User-Role': this.$auth.$storage.getLocalStorage('isadmin')}})
        this.task3.options = '';
        this.task3.word = '';
        this.task3.selectedWord = '';
        this.task3.splitOptions = [];
        this.task3.points = '';
        this.task3.level = '';
        this.task3.pending = 'Задание добавлено!';
      }
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
  height: calc(100vh - 100px);
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
  min-height: calc(100vh - 100px);
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
.new-task__input {
  width: 300px;
  padding: 5px;
  outline: none;
  border: 2px solid white;
  border-radius: 5px
}
.new-task__input-small {
  width: 70px;
  padding: 5px;
  outline: none;
  border: 2px solid white;
  border-radius: 5px
}
.new-task__levels {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
}
.new-task__level {
  display: flex;
  flex-direction: column;
}
.new-task__level_button {
  width: 20px;
  height: 20px;
}
.new-task__pending {
  font-size: 22px;
}
.new-task__submit {
  width: 200px;
  margin-top: 20px;
  padding: 10px;
  border: 2px solid white;
  border-radius: 5px;
  background-color: #25618C;
  color: white;
  font-weight: 400;
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
}
.new-task__submit:hover {
  cursor: not-allowed;
}
.new-task__submit-allowed:hover {
  background-color: darkseagreen;
  color: white;
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
    width: 430px;
    height: 430px;
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
  .new-task {
    min-height: calc(100vh - 100px);
    height: auto;
  }
  .new-task__container {
    flex-direction: column;
  }
  .new-task__type {
    margin: 10px;
  }
}
@media (max-width: 460px) {
  .new-task__tip {
    font-size: 16px;
  }
  .new-task__description {
    font-size: 16px;
  }
  .new-task__type {
    width: 275px;
    height: auto;
  }
  .new-task__input {
    width: 250px;
  }
}
</style>
