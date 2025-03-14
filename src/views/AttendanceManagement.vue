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
              @click="router.push('/classes/calendar')"
              class="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiCalendarOutline" />
              </svg>
              전체 출결 보기
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
                        v-model="showOnlyTodayClasses"
                        class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                      />
                      <span class="text-sm text-gray-600">오늘 수업만 보기</span>
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
                        v-for="student in paginatedNotAttendedStudents"
                        :key="student.id"
                        class="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-200"
                      >
                        <div class="flex justify-between items-center h-full">
                          <div class="flex flex-col justify-between h-full">
                            <div>
                              <h3 class="font-semibold text-gray-800">
                                <button @click="showStudentAttendance(student)" class="hover:text-blue-600">
                                  {{ student.name }} 
                                </button>
                              </h3>
                              <p class="text-xs text-gray-500 mt-1">
                                학생ID: {{ student.id }}
                              </p>
                            </div>
                          </div>
                          <button 
                            @click="markAttendance(student)"
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

                      <div v-if="filteredNotAttendedStudents.length === 0" class="text-center py-4 text-gray-500">
                        표시할 학생이 없습니다.
                      </div>
                    </div>
                  </div>

                  <!-- 하원 -->
                  <div>
                    <div class="flex flex-wrap items-center justify-between mb-3 gap-2">
                      <h3 class="font-semibold text-gray-700">하원</h3>
                      <div class="flex flex-wrap items-center gap-4">
                        <label class="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            v-model="showCompletedClasses"
                            class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                          />
                          <span class="text-sm text-gray-600">종료된 수업 보기</span>
                        </label>
                        <label class="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            v-model="showOngoingClasses"
                            class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                          />
                          <span class="text-sm text-gray-600">수업중인 수업 보기</span>
                        </label>
                        <label class="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            v-model="showAbsences"
                            class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                          />
                          <span class="text-sm text-gray-600">결석 보기</span>
                        </label>
                      </div>
                    </div>
                    <div class="space-y-3">
                      <div 
                        v-for="attendance in paginatedAttendances"
                        :key="attendance.id"
                        class="p-4 bg-gray-50 rounded-lg border border-gray-200"
                        v-show="shouldShowAttendance(attendance)"
                      >
                        <div class="flex justify-between items-center h-full">
                          <div class="flex flex-col justify-between h-full">
                            <h3 class="font-semibold text-gray-800">
                              <button 
                                @click="showStudentAttendance(getStudentById(attendance.studentId))"
                                class="hover:text-blue-600"
                              >
                                {{ getStudentName(attendance.studentId) }}
                              </button>
                            </h3>
                            <p class="text-sm">
                              <span 
                                :class="{
                                  'text-red-600': isClassCompleted(attendance),
                                  'text-purple-600': attendance.makeup,
                                  'text-green-600': !attendance.makeup && !isClassCompleted(attendance),
                                  'text-gray-600': !attendance.makeup && isClassCompleted(attendance)
                                }"
                              >
                                {{ (isClassCompleted(attendance) ? "종료된" : (attendance.makeup ? "보강" : "일반")) }} 수업
                              </span>
                              <span class="ml-2 text-gray-500">
                                {{ attendance.startTime }} ~ {{ attendance.endTime }}
                              </span>
                            </p>
                          </div>
                          
                          <!-- 시간 조정 UI 및 취소 버튼 -->
                          <div class="flex items-center space-x-2">
                            <div class="flex items-center space-x-2">
                              <button 
                                @click="adjustEndTime(attendance, -selectedMinutes)"
                                class="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded flex items-center justify-center"
                              >
                                -
                              </button>
                              <select
                                v-model="selectedMinutes"
                                class="border rounded px-2 py-1 w-24 text-center appearance-none bg-white"
                              >
                                <option v-for="minutes in [10, 20, 30, 40, 50, 60]" :key="minutes" :value="minutes">
                                  {{ minutes }}분
                                </option>
                              </select>
                              <button 
                                @click="adjustEndTime(attendance, selectedMinutes)"
                                class="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                            
                            <button 
                              @click="cancelAttendance(attendance)"
                              class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- 결석 학생 표시 -->
                      <div 
                        v-for="absence in paginatedAbsences"
                        :key="`absence-${absence.studentId}`"
                        class="p-4 bg-gray-50 rounded-lg border border-gray-200"
                        v-show="showAbsences"
                      >
                        <div class="flex justify-between items-center h-full">
                          <div class="flex flex-col justify-between h-full">
                            <h3 class="font-semibold text-gray-800">
                              <button 
                                @click="showStudentAttendance(getStudentById(absence.studentId))"
                                class="hover:text-blue-600"
                              >
                                {{ getStudentName(absence.studentId) }}
                              </button>
                            </h3>
                            <p class="text-sm">
                              <span class="text-red-600">결석</span>
                              <span v-if="absence.reason" class="ml-2 text-gray-500">
                                사유: {{ absence.reason }}
                              </span>
                            </p>
                          </div>
                          
                          <button 
                            @click="cancelAbsence(absence)"
                            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                          >
                            취소
                          </button>
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

                      <div v-if="noVisibleItems" class="text-center py-4 text-gray-500">
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
                  <h2 class="text-xl font-semibold text-gray-800">보강 출석 내역</h2>
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
                    v-for="attendance in makeupAttendancesList" 
                    :key="attendance.id"
                    class="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <h3 class="font-semibold text-gray-800">
                          {{ getStudentName(attendance.studentId) }}
                        </h3>
                        <p class="text-sm text-gray-600">
                          {{ formatDate(attendance.attendanceDate) }}
                          <span class="ml-2">
                            {{ attendance.startTime || '시간 정보 없음' }} ~ {{ attendance.endTime || '시간 정보 없음' }}
                          </span>
                        </p>
                      </div>
                      <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {{ attendance.makeupType || '결석보강' }}
                      </span>
                    </div>
                  </div>
                  
                  <div v-if="makeupAttendancesList.length === 0" class="text-center py-4 text-gray-500">
                    표시할 보강 기록이 없습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 등원 유형 선택 모달 -->
      <div 
        v-if="showAttendanceTypeModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-96">
          <h3 class="text-xl font-semibold mb-4">
            등원 유형 선택
          </h3>
          <p class="text-gray-600 mb-4">
            {{ selectedStudent?.name }} 학생의 등원 유형을 선택하세요.
          </p>
          <div class="space-y-3">
            <button 
              @click="markAttendanceWithType(selectedStudent, false)"
              class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              일반 등원
            </button>
            <button 
              @click="markAttendanceWithType(selectedStudent, true)"
              class="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              보강 등원
            </button>
            <button 
              @click="showAbsenceModal"
              class="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              결석
            </button>
          </div>
          <button 
            @click="closeAttendanceTypeModal"
            class="mt-4 w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            취소
          </button>
        </div>
      </div>

      <!-- 결석 사유 입력 모달 -->
      <div 
        v-if="showAbsenceReasonModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-96">
          <h3 class="text-xl font-semibold mb-4">
            결석 사유 입력
          </h3>
          <p class="text-gray-600 mb-4">
            {{ selectedStudent?.name }} 학생의 결석 사유를 입력하세요.
          </p>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">결석 사유:</label>
            <textarea
              v-model="absenceReason"
              class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="결석 사유를 입력하세요 (선택사항)"
            ></textarea>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="markAbsence"
              class="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              결석 등록
            </button>
            <button 
              @click="closeAbsenceReasonModal"
              class="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
            >
              취소
            </button>
          </div>
        </div>
      </div>

      <!-- 보강 유형 입력 모달 -->
      <div 
        v-if="showMakeupTypeModal" 
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-96">
          <h3 class="text-xl font-semibold mb-4">
            보강 유형 입력
          </h3>
          <p class="text-gray-600 mb-4">
            {{ selectedStudent?.name }} 학생의 보강 유형을 입력하세요.
          </p>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">보강 유형:</label>
            <select
              v-model="makeupTypeSelected"
              class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="결석보강">결석보강</option>
              <option value="지각보강">지각보강</option>
              <option value="특별보강">특별보강</option>
              <option value="수준별보강">수준별보강</option>
            </select>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="markAttendanceWithType(selectedStudent, true)"
              class="flex-1 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              등록
            </button>
            <button 
              @click="closeMakeupTypeModal"
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
              v-for="attendance in paginatedStudentAttendances" 
              :key="attendance.id"
              class="p-3 border rounded-lg"
            >
              <div class="flex justify-between items-center">
                <div>
                  <div class="text-sm text-gray-600">
                    {{ formatDateSimple(attendance.attendanceDate) }}
                    <span class="ml-2">
                      {{ attendance.startTime || '시간 정보 없음' }} ~ {{ attendance.endTime || '시간 정보 없음' }}
                    </span>
                  </div>
                </div>
                <div>
                  <span 
                    class="px-3 py-1 text-sm rounded-full"
                    :class="attendance.makeup ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'"
                  >
                    {{ attendance.makeup ? '보강' : '출석' }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="studentAttendances.length === 0" class="text-center py-4 text-gray-500">
              이번 달 출석 기록이 없습니다.
            </div>

            <!-- 페이지네이션 -->
            <div v-if="totalStudentAttendancePages > 1" class="flex justify-center gap-2 mt-4">
              <button 
                v-for="page in totalStudentAttendancePages" 
                :key="page"
                class="px-3 py-1 rounded-lg"
                :class="[
                  currentStudentAttendancePage === page 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
                @click="changeStudentAttendancePage(page)"
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
const studentList = ref([])             // 모든 학생 목록
const attendanceList = ref([])          // 오늘 등원 목록
const absenceList = ref([])             // 오늘 결석 목록
const makeupAttendancesList = ref([])   // 보강 출석 기록

// 필터링 상태
const showOnlyTodayClasses = ref(true)  // 오늘 수업만 보기
const searchQuery = ref('')             // 검색어

// 보강 필터
const selectedRange = ref('week')
const selectedOrder = ref('asc')

// 수업 상태 필터
const showCompletedClasses = ref(true)  // 종료된 수업 보기 체크박스
const showOngoingClasses = ref(true)    // 수업중인 수업 보기 체크박스
const showAbsences = ref(true)          // 결석 보기 체크박스 (NEW)

// 시간 조정
const selectedMinutes = ref(10)         // 기본값은 10분

// 등원 유형 선택 관련 상태
const showAttendanceTypeModal = ref(false)
const showMakeupTypeModal = ref(false)
const showAbsenceReasonModal = ref(false)
const selectedStudent = ref(null)
const makeupTypeSelected = ref('결석보강')
const absenceReason = ref('')

// 페이지네이션 상태
const attendancePerPage = ref(5)
const currentNotAttendedPage = ref(1)
const currentAttendedPage = ref(1)

// 학생 출결 모달 상태
const showAttendanceModal = ref(false)
const selectedStudentName = ref('')
const selectedStudentId = ref(null)
const studentAttendances = ref([])
const currentStudentAttendancePage = ref(1)
const studentAttendancePerPage = ref(5)

let statusUpdateTimer = null

// --- 라이프사이클 훅 ---
onMounted(() => {
  webSocketStore.subscribe('/topic/activity-logs', handleActivityLog)
  fetchStudents()
  fetchTodayAttendance()
  fetchTodayAbsences()
  fetchMakeupAttendances()

  setupStatusUpdateTimer()
})

onUnmounted(() => {
  webSocketStore.unsubscribe('/topic/activity-logs', handleActivityLog)
  if (statusUpdateTimer) {
    clearInterval(statusUpdateTimer)
    statusUpdateTimer = null
  }
})

function setupStatusUpdateTimer() {
  // 먼저 초기 지연 시간을 계산 (다음 분의 0초까지)
  const now = new Date()
  const secondsUntilNextMinute = 60 - now.getSeconds()
  
  // 먼저 다음 분의 0초에 맞춰 한 번 실행
  setTimeout(() => {
    // 출결 상태 업데이트
    fetchTodayAttendance()
    
    // 이후 매 분마다 실행되는 타이머 설정
    statusUpdateTimer = setInterval(fetchTodayAttendance, 60 * 1000)
  }, secondsUntilNextMinute * 1000)
}

// --- API 호출 함수 ---
async function fetchStudents() {
  try {
    const res = await axios.get('/api/students')
    studentList.value = res.data
    console.log(`${res.data.length}명의 학생 데이터 로드됨`)
  } catch (err) {
    console.error('학생 목록 로드 실패:', err)
    alert('학생 목록 불러오기 실패')
  }
}

async function fetchTodayAttendance() {
  try {
    const res = await axios.get('/api/attendance/today')
    attendanceList.value = res.data
    console.log(`오늘 등원한 학생 ${res.data.length}명`)
  } catch (err) {
    console.error('오늘 등원 목록 조회 실패:', err)
    alert('오늘 등원 목록 조회 실패')
  }
}

async function fetchTodayAbsences() {
  try {
    const res = await axios.get('/api/absence/today')
    absenceList.value = res.data
    console.log(`오늘 결석한 학생 ${res.data.length}명`)
  } catch (err) {
    console.error('오늘 결석 목록 조회 실패:', err)
    alert('오늘 결석 목록 조회 실패')
  }
}

async function fetchMakeupAttendances() {
  try {
    const res = await axios.get('/api/attendance/makeup', {
      params: {
        range: selectedRange.value,
        order: selectedOrder.value
      }
    })
    makeupAttendancesList.value = res.data
  } catch (err) {
    console.error('보강 이력 조회 실패:', err)
    alert('보강 이력 조회 중 오류가 발생했습니다.')
  }
}

async function fetchStudentAttendances(studentId) {
  try {
    // 이번 달 출석 기록만 조회
    const startDate = dayjs().startOf('month').format('YYYY-MM-DD')
    const endDate = dayjs().endOf('month').format('YYYY-MM-DD')
    
    const response = await axios.get(`/api/attendance/student/${studentId}`, {
      params: { startDate, endDate }
    })
    
    return response.data
  } catch (error) {
    console.error('학생 출석 기록 조회 실패:', error)
    alert('출석 내역을 불러오는데 실패했습니다.')
    return []
  }
}

// 출결 초기화 (처음에 한 번만 실행)
async function autoAddTodayClasses() {
  try {
    // 여기서는 실제로 수업을 추가하지 않고 출결 상태만 초기화
    await axios.delete('/api/attendance/today/all')
    await axios.delete('/api/absence')
    alert('오늘의 출결 상태가 초기화되었습니다.')
    fetchTodayAttendance()
    fetchTodayAbsences()
  } catch (err) {
    console.error(err)
    alert('출결 초기화 중 오류가 발생했습니다.')
  }
}

// --- 학생 관련 헬퍼 함수 ---
function getStudentById(studentId) {
  return studentList.value.find(s => s.id === studentId) || null
}

function getStudentName(studentId) {
  const student = getStudentById(studentId)
  return student ? student.name : `학생 #${studentId}`
}

function isStudentAttendedToday(student) {
  return attendanceList.value.some(a => a.studentId === student.id) || 
         absenceList.value.some(a => a.studentId === student.id)
}

function shouldShowStudentToday(student) {
  // 오늘 수업만 보기가 체크되어 있으면 오늘 수업이 있는 학생만 표시
  if (showOnlyTodayClasses.value) {
    const today = dayjs().format('ddd').toLowerCase() // 오늘 요일 (mon, tue, wed, ...)
    return student.daysOfWeek.includes(today)
  }
  // 체크 해제되어 있으면 모든 학생 표시
  return true
}

// 수업 종료 여부 체크 함수
function isClassCompleted(attendance) {
  if (!attendance.endTime) return false

  const now = dayjs()
  const endTime = dayjs(`${dayjs().format('YYYY-MM-DD')} ${attendance.endTime}`)
  
  return now.isAfter(endTime)
}

// 수업 상태에 따라 표시 여부 결정
function shouldShowAttendance(attendance) {
  const completed = isClassCompleted(attendance)
  
  if (completed && showCompletedClasses.value) {
    return true
  }
  
  if (!completed && showOngoingClasses.value) {
    return true
  }
  
  return false
}

// 표시할 항목이 없는지 확인하는 계산된 속성
const noVisibleItems = computed(() => {
  // 수업 상태 필터에 따라 보여지는 출석 항목 수
  const visibleAttendancesCount = visibleAttendances.value.length
  
  // 결석 보기 필터에 따라 보여지는 결석 항목 수
  const visibleAbsencesCount = showAbsences.value ? filteredAbsences.value.length : 0
  
  // 모두 0이면 표시할 항목이 없음
  return visibleAttendancesCount === 0 && visibleAbsencesCount === 0
})

// --- 출결 관련 기능 ---
// 등원 버튼 클릭 - 모달 표시
function markAttendance(student) {
  selectedStudent.value = student
  showAttendanceTypeModal.value = true
}

// 등원 유형 선택 모달 닫기
function closeAttendanceTypeModal() {
  showAttendanceTypeModal.value = false
  selectedStudent.value = null
}

// 보강 유형 입력 모달 열기
function openMakeupTypeInput() {
  showAttendanceTypeModal.value = false
  showMakeupTypeModal.value = true
}

// 보강 유형 입력 모달 닫기
function closeMakeupTypeModal() {
  showMakeupTypeModal.value = false
  showAttendanceTypeModal.value = true
}

// 결석 모달 열기
function showAbsenceModal() {
  showAttendanceTypeModal.value = false
  absenceReason.value = ''
  showAbsenceReasonModal.value = true
}

// 결석 모달 닫기
function closeAbsenceReasonModal() {
  showAbsenceReasonModal.value = false
  showAttendanceTypeModal.value = true
}

// 유형에 따른 등원 처리 함수
async function markAttendanceWithType(student, isMakeup) {
  try {
    const now = dayjs()
    const params = new URLSearchParams()
    params.set('studentId', student.id)
    params.set('makeup', isMakeup.toString())
    params.set('makeupType', makeupTypeSelected.value)
    
    // 현재 시각을 등원 시간으로 설정
    const startTime = now.format('HH:mm')
    params.set('startTime', startTime)

    await axios.post(`/api/attendance?${params.toString()}`)
    
    alert(`${student.name} ${isMakeup ? '보강' : '일반'} 등원 기록이 등록되었습니다.`)
    
    // 모달 닫기
    showAttendanceTypeModal.value = false
    showMakeupTypeModal.value = false
    selectedStudent.value = null
    
    // 데이터 다시 불러오기
    fetchTodayAttendance()
    if (isMakeup) {
      fetchMakeupAttendances()
    }
  } catch (err) {
    alert(err.response?.data || err.message)
  }
}

// 결석 처리 함수
async function markAbsence() {
  try {
    const params = new URLSearchParams()
    params.set('studentId', selectedStudent.value.id)
    params.set('makeup', 'false')
    params.set('reason', absenceReason.value)
    
    await axios.post(`/api/absence?${params.toString()}`)
    
    alert(`${selectedStudent.value.name} 학생의 결석이 등록되었습니다.`)
    
    // 모달 닫기
    showAbsenceReasonModal.value = false
    selectedStudent.value = null
    absenceReason.value = ''
    
    // 데이터 다시 불러오기
    fetchTodayAbsences()
  } catch (err) {
    console.error('결석 등록 실패:', err)
    alert('결석 등록 중 오류가 발생했습니다.')
  }
}

// 결석 취소 함수
async function cancelAbsence(absence) {
  const studentName = getStudentName(absence.studentId)
  
  if (!confirm(`${studentName} 학생의 결석 기록을 취소하시겠습니까?`)) {
    return
  }
  
  try {
    const params = new URLSearchParams()
    params.set('studentId', absence.studentId)
    
    await axios.delete(`/api/absence?${params.toString()}`)
    
    alert(`${studentName} 학생의 결석이 취소되었습니다.`)
    fetchTodayAbsences()
  } catch (err) {
    console.error(err)
    alert('결석 취소 중 오류가 발생했습니다.')
  }
}

async function cancelAttendance(attendance) {
  const studentName = getStudentName(attendance.studentId)
  
  if (!confirm(`${studentName} 학생의 등원 기록을 취소하시겠습니까?`)) {
    return
  }
  
  try {
    const params = new URLSearchParams()
    params.set('attendanceId', attendance.id)
    
    await axios.delete(`/api/attendance?${params.toString()}`)
    
    alert(`${studentName} 학생의 등원이 취소되었습니다.`)
    fetchTodayAttendance()
  } catch (err) {
    console.error(err)
    alert('등원 취소 중 오류가 발생했습니다.')
  }
}

// 수업 시간 조정 함수
async function adjustEndTime(attendance, minutes) {
  try {
    await axios.patch(`/api/attendance/${attendance.id}/endtime`, null, {
      params: { minutes }
    })
    
    fetchTodayAttendance()
  } catch (err) {
    console.error('수업 시간 조정 실패:', err)
    alert('수업 시간 조정 중 오류가 발생했습니다.')
  }
}

// --- 학생별 출결 내역 조회 ---
async function showStudentAttendance(student) {
  if (!student) return
  
  selectedStudentName.value = student.name
  selectedStudentId.value = student.id
  
  try {
    studentAttendances.value = await fetchStudentAttendances(student.id)
    currentStudentAttendancePage.value = 1
    showAttendanceModal.value = true
  } catch (error) {
    console.error('출결 내역 조회 실패:', error)
  }
}

function closeAttendanceModal() {
  showAttendanceModal.value = false
  selectedStudentName.value = ''
  selectedStudentId.value = null
  studentAttendances.value = []
  currentStudentAttendancePage.value = 1
}

// --- 날짜 관련 함수 ---
function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`
}

function formatDateSimple(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return dayjs(date).format('MM월 DD일')
}

const currentMonthText = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}년 ${now.getMonth() + 1}월`
})

