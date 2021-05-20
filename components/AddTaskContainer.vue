<template>
  <div>
    <p>Введите предложение для задания</p>
    <input type="text" v-model="newTaskText">
    <p>Выберите слово для перевода</p>
    <select v-model="selectedWord">
      <option v-for="word in splitTaskText" :key="word">
        {{word}}
      </option>
    </select>
    <input type="text" v-model="answer">
    <button @click.prevent="addTask">Добавить задание</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTaskText: '',
      splitText: [],
      selectedWord: '',
      answer: '',
    }
  },
  methods: {
    async addTask() {
      this.newTaskText = this.newTaskText.replace(this.selectedWord, "<b>"+this.selectedWord+"</b>")
      await this.$axios.$post("http://127.0.0.1:3001/task", {text: this.newTaskText, answer: this.answer})
      this.newTaskText = '';
      this.selectedWord = '';
      this.answer = '';
    }
  },
  computed: {
    splitTaskText: function() {
      return this.splitText = this.newTaskText.split(' ');
    }
  },
};
</script>

<style scoped>

</style>
