<template>
    <div class="FAQ">
        <div class="FAQ__container">
            <h1 class="FAQ__title">Quick Guide</h1>
            <p class="FAQ__subtitle">That's a service to practice your skills at Russian language and get some good grades at SUSU.</p>
            <ul class="FAQ__list">
                <li class="FAQ__list_element">Signup using the form on the main page.</li>
                <li class="FAQ__list_element">Starting with ‘Begginer’ course, select the task type.</li>
                <li class="FAQ__list_element">Complete a block of tasks to increase your overall rating.</li>
                <li class="FAQ__list_element">Show your results to your teacher.</li>
                <li class="FAQ__list_element">Get some good grades!</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
.FAQ {
    max-width: 1600px;
}
.FAQ__container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.FAQ__title {
    font-size: 2em;
    color: #25618C;
    padding: 5%;
}
.FAQ__subtitle {
    width: 60%;
    color: #25618C;
    font-size: 32px;
    text-align: center;
    padding: 3% 0 10%;
}
.FAQ__list {
    color: #25618C;
    font-size: 26px;
    list-style-type: none;
}
.FAQ__list_element {
    padding-top: 7px;
}
</style>