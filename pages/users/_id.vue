<template>
  <div class="container">
    <h1 class="task__title">Ниже представлены вопросы, на которые пользователь {{ res[1] }} ответил неверно</h1>
    <div class="task__block">
      <div class="task__itself" v-for="question in res[0]" :key="question.id">
        <p class="task__param">Модуль задания: {{question.level}}</p>
        <p class="task__param">Тип задания: {{question.type}}</p>
        <div class='task__place' v-html="question.value"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  async asyncData({params, $axios, $auth}) {
    let res = await $axios.$get(`https://rustutor-backend.herokuapp.com/errors/${params.id}`);
    return {res};
  },
  middleware: ['auth', 'admin'],
  methods: {
    ...mapMutations(['checkAuth', 'checkAdmin'])
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin'])
  },
  /*async mounted() {
    await this.checkAuth();
    await this.checkAdmin();
    if (!this.authenticated) {
      await this.$router.push({ path: '/' });
    }
    else if (this.authenticated && !this.isadmin) {
      await this.$router.push('/Levels');
    }
  },*/
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
  /*display: grid;
  min-height: calc(100vh - 100px);
  height: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;*/
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
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
@media(max-width: 1300px) {
  .task__block {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .task__title {
    font-size: 32px;
  }
}
@media(max-width: 850px) {
  .task__block {
    grid-template-columns: 1fr 1fr;
  }
  .task__title {
    font-size: 26px;
    padding: 10px;
  }
  .task__place {
    height: 120px;
    font-size: 22px;
  }
}
@media(max-width: 600px) {
  .task__block {
    grid-template-columns: 1fr;
  }
  .task__place {
    height: auto;
  }
  .task__title {
    font-size: 22px;
  }
}
</style>
