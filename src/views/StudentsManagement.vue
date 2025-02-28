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
                  <button
                    class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    @click.stop="goEditStudent(student.id)"
                  >
                    수정
                  </button>
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

              <div class="overflow-hidden rounded-lg border border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">날짜</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">요일</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">등원시간</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr 
                      v-for="attendance in monthlyAttendanceList" 
                      :key="attendance.id"
                      class="hover:bg-gray-50"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ formatDate(attendance.date) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ koreanDayOfWeek(attendance.date) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ formatTime(attendance.createdAt) }}
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
                v-for="cls in filteredMakeupClasses" 
                :key="cls.id"
                class="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <div class="font-semibold text-gray-900">{{ cls.student?.name }}</div>
                    <div class="text-sm text-gray-600">
                      {{ cls.classDate }} ({{ cls.startTime }}~{{ cls.endTime }})
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    보강
                  </span>
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
  fetchMakeupClasses(student.id)
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
const monthlyAttendanceList = ref([])

// 날짜 포맷팅
function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD')
}

// 요일 한글로 변환
function koreanDayOfWeek(date) {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  const dayIndex = dayjs(date).day()
  return days[dayIndex] + '요일'
}

// 시간 포맷팅 (HH:mm)
function formatTime(datetime) {
  return datetime ? dayjs(datetime).format('HH:mm') : '-'
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

// 출결 상태별 횟수 계산
function getAttendanceCount(status) {
  return monthlyAttendanceList.value.filter(a => a.status === status).length
}

// 출석률 계산
function calculateAttendanceRate() {
  const total = monthlyAttendanceList.value.length
  if (total === 0) return 0
  
  const attended = monthlyAttendanceList.value.filter(a => 
    a.status === '출석' || a.status === '지각'
  ).length
  
  return Math.round((attended / total) * 100)
}

// 학생별 출결 조회
async function fetchStudentAttendance(studentId) {
  if (!studentId) return
  
  try {
    const res = await axios.get(`/api/attendance/${studentId}`, {
      params: {
        year: selectedYear.value,
        month: selectedMonth.value
      }
    })
    monthlyAttendanceList.value = res.data
  } catch (err) {
    console.error(err)
    alert('학생 출결 데이터 조회 실패')
  }
}

// ------------------------------
// 보강 목록
// ------------------------------
const selectedRange = ref('week')
const selectedOrder = ref('asc')
const makeupClassList = ref([])

// Watchers
watch([selectedRange, selectedOrder], () => {
  if (selected.value) {
    fetchMakeupClasses(selected.value.id)
  }
})

watch([selectedYear, selectedMonth], () => {
  if (selected.value) {
    fetchStudentAttendance(selected.value.id)
  }
})

async function fetchMakeupClasses(studentId) {
  if (!studentId) return

  try {
    const res = await axios.get('/api/classes/makeup', {
      params: {
        range: selectedRange.value,
        order: selectedOrder.value
      }
    })
    makeupClassList.value = res.data
  } catch (err) {
    console.error(err)
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
    console.error(err)
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

// 검색어가 변경되면 첫 페이지로 이동
watch(searchQuery, () => {
  currentPage.value = 1
})

const filteredMakeupClasses = computed(() => {
  if (!selected.value) return []
  return makeupClassList.value.filter(cls => cls.student?.id === selected.value.id)
})

</script>

<style scoped>
/* 필요한 스타일 */
</style>