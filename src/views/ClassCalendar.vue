<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="p-6 min-h-screen bg-gray-50">
        <!-- 페이지 헤더 -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 shadow-sm">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-blue-600" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiCalendarMonth" />
            </svg>
            <h1 class="text-2xl font-bold text-gray-800 ml-3">날짜별 수업 목록</h1>
          </div>
        </div>

        <!-- 메인 컨텐츠: 고정된 2:3 비율의 그리드 -->
        <div class="grid grid-cols-5 gap-6">
          <!-- 왼쪽: 달력 (2/5) -->
          <div class="col-span-2">
            <div class="bg-white rounded-xl shadow-sm overflow-hidden sticky top-6">
              <!-- 달력 헤더 -->
              <div class="bg-gradient-to-b from-gray-50 border-b border-gray-100 p-4">
                <div class="flex items-center justify-between">
                  <button 
                    class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    @click="changeMonth(-1)"
                  >
                    <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24">
                      <path fill="currentColor" :d="mdiChevronLeft" />
                    </svg>
                  </button>
                  <h2 class="text-lg font-semibold text-gray-800">
                    {{ currentYear }}년 {{ currentMonth + 1 }}월
                  </h2>
                  <button 
                    class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    @click="changeMonth(1)"
                  >
                    <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24">
                      <path fill="currentColor" :d="mdiChevronRight" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- 달력 본문 -->
              <div class="p-4">
                <div class="grid grid-cols-7 gap-1">
                  <!-- 요일 헤더 -->
                  <div 
                    v-for="day in ['일', '월', '화', '수', '목', '금', '토']" 
                    :key="day"
                    class="text-center py-2 text-sm font-medium"
                    :class="day === '일' ? 'text-red-500' : day === '토' ? 'text-blue-500' : 'text-gray-600'"
                  >
                    {{ day }}
                  </div>

                  <!-- 날짜 -->
                  <div
                    v-for="{ date, current, hasClasses } in calendarDays"
                    :key="date"
                    class="aspect-square p-0.5"
                  >
                    <button
                      class="w-full h-full rounded-lg flex flex-col items-center justify-center relative transition-all duration-200"
                      :class="[
                        current ? 'hover:bg-blue-50' : 'opacity-30',
                        isSelectedDate(date) ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm' : '',
                        hasClasses && !isSelectedDate(date) ? 'bg-blue-50' : ''
                      ]"
                      @click="selectDate(date)"
                    >
                      <span :class="[
                        'text-sm',
                        isSelectedDate(date) ? 'font-semibold' : ''
                      ]">
                        {{ new Date(date).getDate() }}
                      </span>
                      <div 
                        v-if="hasClasses && !isSelectedDate(date)" 
                        class="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-blue-400"
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 오른쪽: 수업 목록 (3/5) -->
          <div class="col-span-3">
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <div class="border-b border-gray-100 p-6">
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ selectedDate ? formatDate(selectedDate) : '날짜를 선택하세요' }}
                </h3>
              </div>

              <div class="p-6">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr class="border-b border-gray-100">
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학생</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수업 종류</th>
                        <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr 
                        v-for="cls in selectedDateClasses" 
                        :key="cls.id"
                        class="hover:bg-gray-50 transition-colors"
                      >
                        <td class="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                          {{ cls.startTime }} ~ {{ cls.endTime }}
                        </td>
                        <td class="px-4 py-3 text-sm font-medium text-gray-900">
                          {{ cls.student.name }}
                        </td>
                        <td class="px-4 py-3 text-sm">
                          <span 
                            v-if="cls.makeup" 
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {{ cls.makeupType }}
                          </span>
                          <span v-else class="text-gray-600">정규수업</span>
                        </td>
                        <td class="px-4 py-3 text-sm text-center">
                          <span 
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            :class="classStatusStyle(cls)"
                          >
                            {{ classStatusText(cls) }}
                          </span>
                        </td>
                      </tr>
                      <tr v-if="selectedDateClasses.length === 0">
                        <td colspan="4" class="px-4 py-8 text-center text-gray-500">
                          이 날짜에는 예정된 수업이 없습니다.
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'
import {
  mdiCalendarMonth,
  mdiChevronLeft,
  mdiChevronRight
} from '@mdi/js'

import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

// 상태 관리
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())
const selectedDate = ref(dayjs().format('YYYY-MM-DD'))
const classesByDate = ref({}) // { '2024-01-01': [...classes] }

const attendanceByDate = ref({})

