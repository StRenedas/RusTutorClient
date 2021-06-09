<template>
    <div class="FAQ">
      <div class="FAQ__container">
        <h1 class="FAQ__title">Quick guide for students</h1>
        <p class="FAQ__subtitle">That's a service to practice your skills at Russian language and to get some good grades at SUSU.</p>
        <ul class="FAQ__list">
          <li class="FAQ__list_element">Signup using the form on the main page.</li>
          <li class="FAQ__list_element">Starting with ‘Beginner’ level, select the task type.</li>
          <li class="FAQ__list_element">Complete tasks to increase your overall rating.</li>
          <li class="FAQ__list_element">Show your results to your teacher.</li>
          <li class="FAQ__list_element">Get some good grades!</li>
        </ul>
      </div>
      <div class="FAQ__container">
        <h1 class="FAQ__title">Quick guide for professors</h1>
        <p class="FAQ__subtitle">Motivate your students to learn Russian by giving them additional points for completing tasks.</p>
        <ul class="FAQ__list">
          <li class="FAQ__list_element">Signup using the form on the main page.</li>
          <li class="FAQ__list_element">Tell your username to your department to access profs' functions.</li>
          <li class="FAQ__list_element">Track your students' score.</li>
          <li class="FAQ__list_element">Add new tasks depending on what's important to learn.</li>
          <li class="FAQ__list_element">Reward your students' successes!</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.FAQ {
  width: 100%;
  min-height: 850px;
  height: auto;
  display: flex;
  align-items: center;
  background-color: #ECEFF6;
}
.FAQ__container {
  margin-top: 120px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
}
.FAQ__container:first-child {
  border-right: 1px solid black;
}
.FAQ__title {
  font-size: 34px;
  color: #25618C;
  padding: 5%;
  text-align: center;
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
  padding-left: 0;
  padding-bottom: 30px;
}
.FAQ__list_element {
  padding: 7px 10px 0;
}
@media (max-width: 1240px) {
  .FAQ__title {
    font-size: 28px;
  }
  .FAQ__subtitle {
    font-size: 24px;
  }
  .FAQ__list {
    font-size: 22px;
  }
}
@media (max-width: 1050px) {
  .FAQ {
    flex-direction: column;
    height: auto;
  }
  .FAQ__container {
    width: 100%;
    border-bottom: 1px solid black;
  }
  .FAQ__container:first-child {
    border-right: none;
  }
  .FAQ__title {
    font-size: 34px;
  }
  .FAQ__subtitle {
    font-size: 32px;
  }
  .FAQ__list {
    font-size: 30px;
  }
}

@media (max-width: 420px) {
  .FAQ__title {
    font-size: 24px;
  }
  .FAQ__subtitle {
    font-size: 20px;
  }
  .FAQ__list {
    font-size: 18px;
  }
}
</style>
