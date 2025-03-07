<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
    <!-- 헤더 영역 -->
    <header class="bg-white border-b border-indigo-100 shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- 로고 & 사용자 정보 -->
        <div class="flex items-center space-x-4">
          <div class="text-indigo-600 font-bold text-2xl">시험</div>
          <div class="hidden md:block h-6 w-px bg-gray-300"></div>
          <div class="hidden md:block text-gray-700">
            <span class="font-medium">{{ studentName }}</span>님 환영합니다
          </div>
        </div>
        
        <!-- 타이머 (테스트 중일 때만) -->
        <div v-if="isTestRunning" 
            class="flex items-center px-4 py-2 rounded-lg"
            :class="[remainingTime < 300 ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600']">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-semibold">{{ formatTime(remainingTime) }}</span>
        </div>
        
        <!-- 버튼 영역 -->
        <div class="flex items-center gap-3">
          <button
            v-if="!isTestRunning && !isTestCompleted"
            @click="loadUserTest"
            class="flex items-center text-sm bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-md border border-gray-300 transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            이전 답안
          </button>
          <button
            v-if="!isTestRunning && !isTestCompleted"
            @click="startTest"
            class="flex items-center text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            테스트 시작
          </button>
          <button
            v-if="isTestRunning"
            @click="submitTest"
            class="flex items-center text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            제출하기
          </button>
        </div>
      </div>
    </header>

    <!-- 메인 콘텐츠 영역 -->
    <main class="container mx-auto px-4 py-8">
      <!-- 테스트 선택 영역 (테스트 실행 전) -->
      <div v-if="!isTestRunning && !isTestCompleted" class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600">
            <h2 class="text-xl font-bold text-white">시험 선택</h2>
          </div>
          
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">시험 카테고리</label>
                <select
                  v-model="selectedCategoryId"
                  class="w-full bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200">
                  <option value="">카테고리 선택</option>
                  <option v-for="category in testCategories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">시험</label>
                <select
                  v-model="selectedTestId"
                  @change="handleTestSelection(selectedTestId)"
                  class="w-full bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200">
                  <option value="">시험 선택</option>
                  <option 
                    v-for="test in testsInSelectedCategory" 
                    :key="test.id" 
                    :value="test.id">
                    {{ test.title }} ({{ formatDuration(test.duration) }})
                    {{ test.isCompleted ? '- 이미 제출됨' : '' }}
                  </option>
                </select>
              </div>
            </div>
            
            <div v-if="selectedTest" class="mt-8">
              <div class="bg-indigo-50 rounded-lg overflow-hidden border border-indigo-100">
                <div class="border-b border-indigo-100 bg-indigo-100/60 px-6 py-4 flex justify-between items-center">
                  <h3 class="font-semibold text-indigo-800 text-lg">{{ selectedTest.title }}</h3>
                  <div v-if="selectedTest.isCompleted" class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    이미 제출됨
                  </div>
                </div>
                
                <div class="p-6">
                  <p class="text-gray-700 mb-4">{{ selectedTest.description }}</p>
                  
                  <div class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                    <div class="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="font-medium">시간제한:</span> {{ formatDuration(selectedTest.duration) }}
                    </div>
                    
                    <div class="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="font-medium">문항:</span> {{ selectedTest.questionCount }}개
                    </div>
                    
                    <div class="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span class="font-medium">총점:</span> 100점
                    </div>
                  </div>
                </div>
                
                <div class="px-6 py-4 bg-indigo-50 border-t border-indigo-100 flex justify-center">
                  <div v-if="selectedTest.isCompleted" class="flex space-x-4">
                    <button
                      @click="loadUserTest"
                      class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-sm transition duration-200 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      결과 보기
                    </button>
                  </div>
                  <button
                    v-else
                    @click="startTest"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md shadow-sm transition duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    테스트 시작
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 테스트 영역 (테스트 실행 중) -->
      <div v-if="isTestRunning" class="max-w-4xl mx-auto">
        <!-- 테스트 정보 헤더 -->
        <div class="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600">
            <h2 class="text-xl font-bold text-white">{{ selectedTest.title }}</h2>
          </div>
          
          <!-- 빠른 네비게이션 -->
          <div class="p-4 bg-gray-50 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-600">총 {{ testQuestions.length }}문제</div>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="(question, index) in testQuestions" 
                  :key="question.id"
                  @click="scrollToQuestion(question.id)"
                  class="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition duration-200"
                  :class="[
                    userAnswers[question.id] ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  ]"
                >
                  {{ index + 1 }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 문제 목록 -->
        <div class="space-y-6">
          <div 
            v-for="(question, index) in testQuestions" 
            :key="question.id"
            :id="`question-${question.id}`"
            class="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div class="px-6 py-4 bg-indigo-50 border-b border-indigo-100 flex items-center justify-between">
              <div class="flex items-center">
                <div class="bg-indigo-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  {{ index + 1 }}
                </div>
                <h3 class="font-semibold text-indigo-900">
                  {{ question.content }}
                </h3>
              </div>
              <div class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ question.points }}점
              </div>
            </div>
            
            <div class="p-6">
              <!-- 객관식 -->
              <div v-if="question.type === 'MULTIPLE_CHOICE'" class="space-y-3">
                <div 
                  v-for="option in question.options" 
                  :key="option.id"
                  class="flex items-center p-3 rounded-lg cursor-pointer transition duration-200"
                  :class="[
                    userAnswers[question.id] === option.id 
                      ? 'bg-indigo-50 border border-indigo-200' 
                      : 'hover:bg-gray-50 border border-transparent'
                  ]"
                  @click="selectAnswer(question.id, option.id)"
                >
                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition duration-200"
                       :class="[
                         userAnswers[question.id] === option.id 
                           ? 'border-indigo-500 bg-indigo-500' 
                           : 'border-gray-300'
                       ]">
                    <div v-if="userAnswers[question.id] === option.id" class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span class="text-gray-700">{{ option.content }}</span>
                </div>
              </div>
              
              <!-- 주관식 -->
              <div v-if="question.type === 'SHORT_ANSWER'" class="mt-4">
                <input
                  type="text"
                  v-model="userAnswers[question.id]"
                  placeholder="답을 입력하세요"
                  class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                />
              </div>
              
              <!-- 서술형 -->
              <div v-if="question.type === 'ESSAY'" class="mt-4">
                <textarea
                  v-model="userAnswers[question.id]"
                  placeholder="답변을 작성하세요"
                  rows="5"
                  class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 제출 버튼 -->
        <div class="sticky bottom-6 flex justify-center mt-8">
          <button
            @click="submitTest"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg transition duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            테스트 제출하기
          </button>
        </div>
      </div>
      
      <!-- 테스트 결과 영역 (테스트 완료 후) -->
      <div v-if="isTestCompleted" class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600">
            <h2 class="text-xl font-bold text-white">시험 결과</h2>
          </div>
          
          <div class="p-6">
            <div class="text-center py-6">
              <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50 mb-4">
                <div class="text-3xl font-bold text-indigo-600">
                  {{ testResult?.score || 0 }}
                </div>
              </div>
              
              <h3 class="text-2xl font-bold text-gray-800 mb-2">시험 완료</h3>
              <p class="text-gray-600 mb-8">제출한 답안이 저장되었습니다.</p>
              
              <div v-if="testResult" class="max-w-lg mx-auto">
                <div class="bg-indigo-50 rounded-lg p-6 text-center mb-8">
                  <div class="flex justify-between items-center mb-3">
                    <div class="text-gray-600">총점</div>
                    <div class="font-semibold text-gray-900">{{ testResult.totalScore }}점</div>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      class="bg-indigo-600 h-2.5 rounded-full" 
                      :style="`width: ${(testResult.score / testResult.totalScore) * 100}%`">
                    </div>
                  </div>
                  <div class="mt-2 text-right">
                    <span class="text-indigo-600 font-semibold">{{ testResult.score }}</span> / {{ testResult.totalScore }}
                  </div>
                </div>
                
                <!-- 세부 결과 -->
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                  <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
                    <h4 class="font-semibold text-gray-800">문제별 결과</h4>
                  </div>
                  
                  <div class="divide-y divide-gray-200">
                    <div v-for="(result, index) in testResult.questionResults" :key="index" 
                         class="px-6 py-4 hover:bg-gray-50 transition duration-150">
                      <div class="flex justify-between">
                        <div class="font-medium text-gray-700">문제 {{ index + 1 }}</div>
                        <div :class="{'text-green-600': result.correct, 'text-red-600': !result.correct}">
                          {{ result.correct ? '정답' : '오답' }}
                        </div>
                      </div>
                      <div class="mt-1 text-gray-500 text-sm">
                        <div class="mb-1">제출 답안: <span class="text-gray-700">{{ result.userAnswer || '(제출 없음)' }}</span></div>
                        <div v-if="!result.correct">정답: <span class="text-gray-700">{{ result.correctAnswer }}</span></div>
                      </div>
                      <div class="mt-2 text-sm">
                        <div class="flex justify-between items-center">
                          <div class="text-gray-500">배점: {{ result.totalPoints }}점</div>
                          <div>
                            <span>획득: </span>
                            <span :class="{'text-green-600': result.correct, 'text-red-600': !result.correct}">
                              {{ result.earnedPoints }}점
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                @click="resetTest"
                class="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-sm transition duration-200 inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                다른 시험 선택하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import axios from 'axios'

