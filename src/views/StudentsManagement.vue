<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="flex gap-6">
        <!-- 좌측: 학생 목록 -->
        <div class="w-1/3 space-y-4">
          <div class="bg-white rounded-xl shadow-sm p-4">
            <!-- 헤더 -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2">
                <svg class="w-6 h-6 text-indigo-600" viewBox="0 0 24 24">
                  <path fill="currentColor" :d="mdiAccountMultipleOutline" />
                </svg>
                <h1 class="text-xl font-semibold text-gray-900">학생 관리</h1>
              </div>

              <!-- 검색창 -->
              <div class="relative flex-1 mx-4">
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="학생 이름 검색..."
                  class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  @input="handleSearch"
                />
                <button 
                  v-if="searchQuery"
                  @click="clearSearch"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" :d="mdiClose" />
                  </svg>
                </button>
              </div>

              <button
                class="inline-flex items-center justify-center px-3 py-1 border border-indigo-600 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                @click="goCreateForm"
              >
                +
              </button>
            </div>

            <!-- 학생 목록 -->
            <div class="space-y-3">
              <div
                v-for="student in paginatedStudents"
                :key="student.id"
                class="p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors shadow-sm cursor-pointer"
                @click="selectStudent(student)"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="font-semibold text-gray-900">{{ student.name }}</div>
                  <div class="flex items-center gap-1">
                    <button
                      class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      @click.stop="goEditStudent(student.id)"
                    >
                      수정
                    </button>
                    <button
                      class="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                      @click.stop="confirmDeleteStudent(student)"
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div class="text-sm text-gray-600">
                  ID : {{ student.id }}
                  <br />
                  {{ student.daysOfWeek.map(day => dayMapping[day]).join(', ') }}
                </div>
              </div>
              <!-- 페이지네이션 -->
              <div v-if="totalPages > 1" class="flex justify-between items-center pt-4 border-t border-gray-200">
                <button 
                  class="px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="currentPage === 1"
                  @click="prevPage"
                >
                  이전
                </button>
                <span class="text-sm text-gray-600">
                  {{ currentPage }} / {{ totalPages }}
                </span>
                <button 
                  class="px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="currentPage === totalPages"
                  @click="nextPage"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 우측: 상세 정보 -->
        <div class="flex-1 space-y-6">
          <!-- 기본 정보 -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-6 h-6 text-gray-900" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiAccountOutline" />
              </svg>
              <h2 class="text-xl font-semibold text-gray-900">기본 정보</h2>
            </div>

            <div v-if="selected" class="grid grid-cols-2 gap-6">
              <div>
                <label class="text-sm font-medium text-gray-600">이름</label>
                <p class="mt-1 font-semibold text-gray-900">{{ selected.name }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">연락처</label>
                <p class="mt-1 text-gray-900">{{ selected.phone }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">보호자 연락처</label>
                <p class="mt-1 text-gray-900">{{ selected.parent }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">생년월일</label>
                <p class="mt-1 text-gray-900">{{ selected.birthday }}</p>
              </div>
            </div>
          </div>

          <!-- 출결 현황 -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-6 h-6 text-blue-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiCalendarRangeOutline" />
              </svg>
              <h2 class="text-xl font-semibold text-gray-900">출결 현황</h2>
            </div>

            <div v-if="selected">
              <div class="flex items-center gap-4 mb-6">
                <label class="flex items-center gap-2">
                  <span class="text-sm font-medium text-gray-600">연도:</span>
                  <input 
                    type="number" 
                    v-model="selectedYear"
                    class="px-3 py-1 border border-gray-200 rounded-lg text-sm w-24 focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label class="flex items-center gap-2">
                  <span class="text-sm font-medium text-gray-600">월:</span>
                  <input 
                    type="number" 
                    v-model="selectedMonth"
                    class="px-3 py-1 border border-gray-200 rounded-lg text-sm w-20 focus:ring-2 focus:ring-indigo-500"
                    min="1"
                    max="12"
                  />
                </label>
                <button 
                  class="px-4 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                  @click="fetchStudentAttendance(selected.id)"
                >
                  조회
                </button>
              </div>

              <!-- 월별 출결 통계 -->
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="p-4 rounded-lg bg-green-50 border border-green-100">
                  <div class="text-sm text-gray-600">출석</div>
                  <div class="text-2xl font-semibold text-green-600">{{ attendanceCount }}</div>
                </div>
                <div class="p-4 rounded-lg bg-red-50 border border-red-100">
                  <div class="text-sm text-gray-600">결석</div>
                  <div class="text-2xl font-semibold text-red-600">{{ absenceCount }}</div>
                </div>
                <div class="p-4 rounded-lg bg-purple-50 border border-purple-100">
                  <div class="text-sm text-gray-600">보강</div>
                  <div class="text-2xl font-semibold text-purple-600">{{ makeupCount }}</div>
                </div>
              </div>

              <div class="overflow-hidden rounded-lg border border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">날짜</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">요일</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시간</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr 
                      v-for="record in filteredAttendanceRecords" 
                      :key="record.id"
                      class="hover:bg-gray-50"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ formatDate(record.type === 'absence' ? record.absenceDate : record.attendanceDate) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ koreanDayOfWeek(record.type === 'absence' ? record.absenceDate : record.attendanceDate) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <span 
                          class="px-2 py-1 rounded-full text-xs font-medium"
                          :class="getStatusClass(record)"
                        >
                          {{ getStatusText(record) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ record.type === 'absence' ? '-' : `${record.startTime || '-'} ~ ${record.endTime || '-'}` }}
                      </td>
                    </tr>
                    <tr v-if="filteredAttendanceRecords.length === 0">
                      <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
                        해당 기간에 출결 기록이 없습니다.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 학습 현황 -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiProgressCheck" />
              </svg>
              <h2 class="text-xl font-semibold text-gray-900">학습 현황</h2>
            </div>

            <div v-if="selected" class="space-y-6">
              <div v-for="(progress, course) in ['Python', 'COS Pro', '타자연습']" :key="course">
                <div class="flex justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">{{ course }}</span>
                  <span class="text-sm font-medium text-gray-700">50%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="h-2.5 rounded-full transition-all duration-300"
                    :class="getCourseProgressClass(course)"
                    :style="{ width: '50%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 보강 목록 -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-6 h-6 text-purple-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiHistory" />
              </svg>
              <h2 class="text-xl font-semibold text-gray-900">보강 목록</h2>
            </div>

            <div class="flex gap-4 mb-6">
              <select 
                v-model="selectedRange"
                class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="week">주간</option>
                <option value="month">월간</option>
                <option value="all">전체</option>
              </select>
              <select 
                v-model="selectedOrder"
                class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
              </select>
            </div>

            <div class="space-y-3">
              <div 
                v-for="makeupAttendance in studentMakeupAttendances" 
                :key="makeupAttendance.id"
                class="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-sm text-gray-900">{{ formatDate(makeupAttendance.attendanceDate) }}</div>
                    <div class="text-sm text-gray-600">
                      {{ makeupAttendance.startTime || '-' }} ~ {{ makeupAttendance.endTime || '-' }}
                    </div>
                    <div v-if="makeupAttendance.makeupType" class="text-xs text-gray-500 mt-1">
                      {{ makeupAttendance.makeupType }}
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    보강
                  </span>
                </div>
              </div>
              
              <div v-if="studentMakeupAttendances.length === 0" class="text-center py-6 text-gray-500">
                보강 기록이 없습니다.
              </div>
            </div>

            <!-- 삭제 확인 대화상자 -->
            <div v-if="deleteConfirmDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">학생 삭제 확인</h3>
                <p class="text-gray-700 mb-6">
                  정말 <span class="font-semibold">{{ studentToDelete?.name }}</span> 학생을 삭제하시겠습니까?
                  <br>
                  <span class="text-red-600 text-sm">이 작업은 되돌릴 수 없습니다.</span>
                </p>
                <div class="flex justify-end gap-3">
                  <button 
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    @click="cancelDelete"
                  >
                    취소
                  </button>
                  <button 
                    class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    @click="deleteStudent"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import axios from 'axios'

import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

import {
  mdiAccountMultipleOutline,
  mdiAccountOutline,
  mdiCalendarRangeOutline,
  mdiProgressCheck,
  mdiHistory,
  mdiClose
} from '@mdi/js'

const dayMapping = {
  mon: '월요일',
  tue: '화요일',
  wed: '수요일',
  thu: '목요일',
  fri: '금요일',
  sat: '토요일',
  sun: '일요일',
}

// ------------------------------
// 학생 목록
// ------------------------------
const students = ref([])
const selected = ref(null)
const searchQuery = ref('')
const debouncedSearch = ref(null)

const router = useRouter()

// 필터링된 학생 목록
const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value
  
  const query = searchQuery.value.toLowerCase()
  return students.value.filter(student => 
    student.name.toLowerCase().includes(query)
  )
})

function selectStudent(student) {
  selected.value = student
  fetchStudentAttendance(student.id)
  fetchStudentMakeupAttendances(student.id)
}

function goEditStudent(studentId) {
  router.push({ name: 'studentInfo', params: { id: studentId } })
}

function goCreateForm() {
  router.push('/forms')
}

function handleSearch() {
  if (debouncedSearch.value) clearTimeout(debouncedSearch.value)
  debouncedSearch.value = setTimeout(() => {
    // 필요한 경우 서버 검색 로직 추가
  }, 300)
}

function clearSearch() {
  searchQuery.value = ''
}

// ------------------------------
// 출결 데이터
// ------------------------------
const selectedYear = ref(dayjs().year())
const selectedMonth = ref(dayjs().month() + 1)
const attendanceRecords = ref([])
const absenceRecords = ref([])

// 날짜 포맷팅
function formatDate(date) {
  if (!date) return '-'
  return dayjs(date).format('YYYY-MM-DD')
}

// 요일 한글로 변환
function koreanDayOfWeek(date) {
  if (!date) return '-'
  const days = ['일', '월', '화', '수', '목', '금', '토']
  const dayIndex = dayjs(date).day()
  return days[dayIndex] + '요일'
}

// 출결 상태 텍스트
function getStatusText(record) {
  if (record.type === 'absence') {
    return '결석'
  } else {
    return record.makeup ? '보강' : '출석'
  }
}

// 출결 상태 클래스
function getStatusClass(record) {
  if (record.type === 'absence') {
    return 'bg-red-100 text-red-800'
  } else if (record.makeup) {
    return 'bg-purple-100 text-purple-800'
  } else {
    return 'bg-green-100 text-green-800'
  }
}

// 코스별 프로그레스바 색상
function getCourseProgressClass(courseName) {
  const classes = {
    'Python': 'bg-blue-500',
    'COS Pro': 'bg-green-500',
    '타자연습': 'bg-purple-500'
  }
  return classes[courseName] || 'bg-gray-500'
}

// 출결 기록 통합 및 정렬
const filteredAttendanceRecords = computed(() => {
  // 출석과 결석 기록을 통합하여 하나의 배열로 만든다
  const combinedRecords = [
    ...attendanceRecords.value.map(record => ({ ...record, type: 'attendance' })),
    ...absenceRecords.value.map(record => ({ ...record, type: 'absence' }))
  ]
  
  // 날짜에 따라 내림차순 정렬 (최신 기록이 위에 표시)
  return combinedRecords.sort((a, b) => {
    const dateA = dayjs(a.type === 'absence' ? a.absenceDate : a.attendanceDate)
    const dateB = dayjs(b.type === 'absence' ? b.absenceDate : b.attendanceDate)
    return dateB.valueOf() - dateA.valueOf()
  })
})

// 출석, 결석, 보강 횟수 계산
const attendanceCount = computed(() => 
  attendanceRecords.value.filter(r => !r.makeup).length
)

const absenceCount = computed(() => 
  absenceRecords.value.length
)

const makeupCount = computed(() => 
  attendanceRecords.value.filter(r => r.makeup).length
)

// 학생별 출결 조회
async function fetchStudentAttendance(studentId) {
  if (!studentId) return
  
  try {
    // 출석 기록 조회
    const attendanceRes = await axios.get(`/api/attendance/student/${studentId}`, {
      params: {
        year: selectedYear.value,
        month: selectedMonth.value
      }
    })
    attendanceRecords.value = attendanceRes.data
    
    // 결석 기록 조회
    const absenceRes = await axios.get(`/api/absence/${studentId}`, {
      params: {
        year: selectedYear.value,
        month: selectedMonth.value
      }
    })
    absenceRecords.value = absenceRes.data
  } catch (err) {
    console.error('학생 출결 데이터 조회 실패:', err)
    alert('학생 출결 데이터 조회 실패')
  }
}

// ------------------------------
// 보강 목록
// ------------------------------
const selectedRange = ref('month')
const selectedOrder = ref('desc')
const studentMakeupAttendances = ref([])

// Watchers
watch([selectedRange, selectedOrder], () => {
  if (selected.value) {
    fetchStudentMakeupAttendances(selected.value.id)
  }
})

watch([selectedYear, selectedMonth], () => {
  if (selected.value) {
    fetchStudentAttendance(selected.value.id)
  }
})

async function fetchStudentMakeupAttendances(studentId) {
  if (!studentId) return

  try {
    const res = await axios.get(`/api/attendance/makeup/student/${studentId}`, {
      params: {
        range: selectedRange.value,
        order: selectedOrder.value
      }
    })
    studentMakeupAttendances.value = res.data
  } catch (err) {
    console.error('보강 목록 조회 실패:', err)
    alert('보강 목록 조회 실패')
  }
}

// 초기 데이터 로드
onMounted(() => {
  fetchStudents()
})

async function fetchStudents() {
  try {
    const res = await axios.get('/api/students')
    students.value = res.data
  } catch (err) {
    console.error('학생 목록 불러오기 실패:', err)
    alert('학생 목록 불러오기 실패')
  }
}

const currentPage = ref(1)
const itemsPerPage = 5

// 페이지네이션된 학생 목록
const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredStudents.value.slice(start, end)
})