// 달력 날짜 계산
const calendarDays = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1)
  const days = []

  // 이전 달의 마지막 날짜들
  const firstDay = date.getDay()
  const prevMonthLastDate = new Date(currentYear.value, currentMonth.value, 0)
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = new Date(currentYear.value, currentMonth.value - 1, prevMonthLastDate.getDate() - i)
    days.push({
      date: d.toISOString().split('T')[0],
      current: false,
      hasClasses: !!classesByDate.value[d.toISOString().split('T')[0]]
    })
  }

  // 현재 달의 날짜들
  const lastDate = new Date(currentYear.value, currentMonth.value + 1, 0)
  for (let i = 1; i <= lastDate.getDate(); i++) {
    const d = new Date(currentYear.value, currentMonth.value, i)
    days.push({
      date: d.toISOString().split('T')[0],
      current: true,
      hasClasses: !!classesByDate.value[d.toISOString().split('T')[0]]
    })
  }

  // 다음 달의 시작 날짜들
  const lastDay = lastDate.getDay()
  for (let i = 1; i < 7 - lastDay; i++) {
    const d = new Date(currentYear.value, currentMonth.value + 1, i)
    days.push({
      date: d.toISOString().split('T')[0],
      current: false,
      hasClasses: !!classesByDate.value[d.toISOString().split('T')[0]]
    })
  }

  return days
})

// 선택된 날짜의 수업 목록
const selectedDateClasses = computed(() => {
  return classesByDate.value[selectedDate.value] || []
})

// 날짜 변경 함수
function changeMonth(delta) {
  const newDate = new Date(currentYear.value, currentMonth.value + delta, 1)
  currentYear.value = newDate.getFullYear()
  currentMonth.value = newDate.getMonth()
  fetchMonthClasses()
}

function selectDate(date) {
  selectedDate.value = date
}

function isSelectedDate(date) {
  return selectedDate.value === date
}

// 날짜 포맷팅
function formatDate(dateStr) {
  const date = new Date(dateStr)
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`
}

// 수업 상태 관련 함수 수정
function classStatusText(cls) {
  const now = dayjs()
  const classDate = dayjs(cls.classDate)
  const todayAttendances = attendanceByDate.value[cls.classDate] || []
  const hasAttendance = todayAttendances.some(att => 
    att.studentId === cls.student.id && 
    att.attendanceDate === cls.classDate
  )
  
  if (classDate.isAfter(now, 'day')) {
    return '예정'
  }
  
  if (classDate.isBefore(now, 'day')) {
    return hasAttendance ? '완료' : '결석'
  }
  
  const currentTime = now.format('HH:mm')
  if (currentTime < cls.startTime) {
    return '예정'
  } else if (currentTime > cls.endTime) {
    return hasAttendance ? '완료' : '결석'
  } else {
    return hasAttendance ? '진행중' : '미출석'
  }
}

function classStatusStyle(cls) {
  const status = classStatusText(cls)
  switch (status) {
    case '예정':
      return 'bg-gray-100 text-gray-600'
    case '진행중':
      return 'bg-green-100 text-green-600'
    case '완료':
      return 'bg-blue-100 text-blue-600'
    case '결석':
      return 'bg-red-100 text-red-600'
    case '미출석':
      return 'bg-yellow-100 text-yellow-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

// API 호출
async function fetchMonthClasses() {
  try {
    const startDate = dayjs(new Date(currentYear.value, currentMonth.value, 1))
      .format('YYYY-MM-DD')
    const endDate = dayjs(new Date(currentYear.value, currentMonth.value + 1, 0))
      .format('YYYY-MM-DD')
    
    // 수업 데이터 조회
    const classResponse = await axios.get('/api/classes/range', {
      params: { startDate, endDate }
    })
    
    // 날짜별로 수업 데이터 정리
    classesByDate.value = classResponse.data.reduce((acc, cls) => {
      const date = cls.classDate
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(cls)
      return acc
    }, {})

    // 출석 데이터 조회
    const attendancePromises = Array.from(new Set(classResponse.data.map(cls => cls.student.id)))
      .map(studentId => axios.get(`/api/attendance/${studentId}`))
    const attendanceResponses = await Promise.all(attendancePromises)
    
    // 날짜별 출석 데이터 정리
    attendanceByDate.value = attendanceResponses.flatMap(res => res.data)
      .reduce((acc, att) => {
        const date = att.attendanceDate
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(att)
        return acc
      }, {})

  } catch (error) {
    console.error('데이터 조회 실패:', error)
    alert('데이터를 불러오는데 실패했습니다.')
  }
}



// 초기 데이터 로드
onMounted(() => {
  fetchMonthClasses()
})
</script>