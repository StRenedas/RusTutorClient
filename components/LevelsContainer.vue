<template>
  <div class="container">
    <div class="user-info">
      <p class="user-text">Get yourself some practice!</p>
      <p class="user-rating">Your current rating is {{ this.$auth.$storage.getLocalStorage("rating") }}</p>
    </div>
    <div class="levels-container" v-if="questionsToGet.level === 0">
      <div class="levels-cards__container" v-for="card in cards" :key="card.id" @click="setLevel(card.id)">
        <div class="level-cards__border">
          <img :src=card.levelImage alt="" class="level-cards__image">
          <p class="level-cards__title">{{ card.levelName }}</p>
          <p class="level-cards__description">{{ card.levelDescription }}</p>
        </div>
      </div>
    </div>
    <div class="tasks-container" v-if="questionsToGet.level !== 0">
      <div class="tasks-cards__container" v-for="task in taskCards" :key="task.id"
           @click="setTask(task.id); getQuestions()">
        <div class="tasks-cards__border">
          <img :src=task.taskImage alt="" class="tasks-cards__image">
          <p class="tasks-cards__title">{{ task.taskName }}</p>
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
      cards: [
        {
          id: 1,
          levelName: "Beginner",
          levelDescription: "Russian language basics",
          levelImage: "/LevelCardsImages/language-white.svg"
        },
        {
          id: 2,
          levelName: "Elementary",
          levelDescription: "Making a step forward",
          levelImage: "/LevelCardsImages/learner-white.svg"
        },
        {
          id: 3,
          levelName: "Pre-Intermediate",
          levelDescription: "Not a game now!",
          levelImage: "/LevelCardsImages/brain-white.svg"
        }
      ],
      taskCards: [
        { id: 1, taskName: "Translation", taskImage: "/TaskCardsImages/translation.svg" },
        { id: 2, taskName: "Pictures", taskImage: "/TaskCardsImages/pickapicture.svg" },
        { id: 3, taskName: "1 of many", taskImage: "/TaskCardsImages/1ofmany.svg" }
      ],
      levelPicked: 0,
      taskPicked: 0,
      questionsToGet: { level: "", type: "" }
    };
  },
  methods: {
    ...mapMutations(["checkAuth"]),
    setLevel(id) {
      this.questionsToGet.level = id;
      console.log(this.questionsToGet);
    },
    setTask(id) {
      this.questionsToGet.type = id;
    },
    async getQuestions() {
      const questions = await this.$axios.$post("http://127.0.0.1:3001/questions", this.questionsToGet);
      console.log(questions);
    }
  },
  computed: {
    ...mapGetters(["authenticated"])
  },
  async created() {
    await this.checkAuth()
    if(!this.authenticated) {
      await this.$router.replace('/');
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.user-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0A132D;
  color: white;
}

.user-text {
  padding-top: 50px;
  font-size: 42px;
  font-weight: 400;
}

.user-rating {
  padding-top: 50px;
  font-size: 30px;
  font-weight: 200;
}

.levels-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #0A132D;
  color: white;
}

.level-cards__border {
  width: 300px;
  height: 300px;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.level-cards__image {
  width: 150px;
  height: 150px;
}

.level-cards__title {
  font-size: 28px;
  font-weight: 500;
}

.level-cards__description {
  font-size: 22px;
  font-weight: 300;
}


.tasks-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #0A132D;
  color: white;
}

.tasks-cards__border {
  width: 300px;
  height: 300px;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.tasks-cards__image {
  width: 150px;
  height: 150px;
}

.tasks-cards__title {
  font-size: 28px;
  font-weight: 500;
}
</style>
