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
            <h1 class="text-2xl font-bold text-gray-800 ml-3">날짜별 출결 현황</h1>
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
                    v-for="{ date, current, hasRecords } in calendarDays"
                    :key="date"
                    class="aspect-square p-0.5"
                  >
                    <button
                      class="w-full h-full rounded-lg flex flex-col items-center justify-center relative transition-all duration-200"
                      :class="[
                        current ? 'hover:bg-blue-50' : 'opacity-30',
                        isSelectedDate(date) ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm' : '',
                        hasRecords && !isSelectedDate(date) ? 'bg-blue-50' : ''
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
                        v-if="hasRecords && !isSelectedDate(date)" 
                        class="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-blue-400"
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 오른쪽: 출결 목록 (3/5) -->
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
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학생</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">종류</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                        <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr 
                        v-for="record in selectedDateRecords" 
                        :key="`${record.type}-${record.id}`"
                        class="hover:bg-gray-50 transition-colors"
                      >
                        <td class="px-4 py-3 text-sm font-medium text-gray-900">
                          {{ getStudentName(record.studentId) }}
                        </td>
                        <td class="px-4 py-3 text-sm">
                          <span 
                            v-if="record.type === 'absence'" 
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                          >
                            결석
                          </span>
                          <span 
                            v-else-if="record.makeup" 
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {{ record.makeupType || '보강' }}
                          </span>
                          <span 
                            v-else 
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            일반 출석
                          </span>
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-500">
                          {{ record.type === 'absence' ? '-' : `${record.startTime || '-'} ~ ${record.endTime || '-'}` }}
                        </td>
                        <td class="px-4 py-3 text-sm text-center">
                          <span 
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            :class="getStatusStyle(record)"
                          >
                            {{ getStatusText(record) }}
                          </span>
                        </td>
                      </tr>
                      <tr v-if="selectedDateRecords.length === 0">
                        <td colspan="4" class="px-4 py-8 text-center text-gray-500">
                          이 날짜에는 출결 기록이 없습니다.
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

// 출결 기록 저장 객체
const attendancesByDate = ref({}) // { '2024-01-01': [...attendance_records] }
const absencesByDate = ref({}) // { '2024-01-01': [...absence_records] }
const studentList = ref([]) // 학생 목록

function formatISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 달력 날짜 계산
const calendarDays = computed(() => {
  // 현재 월의 첫 날과 마지막 날
  const firstDateOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const lastDateOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
  
  const days = [];
  
  // 첫 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const firstDayOfMonth = firstDateOfMonth.getDay();
  if (firstDayOfMonth > 0) {
    const prevMonthLastDate = new Date(currentYear.value, currentMonth.value, 0);
    const prevMonthLastDay = prevMonthLastDate.getDate();
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = prevMonthLastDay - (firstDayOfMonth - 1) + i;
      const prevDate = new Date(
        prevMonthLastDate.getFullYear(),
        prevMonthLastDate.getMonth(),
        day
      );
      const dateStr = formatISODate(prevDate)
      console.log(dateStr, prevDate, day)
      
      days.push({
        date: dateStr,
        current: false,
        hasRecords: hasRecordsForDate(dateStr)
      });
    }
  }
  
  
  // 현재 달의 날짜들
  for (let i = 1; i <= lastDateOfMonth.getDate(); i++) {
    const curDate = new Date(currentYear.value, currentMonth.value, i);
    const dateStr = formatISODate(curDate);
    
    days.push({
      date: dateStr,
      current: true,
      hasRecords: hasRecordsForDate(dateStr)
    });
  }
  
  // 다음 달의 날짜들을 채우기
  const lastDayOfMonth = lastDateOfMonth.getDay();
  const daysToAdd = 6 - lastDayOfMonth;
  
  if (daysToAdd > 0) {
    for (let i = 1; i <= daysToAdd; i++) {
      const nextDate = new Date(currentYear.value, currentMonth.value + 1, i);
      const dateStr = formatISODate(nextDate);
      
      days.push({
        date: dateStr,
        current: false,
        hasRecords: hasRecordsForDate(dateStr)
      });
    }
  }
  
  return days;
})

