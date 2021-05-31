<template>
  <div class="students-ratings">
    <p class="students-ratings__description">Ниже отображены рейтинги всех зарегистрированных студентов</p>
    <div class="students-ratings__header">
      <p class="students-ratings__header_name">USERNAME</p>
      <p class="students-ratings__header_rating">RATING</p>
    </div>
    <ul class="students-ratings__list" v-for="student in studentsInfo" :key="student.id">
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
    }
  },
  methods: {
    ...mapMutations(['checkAdmin', 'checkAuth']),
    async getRatings() {
      this.studentsInfo = await this.$axios.$get('http://127.0.0.1:3001/ratings')
    }
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin'])
  },
  async mounted() {
    this.checkAuth();
    this.checkAdmin();
    if(!this.authenticated || !this.isadmin) {
      await this.$router.push({path: '/'});
    }
    await this.getRatings();
    console.log(this.studentsInfo);
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
  padding: 100px 0 150px;
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
