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

        <!-- "오늘 수업 자동 추가" 버튼 -->
        <div class="mb-4">
          <button
            class="bg-green-500 text-white px-4 py-2 rounded shadow"
            @click="autoAddTodayClasses"
          >
            오늘 수업 자동 추가
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
            <!-- (1) 등원: 아직 Attendance가 없는 수업 목록 -->
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
                  <!-- + 버튼 (등원 or 보강 선택) -->
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

            <!-- (2) 하원: 이미 Attendance가 있는 수업 -->
            <div>
              <h3 class="font-semibold mb-2">하원</h3>
              <ul class="space-y-3">
                <li 
                  v-for="(cls, idx) in attendedClasses"
                  :key="cls.id"
                  class="p-2 border rounded flex items-center justify-between"
                >
                  <div>
                    <div class="font-bold">
                      {{ cls.student?.name }} 
                      ({{ cls.startTime }} ~ {{ cls.endTime }})
                    </div>
                    <!-- 수업 완료 / 보강 완료 / 수업중 -->
                    <div class="text-sm" :class="classStatusColor(cls)">
                      {{ classStatusText(cls) }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

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
                <!-- 학생명, 날짜, 시간, isMakeup이니 '보강'임 -->
                <div class="font-bold">
                  {{ mc.student.name }}
                </div>
                <div class="text-sm text-gray-600">
                  {{ mc.classDate }} ({{ mc.startTime }} ~ {{ mc.endTime }})
                </div>
              </div>
              <div class="text-green-600 font-semibold"> {{ mc.makeupType }}</div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 모달: 등원/결석보강/공결보강/지각보강 선택 -->
      <div 
        v-if="showMakeupModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
      >
        <div class="bg-white p-4 rounded w-80">
          <h3 class="text-lg font-semibold mb-2">수업 처리</h3>
          <p class="text-sm text-gray-600 mb-4">
            {{ selectedClass?.student?.name }} 수업 처리 방법을 선택하세요.
          </p>
          <div class="space-y-2">
            <button 
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

      <!-- 모달: 보강 일정 잡기 (날짜/시간 입력) -->
      <div 
        v-if="showMakeupFormModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
      >
        <div class="bg-white p-4 rounded w-80">
          <h3 class="text-lg font-semibold mb-2">보강 일정 등록 ({{ makeupTypeSelected }})</h3>
          <p class="text-sm text-gray-600 mb-2">
            {{ selectedClass?.student?.name }} 학생 / 수업ID={{ selectedClass?.id }}
          </p>
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

// --- 보강 이력 예시 ---
const selectedPeriod = ref('week')
const makeupData = {
  week: [
    { name: '이영희', date: '2025-01-13 (14:30-16:00)', type: '결석보강' },
    { name: '최준영', date: '2025-01-12 (13:30-15:00)', type: '공결보강' },
    { name: '김민지', date: '2025-01-10 (15:00-16:30)', type: '지각보강' },
  ],
  month: [
    { name: '박준호', date: '2025-01-05', type: '결석보강' },
    { name: '이영희', date: '2025-01-02', type: '결석보강' },
  ]
}
const makeupList = computed(() => makeupData[selectedPeriod.value])

// --- Class 목록 & Attendance 목록 ---
const todayClassList = ref([])
const attendanceList = ref([])

// 스위치(체크박스) - ON이면 모든 수업 표시, OFF이면 시간 필터
const showAllTodayClasses = ref(false)

// onMounted 시, 수업 & 등원 목록 불러오기
onMounted(() => {
  fetchTodayClasses()
  fetchTodayAttendance()
})

// 1) 오늘 Class 가져오기
async function fetchTodayClasses() {
  try {
    const res = await axios.get('/api/classes/today')
    todayClassList.value = res.data
    console.log(todayClassList.value)
  } catch (err) {
    console.error(err)
    alert('오늘 수업 불러오기 실패')
  }
}

// 2) 오늘 Attendance 가져오기
async function fetchTodayAttendance() {
  try {
    const res = await axios.get('/api/attendance/today')
    attendanceList.value = res.data
  } catch (err) {
    console.error(err)
    alert('오늘 등원 목록 조회 실패')
  }
}

// "오늘 수업 자동 추가" 버튼
async function autoAddTodayClasses() {
  try {
    await axios.post('/api/classes/auto')
    alert('오늘 수업이 자동 등록되었습니다.')
    // 다시 목록 불러오기
    fetchTodayClasses()
  } catch (err) {
    console.error(err)
    alert('오늘 수업 자동 추가 중 오류가 발생했습니다.')
  }
}

// -------------------
// 등원 / 보강 처리
// -------------------
const showMakeupModal = ref(false)
const selectedClass = ref(null)

function openMakeupModal(cls) {
  selectedClass.value = cls
  showMakeupModal.value = true
}

function closeMakeupModal() {
  selectedClass.value = null
  showMakeupModal.value = false
}

async function markAttendance(cls) {
  try {
    // 만약 cls.makeup=true 라면, 보강 사유(cls.makeupType 등)를 같이 보내준다
    // 예) ?studentId=1&makeup=true&makeupType=지각보강
    const params = new URLSearchParams()
    params.set('studentId', cls.student.id)
    params.set('makeup', cls.makeup) // true/false
    if (cls.makeup) {
      // 만약 보강인 경우, 보강 사유도 전송
      params.set('makeupType', cls.makeupType || '지각보강') 
      // 실제로는 cls.makeupType이 있으면 그 값 사용
    }

    await axios.post(`/api/attendance?${params.toString()}`)
    alert(`${cls.student.name} 등원 기록이 등록되었습니다.`)

    closeMakeupModal()
    fetchTodayAttendance()
  } catch (err) {
    alert(err.response?.data || err.message)
  }
}


// 보강 모달
const showMakeupFormModal = ref(false)
const makeupTypeSelected = ref('')
const makeupDate = ref('')
const makeupStartTime = ref('')
const makeupEndTime = ref('')

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
}

