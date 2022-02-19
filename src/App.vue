<script setup>
  import {ref,reactive, computed} from 'vue'
  import {word} from './word.json'
  
  const evalueteStatus = ["present","correct","absent"]

  const word1 = word.word1;
  const word2 = word.word2;

  const randomWord = word1[Math.floor(Math.random()*2315)]
  const inputWord = ref('')
  const round = ref(0)
  const words = ref([]);
  const board = reactive([{
    bordState : '',
    evalution : []
    },
    {
    bordState : '',
    evalution : []
    },
    {
    bordState : '',
    evalution : []
    },
    {
    bordState : '',
    evalution : []
    },
    {
    bordState : '',
    evalution : []
    },
    {
    bordState : '',
    evalution : []
    }])
  console.log(randomWord);
  const checkInput = () => {
    if(round.value==6){return console.log('You Lose');}
    if(randomWord==inputWord.value.toLowerCase()){
      return console.log(`round:${round.value} You WIN`);
    }
    if(word1.includes(inputWord.value.toLowerCase())||word2.includes(inputWord.value.toLowerCase())){

      board[round.value].bordState = inputWord.value;
      words.value.push(...board[round.value].bordState.split(""))
      round.value++
      return console.log(`${round.value} Try Again`)
    }
    else {
      return console.log(`${round.value} don't have this word`);
    }
    
  }
  const checkAnswer = () => {
    for(let inputIdx = 0; eleInput< inputWord.value.length; inputIdx++){
      for(let randIdx = 0; eleRand< randomWord.length;randIdx++){
        if(inputWord.value[inputIdx]==randomWord[randIdx]){
          
        }
      }
    }
  }


</script>

<template>
<div class="flex justify-center ">
  
</div>


<div class="flex justify-center ">
  <div class="form-control">
    <input type="text" placeholder="ENTER YOUR WORD !!" style="text-transform:uppercase" class="input bg-base-200" maxlength="5" v-model="inputWord" @keyup.enter="checkInput">
  </div>
</div>

<div class="bg-blue-400 text-blue-400 min-h-screen flex items-center justify-center">
  <div class="grid grid-cols-5 gap-4">
    <div class="bg-white p-5 rounded list-none uppercase" v-for="boards in words">
    {{ boards }}
    </div>
  </div>
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
