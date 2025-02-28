<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 flex justify-between items-center">
          <h2 class="text-xl font-bold text-white">시험 관리</h2>
          <button 
            @click="openTestModal(null)" 
            class="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition duration-200">
            새 시험 추가
          </button>
        </div>
        
        <!-- 필터 영역 -->
        <div class="p-4 bg-gray-50 border-b border-gray-200">
          <div class="flex flex-wrap gap-4">
            <div class="w-full md:w-64">
              <label class="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
              <select 
                v-model="selectedCategoryId"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">전체 카테고리</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="w-full md:w-64">
              <label class="block text-sm font-medium text-gray-700 mb-1">기간</label>
              <select 
                v-model="durationFilter"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">모든 기간</option>
                <option value="short">30분 이하</option>
                <option value="medium">30분 ~ 1시간</option>
                <option value="long">1시간 이상</option>
              </select>
            </div>
            <div class="w-full md:w-64">
              <label class="block text-sm font-medium text-gray-700 mb-1">검색</label>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="시험 제목 검색"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
        </div>
        
        <!-- 시험 목록 -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">문제 수</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading">
                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">로딩 중...</td>
              </tr>
              <tr v-else-if="filteredTests.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">시험이 없습니다.</td>
              </tr>
              <template v-for="test in paginatedTests" :key="test.id">
                <tr class="hover:bg-gray-50" :class="{'bg-blue-50': selectedTest && selectedTest.id === test.id}">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ test.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ test.title }}</div>
                    <div class="text-sm text-gray-500">{{ truncateText(test.description, 50) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ test.categoryName }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDuration(test.duration) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ test.questionCount }}개</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button 
                      @click="openTestModal(test)"
                      class="text-indigo-600 hover:text-indigo-900">
                      수정
                    </button>
                    <button 
                      @click="toggleQuestionList(test)"
                      class="text-blue-600 hover:text-blue-900">
                      {{ selectedTest && selectedTest.id === test.id ? '문제 숨기기' : '문제 관리' }}
                    </button>
                    <button 
                      @click="viewResults(test.id)"
                      class="text-green-600 hover:text-green-900">
                      결과 보기
                    </button>
                    <button 
                      @click="deleteTest(test.id)"
                      class="text-red-600 hover:text-red-900">
                      삭제
                    </button>
                  </td>
                </tr>
                <!-- 문제 목록 - 접었다 펼쳤다 할 수 있도록 -->
                <tr v-if="selectedTest && selectedTest.id === test.id">
                  <td colspan="6" class="px-6 py-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="flex justify-between items-center mb-3">
                        <h3 class="text-lg font-medium text-gray-900">{{ test.title }} - 문제 목록</h3>
                        <button 
                          @click="openQuestionModal(null)"
                          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          새 문제 추가
                        </button>
                      </div>
                      
                      <!-- 문제 목록 테이블 -->
                      <div class="overflow-x-auto bg-white rounded-lg border border-gray-200">
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-gray-50">
                            <tr>
                              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">문제 내용</th>
                              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">유형</th>
                              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">배점</th>
                              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-if="loadingQuestions">
                              <td colspan="5" class="px-4 py-3 text-center text-sm text-gray-500">문제 로딩 중...</td>
                            </tr>
                            <tr v-else-if="questions.length === 0">
                              <td colspan="5" class="px-4 py-3 text-center text-sm text-gray-500">등록된 문제가 없습니다.</td>
                            </tr>
                            <tr v-for="question in questions" :key="question.id" class="hover:bg-gray-50">
                              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ question.id }}</td>
                              <td class="px-4 py-3 text-sm text-gray-900 max-w-md truncate">{{ question.content }}</td>
                              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                <span 
                                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                  :class="{
                                    'bg-green-100 text-green-800': question.type === 'MULTIPLE_CHOICE',
                                    'bg-blue-100 text-blue-800': question.type === 'SHORT_ANSWER',
                                    'bg-purple-100 text-purple-800': question.type === 'ESSAY'
                                  }">
                                  {{ formatQuestionType(question.type) }}
                                </span>
                              </td>
                              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ question.points }}점</td>
                              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 space-x-2">
                                <button 
                                  @click="openQuestionModal(question)"
                                  class="text-indigo-600 hover:text-indigo-900">
                                  수정
                                </button>
                                <button 
                                  @click="deleteQuestion(question.id)"
                                  class="text-red-600 hover:text-red-900">
                                  삭제
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        
        <!-- 페이지네이션 -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div class="text-sm text-gray-700">
            총 <span class="font-medium">{{ filteredTests.length }}</span> 시험
          </div>
          <div class="flex-1 flex justify-end">
            <nav class="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                @click="currentPage > 1 ? currentPage-- : null"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                이전
              </button>
              <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                {{ currentPage }} / {{ totalPages }}
              </span>
              <button 
                @click="currentPage < totalPages ? currentPage++ : null"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                다음
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      <!-- 시험 추가/수정 모달 -->
      <div v-if="showTestModal" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showTestModal = false"></div>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {{ currentTest.id ? '시험 수정' : '새 시험 추가' }}
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">제목</label>
                      <input 
                        type="text" 
                        v-model="currentTest.title"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">설명</label>
                      <textarea 
                        v-model="currentTest.description"
                        rows="3"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                      <select 
                        v-model="currentTest.categoryId"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                          {{ category.name }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">시험 시간 (분)</label>
                      <input 
                        type="number" 
                        v-model.number="currentTest.durationMinutes"
                        min="1"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                @click="saveTest"
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                저장
              </button>
              <button 
                @click="showTestModal = false"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 문제 추가/수정 모달 -->
      <div v-if="showQuestionModal" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showQuestionModal = false"></div>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {{ currentQuestion.id ? '문제 수정' : '새 문제 추가' }}
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">문제 내용</label>
                      <textarea 
                        v-model="currentQuestion.content"
                        rows="3"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">유형</label>
                      <select 
                        v-model="currentQuestion.type"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="MULTIPLE_CHOICE">객관식</option>
                        <option value="SHORT_ANSWER">주관식</option>
                        <option value="ESSAY">서술형</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">배점</label>
                      <input 
                        type="number" 
                        v-model.number="currentQuestion.points"
                        min="1" 
                        max="100"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    
                    <!-- 객관식 선택지 -->
                    <div v-if="currentQuestion.type === 'MULTIPLE_CHOICE'">
                      <div class="flex justify-between items-center mb-2">
                        <label class="block text-sm font-medium text-gray-700">선택지</label>
                        <button 
                          @click="addOption"
                          type="button"
                          class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          선택지 추가
                        </button>
                      </div>
                      <div v-for="(option, index) in currentQuestion.options" :key="index" class="flex items-center space-x-2 mb-2">
                        <input 
                          type="radio" 
                          :name="'correct-option'" 
                          :checked="option.isCorrect"
                          @change="setCorrectOption(index)"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <input 
                          type="text" 
                          v-model="option.content"
                          class="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        <button 
                          @click="removeOption(index)"
                          class="text-red-600 hover:text-red-900">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <!-- 주관식 정답 -->
                    <div v-if="currentQuestion.type === 'SHORT_ANSWER'">
                      <label class="block text-sm font-medium text-gray-700 mb-1">정답</label>
                      <input 
                        type="text" 
                        v-model="currentQuestion.correctAnswer"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                @click="saveQuestion"
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                저장
              </button>
              <button 
                @click="showQuestionModal = false"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

// API URL
const API_URL = '/api'
const router = useRouter()

// 상태 변수들 - 시험 관련
const loading = ref(true)
const tests = ref([])
const categories = ref([])
const selectedTest = ref(null)
const selectedCategoryId = ref('')
const durationFilter = ref('')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const showTestModal = ref(false)
const currentTest = ref({
  id: null,
  title: '',
  description: '',
  categoryId: null,
  durationMinutes: 60
})

// 상태 변수들 - 문제 관련
const loadingQuestions = ref(false)
const questions = ref([])
const showQuestionModal = ref(false)
const currentQuestion = ref({
  id: null,
  testId: null,
  content: '',
  type: 'MULTIPLE_CHOICE',
  points: 10,
  options: [],
  correctAnswer: ''
})

// 계산된 속성들 - 시험 필터링
const filteredTests = computed(() => {
  let filtered = tests.value

  // 카테고리 필터링
  if (selectedCategoryId.value) {
    filtered = filtered.filter(test => test.categoryId === Number(selectedCategoryId.value))
  }

  // 시간 필터링
  if (durationFilter.value) {
    switch (durationFilter.value) {
      case 'short':
        filtered = filtered.filter(test => test.duration <= 30 * 60) // 30분 이하
        break
      case 'medium':
        filtered = filtered.filter(test => test.duration > 30 * 60 && test.duration <= 60 * 60) // 30분-1시간
        break
      case 'long':
        filtered = filtered.filter(test => test.duration > 60 * 60) // 1시간 이상
        break
    }
  }

  // 검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(test => 
      test.title.toLowerCase().includes(query) || 
      test.description.toLowerCase().includes(query)
    )
  }

  return filtered
})

