<script setup>
import { ref, reactive, computed } from 'vue';
import { word } from './word.json';

const evalueteStatus = {
  present: 'present',
  correct: 'correct',
  absent: 'absent',
};
const gameStatus = {
  progress: 'progress',
  win: 'win',
  fail: 'fail',
  error: 'error',
};
const word1 = word.word1;
const word2 = word.word2;
const randomWord = ref(word1[Math.floor(Math.random() * 2315)]);
const inputWord = ref('');
const round = ref(0);
const gameIsEnd = ref(gameStatus.progress);

const checkError = ref(false);

const board = reactive([
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
const words = computed(() => {
  const wordList = [];
  for (const wb of board) {
    if (wb.bordState !== '') {
      wordList.push(...wb.bordState.split(''));
    }
  }
  return wordList;
});
const evalutes = computed(() => {
  const evaluteList = [];
  for (const eb of board) {
    if (eb.evalution !== '') {
      evaluteList.push(...eb.evalution);
    }
  }
  return evaluteList;
});
console.log(randomWord.value);

const checkInput = () => {
  if (randomWord.value == inputWord.value.toLowerCase()) {
    setWord();
    round.value++;
    console.log('you win');
    gameIsEnd.value = gameStatus.win;
    showModal.value = true;
  } else if (
    word1.includes(inputWord.value.toLowerCase()) ||
    word2.includes(inputWord.value.toLowerCase())
  ) {
    setWord();
    round.value++;
    gameIsEnd.value = gameStatus.progress;
    console.log(`${round.value} Try Again`);
  } else {
    gameIsEnd.value = gameStatus.error;
    console.log(`${round.value} don't have this word`);
  }

  if (round.value == 6 && gameIsEnd.value === gameStatus.progress) {
    gameIsEnd.value = gameStatus.fail;
    showModal.value = true;
  }

  inputWord.value = '';
};

// const checkAnswer = () => {
//   const evaList = [];
//   for (let inputIdx = 0; inputIdx < inputWord.value.length; inputIdx++) {
//     if (inputWord.value[inputIdx] === randomWord.value[inputIdx]) {
//       evaList.push(evalueteStatus.correct);
//     } else {
//       for (const rand of randomWord.value) {
//         if (inputWord.value[inputIdx] === rand) {
//           evaList.push(evalueteStatus.present);
//           break;
//         }
//       }
//     }
//     if (evaList.length === inputIdx) {
//       evaList.push(evalueteStatus.absent);
//     }
//   }
//   return evaList;
// };

const checkAnswer = () => {
  const evaList = [];
  const correctList = [0, 0, 0, 0, 0, 0];

  for (let inputIdx = 0; inputIdx < inputWord.value.length; inputIdx++) {
    if (inputWord.value[inputIdx] === randomWord.value[inputIdx]) {
      evaList[inputIdx] = evalueteStatus.correct;
      hintstatus.value = evalueteStatus.correct;
      correctList[inputIdx] = 1;
    }
  }
  for (let inputIdx = 0; inputIdx < inputWord.value.length; inputIdx++) {
    for (let randIdx = 0; randIdx < inputWord.value.length; randIdx++) {
      if (
        inputWord.value[inputIdx] === randomWord.value[randIdx] &&
        correctList[randIdx] == 0
      ) {
        evaList[inputIdx] = evalueteStatus.present;
        hintstatus.value = evalueteStatus.present;
        break;
      }
    }

    if (evaList[inputIdx] === undefined) {
      evaList[inputIdx] = evalueteStatus.absent;
    }
  }
  return evaList;
};

const setWord = () => {
  board[round.value].bordState = inputWord.value;
  board[round.value].evalution = checkAnswer();
};

const reset = () => {
  board.forEach((e) => {
    e.bordState = '';
    e.evalution = [];
  });
  round.value = 0;
  gameIsEnd.value = gameStatus.progress;
  randomWord.value = word1[Math.floor(Math.random() * 2315)];
  showModal.value = false;
  console.log(randomWord.value);
  // console.log(board)
};

const showModal = ref(false);

const iconSunMoon = {
  sun: '/sun.png',
  moon: '/moon.png',
};

const checkTheme = ref(
  localStorage.getItem('theme') == undefined
    ? true
    : localStorage.getItem('theme') == 'cupcake'
);

let hintstatus = ref('');

// const checkHint = computed(() => {
//   for (const b of board) {
//      if(b.evalution.some(e => e == evalueteStatus.present && evalueteStatus.correct)){
//        hintstatus.value = 'almost'
//      }

//   }
//   return hintstatus.value
// })

let howto = ref(false);

</script>

<template>

<div class="m-5">
 
  <img src="/question-mark.png" class="m-5 h-11 w-auto cursor-pointer" @click="howto = !howto">
  
  <div class="animate-pulse font-serif font-bold text-6xl">
    <h1
      class="mt-10 mb-3 tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-amber-700"
    >
      WORDLE
    </h1>
  </div>
</div>
  <div class="mt-5">
    <!-- <button type="button" @click="toggleTheme() "> -->
    <button
      data-toggle-theme="cupcake,laxury"
      data-act-class="ACTIVECLASS"
      class="animate-fade-in-down"
      @click="checkTheme = !checkTheme"
    >
      <img
        class="h-8"
        :src="checkTheme === true ? iconSunMoon.sun : iconSunMoon.moon"
      />
    </button>
  </div>

  <div class="flex justify-center">
    <div class="form-control">
      <input
        type="text"
        placeholder="ENTER YOUR WORD !!"
        class="input bg-base-200 text-center text-amber-400 font-medium tracking-widest uppercase mt-10"
        maxlength="5"
        v-model="inputWord"
        @keyup.enter="checkInput"
        :disabled="
          gameIsEnd === gameStatus.fail || gameIsEnd === gameStatus.win
        "
      />
      <!-- + gameIsEnd === gameStatus.win -->
    </div>
  </div>

  <div
    class="animate-fade-in-down fixed inset-x-0 mt-5"
    v-show="gameIsEnd === gameStatus.error"
  >
    <p class="animate-bounce text-amber-600">Don't have this word!</p>
  </div>

  <div class="text-blue-400 flex items-center justify-center mt-12">
    <div class="grid grid-cols-5 gap-4">
      <div
        class="p-5 rounded list-none uppercase"
        :class="{
          'bg-white border-2 border-gray-300':
            evalutes[index] == evalueteStatus.absent,
          'animation-pop-correct bg-green-300':
            evalutes[index] == evalueteStatus.correct,
          'bg-amber-300': evalutes[index] == evalueteStatus.present,
        }"
        v-for="(boards, index) in words"
      >
        {{ boards }}
      </div>
    </div>
  </div>

  <div
    :class="{
      'animate-fade-in-down fixed z-10 overflow-y-auto top-0 w-full left-0': true,
      hidden: showModal == false,
    }"
    id="modal"
  >
    <div
      class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div
          class="animate-fade-in-down absolute inset-0 bg-gray-900 opacity-75"
        ></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >
      <div
        class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 font-sans">
          <h1 class="text-3xl text-center uppercase mt-5">
            {{
              gameIsEnd === gameStatus.win ? `Congratulations !!` : `You Fail`
            }}
          </h1>
          <p class="text-center uppercase mt-4">
            Answer : <strong>{{ randomWord }}</strong>
          </p>
        </div>
        <div class="bg-gray-200 px-4 py-3 text-right">
          <button @click="reset()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 hover:stroke-amber-500 hover:animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="m-5 text-white" v-show="hintstatus == 'present'">
    <p>Almost there</p>
  </div>

  <div class="m-5 text-white" v-show="hintstatus == 'correct'">
    <p>Correct</p>
  </div> -->

 <div :class="{'overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full' : true,
            'hidden' : howto === false}">

    <div class="relative px-4 w-full max-w-md h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow" >
            <!-- Modal header -->
            <div class="flex justify-end p-2">
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="howto = !howto">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 pt-0 text-center">
                <h1 class="uppercase">How to</h1>

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

.animation-pop-correct {
  animation: 1.2s linear popup;
}

@keyframes popup {
  0% {
    transform: scale(1, 1) translateY(-10px);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(0);
  }
  50% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
</style>
