<script setup>
  import {ref,reactive} from 'vue'
  import {word} from './word.json'
  
  const evalueteStatus = ["present","correct","absent"]

  const word1 = word.word1;
  const word2 = word.word2;

  const randomWord = word1[Math.floor(Math.random()*2315)]
  const inputWord = ref('')
  let round = 0
  const board = reactive([{
    bordState : 'stone',
    evalution : []
    },
    {
    bordState : 'super',
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
    if(round==6){return console.log('You Lose');}
    if(randomWord==inputWord.value.toLowerCase()){
      return console.log(`round:${round} You WIN`);
    }
    if(word1.includes(inputWord.value.toLowerCase())||word2.includes(inputWord.value.toLowerCase())){

      board[round].bordState = inputWord.value;
      round++
      return console.log(`${round} Try Again`)
    }
    else {
      return console.log(`${round} don't have this word`);
    }
    
  }
  const checkAnswer = () => {
    for(let inputIdx = 0;eleInput< inputWord.value.length; inputIdx++){
      for(let randIdx = 0;eleRand< randomWord.length;randIdx++){
        if(inputWord.value[inputIdx]==randomWord[randIdx]){
          
        }
      }
    }
  }


</script>

<template>
<div class="flex justify-center ">
  
</div>

{{inputWord}}
<div class="flex justify-center ">
  <div class="form-control">
    <input type="text" placeholder="ENTER YOUR WORD !!" style="text-transform:uppercase" class="input bg-base-200" maxlength="5" v-model="inputWord" @keyup.enter="checkInput" >
  </div>
</div>
<div class=" flex items-center justify-center m-20">
  <div class="grid grid-cols-5 gap-4" >
      <div class="bg-stone-200 p-3 rounded content-center uppercase"  v-for="j in 5">
      <p>d</p>
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