// API 기본 URL 설정
const API_URL = '/api'

// 상태 변수들
const studentId = ref(localStorage.getItem('studentId') || null)
const studentName = ref(localStorage.getItem('studentName') || '게스트')
const tests = ref([])
const testCategories = ref([])
const selectedCategoryId = ref('')
const selectedTestId = ref('')
const testQuestions = ref([])
const userAnswers = ref({})
const isTestRunning = ref(false)
const isTestCompleted = ref(false)
const testResult = ref(null)
const remainingTime = ref(0)
const startTime = ref(0)
const completedTests = ref([]) // 이미 제출한 시험 ID 목록
let timerInterval = null

const testsInSelectedCategory = computed(() => {
  if (!selectedCategoryId.value) return []
  
  // 카테고리별 시험 목록
  const filteredTests = tests.value.filter(test => test.categoryId === Number(selectedCategoryId.value))
  
  // 각 시험에 완료 여부 표시 추가
  return filteredTests.map(test => ({
    ...test,
    isCompleted: completedTests.value.includes(test.id)
  }))
})

const selectedTest = computed(() => {
  if (!selectedTestId.value) return null
  return tests.value.find(test => test.id === Number(selectedTestId.value)) || null
})

// 시간 형식 변환 유틸 함수들
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}시간 ${minutes}분`
  } else {
    return `${minutes}분`
  }
}

// 문제 스크롤 함수
const scrollToQuestion = (questionId) => {
  const element = document.getElementById(`question-${questionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 직접 API 호출 함수들 구현
// 모든 테스트 카테고리 조회
const fetchTestCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/tests/categories`)
    return response.data
  } catch (error) {
    console.error('Error fetching test categories:', error)
    throw error
  }
}

// 모든 테스트 조회
const fetchTests = async () => {
  try {
    const response = await axios.get(`${API_URL}/tests`)
    return response.data
  } catch (error) {
    console.error('Error fetching tests:', error)
    throw error
  }
}

// 카테고리별 테스트 조회
const fetchTestsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/tests/category/${categoryId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching tests by category ${categoryId}:`, error)
    throw error
  }
}

