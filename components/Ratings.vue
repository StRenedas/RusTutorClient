<template>
  <div class="students-ratings">
    <p class="students-ratings__description">Ниже представлены баллы всех зарегистрированных студентов</p>
    <p class="students-ratings__sort-tip">Введите имя студента для поиска в списке</p>
    <input type="text" class="students-ratings__sort" v-model="sortField">
    <div class="students-ratings__header">
      <p class="students-ratings__header_name">Имя студента</p>
      <p class="students-ratings__header_rating">Сумма баллов</p>
    </div>
    <ul class="students-ratings__list" v-for="student in sortByName" :key="student.id">
      <li class="students-ratings__name">{{ student.username }}</li>
      <li class="students-ratings__rating">{{ student.rating }}</li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      studentsInfo: [],
      sortField: '',
    }
  },
  methods: {
    ...mapMutations(['checkAdmin', 'checkAuth']),
    async getRatings() {
      this.studentsInfo = await this.$axios.$get('https://rustutor-backend.herokuapp.com/ratings');
      await console.log(this.studentsInfo);
    },
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin']),
    sortByName() {
      if (this.sortField === '') {
        return this.studentsInfo
      }
      else {
        return this.studentsInfo.filter(student => student.username.includes(this.sortField))
      }
    }
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.students-ratings__description {
  font-size: 28px;
  font-weight: 600;
  padding: 100px 0 50px;
  text-align: center;
}
.students-ratings__header {
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  font-weight: 400;
}
.students-ratings__sort-tip {
  font-size: 22px;
  padding-bottom: 20px;
}
.students-ratings__sort {
  margin-bottom: 20px;
}
.students-ratings__list {
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  padding-left: 0;
  font-size: 24px;
  font-weight: 300;
}
@media (max-width: 520px) {
  .students-ratings__description {
    font-size: 24px;
    padding: 50px 0 75px;
  }
  .students-ratings__header {
    font-size: 24px;
  }
  .students-ratings__list {
    font-size: 22px;
  }
}
@media (max-width: 400px) {
  .students-ratings__description {
    font-size: 22px;
  }
  .students-ratings__header {
    font-size: 22px;
  }
  .students-ratings__list {
    font-size: 18px;
  }
}
</style>
