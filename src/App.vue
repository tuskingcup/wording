<script setup>
  import {ref,reactive, computed} from 'vue'
  import {word} from './word.json'
  
  const evalueteStatus = {"present":"present","correct":"correct","absent":"absent"}

  const word1 = word.word1;
  const word2 = word.word2;

  const randomWord = word1[Math.floor(Math.random()*2315)]
  const inputWord = ref('')
  const round = ref(0)
  const gameIsEnd = ref(false)
  
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

  const words = computed(()=>{
    const wordList = []
    for (const wb of board){
      if(wb.bordState!=='')
      {wordList.push(...wb.bordState.split(""))}
    }
    return wordList;
  })

  const evalutes = computed(()=>{
    const evaluteList = []
    for (const eb of board){
      if(eb.evalution!=='')
      {evaluteList.push(...eb.evalution)}
    }
    return evaluteList;
  })

  console.log(randomWord);
  const checkInput = () => {
    if(randomWord==inputWord.value.toLowerCase()){
      setWord()
      round.value++
      console.log('you win')
      gameIsEnd.value=true
    }
    else if(word1.includes(inputWord.value.toLowerCase())||word2.includes(inputWord.value.toLowerCase())){
      setWord()
      round.value++
      console.log(`${round.value} Try Again`)
    }
    else {
      setWord()
      console.log(`${round.value} don't have this word`)
    }
    if(round.value==6){gameIsEnd.value=true}
  }

  const checkAnswer = () => {
    const evaList = []
    for(let inputIdx = 0; inputIdx< inputWord.value.length; inputIdx++){
      if(inputWord.value[inputIdx]===randomWord[inputIdx]){
        evaList.push(evalueteStatus.correct)
      }else{
      for(const rand of randomWord){
        if(inputWord.value[inputIdx]===rand){
          evaList.push(evalueteStatus.present)
          break
        }
      }
      }
      
      if(evaList.length===inputIdx){
        evaList.push(evalueteStatus.absent)
        }
      
    }
    return evaList
  }
  

  const setWord = () =>{
    board[round.value].bordState = inputWord.value
    board[round.value].evalution = checkAnswer()
  }

</script>

<template>
<div class="flex justify-center ">
  
</div>


<div class="flex justify-center ">
  <div class="form-control">
    <input type="text" placeholder="ENTER YOUR WORD !!" style="text-transform:uppercase" class="text-center input bg-base-200" maxlength="5" v-model="inputWord" @keyup.enter="checkInput" :disabled="gameIsEnd">
  </div>
</div>

<div class="bg-blue-400 text-blue-400 min-h-screen flex items-center justify-center">
  <div class="grid grid-cols-5 gap-4">
    <div class=" p-5 rounded list-none uppercase"
    :class="{'bg-white':evalutes[index]==evalueteStatus.absent,
    'bg-green-300':evalutes[index]==evalueteStatus.correct,
    'bg-amber-300':evalutes[index]==evalueteStatus.present}"
    v-for="(boards,index) in words">
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
