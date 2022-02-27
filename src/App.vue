<script setup>
import { ref, reactive, computed } from 'vue'
import { word } from './word.json'

const evalueteStatus = {
  present: 'present',
  correct: 'correct',
  absent: 'absent'
}
const gameStatus = { progress: 'progress', win: 'win', fail: 'fail' }
const word1 = word.word1
const word2 = word.word2
const randomWord = ref(word1[Math.floor(Math.random() * 2315)])
const inputWord = ref('')
const round = ref(0)
const gameIsEnd = ref(gameStatus.progress)
const howto = ref(false)
const hintstatus = ref('')
let winScore = ref(0)
let loseScore = ref(0)
const showModal = ref(false)

const checkError = ref(false)

const board = reactive([
  {
    bordState: '',
    evalution: []
  },
  {
    bordState: '',
    evalution: []
  },
  {
    bordState: '',
    evalution: []
  },
  {
    bordState: '',
    evalution: []
  },
  {
    bordState: '',
    evalution: []
  },
  {
    bordState: '',
    evalution: []
  }
])

const words = computed(() => {
  const wordList = []
  for (const wb of board) {
    if (wb.bordState !== '') {
      wordList.push(...wb.bordState.split(''))
    }
  }
  return wordList
})
const evalutes = computed(() => {
  const evaluteList = []
  for (const eb of board) {
    if (eb.evalution !== '') {
      evaluteList.push(...eb.evalution)
    }
  }
  return evaluteList
})
console.log(randomWord.value)

const checkInput = () => {
  if (randomWord.value == inputWord.value.toLowerCase()) {
    setWord()
    round.value++
    setTimeout(() => (winScore.value += 1), 1500)
    console.log('you win')
    gameIsEnd.value = gameStatus.win
    showModal.value = true
  } else if (
    word1.includes(inputWord.value.toLowerCase()) ||
    word2.includes(inputWord.value.toLowerCase())
  ) {
    setWord()
    round.value++
    gameIsEnd.value = gameStatus.progress
    console.log(`${round.value} Try Again`)
  } else {
    gameIsEnd.value = gameStatus.error
    console.log(`${round.value} don't have this word`)
  }
  if (round.value == 6 && gameIsEnd.value === gameStatus.progress) {
    gameIsEnd.value = gameStatus.fail
    showModal.value = true
    setTimeout(() => (loseScore.value += 1), 0)
    console.log(loseScore.value)
  }
  inputWord.value = ''
}

const checkAnswer = () => {
  const evaList = []
  const correctList = [0, 0, 0, 0, 0, 0]
  for (let inputIdx = 0; inputIdx < inputWord.value.length; inputIdx++) {
    if (inputWord.value[inputIdx] === randomWord.value[inputIdx]) {
      evaList[inputIdx] = evalueteStatus.correct
      hintstatus.value = evalueteStatus.correct
      correctList[inputIdx] = 1
    }
  }
  for (let inputIdx = 0; inputIdx < inputWord.value.length; inputIdx++) {
    for (let randIdx = 0; randIdx < inputWord.value.length; randIdx++) {
      if (
        inputWord.value[inputIdx] === randomWord.value[randIdx] &&
        correctList[randIdx] == 0
      ) {
        evaList[inputIdx] = evalueteStatus.present
        hintstatus.value = evalueteStatus.present
        break
      }
    }
    if (evaList[inputIdx] === undefined) {
      evaList[inputIdx] = evalueteStatus.absent
    }
  }
  return evaList
}
const setWord = () => {
  board[round.value].bordState = inputWord.value
  board[round.value].evalution = checkAnswer()
}

const reset = () => {
  board.forEach((e) => {
    e.bordState = ''
    e.evalution = []
  })
  round.value = 0
  gameIsEnd.value = gameStatus.progress
  randomWord.value = word1[Math.floor(Math.random() * 2315)]
  showModal.value = false
  console.log(randomWord.value)
  // console.log(board)
}

const iconSunMoon = {
  sun: '/sun.png',
  moon: '/moon.png'
}

const checkTheme = ref(
  localStorage.getItem('theme') == undefined
    ? true
    : localStorage.getItem('theme') == 'cupcake'
)
</script>

