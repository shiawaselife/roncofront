<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div>
        <!-- 페이지 상단 제목 -->
        <div class="flex items-center mb-6">
          <svg class="w-6 h-6 mr-2 text-blue-500" viewBox="0 0 24 24">
            <path fill="currentColor" :d="mdiCalendarCheckOutline" />
          </svg>
          <h1 class="text-2xl font-bold">출결 관리</h1>
        </div>

        <!-- 버튼 영역 -->
        <div class="mb-4 flex space-x-2">
          <button
            class="bg-green-500 text-white px-4 py-2 rounded shadow"
            @click="autoAddTodayClasses"
          >
            오늘 수업 자동 추가
          </button>
          <button
            class="bg-purple-500 text-white px-4 py-2 rounded shadow"
            @click="openMakeupModal(null)"
          >
            보강 추가
          </button>
        </div>

        <!-- 출결 현황 -->
        <div class="bg-white p-4 rounded shadow mb-6">
          <div class="flex items-center mb-4">
            <svg class="w-5 h-5 mr-2 text-gray-600" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiAccountCheckOutline"/>
            </svg>
            <h2 class="text-lg font-semibold mr-4">출결 현황</h2>
            
            <!-- 스위치(체크박스) -->
            <label class="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                class="mr-1" 
                v-model="showAllTodayClasses" 
              />
              <span class="text-sm text-gray-700">전체 표시</span>
            </label>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <!-- 등원 -->
            <div>
              <h3 class="font-semibold mb-2">등원</h3>
              <ul class="space-y-3">
                <li 
                  v-for="(cls, idx) in notAttendedClasses"
                  :key="cls.id"
                  class="p-2 border rounded flex items-center justify-between"
                >
                  <div>
                    <div class="font-bold">
                      {{ cls.student?.name }} 
                      ({{ cls.startTime }} ~ {{ cls.endTime }})
                    </div>
                    <div class="text-sm text-gray-500">
                      수업ID: {{ cls.id }}
                    </div>
                  </div>
                  <button 
                    class="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
                    @click="openMakeupModal(cls)"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="currentColor" :d="mdiPlus" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>

            <!-- 하원 -->
            <div>
              <h3 class="font-semibold mb-2">하원</h3>
              <ul class="space-y-3">
                <li 
                  v-for="(cls, idx) in attendedClasses"
                  :key="cls.id"
                  class="p-2 border rounded"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div>
                      <div class="font-bold">
                        {{ cls.student?.name }} 
                        ({{ cls.startTime }} ~ {{ cls.endTime }})
                      </div>
                      <div class="text-sm" :class="classStatusColor(cls)">
                        {{ classStatusText(cls) }}
                        <span v-if="!isClassEnded(cls)" class="ml-2">
                          ({{ getRemainingTime(cls) }} 남음)
                        </span>
                      </div>
                    </div>
                    <!-- 시간 추가/수정 버튼 -->
                    <div class="flex space-x-2">
                      <!-- 시간 추가 드롭다운 -->
                      <div class="relative">
                        <button 
                          class="bg-yellow-500 text-white px-3 py-1 rounded"
                          @click="toggleTimeMenu(cls.id)"
                        >
                          시간 추가
                        </button>
                        <div 
                          v-if="activeTimeMenu === cls.id"
                          class="absolute right-0 mt-1 w-24 bg-white border rounded shadow-lg z-10"
                        >
                          <button
                            v-for="time in [10, 20, 30, 40, 50, 60]"
                            :key="time"
                            class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            @click="addTime(cls, time)"
                          >
                            +{{ time }}분
                          </button>
                        </div>
                      </div>
                      
                      <!-- 시간 수정 버튼 -->
                      <button 
                        class="bg-blue-500 text-white px-3 py-1 rounded"
                        @click="openTimeEditModal(cls)"
                      >
                        시간 수정
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 보강 목록 -->
        <div class="bg-white p-4 rounded shadow">
          <div class="flex items-center mb-4">
            <svg class="w-5 h-5 mr-2 text-gray-600" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiHistory" />
            </svg>
            <h2 class="text-lg font-semibold">보강 목록</h2>
          </div>

          <!-- 범위(주간/월간), 정렬(asc/desc) -->
          <div class="flex items-center mb-4 space-x-2">
            <select class="border p-1 text-sm rounded" v-model="selectedRange">
              <option value="week">주간</option>
              <option value="month">월간</option>
            </select>
            <select class="border p-1 text-sm rounded" v-model="selectedOrder">
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>

          <!-- 보강 리스트 -->
          <ul class="space-y-2">
            <li 
              v-for="mc in makeupClassList" 
              :key="mc.id"
              class="flex items-center justify-between bg-gray-50 p-2 rounded"
            >
              <div>
                <div class="font-bold">
                  {{ mc.student.name }}
                </div>
                <div class="text-sm text-gray-600">
                  {{ mc.classDate }} ({{ mc.startTime }} ~ {{ mc.endTime }})
                </div>
              </div>
              <div class="text-green-600 font-semibold">{{ mc.makeupType }}</div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 모달: 등원/결석보강/공결보강/지각보강 선택 -->
      <div 
        v-if="showMakeupModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-4 rounded w-80">
          <h3 class="text-lg font-semibold mb-2">
            {{ selectedClass ? '수업 처리' : '보강 추가' }}
          </h3>
          <p v-if="selectedClass" class="text-sm text-gray-600 mb-4">
            {{ selectedClass?.student?.name }} 수업 처리 방법을 선택하세요.
          </p>
          <div class="space-y-2">
            <button 
              v-if="selectedClass"
              class="bg-blue-500 text-white w-full py-1 rounded"
              @click="markAttendance(selectedClass)"
            >
              등원 기록 남기기
            </button>
            <button 
              class="bg-gray-200 text-gray-700 w-full py-1 rounded"
              @click="openMakeupForm('결석보강')"
            >
              결석보강
            </button>
            <button 
              class="bg-gray-200 text-gray-700 w-full py-1 rounded"
              @click="openMakeupForm('공결보강')"
            >
              공결보강
            </button>
            <button 
              class="bg-gray-200 text-gray-700 w-full py-1 rounded"
              @click="openMakeupForm('지각보강')"
            >
              지각보강
            </button>
          </div>
          <button 
            class="mt-4 w-full bg-red-500 text-white py-1 rounded"
            @click="closeMakeupModal"
          >
            닫기
          </button>
        </div>
      </div>

      <!-- 모달: 보강 일정 잡기 -->
      <div 
        v-if="showMakeupFormModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-4 rounded w-80">
          <h3 class="text-lg font-semibold mb-2">
            보강 일정 등록 ({{ makeupTypeSelected }})
          </h3>
          
          <!-- 기존 수업에서 온 경우 -->
          <p v-if="selectedClass" class="text-sm text-gray-600 mb-2">
            {{ selectedClass?.student?.name }} 학생 / 수업ID={{ selectedClass?.id }}
          </p>
          
          <!-- 보강 추가 버튼에서 온 경우: 학생 선택 드롭다운 -->
          <div v-if="!selectedClass" class="mb-4">
            <label class="text-sm block mb-1">학생 선택:</label>
            <select 
              v-model="selectedStudentId"
              class="border p-1 w-full rounded"
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

          <label class="text-sm block mb-1">보강 날짜:</label>
          <input 
            type="date" 
            v-model="makeupDate" 
            class="border p-1 w-full rounded mb-2"
          />
          
          <label class="text-sm block mb-1">보강 시작시간:</label>
          <input 
            type="time" 
            v-model="makeupStartTime" 
            class="border p-1 w-full rounded mb-2"
          />
          
          <label class="text-sm block mb-1">보강 종료시간:</label>
          <input 
            type="time" 
            v-model="makeupEndTime" 
            class="border p-1 w-full rounded mb-4"
          />

          <div class="flex space-x-2">
            <button 
              class="bg-blue-500 text-white flex-1 py-1 rounded"
              @click="createMakeupClass"
            >
              등록
            </button>
            <button 
              class="bg-red-500 text-white flex-1 py-1 rounded"
              @click="closeMakeupForm"
            >
              취소
            </button>
          </div>
        </div>
      </div>

      <!-- 모달: 시간 수정 -->
      <div 
        v-if="showTimeEditModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-4 rounded w-80">
          <h3 class="text-lg font-semibold mb-2">수업 시간 수정</h3>
          <p class="text-sm text-gray-600 mb-4">
            {{ selectedClass?.student?.name }} 학생
          </p>
          
          <div class="space-y-4">
            <div>
              <label class="text-sm block mb-1">시작 시간:</label>
              <input 
                type="time" 
                v-model="editStartTime" 
                class="border p-1 w-full rounded"
              />
            </div>
            
            <div>
              <label class="text-sm block mb-1">종료 시간:</label>
              <input 
                type="time" 
                v-model="editEndTime" 
                class="border p-1 w-full rounded"
              />
            </div>
          </div>

          <div class="flex space-x-2 mt-4">
            <button 
              class="bg-blue-500 text-white flex-1 py-1 rounded"
              @click="updateClassTime"
            >
              저장
            </button>
            <button 
              class="bg-gray-300 text-gray-700 flex-1 py-1 rounded"
              @click="closeTimeEditModal"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'