// 테스트의 문제 목록 조회
const fetchTestQuestions = async (testId) => {
  try {
    const response = await axios.get(`${API_URL}/tests/${testId}/questions`)
    return response.data
  } catch (error) {
    console.error(`Error fetching questions for test ${testId}:`, error)
    throw error
  }
}

// 테스트 답안 제출
const submitTestAnswers = async (studentId, testId, answers, duration) => {
  try {
    const payload = {
      testId: testId,
      answers: answers,
      duration: duration
    }
    
    const response = await axios.post(`${API_URL}/tests/student/${studentId}/submit`, payload)
    return response.data
  } catch (error) {
    console.error('Error submitting test answers:', error)
    throw error
  }
}

// 테스트 결과 조회
const fetchUserTestResult = async (studentId, testId) => {
  try {
    const response = await axios.get(`${API_URL}/tests/student/${studentId}/result/${testId}`)
    return response.data
  } catch (error) {
    // 결과가 없는 경우 404 에러가 발생할 수 있음
    if (error.response && error.response.status === 404) {
      return null
    }
    console.error(`Error fetching test result for student ${studentId}, test ${testId}:`, error)
    throw error
  }
}

// 메소드들 - 백엔드 연동
const loadTests = async () => {
  try {
    // 카테고리 목록 불러오기
    const fetchedCategories = await fetchTestCategories()
    testCategories.value = fetchedCategories
    
    // 테스트 목록 불러오기
    const fetchedTests = await fetchTests()
    tests.value = fetchedTests
  } catch (error) {
    console.error('테스트 목록 로드 실패:', error)
    alert('시험 목록을 불러오는데 실패했습니다. 다시 시도해주세요.')
  }
}