// 선택된 날짜의 출결 기록 목록
const selectedDateRecords = computed(() => {
  if (!selectedDate.value) return []
  
  // 출석 기록과 결석 기록을 합쳐서 반환
  const attendances = (attendancesByDate.value[selectedDate.value] || [])
    .map(att => ({ ...att, type: 'attendance' }))
  
  const absences = (absencesByDate.value[selectedDate.value] || [])
    .map(abs => ({ ...abs, type: 'absence' }))
  
  // 모든 기록을 합쳐서 반환
  return [...attendances, ...absences].sort((a, b) => {
    // 학생 이름 순으로 정렬
    const nameA = getStudentName(a.studentId)
    const nameB = getStudentName(b.studentId)
    return nameA.localeCompare(nameB)
  })
})

// 날짜별 출결 기록 여부 확인
function hasRecordsForDate(date) {
  return (
    (attendancesByDate.value[date] && attendancesByDate.value[date].length > 0) ||
    (absencesByDate.value[date] && absencesByDate.value[date].length > 0)
  )
}

// 날짜 변경 함수
function changeMonth(delta) {
  const newDate = new Date(currentYear.value, currentMonth.value + delta, 1)
  currentYear.value = newDate.getFullYear()
  currentMonth.value = newDate.getMonth()
  fetchMonthRecords()
}

function selectDate(date) {
  selectedDate.value = date
}

function isSelectedDate(date) {
  return selectedDate.value === date
}

// 학생 이름 가져오기
function getStudentName(studentId) {
  const student = studentList.value.find(s => s.id === studentId)
  return student ? student.name : `학생 #${studentId}`
}

// 출결 상태 텍스트
function getStatusText(record) {
  if (record.type === 'absence') {
    return '결석'
  } else {
    const now = dayjs()
    const recordDate = dayjs(record.attendanceDate)
    
    if (recordDate.isAfter(now, 'day')) {
      return '예정'
    }

    // 수업 종료 시간 확인
    if (record.endTime) {
      const endTime = dayjs(`${record.attendanceDate} ${record.endTime}`)
      
      if (now.isAfter(endTime)) {
        return '완료'
      } else {
        return '진행중'
      }
    }
    
    return record.makeup ? '보강' : '출석'
  }
}

// 출결 상태 스타일
function getStatusStyle(record) {
  const status = getStatusText(record)
  switch (status) {
    case '예정':
      return 'bg-gray-100 text-gray-600'
    case '진행중':
      return 'bg-yellow-100 text-yellow-600'
    case '완료':
      return 'bg-blue-100 text-blue-600'
    case '결석':
      return 'bg-red-100 text-red-600'
    case '출석':
    case '보강':
      return 'bg-green-100 text-green-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

// 날짜 포맷팅
function formatDate(dateStr) {
  const date = new Date(dateStr)
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`
}

// API 호출
async function fetchMonthRecords() {
  try {
    const startDate = dayjs(new Date(currentYear.value, currentMonth.value, 1))
      .format('YYYY-MM-DD')
    const endDate = dayjs(new Date(currentYear.value, currentMonth.value + 1, 0))
      .format('YYYY-MM-DD')
    
    // 학생 목록 조회
    if (studentList.value.length === 0) {
      const studentsResponse = await axios.get('/api/students')
      studentList.value = studentsResponse.data
    }
    
    // 출석 기록 조회
    const attendanceResponse = await axios.get('/api/attendance/range', {
      params: { startDate, endDate }
    })
    
    // 날짜별로 출석 데이터 정리
    attendancesByDate.value = attendanceResponse.data.reduce((acc, att) => {
      const date = att.attendanceDate
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(att)
      return acc
    }, {})

    // 결석 기록 조회
    const absenceResponse = await axios.get('/api/absence/range', {
      params: { startDate, endDate }
    })
    
    // 날짜별로 결석 데이터 정리
    absencesByDate.value = absenceResponse.data.reduce((acc, abs) => {
      const date = abs.absenceDate
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(abs)
      return acc
    }, {})

  } catch (error) {
    console.error('데이터 조회 실패:', error)
    alert('데이터를 불러오는데 실패했습니다.')
  }
}

// 초기 데이터 로드
onMounted(() => {
  fetchMonthRecords()
})
</script>