import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

import { 
  mdiCalendarCheckOutline,
  mdiAccountCheckOutline,
  mdiPlus,
  mdiHistory
} from '@mdi/js'

// --- 상태 관리 ---
const todayClassList = ref([])
const attendanceList = ref([])
const showAllTodayClasses = ref(false)
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
const editEndTime = ref('')

// 보강 목록 필터
const selectedRange = ref('week')
const selectedOrder = ref('asc')
const makeupClassList = ref([])
const studentList = ref([])

// --- 라이프사이클 훅 ---
onMounted(() => {
  fetchTodayClasses()
  fetchTodayAttendance()
  fetchStudents()
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

// --- 시간 수정 관련 함수 ---
function openTimeEditModal(cls) {
  selectedClass.value = cls
  editStartTime.value = cls.startTime
  editEndTime.value = cls.endTime
  showTimeEditModal.value = true
}

function closeTimeEditModal() {
  showTimeEditModal.value = false
  selectedClass.value = null
  editStartTime.value = ''
  editEndTime.value = ''
}

async function updateClassTime() {
  if (!editStartTime.value || !editEndTime.value) {
    alert('시작 시간과 종료 시간을 모두 입력해주세요.')
    return
  }

  try {
    await axios.patch(`/api/classes/${selectedClass.value.id}`, {
      startTime: editStartTime.value,
      endTime: editEndTime.value
    })

    alert('수업 시간이 수정되었습니다.')
    closeTimeEditModal()
    fetchTodayClasses()
  } catch (err) {
    console.error(err)
    alert('수업 시간 수정 중 오류가 발생했습니다.')
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
    
    // 수업 시작 시간도 업데이트
    await axios.patch(`/api/classes/${cls.id}`, {
      startTime: attendanceTime
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
</script>

<style scoped>
/* 필요한 스타일 */
</style>