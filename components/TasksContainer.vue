<template>
    <div class="tasks-container">
        <div class="tasks-container">
        <div class="tasks-cards__container" v-for="task in taskCards" :key="task.id">
            <div class="tasks-cards__border">
                <img :src=task.taskImage alt="" class="tasks-cards__image">
                <p class="tasks-cards__title">{{task.taskName}}</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                taskCards: [
                    {id:1, taskName: "Translation", taskImage: "/TaskCardsImages/translation.svg"},
                    {id:2, taskName: "Pictures", taskImage: "/TaskCardsImages/pickapicture.svg"},
                    {id:3, taskName: "1 of many", taskImage: "/TaskCardsImages/1ofmany.svg"}
                ]
            }
        },
    }
</script>

<style scoped>
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