<template>
  <img
    src="/question-mark.png"
    class="absolute top-10 left-12 h-9 hover:scale-110"
    @click="howto = !howto"
  />
  <div class="group absolute top-10 right-36">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="absolute h-10 hover:scale-110"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
    <div
      class="invisible group-hover:visible p-7 bg-base-300 w-32 absolute rounded-md duration-100 -inset-y-2 -inset-x-36 z-10 flex justify-center items-center"
    >
      <p>Win : {{ winScore }} Loses : {{loseScore}}</p>
    </div>
  </div>
  <!-- Header -->
  <div class="flex justify-center">
    <div class="animate-pulse font-serif font-bold text-6xl inset-x-0">
      <h1
        class="mt-10 mb-3 tracking-wider text-transparent bg-clip-text"
       :class="{ 'bg-gradient-to-br from-fuchsia-400 to-fuchsia-900' : checkTheme,'bg-gradient-to-br from-amber-300 to-amber-700' : !checkTheme}">
        WORDING
      </h1>
    </div>
    <div class="absolute top-10 right-12">
      <!-- <button type="button" @click="toggleTheme() "> -->
      <button
        data-toggle-theme="halloween,cupcake"
        data-act-class="ACTIVECLASS"
        class="animate-fade-in-down"
        @click="checkTheme = !checkTheme"
      >
        <img
          class="h-10 hover:scale-110"
          :src="checkTheme === true ? iconSunMoon.sun : iconSunMoon.moon"
        />
      </button>
    </div>

    <!-- Input Text Box -->
  </div>
  <div class="flex justify-center">
    <div class="form-control">
      <input
        type="text"
        placeholder="ENTER YOUR WORD !!"
        class="input bg-base-200 text-center font-medium tracking-widest uppercase mt-10"
        :class="{'text-fuchsia-700' : checkTheme,'text-amber-500' : !checkTheme}"
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

  <!-- Error Message -->
  <div
    class="animate-fade-in-down fixed inset-x-0 mt-5"
    v-show="gameIsEnd === gameStatus.error"
  >
    <p class="animate-bounce text-amber-600">Don't have this word!</p>
  </div>

  <!-- Show Input Word -->
  <div class="text-blue-400 flex items-center justify-center mt-12">
    <div class="grid grid-cols-5 gap-4">
      <div
        class="p-5 rounded uppercase"
        :class="{
          'animate-fade-in-down bg-white border-2 border-gray-300':
            evalutes[index] == evalueteStatus.absent,
          'animation-pop-correct bg-green-300':
            evalutes[index] == evalueteStatus.correct,
          'animate-fade-in-down bg-amber-300':
            evalutes[index] == evalueteStatus.present
        }"
        v-for="(boards, index) in words"
      >
        {{ boards }}
      </div>
    </div>
  </div>

  <!-- Modal Win & Lose -->
  <div
    :class="{
      'animate-fade-in-down fixed z-10 overflow-y-auto top-1/3 w-full left-0': true,
      hidden: showModal == false
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
        <div class="bg-base-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 font-sans">
          <div
            v-if="gameIsEnd === gameStatus.win"
            class="text-center uppercase"
          >
            <h1 class="text-3xl mt-5">Congratulations !!</h1>
            <p class="mt-3">Score</p>
            <p class="text-2xl font-bold">{{ winScore }}</p>
          </div>
          <div v-else class="text-center uppercase">
            <h1 class="text-3xl mt-5">You Fail</h1>
            <p class="mt-3">Loses</p>
            <p class="text-2xl font-bold">{{ loseScore }}</p>
          </div>
          <p class="text-center uppercase mt-4">
            Answer : <strong>{{ randomWord }}</strong>
          </p>
        </div>
        <div class="bg-base-100 px-4 py-3 text-right">
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

<<<<<<< HEAD
<<<<<<< HEAD

<!-- Modal How to play -->
  <div
=======
 <div
>>>>>>> 8f34da1d663919341e70c3ac54cf4b3e21b17907
    :class="{
      'animate-fade-in-down overflow-x-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-x-0 h-modal sm:h-full ': true,
=======
 <div
    :class="{
      'animate-fade-in-down overflow-x-auto fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-x-0 h-modal sm:h-full ': true,
