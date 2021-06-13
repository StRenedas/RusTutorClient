<template>
  <div class="students-ratings">
    <p class="students-ratings__description">Ниже представлены 10 студентов с наибольшим количеством баллов</p>
    <p class="students-ratings__sort-tip">Для поиска среди всех студентов, введите имя в поле поиска</p>
    <p class="students-ratings__sort-tip">Для просмотра неверно отвеченных заданий, нажмите на имя студента</p>
    <input type="text" class="students-ratings__sort" v-model="sortField" placeholder="Введите имя студента">
    <div class="students-ratings__header">
      <p class="students-ratings__header_name">Имя студента</p>
      <p class="students-ratings__header_rating">Сумма баллов</p>
    </div>
    <div class="students-ratings__header_mobile">
      <p class="students-ratings__header_name">Имя студента и сумма баллов</p>
    </div>
    <div class="students-ratings__list">
      <div class="students-ratings__student" v-for="student in sortByName" :key="student.id">
        <div class="student-ratings__credentials">
          <nuxt-link class="students-ratings__link" :to="`/users/${student.id}`"><p class="students-ratings__name">{{ student.username }}</p></nuxt-link>
          <p class="students-ratings__rating">{{ student.rating }}</p>
        </div>
        <div class="students-ratings__stats" v-for="stat in student.stat">
          <p class="students-ratings__level">Решено в модуле {{stat.level}}: {{ stat.total }}</p>
          <p class="students-ratings__level-type"> Из них на перевод: {{stat.translate}}</p>
          <p class="students-ratings__level-type"> Из них на картинки: {{stat.pics}}</p>
          <p class="students-ratings__level-type"> Из них на выбор слова: {{stat.choice}}</p>
        </div>
        <div class="students-ratings__stats_button" @click="getStats(student.id)">
          <img src="../static/down-arrow.png" alt="" class="students-ratings__stats_button_img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      studentsInfo: [],
      sortField: '',
      student: {},
      levels: [{lvl: 1, name:"Beginner"}, {lvl: 2, name: "Elementary"}, {lvl: 3, name: "Pre-intermediate"}],
    }
  },
  methods: {
    ...mapMutations(['checkAdmin', 'checkAuth']),
    async getRatings() {
      this.studentsInfo = await this.$axios.$get('https://rustutor-backend.herokuapp.com/ratings');
    },
/*    async getCorrects(id) {
      this.student = await this.studentsInfo.filter(student => student.id.toString()===id.toString());
      let res = await this.$axios.post('http://127.0.0.1:3001/test2', {userid: this.student[0].id});
      for (let i = 0; i < res.data.length; i++) {
        this.student[0].resolved.push({level: this.levels[i].lvl, points: res.data[i]});
      }
      console.log(this.student)
    },
    async getCorrectsByType(id, level) {
      this.student = await this.studentsInfo.filter(student => student.id.toString()===id.toString());
      let res = await this.$axios.$post('http://127.0.0.1:3001/test3', {userid: this.student[0].id, level});
      console.log(this.student);
      console.log(res);
      console.log(this.student.resolved);
      this.student.resolved.types = res;
/!*      for (let i = 0; i < res.length; i++) {

        this.student[0].resolved[i].types = res;
      }*!/
      /!*console.log(this.student[0].resolved[1].types);*!/
    },*/
    async getStats(id) {
      this.student = await this.studentsInfo.filter(student => student.id.toString()===id.toString());
      let res = await this.$axios.$get(`https://rustutor-backend.herokuapp.com/statistics/${id}`);
      this.student[0].stat = []
      for (let i = 0; i < res.length; i++) {
        this.student[0].stat.push(res[i]);
      }
      this.studentsInfo.push(this.student[0]);
      this.studentsInfo.pop();
    }
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin']),
    sortByName() {
      if (this.sortField === '') {
        return this.studentsInfo.sort().slice(0, 10);
      }
      else {
        if (this.studentsInfo.filter(student => student.username.toLowerCase().includes(this.sortField.toLowerCase())).length === 0) {
          return [{ username: 'Пользователи не найдены!' }];
        }
        else {
          return this.studentsInfo.filter(student => student.username.toLowerCase().includes(this.sortField.toLowerCase()))
        }
      }
    },
  },
  async mounted() {
    this.checkAuth();
    this.checkAdmin();
    if(!this.authenticated || !this.isadmin) {
      await this.$router.push({path: '/'});
    }
    await this.getRatings();
  }
};

</script>

<style scoped>
.students-ratings {
  background-color: #25618C;
  color: white;
  width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.students-ratings__description {
  font-size: 28px;
  font-weight: 600;
  padding: 100px 15px 50px;
  text-align: center;
}
.students-ratings__header {
  width: 70%;
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  font-weight: 400;
  padding-bottom: 20px;
}
.students-ratings__header_name {
  text-align: center;
}
.students-ratings__header_mobile {
  display: none;
  font-size: 24px;
  text-align: center;
  font-weight: 400;
  padding-bottom: 20px;
}
.students-ratings__sort-tip {
  font-size: 22px;
  padding: 0 15px 20px;
  text-align: center;
}
.students-ratings__sort {
  margin-bottom: 20px;
  font-size: 22px;
  border: 2px solid white;
  border-radius: 5px;
  outline: none;
}
.students-ratings__list {
  width: 70%;
  height: auto;
}
.students-ratings__student {
  width: 100%;
  border: 2px solid white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  padding-left: 0;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
}
.student-ratings__credentials {
  padding-top: 20px;
  padding-left: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.students-ratings__link {
  text-decoration: underline;
  color: white;
}
.students-ratings__rating {
  padding-right: 10px;
}
.students-ratings__stats {
  display: flex;
  width: 90%;
  justify-content: space-evenly;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin: 25px;
  border: 2px solid white;
  border-radius: 5px;
  padding: 5px;
}
.students-ratings__stats_button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
}
.students-ratings__stats_button_img {
  height: 40px;
  width: 40px;
}
@media (max-width: 1060px) {
  .students-ratings__stats {
    flex-direction: column;
  }
}
@media (max-width: 800px) {
  .students-ratings__description {
    font-size: 24px;
    padding: 50px 15px 75px;
  }
  .students-ratings__header {
    font-size: 24px;
  }
  .students-ratings__list {
    width: 80%;
  }
  .students-ratings__student {
    font-size: 22px;
    flex-direction: column;
    text-align: center;
  }
  .student-ratings__credentials {
    flex-direction: column;
    padding-left: 0;
  }
  .students-ratings__name {
    text-align: center;
  }
  .students-ratings__header_mobile {
    display: block;
  }
  .students-ratings__header {
    display: none;
  }
}
@media (max-width: 400px) {
  .students-ratings__description {
    font-size: 22px;
    padding: 30px 10px 40px;
  }
  .students-ratings__header {
    font-size: 22px;
  }
  .students-ratings__header_name {
    font-size: 22px;
  }
  .students-ratings__list {
    font-size: 18px;
  }
  .students-ratings__level {
    font-size: 16px;
  }
  .students-ratings__level-type {
    font-size: 16px;

  }
}
</style>
