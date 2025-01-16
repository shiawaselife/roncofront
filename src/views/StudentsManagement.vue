<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="flex gap-6">
        <!-- 좌측: 학생 목록 -->
        <div class="w-1/3">
          <div class="flex items-center mb-4 justify-between">
            <!-- 왼쪽 영역: 아이콘 + 텍스트 -->
            <div class="flex items-center">
              <svg class="w-6 h-6 mr-2 text-indigo-500" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiAccountMultipleOutline" />
              </svg>
              <h1 class="text-xl font-bold">학생 관리</h1>
            </div>

            <!-- 중앙 영역: 검색 입력 필드 -->
            <div class="relative flex-1 mx-4">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="학생 이름 검색..."
                class="w-full px-3 py-1 border rounded-lg text-sm"
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

            <!-- 오른쪽 영역: + 버튼 -->
            <button
              class="border border-blue-500 text-blue-500 hover:bg-blue-100 px-2 py-1 rounded text-sm"
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
              class="relative bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
              @click="selectStudent(student)"
            >
              <!-- 수정 버튼 (오른쪽 상단) -->
              <button
                class="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded"
                @click.stop="goEditStudent(student.id)" 
              >
                수정
              </button>

              <div class="font-bold">{{ student.name }}</div>
              <div class="text-sm text-gray-600">
                {{ student.daysOfWeek.map(day => dayMapping[day]).join(', ') }}
                <br />
                수업 시간 : {{ student.startTime }} ~ {{ student.endTime }}
              </div>
            </div>

            <!-- 검색 결과가 없을 때 표시 -->
            <div 
              v-if="filteredStudents.length === 0" 
              class="text-center py-4 text-gray-500"
            >
              검색 결과가 없습니다
            </div>

            <!-- 페이지네이션 -->
            <div v-if="totalPages > 1" class="flex justify-between items-center pt-4 border-t">
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

        <!-- 우측: 상세 -->
        <div class="flex-1">
          <!-- 기본 정보 -->
          <div class="bg-white p-4 rounded shadow mb-4">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2 text-gray-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiAccountOutline" />
              </svg>
              <h2 class="text-lg font-semibold">기본 정보</h2>
            </div>
            <div v-if="selected">
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div class="text-sm text-gray-500">이름</div>
                  <div class="font-bold">{{ selected.name }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">연락처</div>
                  <div>{{ selected.phone }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">보호자 연락처</div>
                  <div>{{ selected.parent }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">생년월일</div>
                  <div>{{ selected.birthday }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">등록일</div>
                  <div>{{ selected.regDate }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-500">주소</div>
                  <div>{{ selected.residence }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 출결 현황 -->
          <div class="bg-white p-4 rounded shadow mb-4">
            <div class="flex items-center mb-4">
              <svg class="w-5 h-5 mr-2 text-blue-500" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiCalendarRangeOutline" />
              </svg>
              <h2 class="text-lg font-semibold">출결 현황</h2>
            </div>

            <div v-if="selected">
              <!-- 연/월 선택 -->
              <div class="flex items-center space-x-2 mb-4">
                <label class="text-sm">
                  연도:
                  <input 
                    type="number" 
                    class="border p-1 text-sm w-20"
                    v-model="selectedYear"
                  />
                </label>
                <label class="text-sm">
                  월:
                  <input 
                    type="number" 
                    class="border p-1 text-sm w-14"
                    v-model="selectedMonth"
                    min="1"
                    max="12"
                  />
                </label>
                <button 
                  class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                  @click="fetchStudentAttendance(selected.id)"
                >
                  조회
                </button>
              </div>

              <!-- 출결 테이블 -->
              <div class="overflow-x-auto">
                <table class="w-full border-collapse text-sm">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="border p-2 text-center">날짜</th>
                      <th class="border p-2 text-center">요일</th>
                      <th class="border p-2 text-center">등원시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="attendance in monthlyAttendanceList" 
                      :key="attendance.id"
                      class="hover:bg-gray-50"
                    >
                      <td class="border p-2 text-center">{{ formatDate(attendance.date) }}</td>
                      <td class="border p-2 text-center">{{ koreanDayOfWeek(attendance.date) }}</td>
                      <td class="border p-2 text-center">{{ formatTime(attendance.createdAt) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 학습 현황 -->
          <div class="bg-white p-4 rounded shadow mb-4">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2 text-green-500" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiProgressCheck" />
              </svg>
              <h2 class="text-lg font-semibold">학습 현황</h2>
            </div>
            <div v-if="selected">
              <ul class="space-y-4">
                <li>
                  <div class="flex items-center justify-between">
                    <span>Python</span>
                    <span>50%</span>
                  </div>
                  <div class="w-full h-2 bg-gray-200 rounded">
                    <div 
                      class="h-2 bg-blue-500 rounded"
                      style="width: 50%"
                    ></div>
                  </div>
                </li>
                <li>
                  <div class="flex items-center justify-between">
                    <span>COS Pro</span>
                    <span>70%</span>
                  </div>
                  <div class="w-full h-2 bg-gray-200 rounded">
                    <div 
                      class="h-2 bg-green-500 rounded"
                      style="width: 70%"
                    ></div>
                  </div>
                </li>
                <li>
                  <div class="flex items-center justify-between">
                    <span>타자연습</span>
                    <span>40%</span>
                  </div>
                  <div class="w-full h-2 bg-gray-200 rounded">
                    <div 
                      class="h-2 bg-purple-500 rounded"
                      style="width: 40%"
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- 보강 목록 -->
          <div class="bg-white p-4 rounded shadow">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2 text-gray-500" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiHistory" />
              </svg>
              <h2 class="text-lg font-semibold">보강 목록</h2>
            </div>
            
            <div class="flex items-center mb-2 space-x-2">
              <select class="border p-1 text-sm rounded" v-model="selectedRange">
                <option value="week">주간</option>
                <option value="month">월간</option>
              </select>
              <select class="border p-1 text-sm rounded" v-model="selectedOrder">
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
              </select>
            </div>

            <div v-if="filteredMakeupClasses.length === 0" class="text-sm text-gray-500">
              보강 수업이 없습니다.
            </div>
            <ul class="space-y-2" v-else>
              <li 
                v-for="cls in filteredMakeupClasses" 
                :key="cls.id"
                class="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <div>
                  <div class="font-bold">{{ cls.student?.name }}</div>
                  <div class="text-sm text-gray-600">
                    {{ cls.classDate }} ({{ cls.startTime }}~{{ cls.endTime }})
                  </div>
                </div>
                <div class="text-green-600 font-semibold">보강</div>
              </li>
            </ul>
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
const itemsPerPage = 6

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