<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div>
        <div class="max-w-7xl mx-auto space-y-6">
          <!-- Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <svg class="w-8 h-8 text-blue-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiCalendarCheckOutline" />
              </svg>
              <h1 class="text-3xl font-bold text-gray-800">출결 관리</h1>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <button 
              @click="autoAddTodayClasses"
              class="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiClockOutline" />
              </svg>
              오늘 수업 자동 추가
            </button>
            <button 
              @click="openMakeupModal(null)"
              class="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-sm transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiPlus" />
              </svg>
              보강 추가
            </button>
            <button 
              @click="router.push('/classes/calendar')"
              class="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiCalendarOutline" />
              </svg>
              전체 수업 보기
            </button>
          </div>

          <!-- Main Content -->
          <div class="space-y-6">
            <!-- 출결 현황 -->
            <div class="bg-white rounded-xl shadow-sm">
              <div class="p-4 border-b border-gray-100">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                      <path fill="currentColor" :d="mdiAccountCheckOutline" />
                    </svg>
                    <h2 class="text-xl font-semibold text-gray-800">출결 현황</h2>
                  </div>
                  <div class="flex items-center space-x-4">
                    <!-- 검색창 추가 -->
                    <div class="relative">
                      <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="학생 이름으로 검색..."
                        class="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                      />
                      <svg
                        class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <label class="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        v-model="showAllTodayClasses"
                        class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                      />
                      <span class="text-sm text-gray-600">전체 표시</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="p-4">
                <div class="grid grid-cols-2 gap-4">
                  <!-- 등원 -->
                  <div>
                    <h3 class="font-semibold mb-3 text-gray-700">등원</h3>
                    <div class="space-y-3">
                      <div 
                        v-for="cls in paginatedNotAttendedClasses"
                        :key="cls.id"
                        class="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-200"
                      >
                        <div class="flex justify-between items-center h-full">
                          <div class="flex flex-col justify-between h-full">
                            <div>
                              <h3 class="font-semibold text-gray-800">
                                <button @click="showStudentAttendance(cls.student)" class="hover:text-blue-600">
                                  {{ cls.student?.name }} 
                                </button>
                              </h3>
                              <p class="text-xs text-gray-500 mt-1">
                                수업ID: {{ cls.id }}
                              </p>
                            </div>
                          </div>
                          <button 
                            @click="openMakeupModal(cls)"
                            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <!-- 등원 페이지네이션 -->
                      <div v-if="totalNotAttendedPages > 1" class="flex justify-center gap-2 mt-4">
                        <button
                          v-for="page in totalNotAttendedPages"
                          :key="page"
                          @click="changeNotAttendedPage(page)"
                          class="px-3 py-1 rounded-lg"
                          :class="[
                            currentNotAttendedPage === page
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          ]"
                        >
                          {{ page }}
                        </button>
                      </div>

                      <div v-if="filteredNotAttendedClasses.length === 0" class="text-center py-4 text-gray-500">
                        표시할 학생이 없습니다.
                      </div>
                    </div>
                  </div>

                  <!-- 하원 -->
                  <div>
                    <h3 class="font-semibold mb-3 text-gray-700">하원</h3>
                    <div class="space-y-3">
                      <div 
                        v-for="cls in paginatedAttendedClasses"
                        :key="cls.id"
                        class="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div class="flex justify-between items-center h-full">
                          <div class="flex flex-col justify-between h-full">
                            <h3 class="font-semibold text-gray-800">
                              <button 
                                @click="showStudentAttendance(cls.student)"
                                class="hover:text-blue-600"
                              >
                                {{ cls.student?.name }} ({{ cls.startTime }} ~ {{ cls.endTime }})
                              </button>
                            </h3>
                            <p class="text-sm" :class="classStatusColor(cls)">
                              {{ classStatusText(cls) }}
                              <span v-if="!isClassEnded(cls)" class="ml-2">
                                ({{ getRemainingTime(cls) }} 남음)
                              </span>
                            </p>
                          </div>
                          <div class="flex items-center space-x-2">
                            <div class="flex items-center space-x-2">
                              <button 
                                @click="addTime(cls, -selectedMinutes)"
                                class="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded flex items-center justify-center"
                              >
                                -
                              </button>
                              <select
                                v-model="selectedMinutes"
                                class="border rounded px-2 py-1 w-24 text-center appearance-none bg-white"
                              >
                                <option 
                                  v-for="minutes in [10, 20, 30, 40, 50, 60]" 
                                  :key="minutes" 
                                  :value="minutes"
                                >
                                  {{ minutes }}분
                                </option>
                              </select>
                              <button 
                                @click="addTime(cls, selectedMinutes)"
                                class="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              @click="openTimeEditModal(cls)"
                              class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                            >
                              시간 수정
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- 하원 페이지네이션 -->
                      <div v-if="totalAttendedPages > 1" class="flex justify-center gap-2 mt-4">
                        <button
                          v-for="page in totalAttendedPages"
                          :key="page"
                          @click="changeAttendedPage(page)"
                          class="px-3 py-1 rounded-lg"
                          :class="[
                            currentAttendedPage === page
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          ]"
                        >
                          {{ page }}
                        </button>
                      </div>

                      <div v-if="filteredAttendedClasses.length === 0" class="text-center py-4 text-gray-500">
                        표시할 학생이 없습니다.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 보강 목록 -->
            <div class="bg-white rounded-xl shadow-sm">
              <div class="p-4 border-b border-gray-100">
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                    <path fill="currentColor" :d="mdiHistory" />
                  </svg>
                  <h2 class="text-xl font-semibold text-gray-800">보강 목록</h2>
                </div>
              </div>

              <div class="p-4">
                <div class="flex space-x-4 mb-4">
                  <select 
                    v-model="selectedRange"
                    class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="week">주간</option>
                    <option value="month">월간</option>
                  </select>
                  <select 
                    v-model="selectedOrder"
                    class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="asc">오름차순</option>
                    <option value="desc">내림차순</option>
                  </select>
                </div>

                <div class="space-y-3">
                  <div 
                    v-for="mc in makeupClassList" 
                    :key="mc.id"
                    class="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <h3 class="font-semibold text-gray-800">
                          {{ mc.student.name }}
                        </h3>
                        <p class="text-sm text-gray-600">
                          {{ mc.classDate }} ({{ mc.startTime }} ~ {{ mc.endTime }})
                        </p>
                      </div>
                      <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {{ mc.makeupType }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 모달 컴포넌트들 -->
      <!-- 등원/보강 선택 모달 -->
      <div 
        v-if="showMakeupModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-96">
          <h3 class="text-xl font-semibold mb-4">
            {{ selectedClass ? '수업 처리' : '보강 추가' }}
          </h3>
          <p v-if="selectedClass" class="text-gray-600 mb-4">
            {{ selectedClass?.student?.name }} 수업 처리 방법을 선택하세요.
          </p>
          <div class="space-y-3">
            <button 
              v-if="selectedClass"
              @click="markAttendance(selectedClass)"
              class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              등원 기록 남기기
            </button>
            <button 
              @click="openMakeupForm('결석보강')"
              class="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              결석보강
            </button>
            <button 
              @click="openMakeupForm('공결보강')"
              class="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              공결보강
            </button>
            <button 
              @click="openMakeupForm('지각보강')"
              class="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              지각보강
            </button>
          </div>
          <button 
            @click="closeMakeupModal"
            class="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            닫기
          </button>
        </div>
      </div>

      <!-- 보강 일정 등록 모달 -->
      <div 
        v-if="showMakeupFormModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-96">
          <h3 class="text-xl font-semibold mb-4">
            보강 일정 등록 ({{ makeupTypeSelected }})
          </h3>
          
          <div v-if="selectedClass" class="text-gray-600 mb-4">
            {{ selectedClass?.student?.name }} 학생 / 수업ID={{ selectedClass?.id }}
          </div>
          
          <div v-if="!selectedClass" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">학생 선택:</label>
            <select 
              v-model="selectedStudentId"
              class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">학생을 선택하세요</option>
              <option 
                v-for="student in studentList"
                :key="student.id"
                :value="student.id"
              >
                {{ student.name }}
              </option>
            </select>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">보강 날짜:</label>
              <input 
                type="date" 
                v-model="makeupDate" 
                class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">보강 시작시간:</label>
              <input 
                type="time" 
                v-model="makeupStartTime" 
                class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">보강 종료시간:</label>
              <input 
                type="time" 
                v-model="makeupEndTime" 
                class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div class="flex space-x-3 mt-6">
            <button 
              @click="createMakeupClass"
              class="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              등록
            </button>
            <button 
              @click="closeMakeupForm"
              class="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              취소
            </button>
          </div>
        </div>
      </div>

      <!-- 시간 수정 모달 -->
      <div 
        v-if="showTimeEditModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-96">
          <h3 class="text-xl font-semibold mb-4">수업 시간 수정</h3>
          <p class="text-gray-600 mb-4">
            {{ selectedClass?.student?.name }} 학생
          </p>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">시작 시간:</label>
              <input 
                type="time" 
                v-model="editStartTime" 
                class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div class="text-sm text-gray-600">
              수업 시간: {{ getClassDuration(selectedClass) }}
            </div>
            
            <div class="text-sm text-gray-600">
              종료 예정: {{ calculatedEndTime }}
            </div>
          </div>

          <div class="flex space-x-3 mt-6">
            <button 
              @click="updateClassTime"
              class="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              저장
            </button>
            <button 
              @click="closeTimeEditModal"
              class="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
            >
              취소
            </button>
          </div>
        </div>
      </div>

      <!-- 학생 출결 내역 모달 -->
      <div 
        v-if="showAttendanceModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-[32rem]">
          <h3 class="text-xl font-semibold mb-2">
            {{ selectedStudentName }} 학생 출결 내역
            <span class="text-sm text-gray-600">
              ({{ currentMonthText }})
            </span>
          </h3>
          
          <div class="mt-4 space-y-3">
            <div 
              v-for="cls in paginatedClasses" 
              :key="cls.id"
              class="p-3 border rounded-lg"
            >
              <div class="flex justify-between items-center">
                <div>
                  <div class="text-sm text-gray-600">{{ formatDateSimple(cls.classDate) }}</div>
                  <div class="font-medium">{{ cls.startTime }} ~ {{ cls.endTime }}</div>
                </div>
                <div>
                  <span 
                    class="px-3 py-1 text-sm rounded-full"
                    :class="getAttendanceStatusStyle(cls)"
                  >
                    {{ getAttendanceStatusText(cls) }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="studentMonthlyClasses.length === 0" class="text-center py-4 text-gray-500">
              이번 달 수업 기록이 없습니다.
            </div>

            <!-- 페이지네이션 -->
            <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-4">
              <button 
                v-for="page in totalPages" 
                :key="page"
                class="px-3 py-1 rounded-lg"
                :class="[
                  currentPage === page 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button 
              @click="closeAttendanceModal"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'

import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

import { useRouter } from 'vue-router'

import { useWebSocketStore } from '@/stores/WebSocketStore'

import { 
  mdiCalendarCheckOutline,
  mdiAccountCheckOutline,
  mdiPlus,
  mdiHistory,
  mdiClockOutline,
  mdiCalendarOutline
} from '@mdi/js'


const webSocketStore = useWebSocketStore()
const router = useRouter()

// --- 상태 관리 ---
const todayClassList = ref([])
const attendanceList = ref([])
const showAllTodayClasses = ref(true)
const activeTimeMenu = ref(null)

// 모달 상태
const showMakeupModal = ref(false)
const showMakeupFormModal = ref(false)
const selectedClass = ref(null)
const makeupTypeSelected = ref('')
const makeupDate = ref('')
const makeupStartTime = ref('')
const makeupEndTime = ref('')
const selectedStudentId = ref(null)

// 시간 수정 모달 상태
const showTimeEditModal = ref(false)
const editStartTime = ref('')

// 보강 목록 필터
const selectedRange = ref('week')
const selectedOrder = ref('asc')
const makeupClassList = ref([])
const studentList = ref([])

const selectedMinutes = ref(10)


// --- 라이프사이클 훅 ---
onMounted(() => {
  webSocketStore.subscribe('/topic/activity-logs', handleActivityLog)
  fetchTodayClasses()
  fetchTodayAttendance()
  fetchStudents()
})

onUnmounted(() => {
  webSocketStore.unsubscribe('/topic/activity-logs', handleActivityLog)
})

// --- API 호출 함수 ---
async function fetchTodayClasses() {
  try {
    const res = await axios.get('/api/classes/today')
    todayClassList.value = res.data
  } catch (err) {
    console.error(err)
    alert('오늘 수업 불러오기 실패')
  }
}

async function fetchTodayAttendance() {
  try {
    const res = await axios.get('/api/attendance/today')
    attendanceList.value = res.data
  } catch (err) {
    console.error(err)
    alert('오늘 등원 목록 조회 실패')
  }
}

async function autoAddTodayClasses() {
  try {
    await axios.post('/api/classes/auto')
    alert('오늘 수업이 자동 등록되었습니다.')
    fetchTodayClasses()
  } catch (err) {
    console.error(err)
    alert('오늘 수업 자동 추가 중 오류가 발생했습니다.')
  }
}

async function fetchMakeupClasses() {
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
    alert('보강 이력 조회 중 오류가 발생했습니다.')
  }
}

async function fetchStudents() {
  try {
    const res = await axios.get('/api/students')
    studentList.value = res.data
  } catch (err) {
    console.error(err)
    alert('학생 목록 불러오기 실패')
  }
}

// --- 시간 관련 함수 ---
function withinThirtyRange(cls) {
  const now = dayjs()
  const [sh, sm] = cls.startTime.split(':')
  const [eh, em] = cls.endTime.split(':')

  const start = dayjs().hour(Number(sh)).minute(Number(sm)).second(0).subtract(30, 'minute')
  const end   = dayjs().hour(Number(eh)).minute(Number(em)).second(0).add(30, 'minute')

  return now.isAfter(start) && now.isBefore(end)
}

function parseTimeAsToday(hhmm) {
  const [hh, mm] = hhmm.split(':')
  return dayjs().hour(Number(hh)).minute(Number(mm)).second(0)
}

function isClassEnded(cls) {
  const now = dayjs()
  return parseTimeAsToday(cls.endTime).isBefore(now)
}

function getRemainingTime(cls) {
  const now = dayjs()
  const [h, m] = cls.endTime.split(':')
  const end = dayjs().hour(parseInt(h)).minute(parseInt(m))
  
  const diffMinutes = end.diff(now, 'minute')
  if (diffMinutes >= 60) {
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    return `${hours}시간 ${minutes}분`
  }
  return `${diffMinutes}분`
}

// --- 시간 추가 관련 함수 ---
function toggleTimeMenu(classId) {
  if (activeTimeMenu.value === classId) {
    activeTimeMenu.value = null
  } else {
    activeTimeMenu.value = classId
  }
}

async function addTime(cls, minutes) {
  try {
    const [h, m] = cls.endTime.split(':')
    const newEndTime = dayjs()
      .hour(parseInt(h))
      .minute(parseInt(m))
      .add(minutes, 'minute')
      .format('HH:mm')

    await axios.patch(`/api/classes/${cls.id}`, {
      endTime: newEndTime
    })

    fetchTodayClasses()
    activeTimeMenu.value = null
  } catch (err) {
    console.error(err)
    alert('수업 시간 추가 중 오류가 발생했습니다.')
  }
}


// --- 출결 상태 관련 함수 ---
function classStatusText(cls) {
  if (isClassEnded(cls)) {
    return cls.isMakeup ? "보강완료" : "수업완료"
  } else {
    return "수업중"
  }
}

function classStatusColor(cls) {
  if (isClassEnded(cls)) {
    return cls.isMakeup ? "text-purple-600" : "text-green-600"
  } else {
    return "text-orange-500"
  }
}

// --- Computed 속성 ---
const notAttendedClasses = computed(() => {
  const now = dayjs()
  return todayClassList.value.filter(cls => {
    const noAttendance = !attendanceList.value.some(a => a.studentId === cls.student.id)

    if (showAllTodayClasses.value) {
      return noAttendance
    } else {
      return noAttendance && withinThirtyRange(cls)
    }
  })
})

const attendedClasses = computed(() => {
  return todayClassList.value.filter(cls => {
    return attendanceList.value.some(a => a.studentId === cls.student.id)
  }).sort((a, b) => {
    // 아직 수업이 끝나지 않은 클래스를 우선 정렬
    const aEnded = isClassEnded(a)
    const bEnded = isClassEnded(b)
    
    if (aEnded !== bEnded) {
      return aEnded ? 1 : -1
    }
    
    // 수업이 끝나지 않은 경우, 남은 시간이 적은 순으로 정렬
    if (!aEnded && !bEnded) {
      const aRemainingMinutes = dayjs().diff(dayjs().hour(a.endTime.split(':')[0]).minute(a.endTime.split(':')[1]), 'minute')
      const bRemainingMinutes = dayjs().diff(dayjs().hour(b.endTime.split(':')[0]).minute(b.endTime.split(':')[1]), 'minute')
      
      return Math.abs(aRemainingMinutes) - Math.abs(bRemainingMinutes)
    }
    
    // 수업이 끝난 경우, 최근에 끝난 순으로 정렬
    return dayjs(b.endTime).diff(dayjs(a.endTime))
  })
})

// --- 모달 관련 함수 ---
function openMakeupModal(cls) {
  selectedClass.value = cls
  showMakeupModal.value = true
}

function closeMakeupModal() {
  selectedClass.value = null
  showMakeupModal.value = false
}

function openMakeupForm(type) {
  makeupTypeSelected.value = type
  makeupDate.value = ''
  makeupStartTime.value = ''
  makeupEndTime.value = ''
  showMakeupModal.value = false
  showMakeupFormModal.value = true
}

function closeMakeupForm() {
  showMakeupFormModal.value = false
  makeupTypeSelected.value = ''
  selectedClass.value = null
  selectedStudentId.value = null
}

// --- 등원/보강 처리 함수 ---
async function markAttendance(cls) {
  try {
    const now = dayjs()
    const params = new URLSearchParams()
    params.set('studentId', cls.student.id)
    params.set('makeup', cls.makeup)
    if (cls.makeup) {
      params.set('makeupType', cls.makeupType || '지각보강')
    }
    
    // 현재 시각을 등원 시간으로 설정
    const attendanceTime = now.format('HH:mm')
    params.set('startTime', attendanceTime)

    await axios.post(`/api/attendance?${params.toString()}`)
    
    // 수업 시간(duration) 계산
    const durationMinutes = getClassDurationMinutes(cls)
    
    // 새로운 종료 시간 계산 (현재 시각 + 수업 시간)
    const newEndTime = now.add(durationMinutes, 'minute').format('HH:mm')
    
    // 수업 시작 시간과 종료 시간 함께 업데이트
    await axios.patch(`/api/classes/${cls.id}`, {
      startTime: attendanceTime,
      endTime: newEndTime
    })

    alert(`${cls.student.name} 등원 기록이 등록되었습니다.`)
    
    closeMakeupModal()
    fetchTodayClasses()
    fetchTodayAttendance()
  } catch (err) {
    alert(err.response?.data || err.message)
  }
}

async function createMakeupClass() {
  if (!makeupDate.value || !makeupStartTime.value || !makeupEndTime.value) {
    alert('보강 날짜/시간을 모두 입력해주세요.')
    return
  }
  try {
    const payload = {
      student: selectedClass.value ? 
        { id: selectedClass.value.student.id } : (selectedStudentId.value ? {id: selectedStudentId.value} : null),
      startTime: makeupStartTime.value,
      endTime: makeupEndTime.value,
      classDate: makeupDate.value,
      makeup: true,
      makeupType: makeupTypeSelected.value
    }
    const res = await axios.post('/api/classes', payload)
    alert(`보강(${makeupTypeSelected.value}) 수업이 등록되었습니다. ID=${res.data.id}`)
    closeMakeupForm()
    fetchTodayClasses()
    fetchMakeupClasses()
  } catch (err) {
    alert(err.response?.data || err.message)
  }
}

// --- 감시자(Watcher) ---
watch([selectedRange, selectedOrder], () => {
  fetchMakeupClasses()
}, { immediate: true })

// 수업 시간(duration) 계산 함수 추가
function getClassDuration(cls) {
  if (!cls) return ''
  const start = dayjs(`2000-01-01 ${cls.startTime}`)
  const end = dayjs(`2000-01-01 ${cls.endTime}`)
  const diffMinutes = end.diff(start, 'minute')
  if (diffMinutes >= 60) {
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    return `${hours}시간 ${minutes > 0 ? ` ${minutes}분` : ''}`
  }
  return `${diffMinutes}분`
}

// 수업 시간(분) 계산
function getClassDurationMinutes(cls) { 
  if (!cls) return 0
  const start = dayjs(`2000-01-01 ${cls.startTime}`)
  const end = dayjs(`2000-01-01 ${cls.endTime}`)
  return end.diff(start, 'minute')
}

// 새로운 종료 시간 계산을 위한 computed 속성
const calculatedEndTime = computed(() => {
  if (!selectedClass.value || !editStartTime.value) return ''
  const durationMinutes = getClassDurationMinutes(selectedClass.value)
  return dayjs(`2000-01-01 ${editStartTime.value}`)
    .add(durationMinutes, 'minute')
    .format('HH:mm')
})

// 시간 수정 모달 관련 함수 수정
function openTimeEditModal(cls) {
  selectedClass.value = cls
  editStartTime.value = cls.startTime
  showTimeEditModal.value = true
}

function closeTimeEditModal() {
  showTimeEditModal.value = false
  selectedClass.value = null
  editStartTime.value = ''
}

async function updateClassTime() {
  if (!editStartTime.value) {
    alert('시작 시간을 입력해주세요.')
    return
  }

  try {
    await axios.patch(`/api/classes/${selectedClass.value.id}`, {
      startTime: editStartTime.value,
      endTime: calculatedEndTime.value
    })

    alert('수업 시간이 수정되었습니다.')
    closeTimeEditModal()
    fetchTodayClasses()
  } catch (err) {
    console.error(err)
    alert('수업 시간 수정 중 오류가 발생했습니다.')
  }
}

// 상태 추가
const showAttendanceModal = ref(false)
const selectedStudentName = ref('')
const studentMonthlyClasses = ref([])
const studentAttendances = ref([])

// 학생 출결 내역 조회 함수
async function showStudentAttendance(student) {
  selectedStudentName.value = student.name
  
  try {
    // 이번 달의 시작일과 마지막일 계산
    const startDate = dayjs().startOf('month').format('YYYY-MM-DD')
    const endDate = dayjs().endOf('month').format('YYYY-MM-DD')
    
    // 수업 목록 조회
    const classesResponse = await axios.get('/api/classes/range', {
      params: { startDate, endDate }
    })
    
    // 해당 학생의 수업만 필터링
    studentMonthlyClasses.value = classesResponse.data
      .filter(cls => cls.student.id === student.id)
      .sort((a, b) => a.classDate.localeCompare(b.classDate))
    
    // 출석 기록 조회
    const attendanceResponse = await axios.get(`/api/attendance/${student.id}`)
    studentAttendances.value = attendanceResponse.data
    
    showAttendanceModal.value = true
  } catch (error) {
    console.error('출결 내역 조회 실패:', error)
    alert('출결 내역을 불러오는데 실패했습니다.')
  }
}

// 출석 상태 텍스트
function getAttendanceStatusText(cls) {
  const attendance = studentAttendances.value.find(
    att => att.attendanceDate === cls.classDate
  )
  
  if (cls.classDate > dayjs().format('YYYY-MM-DD')) {
    return '예정'
  }
  
  return attendance ? '출석' : '결석'
}

// 출석 상태 스타일
function getAttendanceStatusStyle(cls) {
  const status = getAttendanceStatusText(cls)
  switch (status) {
    case '예정':
      return 'bg-gray-100 text-gray-600'
    case '출석':
      return 'bg-green-100 text-green-600'
    case '결석':
      return 'bg-red-100 text-red-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

// 날짜 포맷팅 함수 수정 (기존 함수 수정)
function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`
}

// --- 또는 새로운 함수를 추가 ---
function formatDateSimple(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return dayjs(date).format('MM월 DD일')
}

const currentMonthText = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}년 ${now.getMonth() + 1}월`
})

// 페이지네이션 관련 상태 추가
const currentPage = ref(1)
const itemsPerPage = 5

// 페이지네이션된 수업 목록을 위한 computed 속성
const paginatedClasses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return studentMonthlyClasses.value.slice(start, start + itemsPerPage)
})  

