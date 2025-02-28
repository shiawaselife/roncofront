<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600">
          <h2 class="text-xl font-bold text-white">시험 결과 관리</h2>
        </div>
        
        <!-- 필터 영역 -->
        <div class="p-4 bg-gray-50 border-b border-gray-200">
          <div class="flex flex-wrap gap-4">
            <div class="w-full md:w-64">
              <label class="block text-sm font-medium text-gray-700 mb-1">시험</label>
              <select 
                v-model="selectedTestId"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">전체 시험</option>
                <option v-for="test in tests" :key="test.id" :value="test.id">
                  {{ test.title }}
                </option>
              </select>
            </div>
            <div class="w-full md:w-64">
              <label class="block text-sm font-medium text-gray-700 mb-1">학생</label>
              <input 
                type="text" 
                v-model="studentNameFilter"
                placeholder="학생 이름 검색"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="w-full md:w-64">
              <label class="block text-sm font-medium text-gray-700 mb-1">최소 점수</label>
              <input 
                type="number" 
                v-model.number="minScoreFilter"
                min="0"
                max="100"
                placeholder="0"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="w-full md:w-64">
              <label class="block text-sm font-medium text-gray-700 mb-1">날짜 범위</label>
              <div class="flex gap-2">
                <input 
                  type="date" 
                  v-model="startDateFilter"
                  class="w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                <input 
                  type="date" 
                  v-model="endDateFilter"
                  class="w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button 
              @click="exportResults"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              결과 내보내기 (CSV)
            </button>
          </div>
        </div>
        
        <!-- 결과 목록 -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학생</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시험</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">점수</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간(분)</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제출 날짜</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading">
                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">로딩 중...</td>
              </tr>
              <tr v-else-if="filteredResults.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">결과가 없습니다.</td>
              </tr>
              <tr v-for="result in paginatedResults" :key="result.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span class="text-indigo-800 font-medium">{{ getInitials(result.studentName) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ result.studentName }}</div>
                      <div class="text-sm text-gray-500">ID: {{ result.studentId }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ result.testTitle }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold" 
                       :class="{
                         'text-green-600': result.score >= 80,
                         'text-yellow-600': result.score >= 60 && result.score < 80,
                         'text-red-600': result.score < 60
                       }">
                    {{ result.score }} / {{ result.totalScore }}
                  </div>
                  <div class="text-xs text-gray-500">{{ Math.round((result.score / result.totalScore) * 100) }}%</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ Math.floor(result.duration / 60) }}분 {{ result.duration % 60 }}초
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(result.submittedAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button 
                    @click="viewResultDetails(result)"
                    class="text-indigo-600 hover:text-indigo-900">
                    상세 보기
                  </button>
                  <button 
                    @click="deleteResult(result.id)"
                    class="text-red-600 hover:text-red-900">
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 페이지네이션 -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div class="text-sm text-gray-700">
            총 <span class="font-medium">{{ filteredResults.length }}</span> 결과
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
      
      <!-- 결과 상세 모달 -->
      <div v-if="showResultModal" class="fixed inset-0 overflow-y-auto z-50">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showResultModal = false"></div>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="w-full">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      {{ selectedResult?.studentName }}님의 시험 결과
                    </h3>
                    <div class="text-sm text-gray-500">
                      {{ formatDate(selectedResult?.submittedAt) }}
                    </div>
                  </div>
                  
                  <div class="bg-indigo-50 rounded-lg p-4 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div class="text-sm text-gray-500">시험</div>
                        <div class="text-lg font-medium text-gray-900">{{ selectedResult?.testTitle }}</div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500">점수</div>
                        <div class="text-lg font-medium" 
                             :class="{
                               'text-green-600': selectedResult?.score >= 80,
                               'text-yellow-600': selectedResult?.score >= 60 && selectedResult?.score < 80,
                               'text-red-600': selectedResult?.score < 60
                             }">
                          {{ selectedResult?.score }} / {{ selectedResult?.totalScore }}
                          ({{ Math.round((selectedResult?.score / selectedResult?.totalScore) * 100) }}%)
                        </div>
                      </div>
                      <div>
                        <div class="text-sm text-gray-500">소요 시간</div>
                        <div class="text-lg font-medium text-gray-900">
                          {{ Math.floor(selectedResult?.duration / 60) }}분 {{ selectedResult?.duration % 60 }}초
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 문제별 결과 -->
                  <h4 class="font-medium text-gray-900 mb-2">문제별 결과</h4>
                  <div class="space-y-4">
                    <div v-for="(questionResult, index) in selectedResult?.questionResults" :key="index" 
                         class="border rounded-lg overflow-hidden">
                      <div class="px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
                        <div class="font-medium text-gray-900">
                          문제 {{ index + 1 }}
                          <span 
                            class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                            :class="{
                              'bg-green-100 text-green-800': questionResult.type === 'MULTIPLE_CHOICE',
                              'bg-blue-100 text-blue-800': questionResult.type === 'SHORT_ANSWER',
                              'bg-purple-100 text-purple-800': questionResult.type === 'ESSAY'
                            }">
                            {{ formatQuestionType(questionResult.type) }}
                          </span>
                        </div>
                        <div class="text-sm">
                          <span class="font-medium" :class="{'text-green-600': questionResult.correct, 'text-red-600': !questionResult.correct}">
                            {{ questionResult.earnedPoints }} / {{ questionResult.totalPoints }} 점
                          </span>
                        </div>
                      </div>
                      <div class="p-4">
                        <div class="text-gray-900 mb-4">{{ questionResult.content }}</div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div class="text-sm font-medium text-gray-500 mb-1">제출한 답안</div>
                            <div class="p-3 bg-gray-50 rounded border border-gray-200 text-gray-800">
                              {{ questionResult.userAnswer || '(제출 없음)' }}
                            </div>
                          </div>
                          <div v-if="questionResult.correctAnswer">
                            <div class="text-sm font-medium text-gray-500 mb-1">정답</div>
                            <div class="p-3 bg-green-50 rounded border border-green-200 text-gray-800">
                              {{ questionResult.correctAnswer }}
                            </div>
                          </div>
                        </div>
                        
                        <!-- 서술형 점수 수정 -->
                        <div v-if="questionResult.type === 'ESSAY'" class="mt-4">
                          <div class="text-sm font-medium text-gray-700 mb-1">점수 평가 (배점: {{ questionResult.totalPoints }}점)</div>
                          <div class="flex items-center gap-2">
                            <input 
                              type="number" 
                              v-model.number="questionResult.earnedPoints"
                              :min="0" 
                              :max="questionResult.totalPoints"
                              class="w-20 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            <button 
                              @click="updateEssayScore(selectedResult?.id, questionResult.questionId, questionResult.earnedPoints)"
                              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              저장
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                @click="showResultModal = false"
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                닫기
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
import axios from 'axios'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

