<template>
  <div class="tasks-cards__border">
    <img :src=cardImg alt="" class="tasks-cards__image">
    <p class="tasks-cards__title">{{ cardTitle }}</p>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ['cardImg', 'cardTitle']
};
</script>

<style scoped>
.tasks-cards__border {
  width: 300px;
  height: 300px;
  border: 5px solid white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;
  transition: transform .4s ease-out;
  box-shadow:0 4px 50px -11px rgb(255, 255, 170);
}
.tasks-cards__border:hover {
  transform: translate(0, -10px);
}

.tasks-cards__image {
  width: 150px;
  height: 150px;
}

.tasks-cards__title {
  font-size: 28px;
  font-weight: 500;
}
@media (max-width: 1250px) {
  .tasks-cards__border {
    width: 200px;
    height: 200px;
  }
  .tasks-cards__image {
    width: 100px;
    height: 100px;
  }
}
</style>