// 카테고리별 테스트 로드
const loadTestsByCategory = async (categoryId) => {
  if (!categoryId) return
  
  try {
    const fetchedTests = await fetchTestsByCategory(categoryId)
    tests.value = fetchedTests
  } catch (error) {
    console.error(`카테고리별 테스트 로드 실패 (카테고리 ID: ${categoryId}):`, error)
  }
}

// 테스트 선택 시 호출
const handleCategoryChange = async () => {
  selectedTestId.value = ''
  if (selectedCategoryId.value) {
    await loadTestsByCategory(selectedCategoryId.value)
  }
}

// 이전 결과 불러오기
const loadUserTest = async () => {
  if (!studentId.value) {
    alert('로그인이 필요합니다.')
    return
  }

  if (!selectedTestId.value) {
    alert('테스트를 선택해주세요.')
    return
  }
  
  try {
    const result = await fetchUserTestResult(studentId.value, selectedTestId.value)
    if (result) {
      testResult.value = result
      isTestCompleted.value = true
    } else {
      alert('이전에 제출한 테스트 결과가 없습니다.')
    }
  } catch (error) {
    console.error('테스트 결과 로드 실패:', error)
    alert('테스트 결과 로드에 실패했습니다.')
  }
}

const startTest = async () => {
  if (!studentId.value) {
    alert('로그인이 필요합니다.')
    return
  }
  
  if (!selectedTestId.value) {
    alert('테스트를 선택해주세요.')
    return
  }
  
  // 이미 제출한 시험인지 확인
  try {
    const result = await fetchUserTestResult(studentId.value, selectedTestId.value)
    if (result) {
      alert('이미 제출한 시험입니다. 결과를 확인합니다.')
      testResult.value = result
      isTestCompleted.value = true
      return
    }
  } catch (error) {
    // 결과가 없는 경우 시험 시작 진행
    console.log('시험 결과 없음, 시험 시작 진행')
  }
  
  try {
    const questions = await fetchTestQuestions(selectedTestId.value)
    testQuestions.value = questions
    userAnswers.value = {}
    isTestRunning.value = true
    isTestCompleted.value = false
    testResult.value = null
    
    // 타이머 설정
    remainingTime.value = selectedTest.value.duration
    startTime.value = Date.now()
    startTimer()
    
    // 진행 중인 테스트 정보 로컬 스토리지에 저장 (새로고침 대비)
    saveTestProgress()
  } catch (error) {
    console.error('테스트 문제 로드 실패:', error)
    alert('테스트 문제 로드에 실패했습니다.')
  }
}

const startTimer = () => {
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime.value) / 1000)
    remainingTime.value = Math.max(0, selectedTest.value.duration - elapsedSeconds)
    
    // 5분 남았을 때 알림
    if (remainingTime.value === 300) {
      alert('시험 종료까지 5분 남았습니다!')
    }
    
    if (remainingTime.value <= 0) {
      alert('시험 시간이 종료되었습니다. 자동으로 제출됩니다.')
      submitTest()
    }
    
    // 진행 상황 주기적으로 저장
    if (elapsedSeconds % 30 === 0) { // 30초마다 저장
      saveTestProgress()
    }
  }, 1000)
}

// 테스트 진행 상황 로컬 스토리지에 저장
const saveTestProgress = () => {
  try {
    const progress = {
      testId: selectedTestId.value,
      startTime: startTime.value,
      duration: selectedTest.value.duration,
      answers: userAnswers.value
    }
    localStorage.setItem('testProgress', JSON.stringify(progress))
  } catch (error) {
    console.error('진행 상황 저장 실패:', error)
  }
}

