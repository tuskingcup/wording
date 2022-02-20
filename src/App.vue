<script setup>
import { ref, reactive, computed } from 'vue';
import { word } from './word.json';

const evalueteStatus = {
  PRESENT: 'present',
  CORRECT: 'correct',
  ABSENT: 'absent',
};

const word1 = word.word1;
const word2 = word.word2;

const randomWord = word1[Math.floor(Math.random() * 2315)];
const inputWord = ref('');
const round = ref(0);
const boards = reactive([
  {
    bordState: '',
    evalution: [],
  },
  {
    bordState: '',
    evalution: [],
  },
  {
    bordState: '',
    evalution: [],
  },
  {
    bordState: '',
    evalution: [],
  },
  {
    bordState: '',
    evalution: [],
  },
  {
    bordState: '',
    evalution: [],
  },
]);

const checkWin = ref(false);
const checkLose = ref(false);

const words = computed(() => {
  const wordList = [];
  for (const wb of boards) {
    if (wb.bordState !== '') {
      wordList.push(...wb.bordState.split(''));
    }
  }
  return wordList;
});

const evalutes = computed(() => {
  const evaluteList = [];
  for (const eb of boards) {
    if (eb.evalution !== '') {
      evaluteList.push(...eb.evalution);
    }
  }
  return evaluteList;
});

console.log(randomWord);

const checkInput = () => {
  if (randomWord == inputWord.value.toLowerCase()) {
    setWord();
    round.value++;
    console.log('you win');
    checkWin.value = true;
  } else if (
    word1.includes(inputWord.value.toLowerCase()) ||
    word2.includes(inputWord.value.toLowerCase())
  ) {
    setWord();
    round.value++;
    console.log(`${round.value} Try Again`);
  } else {
    setWord();
    console.log(`${round.value} don't have this word`);
  }
  if (round.value == 6) {
    checkLose.value = true;
  }
};

const checkAnswer = () => {
  const evaList = [];
  for (let inputIdx = 0; inputIdx < inputWord.value.length; inputIdx++) {
    for (let randIdx = 0; randIdx < randomWord.length; randIdx++) {
      if (inputWord.value[inputIdx] == randomWord[randIdx]) {
        if (inputIdx == randIdx) {
          evaList.push(evalueteStatus.CORRECT);
        } else {
          evaList.push(evalueteStatus.PRESENT);
        }
        break;
      }
    }
    if (evaList.length === inputIdx) {
      evaList.push(evalueteStatus.ABSENT);
    }
  }
  return evaList;
};

const setWord = () => {
  boards[round.value].bordState = inputWord.value;
  boards[round.value].evalution = checkAnswer();
};
</script>

<template>
  <div class="flex justify-center"></div>


  <div class="flex justify-center">
    <div class="form-control">
      <input
        type="text"
        placeholder="ENTER YOUR WORD !!"
        :class="['input bg-base-200 uppercase', checkWin === true ? 'pointer-events-none' : '']"
        maxlength="5"
        v-model="inputWord"
        @keyup.enter="checkInput"
        :readonly="checkWin === true || checkLose === true"
      />
    </div>
  </div>
  <div class="m-5 text-green-600">
    <p v-show="checkWin === true">You WIN!</p>
  </div>

  <div class="m-5 text-red-600">
    <p v-show="checkLose === true">You LOSE!</p>
  </div>
<div v-show = "checkWin == true || checkLose == true" class="uppercase m-5 bg-"> 
  <p>{{randomWord}}</p>
  </div>
  <div
    class="bg-blue-400 text-blue-400 min-h-screen flex items-center justify-center"
  >

   
 
    <div class="grid grid-cols-5 gap-4">
      
      <div
        class="p-5 rounded list-none uppercase"
        :class="{
          'bg-white ': evalutes[index] == evalueteStatus.ABSENT,
          'bg-green-300 text-white': evalutes[index] == evalueteStatus.CORRECT,
          'bg-amber-300 text-white': evalutes[index] == evalueteStatus.PRESENT,
        }"
        v-for="(boards, index) in words"
      >
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
