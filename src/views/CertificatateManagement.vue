<template>
  <LayoutAuthenticated>
    <SectionMain> 
      <div>
        <div class="flex items-center mb-6 justify-between">
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-2 text-orange-500" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiCertificateOutline" />
            </svg>
            <h1 class="text-2xl font-bold">자격증 관리</h1>
          </div>
          
          <!-- 시험 추가 버튼 -->
          <button
            @click="openExamModal"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiPlus" />
            </svg>
            시험 추가
          </button>
        </div>

        <!-- 시험 추가 모달 -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">시험 추가</h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">시험 종류</label>
                <select 
                  v-model="newExam.type"
                  class="w-full border rounded-lg p-2"
                >
                  <option v-for="type in examTypes" :key="type" :value="type">
                    {{ getExamTypeDisplay(type) }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">시험 일자</label>
                <input 
                  type="date"
                  v-model="newExam.examDate"
                  class="w-full border rounded-lg p-2"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">시험 시간</label>
                <input 
                  type="time"
                  v-model="newExam.examTime"
                  class="w-full border rounded-lg p-2"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">최대 인원</label>
                <input 
                  type="number"
                  v-model="newExam.maxParticipants"
                  class="w-full border rounded-lg p-2"
                />
              </div>
            </div>
            
            <div class="flex justify-end space-x-2 mt-6">
              <button 
                @click="closeModal"
                class="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                취소
              </button>
              <button 
                @click="createExam"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                추가
              </button>
            </div>
          </div>
        </div>

        <!-- 시험 결과 관리 모달 -->
        <div v-if="showResultModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 class="text-xl font-bold mb-4">시험 결과 관리</h2>

            <!-- 시험 및 학생 선택 -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">시험 선택</label>
                <select 
                  v-model="selectedExamId"
                  class="w-full border rounded-lg p-2"
                >
                  <option v-for="exam in allExams" :key="exam.id" :value="exam.id">
                    {{ EXAM_TYPE_DISPLAY[exam.type] }} ({{ formatDateTime(exam.examDateTime) }})
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">학생 선택</label>
                <div class="relative">
                  <input 
                    type="text"
                    v-model="studentSearch"
                    placeholder="학생 이름 검색..."
                    class="w-full border rounded-lg p-2 mb-2"
                  />
                  <select 
                    v-model="selectedStudentId" 
                    class="w-full border rounded-lg p-2"
                    size="5"
                  >
                    <option v-for="student in filteredStudents" :key="student.id" :value="student.id">
                      {{ student.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 점수 입력 폼 -->
            <div class="space-y-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">점수</label>
                <input 
                  type="number"
                  v-model="examResult.score"
                  class="w-full border rounded-lg p-2"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">시험 응시 일시</label>
                <input 
                  type="datetime-local"
                  v-model="examResult.examTakenAt"
                  class="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">피드백</label>
                <textarea 
                  v-model="examResult.feedback"
                  rows="3"
                  class="w-full border rounded-lg p-2"
                ></textarea>
              </div>

              <!-- 자동 계산된 결과 표시 -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <span class="text-sm text-gray-500">등급:</span>
                    <span class="ml-2 font-bold">{{ computedGrade }}</span>
                  </div>
                  <div>
                    <span class="text-sm text-gray-500">결과:</span>
                    <span 
                      class="ml-2 font-bold"
                      :class="isPassed ? 'text-green-600' : 'text-red-600'"
                    >
                      {{ isPassed ? '합격' : '불합격' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 버튼 -->
            <div class="flex justify-end space-x-2">
              <button 
                @click="closeResultModal"
                class="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                취소
              </button>
              <button 
                @click="saveExamResult"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                저장
              </button>
            </div>
          </div>
        </div>

        <!-- 상단 통계 카드 -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          <div class="bg-white p-4 rounded shadow text-center">
            <div class="flex items-center justify-center mb-1">
              <svg class="w-5 h-5 mr-1 text-blue-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiFileDocumentEditOutline" />
              </svg>
              <span class="text-sm text-gray-500">이번 달 시험</span>
            </div>
            <div class="text-2xl font-bold">{{ statistics.monthlyExams }}건</div>
          </div>
          <div class="bg-white p-4 rounded shadow text-center">
            <div class="flex items-center justify-center mb-1">
              <svg class="w-5 h-5 mr-1 text-green-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiAccountGroupOutline" />
              </svg>
              <span class="text-sm text-gray-500">응시 예정</span>
            </div>
            <div class="text-2xl font-bold">{{ statistics.upcomingParticipants }}명</div>
          </div>
          <div class="bg-white p-4 rounded shadow text-center">
            <div class="flex items-center justify-center mb-1">
              <svg class="w-5 h-5 mr-1 text-purple-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiCheckDecagram"/>
              </svg>
              <span class="text-sm text-gray-500">이번 달 합격</span>
            </div>
            <div class="text-2xl font-bold">{{ statistics.monthlyPassed }}명</div>
          </div>
          <div class="bg-white p-4 rounded shadow text-center">
            <div class="flex items-center justify-center mb-1">
              <svg class="w-5 h-5 mr-1 text-pink-500" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiPercentOutline" />
              </svg>
              <span class="text-sm text-gray-500">평균 합격률</span>
            </div>
            <div class="text-2xl font-bold">{{ statistics.passRate }}%</div>
          </div>
        </div>

        <!-- 예정된 시험 목록 -->
        <div class="bg-white p-4 rounded shadow mb-6">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 mr-2 text-gray-600" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiCalendarRangeOutline"/>
            </svg>
            <h2 class="text-lg font-semibold">예정된 시험</h2>
          </div>
          <ul class="space-y-3">
            <li 
              v-for="exam in upcomingExams" 
              :key="exam.id"
              class="flex items-center justify-between"
            >
              <div>
                {{ getExamTypeDisplay(exam.type) }} 
                {{ formatDateTime(exam.examDateTime) }}
              </div>
              <div class="text-sm text-gray-500">
                신청인원: {{ exam.currentParticipants }}/{{ exam.maxParticipants }}명
              </div>
            </li>
          </ul>
        </div>

        <!-- 최근 시험 결과 -->
        <div class="bg-white p-4 rounded shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2 text-gray-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiChartBar" />
              </svg>
              <h2 class="text-lg font-semibold">최근 시험 결과</h2>
            </div>
            <!-- 결과 추가 버튼 -->
            <button
              @click="openResultModal"
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center text-sm"
            >
              <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiPlus" />
              </svg>
              결과 입력
            </button>
          </div>

          <!-- 검색 필터 -->
          <div class="flex gap-4 mb-4">
            <div class="flex-1">
              <input 
                type="text"
                v-model="resultSearch"
                placeholder="학생 이름으로 검색..."
                class="w-full border rounded-lg p-2"
              />
            </div>
            <div class="flex-1">
              <select 
                v-model="resultTypeFilter"
                class="w-full border rounded-lg p-2"
              >
                <option value="">모든 시험 유형</option>
                <option v-for="type in examTypes" :key="type" :value="type">
                  {{ EXAM_TYPE_DISPLAY[type] }}
                </option>
              </select>
            </div>
          </div>
          <div v-for="group in groupedResults" :key="group.examId">
            <div class="mb-2 font-bold">
              {{ EXAM_TYPE_DISPLAY[group.type] }} ({{ formatDateTime(group.examDateTime) }})
            </div>
            <table class="w-full mb-6 text-left border">
              <thead>
                <tr class="bg-gray-100 border-b">
                  <th class="p-2">이름</th>
                  <th class="p-2">점수</th>
                  <th class="p-2">등급</th>
                  <th class="p-2">결과</th>
                  <th class="p-2">관리</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="result in group.results" 
                  :key="result.id"
                  class="border-b"
                >
                  <td class="p-2">{{ result.studentName }}</td>
                  <td class="p-2">{{ result.score }}</td>
                  <td class="p-2">{{ result.grade }}</td>
                  <td class="p-2" :class="result.passed ? 'text-green-600' : 'text-red-600'">
                    {{ result.passed ? '합격' : '불합격' }}
                  </td>
                  <td class="p-2">
                    <button 
                      @click="editExamResult(result)" 
                      class="text-blue-500 hover:text-blue-700"
                    >
                      수정
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { 
  mdiCertificateOutline,
  mdiFileDocumentEditOutline,
  mdiAccountGroupOutline,
  mdiCheckDecagram,
  mdiPercentOutline,
  mdiCalendarRangeOutline,
  mdiChartBar,
  mdiPlus,
  mdiClose
} from '@mdi/js'

import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'
import dayjs from 'dayjs'
import axios from 'axios'

// 모달 상태 관리
const showModal = ref(false)
const newExam = ref({
  type: 'COS_PRO_2',
  examDate: '',
  examTime: '',
  maxParticipants: 30
})


const toast = useToast()

const upcomingExams = ref([])
const examResults = ref([])
const statistics = ref({
  monthlyExams: 0,
  upcomingParticipants: 0,
  monthlyPassed: 0,
  passRate: 0
})

const EXAM_TYPE_DISPLAY = {
  COS_PRO_1: 'COS Pro 1급',
  COS_PRO_2: 'COS Pro 2급',
  COS_1: 'COS 1급',
  COS_2: 'COS 2급',
  SQLD: 'SQLD',
  ADsP: 'ADsP',
  FINAL: '기말고사',
  MID_TERM: '중간고사'
}

const examTypes = [
  'COS_PRO_1',
  'COS_PRO_2',
  'COS_1',
  'COS_2',
  'SQLD',
  'ADsP',
  'FINAL',
  'MID_TERM'
]

// 모달 열기/닫기 함수
const openExamModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  newExam.value = {
    type: 'COS_PRO_2',
    examDate: '',
    examTime: '',
    maxParticipants: 30
  }
}

// 날짜 포맷팅
const formatDateTime = (dateTime) => {
  return dayjs(dateTime).format('YYYY-MM-DD HH:mm')
}

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

// 시험 결과 그룹화
// groupedResults computed 속성을 이렇게 수정:
// 시험 결과 그룹화
const groupedResults = computed(() => {
  const groups = {}
  filteredResults.value.forEach(result => {
    const examId = result.examId
    
    if (!groups[examId]) {
      const exam = allExams.value.find(e => e.id === examId)
      if (exam) {
        groups[examId] = {
          examId: examId,
          type: exam.type,
          examDateTime: exam.examDateTime,
          results: []
        }
      }
    }
    groups[examId]?.results.push(result)
  })

  // 시험 일시 기준 내림차순 정렬
  return Object.values(groups)
    .filter(group => group) // undefined 제거
    .sort((a, b) => new Date(b.examDateTime) - new Date(a.examDateTime))
})

// 데이터 fetch
const fetchUpcomingExams = async () => {
  try {
    const response = await axios.get('/api/exams')
    upcomingExams.value = response.data
  } catch (error) {
    console.error('예정된 시험 조회 실패:', error)
    toast.error('예정된 시험 목록을 불러오는데 실패했습니다.')
  }
}

const fetchExamResults = async () => {
  try {
    const response = await axios.get('/api/exams/recent-results')
    examResults.value = response.data
  } catch (error) {
    console.error('시험 결과 조회 실패:', error)
    toast.error('시험 결과를 불러오는데 실패했습니다.')
  }
}

const fetchStatistics = async () => {
  try {
    const response = await axios.get('/api/exams/statistics')
    statistics.value = response.data
  } catch (error) {
    console.error('통계 조회 실패:', error)
    toast.error('통계 정보를 불러오는데 실패했습니다.')
  }
}

// 시험 생성 함수 업데이트
const createExam = async () => {
  try {
    const response = await axios.post('/api/exams', {
      type: newExam.value.type,
      examDateTime: `${newExam.value.examDate}T${newExam.value.examTime}:00`,
      maxParticipants: newExam.value.maxParticipants
    })
    
    closeModal()
    toast.success('시험이 성공적으로 생성되었습니다.')
    await fetchUpcomingExams() // 목록 새로고침
    
  } catch (error) {
    console.error('시험 생성 실패:', error)
    toast.error('시험 생성에 실패했습니다.')
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
  await Promise.all([
    fetchUpcomingExams(),
    fetchExamResults(),
    fetchStatistics(),
    loadExamStudents(),
    fetchAllExams(),
  ])
})

const getExamTypeDisplay = computed(() => (type) => {
  const displayNames = {
    COS_PRO_1: 'COS Pro 1급',
    COS_PRO_2: 'COS Pro 2급',
    COS_1: 'COS 1급',
    COS_2: 'COS 2급',
    SQLD: 'SQLD',
    ADsP: 'ADsP',
    FINAL: '기말고사',
    MID_TERM: '중간고사'
  }
  return displayNames[type] || type
})

const showResultModal = ref(false)
const selectedExamId = ref(null)
const selectedStudentId = ref(null)
const examStudents = ref([])
const examResult = ref({
  id: null,
  score: null,
  examTakenAt: '',
  feedback: ''
})

// 기존 computed 속성 아래에 추가
const computedGrade = computed(() => {
  if (!selectedExamId.value || !examResult.value.score) return '-'
  const exam = upcomingExams.value.find(e => e.id === selectedExamId.value)
  if (!exam) return '-'
  return getGrade(exam.type, examResult.value.score)
})

const isPassed = computed(() => {
  if (!selectedExamId.value || !examResult.value.score) return false
  const exam = upcomingExams.value.find(e => e.id === selectedExamId.value)
  if (!exam) return false
  return isPass(exam.type, examResult.value.score)
})

// 결과 관리 함수들 추가
const openResultModal = () => {
  showResultModal.value = true
}

// 학생 목록 불러오기
const loadExamStudents = async () => {
  try {
    const response = await axios.get(`/api/students`)
    examStudents.value = response.data
  } catch (error) {
    console.error('학생 목록 조회 실패:', error)
    toast.error('학생 목록을 불러오는데 실패했습니다.')
  }
}

// 시험 결과 저장
const saveExamResult = async () => {
  try {
    const payload = {
      examId: selectedExamId.value,
      studentId: selectedStudentId.value,
      score: examResult.value.score,
      examTakenAt: examResult.value.examTakenAt,
      feedback: examResult.value.feedback
    }

    if (examResult.value.id) { // id가 있으면 수정
      await axios.put(`/api/exam-results/${examResult.value.id}`, payload)
      toast.success('시험 결과가 수정되었습니다.')
    } else { // id가 없으면 신규 등록
      await axios.post('/api/exam-results', payload)
      toast.success('시험 결과가 저장되었습니다.')
    }

    closeResultModal()
    await fetchExamResults() // 결과 목록 새로고침
  } catch (error) {
    console.error('시험 결과 저장 실패:', error)
    toast.error('시험 결과 저장에 실패했습니다.')
  }
}

// 시험 결과 수정
const editExamResult = (result) => {
  selectedExamId.value = result.examId
  selectedStudentId.value = result.studentId
  examResult.value = {
    id: result.id,
    score: result.score,
    examTakenAt: result.examTakenAt,
    feedback: result.feedback
  }
  showResultModal.value = true
}

const closeResultModal = () => {
  showResultModal.value = false
  selectedExamId.value = null
  selectedStudentId.value = null
  examResult.value = {
    id: null,
    score: null,
    examTakenAt: '',
    feedback: ''
  }
}

// 등급 및 합격 여부 판단 함수
const getGrade = (examType, score) => {
  const percentage = (score / 100) * 100
  if (percentage >= 90) return 'A'
  if (percentage >= 80) return 'B'
  if (percentage >= 70) return 'C'
  if (percentage >= 60) return 'D'
  return 'F'
}

const isPass = (examType, score) => {
  return (score / 100) * 100 >= 60
}

// 검색어 상태
const studentSearch = ref('')
const resultSearch = ref('')
const resultTypeFilter = ref('')

// 필터링된 학생 목록
const filteredStudents = computed(() => {
  if (!studentSearch.value) return examStudents.value
  const search = studentSearch.value.toLowerCase()
  return examStudents.value.filter(student => 
    student.name.toLowerCase().includes(search)
  )
})

// 필터링된 시험 결과
const filteredResults = computed(() => {
  let filtered = [...examResults.value]
  
  // 이름 검색
  if (resultSearch.value) {
    const search = resultSearch.value.toLowerCase()
    filtered = filtered.filter(result => 
      result.studentName.toLowerCase().includes(search)
    )
  }

  // 시험 유형 필터
  if (resultTypeFilter.value) {
    filtered = filtered.filter(result => {
      return result.examType === EXAM_TYPE_DISPLAY[resultTypeFilter.value] // exam 객체 내의 type을 참조
    }
    )
  }

  return filtered
})

const allExams = ref([])

// API 호출 함수 추가
const fetchAllExams = async () => {
  try {
    const response = await axios.get('/api/exams/all') // 모든 시험을 가져오는 API
    allExams.value = response.data
  } catch (error) {
    console.error('시험 목록 조회 실패:', error)
    toast.error('시험 목록을 불러오는데 실패했습니다.')
  }
}

</script>

<style scoped>
</style>