// API URL
const API_URL = '/api'

// 상태 변수들
const loading = ref(true)
const tests = ref([])
const students = ref([])
const testResults = ref([])
const selectedTestId = ref('')
const studentNameFilter = ref('')
const minScoreFilter = ref(null)
const startDateFilter = ref('')
const endDateFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const showResultModal = ref(false)
const selectedResult = ref(null)

// 계산된 속성들
const filteredResults = computed(() => {
  let results = testResults.value
  
  if (selectedTestId.value) {
    results = results.filter(r => r.testId === Number(selectedTestId.value))
  }
  
  if (studentNameFilter.value) {
    const searchTerm = studentNameFilter.value.toLowerCase()
    results = results.filter(r => 
      r.studentName.toLowerCase().includes(searchTerm)
    )
  }
  
  if (minScoreFilter.value !== null && minScoreFilter.value !== '') {
    const minScore = Number(minScoreFilter.value)
    results = results.filter(r => 
      (r.score / r.totalScore) * 100 >= minScore
    )
  }
  
  if (startDateFilter.value) {
    const startDate = new Date(startDateFilter.value)
    startDate.setHours(0, 0, 0, 0)
    results = results.filter(r => new Date(r.submittedAt) >= startDate)
  }
  
  if (endDateFilter.value) {
    const endDate = new Date(endDateFilter.value)
    endDate.setHours(23, 59, 59, 999)
    results = results.filter(r => new Date(r.submittedAt) <= endDate)
  }
  
  return results
})

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredResults.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredResults.value.length / itemsPerPage) || 1
})