// --- 필터링된 학생 목록 ---
const filteredStudents = computed(() => {
  return studentList.value.filter(student => {
    // 이름 검색 필터
    const nameMatches = student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // 오늘 수업 여부 필터
    const dayMatches = shouldShowStudentToday(student)
    
    return nameMatches && dayMatches
  })
})

// --- 등원하지 않은 학생 목록 ---
const filteredNotAttendedStudents = computed(() => {
  return filteredStudents.value.filter(student => !isStudentAttendedToday(student))
})

// --- 등원한 학생 목록(실제로는 출석 기록) ---
const filteredAttendances = computed(() => {
  return attendanceList.value.filter(attendance => {
    const student = getStudentById(attendance.studentId)
    if (!student) return false
    
    // 이름 검색 필터
    return student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

// --- 필터링된 출석 목록 (수업 상태 필터 적용) ---
const visibleAttendances = computed(() => {
  return filteredAttendances.value.filter(attendance => shouldShowAttendance(attendance))
})

// --- 결석한 학생 목록 ---
const filteredAbsences = computed(() => {
  return absenceList.value.filter(absence => {
    const student = getStudentById(absence.studentId)
    if (!student) return false
    
    // 이름 검색 필터
    return student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

// --- 페이지네이션 ---
const paginatedNotAttendedStudents = computed(() => {
  const start = (currentNotAttendedPage.value - 1) * attendancePerPage.value
  return filteredNotAttendedStudents.value.slice(start, start + attendancePerPage.value)
})

const paginatedAttendances = computed(() => {
  const start = (currentAttendedPage.value - 1) * attendancePerPage.value
  // 여기서는 visibleAttendances를 사용하여 필터링된 출석 목록만 페이지네이션합니다
  return visibleAttendances.value.slice(start, start + attendancePerPage.value)
})

const paginatedAbsences = computed(() => {
  const start = (currentAttendedPage.value - 1) * attendancePerPage.value
  return filteredAbsences.value.slice(start, start + attendancePerPage.value)
})

const paginatedStudentAttendances = computed(() => {
  const start = (currentStudentAttendancePage.value - 1) * studentAttendancePerPage.value
  return studentAttendances.value.slice(start, start + studentAttendancePerPage.value)
})

// --- 총 페이지 수 ---
const totalNotAttendedPages = computed(() => 
  Math.ceil(filteredNotAttendedStudents.value.length / attendancePerPage.value) || 1
)

const totalAttendedPages = computed(() => {
  // 표시 중인 출석 항목과 결석 항목의 총 수
  const visibleAttendancesCount = visibleAttendances.value.length
  const visibleAbsencesCount = showAbsences.value ? filteredAbsences.value.length : 0
  const totalItems = visibleAttendancesCount + visibleAbsencesCount
  
  return Math.ceil(totalItems / attendancePerPage.value) || 1
})

const totalStudentAttendancePages = computed(() => 
  Math.ceil(studentAttendances.value.length / studentAttendancePerPage.value) || 1
)

// --- 페이지 변경 함수 ---
function changeNotAttendedPage(page) {
  currentNotAttendedPage.value = page
}

function changeAttendedPage(page) {
  currentAttendedPage.value = page
}

function changeStudentAttendancePage(page) {
  currentStudentAttendancePage.value = page
}

// --- 감시자(Watcher) ---
// 검색어 변경 시 페이지 리셋
watch(searchQuery, () => {
  currentNotAttendedPage.value = 1
  currentAttendedPage.value = 1
})

// 필터 변경 시 페이지 리셋
watch([showOnlyTodayClasses, showCompletedClasses, showOngoingClasses, showAbsences], () => {
  currentNotAttendedPage.value = 1
  currentAttendedPage.value = 1
})

// 보강 필터 변경 시 데이터 다시 로드
watch([selectedRange, selectedOrder], () => {
  fetchMakeupAttendances()
}, { immediate: true })

// WebSocket 메시지 핸들러
async function handleActivityLog(message) {
  const logEvent = message
  
  // attendance 또는 absence 타입의 로그인 경우 데이터 새로고침
  if (logEvent.type === 'attendance' || logEvent.type === 'absence') {
    // 등/하원 및 결석 모두에 대해 데이터 새로고침
    setTimeout(async function () {
      await Promise.all([
        fetchTodayAttendance(),
        fetchTodayAbsences(),
        fetchMakeupAttendances()
      ])
    }, 500)
  }
}
</script>

<style scoped>
/* 필요한 스타일 */
</style>