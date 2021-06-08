<template>
  <div class="teacher">
    <div class="teacher__events" v-if="action === 0">
      <div class="teacher-cards__container" v-for="card in teacherCards" :key="card.id" @click="setAction(card.id)">
        <div class="teacher-cards__border">
          <img :src=card.actionImage alt="" class="teacher-cards__image">
          <p class="teacher-cards__title">{{ card.name }}</p>
        </div>
      </div>
    </div>
    <div class="students-ratings" v-if="action === 1">
      <ratings>
        <button class="teacher__button-back" @click="deleteAction()">Назад</button>
      </ratings>
    </div>
    <div class="task-add" v-if="action === 2">
      <add-task>
        <button class="teacher__button-back" @click="deleteAction()">Назад</button>
      </add-task>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Ratings from "@/components/Ratings";
import AddTask from "@/components/AddTask";
export default {
  components: {
    'ratings': Ratings,
    'add-task': AddTask
  },
  data() {
    return {
      action: 0,
      teacherCards: [
        {
          id: 1,
          name: 'Рейтинги',
          actionImage: "/TeacherCardsImages/ratings.svg"
        },
        {
          id: 2,
          name: 'Добавить задание',
          actionImage: "/TeacherCardsImages/newTask.svg"
        }
      ],
      studentsInfo: [],
    }
  },
  methods: {
    ...mapMutations(['checkAdmin', 'checkAuth']),
    setAction(id) {
      this.action = id;
      if(this.action === 1) this.getRatings();
    },
    deleteAction() {
      this.action = 0
    },
    async getRatings() {
      this.studentsInfo = await this.$axios.$get('https://rustutor-backend.herokuapp.com/ratings')
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
  }
};
</script>

<style scoped>
.teacher {
  width: 100%;
  height: 100%;
  background-color: #25618C;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.teacher__events {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.teacher-cards__border {
  width: 350px;
  height: 350px;
  border: 4px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
}
.teacher-cards__image {
  width: 150px;
  height: 150px;
}
.teacher-cards__title {
  font-size: 32px;
  text-align: center;
}
.teacher__button-back {
  width: 100px;
  padding: 20px;
  font-size: 20px;
  border: 2px solid black;
  border-radius: 10px;
}
.students-ratings {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.task-add {
  width: 100%;
  height: 100%;
}
@media (max-width: 768px) {
  .teacher-cards__border {
    height: 250px;
    width: 250px;
  }
  .teacher-cards__image {
    width: 150px;
    height: 150px;
  }
  .teacher-cards__title {
    font-size: 24px;
  }
}
@media (max-width: 600px) {
  .teacher__events {
    flex-direction: column;
  }
}
</style>
