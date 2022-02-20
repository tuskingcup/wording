<script setup>
  import {ref,reactive, computed} from 'vue'
  import {word} from './word.json'
  
  const evalueteStatus = {"present":"present","correct":"correct","absent":"absent"}
  const word1 = word.word1;
  const word2 = word.word2;
  var randomWord = ref(word1[Math.floor(Math.random()*2315)])
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
      {evaluteList.push(...eb.evalution)
      console.log(eb)}
    }
    return evaluteList;
  })
  console.log(randomWord.value);
  const checkInput = () => {
    if(randomWord.value==inputWord.value.toLowerCase()){
      setWord()
      round.value++
      console.log('you win')
      gameIsEnd.value=true;
      toggleModal();
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
      for(let randIdx = 0; randIdx< randomWord.value.length;randIdx++){
        if(inputWord.value[inputIdx]==randomWord.value[randIdx]){
          if(inputIdx== randIdx){
            evaList.push(evalueteStatus.correct)
          }
          else{evaList.push(evalueteStatus.present)}
          break
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

  const reset = () =>{
    board.forEach((e) => {
      e.bordState = ''
      e.evalution = []
    })
    round.value = 0
    gameIsEnd.value = false
    randomWord.value = word1[Math.floor(Math.random()*2315)]
    // console.log(randomWord.value)
    // console.log(board)
    toggleModal()
  }

  function toggleModal() {
  document.getElementById('modal').classList.toggle('hidden')
}




</script>

<template>
<div class="animate-pulse font-serif font-bold text-6xl">
  <h1>WORDLE</h1>
</div>
<div class="flex justify-center">
  <div class="form-control">
    <input type="text" placeholder="ENTER YOUR WORD !!" class="input bg-base-200 text-center mt-10 uppercase" maxlength="5" v-model="inputWord" @keyup.enter="checkInput">
  </div>
</div>

<div class="text-blue-400 flex items-center justify-center mt-10">
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


<div class="animate-fade-in-down fixed z-10 overflow-y-auto top-1/3 w-full left-0 hidden" id="modal">
  <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-900 opacity-75" />
    </div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 font-sans">
        <h1 class="text-3xl text-center uppercase mt-5">congratulations !!</h1>
        <p class="text-center uppercase mt-4">Answer : <b>{{ randomWord }}</b></p>
      </div>
      <div class="bg-gray-200 px-4 py-3 text-right">
      <button @click="reset()">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="h-10 w-10 hover:stroke-amber-500 hover:animate-spin" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      </button>
      </div>
    </div>
  </div>
</div>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