// 총 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(studentMonthlyClasses.value.length / itemsPerPage)
})

// 페이지 변경 함수
function changePage(page) {
  currentPage.value = page
}

function closeAttendanceModal() {
  showAttendanceModal.value = false
  selectedStudentName.value = ''
  studentMonthlyClasses.value = []
  studentAttendances.value = []
  currentPage.value = 1  // 페이지 초기화 추가
}

// 상태 관리에 추가
const searchQuery = ref('')
const attendancePerPage = ref(5)
const currentNotAttendedPage = ref(1)
const currentAttendedPage = ref(1)

// computed 속성 수정/추가
const filteredNotAttendedClasses = computed(() => {
  return notAttendedClasses.value.filter(cls => 
    cls.student?.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredAttendedClasses = computed(() => {
  return attendedClasses.value.filter(cls => 
    cls.student?.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const paginatedNotAttendedClasses = computed(() => {
  const start = (currentNotAttendedPage.value - 1) * attendancePerPage.value
  return filteredNotAttendedClasses.value.slice(start, start + attendancePerPage.value)
})

const paginatedAttendedClasses = computed(() => {
  const start = (currentAttendedPage.value - 1) * attendancePerPage.value
  return filteredAttendedClasses.value.slice(start, start + attendancePerPage.value)
})

const totalNotAttendedPages = computed(() => 
  Math.ceil(filteredNotAttendedClasses.value.length / attendancePerPage.value)
)

const totalAttendedPages = computed(() => 
  Math.ceil(filteredAttendedClasses.value.length / attendancePerPage.value)
)

// 페이지 변경 함수
function changeNotAttendedPage(page) {
  currentNotAttendedPage.value = page
}

function changeAttendedPage(page) {
  currentAttendedPage.value = page
}

// 검색어 변경 시 페이지 리셋
watch(searchQuery, () => {
  currentNotAttendedPage.value = 1
  currentAttendedPage.value = 1
})

// WebSocket 메시지 핸들러
async function handleActivityLog(message) {
  const logEvent = message
  
  // attendance 타입의 로그인 경우 데이터 새로고침
  if (logEvent.type === 'attendance') {
    // 등/하원 모두에 대해 데이터 새로고침
    setTimeout(async function () {
      await Promise.all([
        fetchTodayClasses(),
        fetchTodayAttendance()
      ])
    }, 500)
    
  }
}
</script>

<style scoped>
/* 필요한 스타일 */
</style>