<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white rounded-lg shadow mb-6 p-4">
      <div class="flex justify-center gap-4">
        <button
          @click="selectLanguage('en')"
          :class="[
            'px-4 py-2 rounded-lg font-medium',
            selectedLanguage === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          English
        </button>
        <button
          @click="selectLanguage('ko')"
          :class="[
            'px-4 py-2 rounded-lg font-medium',
            selectedLanguage === 'ko'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          한글
        </button>
      </div>
    </div>

    <!-- 상단 통계 -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="grid grid-cols-4 gap-4 p-4">
        <div class="text-center">
          <div class="text-sm font-medium text-gray-500">정확도</div>
          <div class="mt-1 text-2xl font-semibold text-gray-900">{{ accuracy }}%</div>
        </div>
        <div class="text-center border-l border-gray-200">
          <div class="text-sm font-medium text-gray-500">
            {{ '분당 타자수' }}
          </div>
          <div class="mt-1 text-2xl font-semibold text-gray-900">{{ cpm }}</div>
        </div>
        <div class="text-center border-l border-gray-200">
          <div class="text-sm font-medium text-gray-500">
            {{ selectedLanguage === 'ko' ? '분당 단어수' : 'WPM' }}
          </div>
          <div class="mt-1 text-2xl font-semibold text-gray-900">{{ wpm }}</div>
        </div>
        <div class="text-center border-l border-gray-200">
          <div class="text-sm font-medium text-gray-500">남은 시간</div>
          <div class="mt-1 text-2xl font-semibold text-gray-900">{{ remainingTime }}초</div>
        </div>
      </div>
    </div>

    <!-- 텍스트 표시 영역 -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="text-lg leading-relaxed whitespace-pre-wrap">
        <span
          v-for="(char, index) in textToType"
          :key="index"
          :class="{
            'text-gray-600': !typedText[index],
            'text-green-500': typedText[index] === char,
            'text-red-500 underline': typedText[index] && typedText[index] !== char,
            'bg-blue-50': currentIndex === index
          }"
        >
          {{ char }}
        </span>
      </div>
    </div>

    <!-- 입력 영역 -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <textarea
        ref="textareaRef"
        v-model="typedText"
        @input="handleInput"
        @keydown.enter.prevent
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        :disabled="timeUp || showResults"
        :placeholder="selectedLanguage === 'en' ? 'Start typing in English...' : '타이핑을 시작하면 자동으로 시작됩니다...'"
        class="w-full h-32 p-4 text-lg border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
      ></textarea>
    </div>
    <div class="flex justify-center gap-4">
      <button
        @click="resetPractice"
        class="px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
      >
        재시작
      </button>
      <button
        @click="$router.push('/s')"
        class="px-6 py-3 text-lg font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
      >
        나가기
      </button>
    </div>

    <!-- 결과 모달 -->
    <div 
      v-if="showResults" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
      @click.self="closeResults"
      @keydown.esc="closeResults"
      tabindex="0"
    >
      <div class="bg-white rounded-lg max-w-md w-full mx-4">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">연습 결과</h2>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">최종 WPM</span>
              <span class="text-xl font-semibold text-gray-900">{{ wpm }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">정확도</span>
              <span class="text-xl font-semibold text-gray-900">{{ accuracy }}%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">완료한 문자</span>
              <span class="text-xl font-semibold text-gray-900">{{ typedText.length }}/{{ textToType.length }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">분당 타자수</span>
              <span class="text-xl font-semibold text-gray-900">{{ cpm }}</span>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-6 py-4 rounded-b-lg">
          <button
            @click="closeResults"
            class="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const textToType = ref('')
const typedText = ref('')
const isActive = ref(false)
const startTime = ref(null)
const currentIndex = ref(0)
const remainingTime = ref(60)
const timer = ref(null)
const showResults = ref(false)
const timeUp = ref(false)
const selectedLanguage = ref('en')

const textareaRef = ref(null)
const isComposing = ref(false)


const accuracy = computed(() => {
  if (!typedText.value.length) return 0
  let correct = 0
  for (let i = 0; i < typedText.value.length; i++) {
    if (typedText.value[i] === textToType.value[i]) correct++
  }
  return Math.round((correct / typedText.value.length) * 100)
})

const getPhonemeCount = (text) => {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    // 한글 유니코드 범위 체크
    if (/[가-힣]/.test(char)) {
      // 초성 있으면 +1
      if (char.charCodeAt(0) > 0xAC00) count++;
      // 중성 있으면 +1
      if ((char.charCodeAt(0) - 0xAC00) % 28 > 0) count++;
      // 종성 있으면 +1
      if ((char.charCodeAt(0) - 0xAC00) % 28 > 0) count++;
    } else {
      // 영문이나 기타 문자는 1개로 계산
      count++;
    }
  }
  return count;
}

const cpm = computed(() => {
  if (!startTime.value || !typedText.value.length) return 0;
  const timeElapsed = (Date.now() - startTime.value) / 1000 / 60;
  const phonemeCount = getPhonemeCount(typedText.value);
  return Math.round(phonemeCount / timeElapsed);
});

const wpm = computed(() => {
  if (!startTime.value || !typedText.value.length) return 0;
  const timeElapsed = (Date.now() - startTime.value) / 1000 / 60;
  const phonemeCount = getPhonemeCount(typedText.value);
  // 평균적으로 한 단어를 8음운으로 계산
  return Math.round((phonemeCount / 8) / timeElapsed);
});

// handleInput 함수도 강화
const handleInput = (event) => {
  if (selectedLanguage.value === 'en') {
    const input = event.target;
    const oldValue = input.value;
    const cursorPos = input.selectionStart;
    
    // 한글 문자 즉시 제거
    const newValue = oldValue.replace(/[가-힣ㄱ-ㅎㅏ-ㅣ]/g, '');
    
    if (oldValue !== newValue) {
      input.value = newValue;
      typedText.value = newValue;
      
      // 커서 위치 복원
      requestAnimationFrame(() => {
        input.setSelectionRange(cursorPos, cursorPos);
      });
    }
  }

  if (!isActive.value && typedText.value.length > 0) {
    startPractice();
  }
  checkTyping();
}

const checkTyping = () => {
  currentIndex.value = typedText.value.length
  if (typedText.value.length === textToType.value.length) {
    endPractice()
  }
}

const startPractice = () => {
  isActive.value = true
  startTime.value = Date.now()
  timer.value = setInterval(() => {
    remainingTime.value--
    if (remainingTime.value <= 0) {
      timeUp.value = true
      endPractice()
    }
  }, 1000)
}

const endPractice = () => {
  isActive.value = false
  clearInterval(timer.value)
  showResults.value = true
  saveResult()
}

const saveResult = async () => {
  try {
    await axios.post('/api/typing/results', {
      studentId: localStorage.getItem('studentId'), // 실제 사용시 로그인된 사용자 ID로 변경
      cpm: cpm.value,
      wpm: wpm.value,
      accuracy: accuracy.value,
      textLength: textToType.value.length,
      completedLength: typedText.value.length
    })
  } catch (error) {
    console.error('결과 저장 실패:', error)
  }
}

const resetPractice = () => {
  clearInterval(timer.value)
  typedText.value = ''
  if (textareaRef.value) {
    textareaRef.value.value = ''
  }
  isActive.value = false
  startTime.value = null
  currentIndex.value = 0
  remainingTime.value = 60
  timeUp.value = false
  showResults.value = false
  isComposing.value = false
  fetchText()
}

const closeResults = () => {
  showResults.value = false
  resetPractice()
}

const selectLanguage = async (lang) => {
  selectedLanguage.value = lang
  
  if (textareaRef.value) {
    textareaRef.value.value = ''
    typedText.value = ''
    
    // 입력 영역 포커스 재설정
    textareaRef.value.blur()
    
    // Windows 입력기 전환을 위한 딜레이
    setTimeout(() => {
      textareaRef.value.focus()
      
      // 한영 전환 시뮬레이션 (Alt + Shift)
      const event = new KeyboardEvent('keydown', {
        key: 'Shift',
        code: 'ShiftLeft',
        altKey: true,
        bubbles: true
      })
      textareaRef.value.dispatchEvent(event)
    }, 100)
  }

  if (isActive.value) {
    resetPractice()
  } else {
    await fetchText()
  }
}

const fetchText = async () => {
  try {
    const response = await axios.get(
      `/api/typing/texts/random?language=${selectedLanguage.value}`
    )
    if (response.data && response.data.content) {
      textToType.value = response.data.content
    } else {
      // API 응답은 성공했지만 content가 없는 경우
      textToType.value = selectedLanguage.value === 'en' 
        ? 'The quick brown fox jumps over the lazy dog. This is a sample text for typing practice.'
        : '타자 연습을 위한 기본 텍스트입니다. 이것은 서버 연결에 실패했을 때 표시됩니다.'
    }
  } catch (error) {
    console.error('텍스트 가져오기 실패:', error)
    // API 호출 실패 시 기본 텍스트 설정
    textToType.value = selectedLanguage.value === 'en' 
      ? 'The quick brown fox jumps over the lazy dog. This is a sample text for typing practice.'
      : '타자 연습을 위한 기본 텍스트입니다. 이것은 서버 연결에 실패했을 때 표시됩니다.'
  }
}

const handleComposition = (event) => {
  if (selectedLanguage.value === 'en') {
    event.preventDefault();
    
    // 입력 중인 IME 입력을 즉시 취소
    const input = event.target;
    const oldValue = input.value;
    
    // 현재 커서 위치 저장
    const cursorPos = input.selectionStart;
    
    // 모든 한글 문자 제거 (자모음 포함)
    const newValue = oldValue.replace(/[가-힣ㄱ-ㅎㅏ-ㅣ]/g, '');
    
    if (oldValue !== newValue) {
      input.value = newValue;
      typedText.value = newValue;
      
      // 커서 위치 복원
      input.setSelectionRange(cursorPos, cursorPos);
      
      // IME 입력 취소를 위한 포커스 재설정
      input.blur();
      requestAnimationFrame(() => {
        input.focus();
      });
    }
  }
}

onMounted(() => {
  fetchText().catch(() => {
    // fetchText 실패 시에도 기본 텍스트 설정
    textToType.value = selectedLanguage.value === 'en' 
      ? 'The quick brown fox jumps over the lazy dog. This is a sample text for typing practice.'
      : '타자 연습을 위한 기본 텍스트입니다. 이것은 서버 연결에 실패했을 때 표시됩니다.'
  })
})
</script> 

<style scoped>
textarea {
  ime-mode: auto;
}

textarea[lang="en"] {
  ime-mode: disabled !important;
}

textarea[lang="ko"] {
  ime-mode: active !important;
}

/* IE/Edge specific */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  textarea[lang="en"] {
    -ms-ime-mode: disabled !important;
  }
  
  textarea[lang="ko"] {
    -ms-ime-mode: active !important;
  }
}
</style>