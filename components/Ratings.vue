<template>
  <div class="students-ratings">
    <p class="students-ratings__description">Ниже представлены 10 студентов с наибольшим количеством баллов</p>
    <p class="students-ratings__sort-tip">Для поиска среди всех студентов, введите имя в поле поиска</p>
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
          <p class="students-ratings__name">{{ student.username }}</p>
          <p class="student-ratings__email">{{student.email}}</p>
        </div>
        <p class="students-ratings__rating">{{ student.rating }}</p>
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
    }
  },
  methods: {
    ...mapMutations(['checkAdmin', 'checkAuth']),
    async getRatings() {
      this.studentsInfo = await this.$axios.$post('https://rustutor-backend.herokuapp.com/ratings', {token: this.$auth.strategy.token.get()});
    },
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin']),
    sortByName() {
      if (this.sortField === '') {
        return this.studentsInfo.sort().slice(0, 10);
      }
      else {
        if (this.studentsInfo.filter(student => student.username.includes(this.sortField)).length === 0) {
          return [{ username: 'Пользователи не найдены!' }];
        }
        else {
          return this.studentsInfo.filter(student => student.username.includes(this.sortField))
        }
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  font-weight: 400;
  padding-bottom: 20px;
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
/*  padding-bottom: 20px;*/
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
.students-ratings__header_rating {
  text-align: right;
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  padding-left: 0;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
}
.student-ratings__credentials {
  padding-left: 10px;
}
.students-ratings__rating {
  padding-right: 10px;
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
  .students-ratings__name {
    text-align: center;
  }
  .student-ratings__email {
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
  }
  .students-ratings__header {
    font-size: 22px;
  }
  .students-ratings__list {
    font-size: 18px;
  }
  .student-ratings__email {
    font-size: 16px;
  }
}
</style>