// 보강 수업 생성
async function createMakeupClass() {
  if (!makeupDate.value || !makeupStartTime.value || !makeupEndTime.value) {
    alert('보강 날짜/시간을 모두 입력해주세요.')
    return
  }
  try {
    const payload = {
      student: { id: selectedClass.value.student.id },
      startTime: makeupStartTime.value,
      endTime: makeupEndTime.value,
      classDate: makeupDate.value,
      makeup: true,
      makeupType: makeupTypeSelected.value
    }
    const res = await axios.post('/api/classes', payload)
    alert(`보강(${makeupTypeSelected.value}) 수업이 등록되었습니다. ID=${res.data.id}`)
    closeMakeupForm()
    // 수업 목록 리프레시 (보강 수업도 오늘일 수 있음)
    fetchTodayClasses()
    fetchMakeupClasses()
  } catch (err) {
    alert(err.response?.data || err.message)
  }
}

// -------------------
// 하원 상태 표시
// -------------------
/**
 * (A) 아직 등원 안 한(Attendance 없음) 수업 목록
 *    - showAllTodayClasses = false → 시간 필터 (현재 시각 기준, endTime > now 등등)
 *    - showAllTodayClasses = true  → 필터 없이 "오늘 수업" 전부
 */

function withinThirtyRange(cls) {
  // ex) startTime-30, endTime+30
  const now = dayjs()
  const [sh, sm] = cls.startTime.split(':')
  const [eh, em] = cls.endTime.split(':')

  const start = dayjs().hour(Number(sh)).minute(Number(sm)).second(0).subtract(30, 'minute')
  const end   = dayjs().hour(Number(eh)).minute(Number(em)).second(0).add(30, 'minute')

  // now가 start~end 범위 내에 있어야 true
  return now.isAfter(start) && now.isBefore(end)
}

const notAttendedClasses = computed(() => {
  const now = dayjs()
  return todayClassList.value.filter(cls => {
    // attendance 없는 경우만
    const noAttendance = !attendanceList.value.some(a => a.studentId === cls.student.id)

    if (showAllTodayClasses.value) {
      // 스위치 ON → 시간 제한없이 표시
      return noAttendance
    } else {
      // 스위치 OFF → "현재 시각 < endTime" 정도의 필터 (예: 진행중)
      return noAttendance && withinThirtyRange(cls)
    }
  })
})

/**
 * (B) 등원한(Attendance 있음) 수업 목록 (하원 리스트)
 *   - 표시하되, "수업끝"인지 "수업중"인지 구분
 */
const attendedClasses = computed(() => {
  return todayClassList.value.filter(cls => {
    return attendanceList.value.some(a => a.studentId === cls.student.id)
  })
})

/** 
 * 보조 함수: 해당 수업이 이미 끝났으면 true 
 * (endTime < now)
 */
function isClassEnded(cls) {
  const now = dayjs()
  return parseTimeAsToday(cls.endTime).isBefore(now)
}

/**
 * 수업 상태 텍스트: 
 * - 끝났고 isMakeup=false → "수업완료"
 * - 끝났고 isMakeup=true  → "보강완료"
 * - 아직 안끝남 → "수업중"
 */
function classStatusText(cls) {
  if (isClassEnded(cls)) {
    return cls.isMakeup ? "보강완료" : "수업완료"
  } else {
    return "수업중"
  }
}

/** 상태별 색상 */
function classStatusColor(cls) {
  if (isClassEnded(cls)) {
    return cls.isMakeup ? "text-purple-600" : "text-green-600"
  } else {
    return "text-orange-500"
  }
}

// 문자열 "HH:mm" 을 오늘 날짜 기준 dayjs 객체로 변환
function parseTimeAsToday(hhmm) {
  const [hh, mm] = hhmm.split(':')
  return dayjs().hour(Number(hh)).minute(Number(mm)).second(0)
}

const selectedRange = ref('week')     // "week" or "month"
const selectedOrder = ref('asc')      // "asc" or "desc"
const makeupClassList = ref([])

watch([selectedRange, selectedOrder], () => {
  fetchMakeupClasses()
}, { immediate: true })

async function fetchMakeupClasses() {
  try {
    // 예: GET /api/classes/makeup?range=week&order=asc
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
</script>

<style scoped>
/* 필요한 스타일 */
</style>
