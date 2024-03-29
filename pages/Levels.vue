<template>
    <div class="container">
      <div class="user-info">
        <p class="user-text">Get yourself some practice!</p>
        <p class="user-rating">Your current score is {{ this.$auth.$storage.getLocalStorage("rating") }}</p>
      </div>
      <div class="levels-container" v-if="getLevel === 0">
        <div class="levels-cards__container" v-for="card in cards" :key="card.id" @click="setNewLevel(card.id)">
          <level-card :card-img="card.levelImage"
                      :card-border="card.border"
                      :card-title="card.levelName"
                      :card-description="card.levelDescription"
                      :card-shadow="card.shadow">
          </level-card>
        </div>
      </div>
      <div class="tasks-container" v-if="getLevel !== 0">
        <div class="tasks-cards__container" v-for="task in taskCards" :key="task.id" @click="setNewType(task.id)">
          <task-card :card-img="task.taskImage"
                     :card-title="task.taskName">
          </task-card>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import LevelCard from "@/components/LevelCard";
import TaskCard from "@/components/TaskCard";
export default {
  data() {
    return {
      cards: [
        {
          id: 1,
          levelName: "Beginner",
          levelDescription: "Russian language basics",
          levelImage: "/LevelCardsImages/language-white.svg",
          border: '4px solid rgb(170, 255, 170)',
          shadow: '0 4px 40px -11px rgb(170,255,170)'
        },
        {
          id: 2,
          levelName: "Elementary",
          levelDescription: "Making a step forward",
          levelImage: "/LevelCardsImages/learner-white.svg",
          border: '4px solid rgb(255, 255, 170)',
          shadow: '0 4px 40px -11px rgb(255, 255, 170)'
        },
        {
          id: 3,
          levelName: "Pre-Intermediate",
          levelDescription: "Not a game now!",
          levelImage: "/LevelCardsImages/brain-white.svg",
          border: '4px solid rgb(255, 170, 170)',
          shadow: '0 4px 40px -11px rgb(255, 170, 170)'
        }
      ],
      taskCards: [
        { id: 1,
          taskName: "Translation",
          taskImage: "/TaskCardsImages/translation.svg",
        },
        { id: 2,
          taskName: "Pictures",
          taskImage: "/TaskCardsImages/pickapicture.svg",
        },
        { id: 3,
          taskName: "1 of many",
          taskImage: "/TaskCardsImages/1ofmany.svg",
        }
      ],
    };
  },
  middleware: ['auth'],
  components: {
    'level-card': LevelCard,
    'task-card': TaskCard
  },
  methods: {
    ...mapMutations(['checkAuth', 'checkAdmin', "setLevel", "setType"]),
    ...mapActions(['getQuestionsFromServer']),
    setNewLevel(id) {
      this.setLevel(id);
    },
    setNewType(id) {
      this.setType(id);
      this.$router.push({path: '/Tasks'});
    },
  },
  computed: {
    ...mapGetters(['authenticated', 'isadmin', "getLevel", "getType"])
  },
  async mounted() {
    this.checkAuth();
    this.checkAdmin();
    if (!this.$auth.loggedIn) {
      await this.$router.push({ path: '/' });
    }
    else if (this.$auth.loggedIn && !this.isadmin){
      await this.$router.push({path: '/Levels'})
    }
    else if (this.$auth.loggedIn && this.isadmin){
      await this.$router.push({path: '/Teacher'})
    }
  },
}
</script>

<style scoped>
.container {
  height: calc(100vh - 100px);
  width: 100%;
}
.home-page {
  height: 100%;
  width: 100%;
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
  text-align: center;
  padding-top: 50px;
  font-size: 42px;
  font-weight: 400;
}
.user-rating {
  padding-top: 50px;
  font-size: 30px;
  font-weight: 200;
  text-align: center;
}
.levels-container {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #0A132D;
  color: white;
}
.tasks-container {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #0A132D;
  color: white;
}
@media (max-width: 900px) {
  .container {
    min-height: calc(100vh - 100px);
    height: auto;
  }
  .levels-container {
    flex-direction: column;
  }
  .tasks-container {
    flex-direction: column;
  }
}
</style>
