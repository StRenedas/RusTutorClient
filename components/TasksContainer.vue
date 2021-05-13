<template>
  <div class='task'>
    <p class='task__description'>Translate the highlighted word into Russian</p>
    <div class='task__place'>
      <p class='task__name'>HERE'S TASK TEXT</p>
    </div>
    <div class='task__points'>Points for this task:</div>
    <input type='text' class='task__answer'>
    <button class='task__submit'>Next</button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .task {
    width: 100%;
    height: 100%;
    background-color: #25618C;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .task__description {
    color: white;
    font-size: 46px;
    font-weight: 400;
    /*padding: 200px 0 100px;*/
  }
  .task__place {
    padding: 20px 20px;
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 30px;
    font-weight: 300;
  }
  .task__points {
    color: white;
    font-size: 25px;
  }
  .task__answer {
    width: 300px;
    height: 50px;
    font-size: 26px;
  }
  .task__submit {
    font-size: 30px;
    font-weight: 300;
    padding: 25px 75px;
    background-color: white;
    border: 2px solid darkseagreen;
    border-radius: 10px;
  }
  .task__submit:hover {
    background-color: darkseagreen;
  }
</style>