// 유틸리티 함수들
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('ko-KR', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatQuestionType = (type) => {
  switch (type) {
    case 'MULTIPLE_CHOICE': return '객관식'
    case 'SHORT_ANSWER': return '주관식'
    case 'ESSAY': return '서술형'
    default: return type
  }
}

const getInitials = (name) => {
  if (!name) return ''
  return name.charAt(0)
}

// API 통신 함수들
const fetchTests = async () => {
  try {
    const response = await axios.get(`${API_URL}/tests`)
    tests.value = response.data
  } catch (error) {
    console.error('시험 로드 실패:', error)
    alert('시험 정보를 불러오는데 실패했습니다.')
  }
}

const fetchStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`)
    students.value = response.data
  } catch (error) {
    console.error('학생 정보 로드 실패:', error)
    // 오류 처리 - UI에 표시하거나 기본값 사용
  }
}

const fetchTestResults = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/test-results`)
    
    // 학생 이름 및 시험 제목 추가
    testResults.value = response.data.map(result => {
      const student = students.value.find(s => s.id === result.studentId)
      const test = tests.value.find(t => t.id === result.testId)
      
      return {
        ...result,
        studentName: student ? student.name : `학생 ID: ${result.studentId}`,
        testTitle: test ? test.title : `시험 ID: ${result.testId}`
      }
    })
  } catch (error) {
    console.error('시험 결과 로드 실패:', error)
    alert('시험 결과를 불러오는데 실패했습니다.')
  } finally {
    loading.value = false
  }
}

const fetchResultDetails = async (resultId) => {
  try {
    const response = await axios.get(`${API_URL}/test-results/${resultId}`)
    return response.data
  } catch (error) {
    console.error('결과 상세 정보 로드 실패:', error)
    alert('상세 정보를 불러오는데 실패했습니다.')
    return null
  }
}

const deleteResult = async (resultId) => {
  if (!confirm('정말로 이 시험 결과를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
    return
  }
  
  try {
    await axios.delete(`${API_URL}/test-results/${resultId}`)
    await fetchTestResults() // 결과 목록 새로고침
    alert('시험 결과가 삭제되었습니다.')
  } catch (error) {
    console.error('결과 삭제 실패:', error)
    alert('시험 결과를 삭제하는데 실패했습니다.')
  }
}

const updateEssayScore = async (resultId, questionId, score) => {
  try {
    await axios.put(`${API_URL}/test-results/${resultId}/questions/${questionId}/score`, { score })
    alert('점수가 업데이트되었습니다.')
    
    // 결과 상세 정보 및 목록 새로고침
    const updatedResult = await fetchResultDetails(resultId)
    if (updatedResult) {
      selectedResult.value = updatedResult
    }
    await fetchTestResults()
  } catch (error) {
    console.error('점수 업데이트 실패:', error)
    alert('점수를 업데이트하는데 실패했습니다.')
  }
}

// 결과 내보내기 (CSV)
const exportResults = () => {
  // 필터링된 결과를 CSV 형식으로 변환
  const rows = [
    ['학생 ID', '학생 이름', '시험 ID', '시험 제목', '점수', '총점', '백분율', '소요 시간(초)', '제출 일시']
  ]
  
  filteredResults.value.forEach(result => {
    rows.push([
      result.studentId,
      result.studentName,
      result.testId,
      result.testTitle,
      result.score,
      result.totalScore,
      Math.round((result.score / result.totalScore) * 100),
      result.duration,
      result.submittedAt
    ])
  })
  
  // CSV 형식으로 변환
  const csvContent = rows.map(row => row.map(cell => 
    typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell
  ).join(',')).join('\n')
  
  // 파일 다운로드
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `test-results-${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 모달 관련 함수들
const viewResultDetails = async (result) => {
  try {
    const detailedResult = await fetchResultDetails(result.id)
    if (detailedResult) {
      selectedResult.value = {
        ...detailedResult,
        studentName: result.studentName,
        testTitle: result.testTitle
      }
      showResultModal.value = true
    }
  } catch (error) {
    console.error('결과 상세 정보 로드 실패:', error)
  }
}

// 필터 변경 감지
watch([selectedTestId, studentNameFilter, minScoreFilter, startDateFilter, endDateFilter], () => {
  currentPage.value = 1
})

watch(filteredResults, () => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value
  }
})

// 초기 데이터 로드
onMounted(async () => {
  await fetchTests()
  await fetchStudents()
  await fetchTestResults()
})
</script>

<style scoped>
/* 필요한 스타일이 있다면 여기에 추가 */
</style>