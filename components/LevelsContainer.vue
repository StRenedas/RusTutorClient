<template>
    <div class="levels-container">
        <div class="levels-cards__container" v-for="card in cards" :key="card.id">
            <div class="level-cards__border">
                <img :src=card.levelImage alt="" class="level-cards__image">
                <p class="level-cards__title">{{card.levelName}}</p>
                <p class="level-cards__description">{{card.levelDescription}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cards: [
                    {id:1, levelName: "Beginner", levelDescription: "Russian language basics", levelImage: "/LevelCardsImages/language-white.svg"},
                    {id:2, levelName: "Elementary", levelDescription: "Making a step forward", levelImage: "/LevelCardsImages/learner-white.svg"},
                    {id:3, levelName: "Pre-Intermediate", levelDescription: "Not a game now!", levelImage: "/LevelCardsImages/brain-white.svg"}
                ]
            }
        },
    }
</script>

<style scoped>
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
</style>