// 전체 페이지 수
const totalPages = computed(() => 
  Math.ceil(filteredStudents.value.length / itemsPerPage)
)

// 페이지 이동 함수
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// 학생 삭제 관련 상태
const deleteConfirmDialog = ref(false)
const studentToDelete = ref(null)

// 삭제 확인 대화상자 표시
function confirmDeleteStudent(student) {
  studentToDelete.value = student
  deleteConfirmDialog.value = true
}

// 학생 삭제 실행
async function deleteStudent() {
  if (!studentToDelete.value) return
  
  try {
    await axios.delete(`/api/students/${studentToDelete.value.id}`)
    
    // 목록에서 학생 제거
    students.value = students.value.filter(s => s.id !== studentToDelete.value.id)
    
    // 현재 선택된 학생이 삭제된 학생이면 선택 초기화
    if (selected.value && selected.value.id === studentToDelete.value.id) {
      selected.value = null
    }
    
    // 상태 초기화
    deleteConfirmDialog.value = false
    studentToDelete.value = null
    
    // 성공 메시지
    alert('학생이 삭제되었습니다.')
  } catch (err) {
    console.error('학생 삭제 실패:', err)
    alert('학생 삭제에 실패했습니다.')
  }
}

// 삭제 취소
function cancelDelete() {
  deleteConfirmDialog.value = false
  studentToDelete.value = null
}

// 검색어가 변경되면 첫 페이지로 이동
watch(searchQuery, () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* 필요한 스타일 */
</style>