<template>
  <div class="container">
    <h1 class="task__title">Ниже представлены вопросы, на которые пользователь KEKWAIT ответил неверно</h1>
    <div class="task__block">
      <div class="task__itself" v-for="question in res" :key="question.id">
        <p class="task__param">Модуль задания: {{question.level}}</p>
        <p class="task__param">Тип задания: {{question.type}}</p>
        <div class='task__place' v-html="question.value"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({params, $axios}) {
    let res = await $axios.$post('https://rustutor-backend/stats', {userid: `${params.id}`});
    /*let nickname = await $axios.$post('http://127.0.0.1:3001:')*/
    return {res};
  },
};
</script>

<style scoped>
.container {
  min-height: calc(100vh - 100px);
  height: auto;
  width: 100%;
  background-color: #25618C;
}
.task__title {
  padding: 30px;
  font-size: 36px;
  color: white;
  text-align: center;
}
.task__block {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.task__param {
  color: white;
  font-size: 24px;
}
.task__itself {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
}
.task__place {
  width: 250px;
  height: 150px;
  padding: 10px 10px;
  background-color: white;
  border: 3px solid white;
  border-radius: 10px;
  font-size: 26px;
  font-weight: 300;
}
</style>
