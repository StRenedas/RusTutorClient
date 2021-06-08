<template>
  <div class="levels-cards__border" v-bind:style="{border: cardBorder}">
    <img :src=cardImg alt="" class="levels-cards__image">
    <p class="levels-cards__title">{{ cardTitle }}</p>
    <p class="levels-cards__description">{{ cardDescription }}</p>
  </div>
</template>

<script>
export default {
  name: "LevelCard",
  props: ['cardImg', 'cardTitle', 'cardDescription', 'cardBorder']
};
</script>

<style scoped>
.levels-cards__border {
  width: 300px;
  height: 300px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;
  transition: transform .4s ease-out;
}
.levels-cards__border:hover {
  transform: translate(0, -10px);
}

.levels-cards__image {
  width: 150px;
  height: 150px;
}

.levels-cards__title {
  font-size: 28px;
  font-weight: 500;
}

.levels-cards__description {
  font-size: 22px;
  font-weight: 300;
}
@media (max-width: 1250px) {
  .levels-cards__border {
    width: 200px;
    height: 200px;
  }
  .levels-cards__title {
    font-size: 20px;
  }
  .levels-cards__description {
    text-align: center;
    font-size: 18px;
  }
  .levels-cards__image {
    width: 100px;
    height: 100px;
  }
}
</style>