const paginatedTests = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTests.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredTests.value.length / itemsPerPage) || 1
})

// 유틸리티 함수들
const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}시간 ${minutes}분`
  } else {
    return `${minutes}분`
  }
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

const formatQuestionType = (type) => {
  switch (type) {
    case 'MULTIPLE_CHOICE': return '객관식'
    case 'SHORT_ANSWER': return '주관식'
    case 'ESSAY': return '서술형'
    default: return type
  }
}

// API 통신 함수들 - 시험 관련
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/tests/categories`)
    categories.value = response.data
  } catch (error) {
    console.error('카테고리 로드 실패:', error)
    alert('카테고리 정보를 불러오는데 실패했습니다.')
  }
}

const fetchTests = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/tests`)
    tests.value = response.data
  } catch (error) {
    console.error('시험 로드 실패:', error)
    alert('시험 정보를 불러오는데 실패했습니다.')
  } finally {
    loading.value = false
  }
}

const saveTest = async () => {
  try {
    if (!currentTest.value.title) {
      alert('시험 제목을 입력해주세요.')
      return
    }
    
    if (!currentTest.value.categoryId) {
      alert('카테고리를 선택해주세요.')
      return
    }
    
    if (!currentTest.value.durationMinutes || currentTest.value.durationMinutes <= 0) {
      alert('유효한 시험 시간을 입력해주세요.')
      return
    }
    
    const testData = {
      id: currentTest.value.id,
      title: currentTest.value.title,
      description: currentTest.value.description,
      duration: currentTest.value.durationMinutes * 60, // 분을 초로 변환
      category: {
        id: currentTest.value.categoryId
      },
      questions: []
    }
    
    let response
    if (currentTest.value.id) {
      // 시험 수정
      response = await axios.put(`${API_URL}/tests/${currentTest.value.id}`, testData)
    } else {
      // 새 시험 추가
      response = await axios.post(`${API_URL}/tests`, testData)
    }
    
    showTestModal.value = false
    await fetchTests() // 시험 목록 새로고침
    
    alert(currentTest.value.id ? '시험이 수정되었습니다.' : '새 시험이 추가되었습니다.')
  } catch (error) {
    console.error('시험 저장 실패:', error)
    alert('시험을 저장하는데 실패했습니다.')
  }
}

const deleteTest = async (testId) => {
  if (!confirm('정말로 이 시험을 삭제하시겠습니까? 관련된 모든 문제와 제출 기록이 삭제됩니다.')) {
    return
  }
  
  try {
    await axios.delete(`${API_URL}/tests/${testId}`)
    await fetchTests() // 시험 목록 새로고침
    if (selectedTest.value && selectedTest.value.id === testId) {
      selectedTest.value = null // 현재 선택된 시험이 삭제된 경우 선택 해제
      questions.value = []
    }
    alert('시험이 삭제되었습니다.')
  } catch (error) {
    console.error('시험 삭제 실패:', error)
    alert('시험을 삭제하는데 실패했습니다.')
  }
}

// API 통신 함수들 - 문제 관련
const fetchQuestions = async (testId) => {
  loadingQuestions.value = true
  try {
    const response = await axios.get(`${API_URL}/tests/${testId}/questions`)
    questions.value = response.data
  } catch (error) {
    console.error('문제 로드 실패:', error)
    alert('문제 정보를 불러오는데 실패했습니다.')
  } finally {
    loadingQuestions.value = false
  }
}

const saveQuestion = async () => {
  try {
    if (!currentQuestion.value.content) {
      alert('문제 내용을 입력해주세요.');
      return;
    }
    
    if (currentQuestion.value.type === 'MULTIPLE_CHOICE') {
      // 내용이 없는 옵션은 제거
      currentQuestion.value.options = currentQuestion.value.options.filter(
        option => option.content.trim() !== ''
      );
      
      if (currentQuestion.value.options.length < 2) {
        alert('객관식 문제는 최소 2개의 선택지가 필요합니다.');
        return;
      }
      
      const hasCorrectOption = currentQuestion.value.options.some(opt => opt.isCorrect);
      if (!hasCorrectOption) {
        alert('정답인 선택지를 하나 이상 지정해주세요.');
        return;
      }
    }
    
    if (currentQuestion.value.type === 'SHORT_ANSWER' && !currentQuestion.value.correctAnswer) {
      alert('주관식 문제의 정답을 입력해주세요.');
      return;
    }
    
    // 문제 데이터 준비
    const questionData = {
      ...currentQuestion.value,
      testId: selectedTest.value.id
    };
    
    let response;
    if (currentQuestion.value.id) {
      // 문제 수정
      response = await axios.put(
        `${API_URL}/tests/${selectedTest.value.id}/questions/${currentQuestion.value.id}`, 
        questionData
      );
    } else {
      // 새 문제 추가
      response = await axios.post(
        `${API_URL}/tests/${selectedTest.value.id}/questions`, 
        questionData
      );
    }
    
    showQuestionModal.value = false;
    await fetchQuestions(selectedTest.value.id); // 문제 목록 새로고침
    await fetchTests(); // 시험 목록도 새로고침 (문제 수가 변경될 수 있으므로)
    
    alert(currentQuestion.value.id ? '문제가 수정되었습니다.' : '새 문제가 추가되었습니다.');
  } catch (error) {
    console.error('문제 저장 실패:', error);
    
    // 외래 키 제약 조건 오류 처리
    if (error.response && error.response.status === 500 && 
        error.response.data && error.response.data.message && 
        error.response.data.message.includes('foreign key constraint')) {
      alert('이 문제는 이미 답변이 제출된 상태입니다. 옵션을 삭제할 수 없습니다.');
    } else {
      alert('문제를 저장하는데 실패했습니다.');
    }
  }
}

const deleteQuestion = async (questionId) => {
  if (!confirm('정말로 이 문제를 삭제하시겠습니까?')) {
    return
  }
  
  try {
    await axios.delete(`${API_URL}/tests/${selectedTest.value.id}/questions/${questionId}`)
    await fetchQuestions(selectedTest.value.id) // 문제 목록 새로고침
    await fetchTests() // 시험 목록도 새로고침 (문제 수가 변경될 수 있으므로)
    alert('문제가 삭제되었습니다.')
  } catch (error) {
    console.error('문제 삭제 실패:', error)
    alert('문제를 삭제하는데 실패했습니다.')
  }
}

// 모달 관련 함수들 - 시험
const openTestModal = (test) => {
  if (test) {
    // 기존 시험 수정
    currentTest.value = {
      id: test.id,
      title: test.title,
      description: test.description,
      categoryId: test.categoryId,
      durationMinutes: Math.floor(test.duration / 60) // 초를 분으로 변환
    }
  } else {
    // 새 시험 추가
    currentTest.value = {
      id: null,
      title: '',
      description: '',
      categoryId: categories.value.length > 0 ? categories.value[0].id : null,
      durationMinutes: 60
    }
  }
  
  showTestModal.value = true
}

const openQuestionModal = (question) => {
  if (!selectedTest.value) {
    alert('먼저 시험을 선택해주세요.');
    return;
  }
  
  if (question) {
    // 기존 문제 수정 - 옵션 ID를 유지하도록 함
    currentQuestion.value = JSON.parse(JSON.stringify(question));
    
    // 이미 답변이 존재하는 문제인 경우 경고
    if (question.hasAnswers) {
      alert('주의: 이 문제는 이미 학생들이 답변한 문제입니다. 수정 시 기존 답변에 영향을 줄 수 있습니다.');
    }
  } else {
    // 새 문제 추가
    currentQuestion.value = {
      id: null,
      testId: selectedTest.value.id,
      content: '',
      type: 'MULTIPLE_CHOICE',
      points: 10,
      options: [
        { id: null, content: '', isCorrect: true },
        { id: null, content: '', isCorrect: false }
      ],
      correctAnswer: ''
    };
  }
  
  showQuestionModal.value = true;
}

// 문제 관련 유틸리티 함수들
const addOption = () => {
  currentQuestion.value.options.push({
    id: null, // 새 옵션 ID는, null로 설정
    content: '',
    isCorrect: false
  });
};

const removeOption = (index) => {
  currentQuestion.value.options.splice(index, 1)
}

const setCorrectOption = (index) => {
  currentQuestion.value.options.forEach((option, i) => {
    option.isCorrect = i === index
  })
}

// 문제 목록 접기/펼치기
const toggleQuestionList = async (test) => {
  if (selectedTest.value && selectedTest.value.id === test.id) {
    // 이미 선택된 시험이라면 선택 해제
    selectedTest.value = null
    questions.value = []
  } else {
    // 새로운 시험 선택
    selectedTest.value = test
    await fetchQuestions(test.id)
  }
}

// 결과 페이지로 이동
const viewResults = (testId) => {
  router.push(`/test-results?testId=${testId}`)
}

// 필터 변경 감지
watch([selectedCategoryId, durationFilter, searchQuery], () => {
  currentPage.value = 1
})

watch(filteredTests, () => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value
  }
})

// 초기 데이터 로드
onMounted(async () => {
  await fetchCategories()
  await fetchTests()
})
</script>

<style scoped>
/* 필요한 스타일이 있다면 여기에 추가 */
</style>