>>>>>>> eae63728264d71b5033d3cc336347deb3040e36b
      hidden: howto === false
    }"
  >
    <div class="relative px-3 w-full max-w-md h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-base-300 rounded-lg shadow p-5">
        <div class="flex justify-end">
          <button
            type="button"
            class="text-gray-400 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            @click="howto = !howto"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <h1 class="mb-5 -mt-5 uppercase font-bold" :class="{ 'text-fuchsia-700' : checkTheme,'text-amber-400' : !checkTheme}">How to play</h1>
        <div class="text-justify" :class="{ 'text-fuchsia-700' : checkTheme,'text-amber-400' : !checkTheme}">
          <div class="m-5">
            <p>
              Guess the <span class="font-semibold" :class="{ 'text-fuchsia-700' : checkTheme,'text-amber-400' : !checkTheme}">WORDING</span> in six tries.
            </p>
            <p>
              Each guess must be a valid five-letter word. Hit the enter button
              to submit.
            </p>
            <p>
              After each guess, the color of the tiles will change to show how
              close your guess was to the word.
            </p>
          </div>
          <p class="m-5 font-semibold">Example</p>

          <div class="text-blue-400 flex items-center justify-center mt-5">
            <div class="grid grid-cols-5 gap-4 rounded uppercase">
              <p class="p-5 rounded bg-white border-2 border-gray-300">d</p>
              <p class="p-5 rounded bg-white border-2 border-gray-300">i</p>
              <p class="p-5 rounded bg-white border-2 border-gray-300">z</p>
              <p class="p-5 rounded bg-white border-2 border-gray-300">z</p>
              <p class="y p-5 rounded bg-green-300">
                y
              </p>
            </div>
          </div>

          <div class="break-words px-5 mt-5">
            <p>
              The letter <span class="font-semibold">Y</span> is in the word and
              in the correct spot.
            </p>
          </div>

          <div class="text-blue-400 flex items-center justify-center mt-5">
            <div class="grid grid-cols-5 gap-4 rounded uppercase">
              <p class="p-5 rounded bg-white border-2 border-gray-300">m</p>
              <p class="p-5 rounded bg-white border-2 border-gray-300">a</p>
              <p class="p-5 rounded bg-white border-2 border-gray-300">j</p>
              <p class="o p-5 rounded bg-yellow-300">
                o
              </p>
              <p class="p-5 rounded bg-white border-2 border-gray-300">r</p>
            </div>
          </div>
          <div class="break-words px-5 mt-5">
            <p>
              The letter <span class="font-semibold">O</span> is in the word but
              in the wrong spot.
            </p>
          </div>

          <div class="text-blue-400 flex items-center justify-center mt-5">
            <div class="grid grid-cols-5 gap-4 rounded uppercase">
              <p class="arrow p-5 rounded bg-white border-2 border-gray-300">
                a
              </p>
              <p class="arrow p-5 rounded bg-white border-2 border-gray-300">
                r
              </p>
              <p class="arrow p-5 rounded bg-white border-2 border-gray-300">
                r
              </p>
              <p class="arrow p-5 rounded bg-white border-2 border-gray-300">
                o
              </p>
              <p class="arrow p-5 rounded bg-white border-2 border-gray-300">
                w
              </p>
            </div>
          </div>
          <div class="break-words px-5 mt-5">
            <p><span class="font-semibold">No letter </span>in the word</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  text-align: center;
  /* color: #2c3e50; */
}

.animation-pop-correct {
  animation: 1.2s linear popup;
}

<<<<<<< HEAD
<<<<<<< HEAD
.y,
.o,
.arrow {
<<<<<<< HEAD
  animation: alternate-reverse popup;
  animation-iteration-count: infinite;
}

.y {
  animation-duration: 1.5s;
}

.o {
  animation-duration: 1.5s;
}

.arrow {
  animation-duration: 1.5s;
}

=======
=======
.y,.o,.arrow {
>>>>>>> 8f34da1d663919341e70c3ac54cf4b3e21b17907
=======
.y,.o,.arrow {
>>>>>>> eae63728264d71b5033d3cc336347deb3040e36b
  animation: 1.5s alternate-reverse popup;
  animation-iteration-count: infinite;
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