// 저장된 테스트 진행 상황 불러오기
const loadTestProgress = async () => {
  try {
    const progressStr = localStorage.getItem('testProgress')
    if (!progressStr) return false
    
    const progress = JSON.parse(progressStr)
    if (!progress.testId) return false
    
    // 테스트 기본 정보 로드
    selectedTestId.value = progress.testId
    
    // 테스트와 문제 정보 로드
    const questions = await fetchTestQuestions(progress.testId)
    testQuestions.value = questions
    
    // 시간 정보 설정
    const elapsedSeconds = Math.floor((Date.now() - progress.startTime) / 1000)
    const remainingDuration = Math.max(0, progress.duration - elapsedSeconds)
    
    // 시간이 남아있다면 테스트 재개
    if (remainingDuration > 0) {
      startTime.value = progress.startTime
      remainingTime.value = remainingDuration
      userAnswers.value = progress.answers || {}
      isTestRunning.value = true
      startTimer()
      return true
    } else {
      // 시간이 종료되었다면 자동 제출 처리
      localStorage.removeItem('testProgress')
      return false
    }
  } catch (error) {
    console.error('진행 상황 로드 실패:', error)
    return false
  }
}

const selectAnswer = (questionId, optionId) => {
  userAnswers.value[questionId] = optionId
  saveTestProgress() // 답변 변경시 저장
}

const submitTest = async () => {
  clearInterval(timerInterval)
  
  try {
    // 걸린 시간 계산 (초 단위)
    const duration = Math.floor((Date.now() - startTime.value) / 1000)
    
    // 서버에 답안 제출
    const result = await submitTestAnswers(
      studentId.value,
      selectedTestId.value,
      userAnswers.value,
      duration
    )
    
    isTestRunning.value = false
    isTestCompleted.value = true
    testResult.value = result
    
    // 테스트 진행 정보 삭제
    localStorage.removeItem('testProgress')
  } catch (error) {
    console.error('테스트 제출 실패:', error)
    alert('테스트 제출에 실패했습니다. 다시 시도해주세요.')
    // 타이머 다시 시작
    startTimer()
  }


  await loadTests()
  await loadCompletedTests() // 완료된 시험 목록 로드
}

const resetTest = () => {
  selectedTestId.value = ''
  isTestCompleted.value = false
  testResult.value = null
}


const handleTestSelection = async (testId) => {
  selectedTestId.value = testId
  
  if (completedTests.value.includes(testId)) {
    try {
      const result = await fetchUserTestResult(studentId.value, testId)
      if (result) {
        alert('이미 제출한 시험입니다. 결과를 확인합니다.')
        testResult.value = result
        isTestCompleted.value = true
      }
    } catch (error) {
      console.error('시험 결과 조회 실패:', error)
    }
  }
}

const loadCompletedTests = async () => {
  if (!studentId.value) return
  
  try {
    // 서버에서 완료된 모든 시험 목록 가져오기 (이 부분은 API가 필요)
    const response = await axios.get(`${API_URL}/tests/student/${studentId.value}/submissions`)
    completedTests.value = response.data.map(result => result.testId)
  } catch (error) {
    console.error('완료된 시험 목록 로드 실패:', error)
    completedTests.value = []
  }
}

// 라이프사이클 훅
onMounted(async () => {
  await loadTests()
  await loadCompletedTests() // 완료된 시험 목록 로드
  
  // 저장된 테스트 진행 상황이 있는지 확인
  const hasOngoingTest = await loadTestProgress()
  if (hasOngoingTest) {
    alert('진행 중이던 테스트를 불러왔습니다.')
  }
  
  // 카테고리 변경 감지
  watch(selectedCategoryId, handleCategoryChange)
})

onBeforeUnmount(() => {
  clearInterval(timerInterval)
})

// 브라우저 종료/새로고침 감지
window.addEventListener('beforeunload', (event) => {
  if (isTestRunning.value) {
    event.preventDefault()
    event.returnValue = '테스트가 진행 중입니다. 페이지를 나가시겠습니까?'
    saveTestProgress()
  }
})
</script>

<style scoped>
/* 필요한 스타일이 있다면 여기에 추가 */
</style>