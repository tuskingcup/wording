<script setup>
  import {ref,reactive} from 'vue'
  import {word} from './word.json'
  
  const evalueteStatus = ["present","correct","absent"]

  const word1 = word.word1;
  const word2 = word.word2;

  const randomWord = word1[Math.floor(Math.random()*2315)]
  const inputWord = ref('')
  let round = 0
  const boards = reactive([{
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

const checkWin = ref(false)

  console.log(randomWord);
  const checkInput = () => {
    if(round==6){return console.log('You Lose');}
    if(randomWord==inputWord.value.toLowerCase()){
      checkWin.value = true;
      return console.log(`round:${round} You WIN`);
    }
    if(word1.includes(inputWord.value.toLowerCase())||word2.includes(inputWord.value.toLowerCase())){

      boards[round].bordState = inputWord.value;
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

const fillLettet = (letter: String) => {

}

</script>

<template>
<div class="flex justify-center ">
  
</div>

{{inputWord}}

<div class="flex justify-center ">
  <div class="form-control">
    <input type="text" placeholder="ENTER YOUR WORD !!" style="text-transform:uppercase" class="input bg-base-200" maxlength="5" v-model="inputWord" @keyup.enter="checkInput" :readonly="checkWin === true">
  </div>
</div>
<div class ="m-5">
   <p v-show="checkWin === true">You WIN!</p> 
   </div>

<div class = "grid max-w-xs grid-cols-5 gap-5 mx-auto mb-1">
   <div 
   v-for="i in 5"
   :key="i"
   class = "grid grid-cols-5 gap-5 p-5  border-2 border-gray-900">


    
     
   
     


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
