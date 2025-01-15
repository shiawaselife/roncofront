<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- 검색창 및 현재 요일 표시 -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <!-- 이름 검색 -->
        <input
          v-model="searchTerm"
          type="text"
          placeholder="이름 검색"
          class="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
        />
        <!-- 현재 요일 -->
        <div class="text-lg font-semibold text-gray-700">
          {{ dayMapping[currentDay] }} 등원 명단
        </div>
      </div>

      <!-- 등원 아직 안 한 사람 테이블 -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">등원 아직 안 한 사람</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead class="bg-blue-500 text-white">
              <tr>
                <th class="py-3 px-6 text-left">이름</th>
                <th class="py-3 px-6 text-left">전화번호</th>
                <th class="py-3 px-6 text-left">생년월일</th>
                <th class="py-3 px-6 text-left">수업 요일</th>
                <th class="py-3 px-6 text-left">수업 시간</th>
                <th class="py-3 px-6 text-left">커리큘럼</th>
                <th class="py-3 px-6 text-center">액션</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="student in notAttendedItems"
                :key="student.id"
                class="border-b hover:bg-gray-100"
              >
                <td class="py-4 px-6">{{ student.name }}</td>
                <td class="py-4 px-6">{{ student.phone }}</td>
                <td class="py-4 px-6">{{ student.birthday }}</td>
                <td class="py-4 px-6">
                  {{ student.daysOfWeek.map(day => dayMapping[day]).join(', ') }}
                </td>
                <td class="py-4 px-6">{{ student.schedule }}</td>
                <td class="py-4 px-6">{{ student.curriculum }}</td>
                <td class="py-4 px-6 text-center">
                  <BaseButton
                    color="info"
                    label="등원"
                    @click="markAttendance(student)"
                    class="px-3 py-1 text-sm"
                  />
                </td>
              </tr>
              <tr v-if="notAttendedItems.length === 0" class="bg-gray-50">
                <td colspan="7" class="py-4 px-6 text-center text-gray-500">
                  등원할 학생이 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 등원한 사람 테이블 -->
      <div>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">등원한 사람</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead class="bg-green-500 text-white">
              <tr>
                <th class="py-3 px-6 text-left">이름</th>
                <th class="py-3 px-6 text-left">전화번호</th>
                <th class="py-3 px-6 text-left">생년월일</th>
                <th class="py-3 px-6 text-left">등원 시간</th>
                <th class="py-3 px-6 text-left">남은 시간</th>
                <th class="py-3 px-6 text-left">커리큘럼</th>
                <th class="py-3 px-6 text-center">액션</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="student in attendedRecords"
                :key="student.student.id"
                class="border-b hover:bg-gray-100"
              >
                <td class="py-4 px-6">{{ student.student.name }}</td>
                <td class="py-4 px-6">{{ student.student.phone }}</td>
                <td class="py-4 px-6">{{ student.student.birthday }}</td>
                <td class="py-4 px-6">{{ formatDateTime(student.attendance.createdAt) }}</td> <!-- 변경 -->
                <td class="py-4 px-6">
                  {{ calculateTimeLeft(student.attendance.createdAt) }}
                </td> <!-- 변경 -->
                <td class="py-4 px-6">{{ student.student.curriculum }}</td>
                <td class="py-4 px-6 text-center">
                  <BaseButton
                    color="danger"
                    label="취소"
                    @click="cancelAttendance(student.student)"
                    class="px-3 py-1 text-sm"
                  />
                </td>
              </tr>
              <tr v-if="attendedItems.length === 0" class="bg-gray-50">
                <td colspan="7" class="py-4 px-6 text-center text-gray-500">
                  등원한 학생이 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount} from 'vue'
import { useMainStore } from '@/stores/main'
import BaseButton from '@/components/BaseButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import AttendanceApi from '@/api/api.js'  // ← 새로 추가될 API 예시
import { formatDateTime } from '@/utils/dateUtils.js'


const mainStore = useMainStore()
const { clients } = mainStore 

onMounted(() => {
  mainStore.fetchSampleClients()
})

// 출석 체크 상태 관리
const checkedRows = ref([])

// 검색어 상태 관리
const searchTerm = ref('')

// 요일 매핑
const dayMapping = {
  mon: '월요일',
  tue: '화요일',
  wed: '수요일',
  thu: '목요일',
  fri: '금요일',
  sat: '토요일',
  sun: '일요일',
}

// 현재 요일 계산 함수
const getCurrentDayOfWeek = () => {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const todayIndex = new Date().getDay()
  return days[todayIndex]
}

const currentDay = ref(getCurrentDayOfWeek())

const attendedRecords = ref([])

// 현재 요일 + 검색어 기반으로 학생 필터링
const filteredItems = computed(() => {
  if (!clients || clients.length === 0) return []
  const term = searchTerm.value.trim().toLowerCase()
  return clients.filter(item => {
    const matchesDay = item.daysOfWeek && item.daysOfWeek.includes(currentDay.value)
    const matchesSearch = !term || item.name.toLowerCase().includes(term)
    return matchesDay && matchesSearch
  })
})

// 출석 체크 함수
const markAttendance = async (student) => {
  try {
    // 백엔드에 POST 등원 기록
    const response = await AttendanceApi.markAttendance(student.id)
    // 성공 시, checkedRows에 추가
    if (!checkedRows.value.includes(student.id)) {
      checkedRows.value.push(student.id)
    }
    // attendedRecords에 추가
    attendedRecords.value.push({
      student: student,
      attendance: response.data, // { id, studentId, attendanceDate, createdAt }
    })
  } catch (err) {
    console.error(err)
    alert('등원 체크 중 오류가 발생했습니다.')
  }
}

// 출석 취소 함수
const cancelAttendance = async (record) => {
  try {
    // 백엔드에 등원 취소(DELETE) 요청
    await AttendanceApi.cancelAttendance(record.id)
    // checkedRows에서 제거
    const idx = checkedRows.value.indexOf(record.id)
    if (idx !== -1) {
      checkedRows.value.splice(idx, 1)
    }
    // attendedRecords에서 제거
    const recordIdx = attendedRecords.value.findIndex(r => r.attendance.id === record.id)
    if (recordIdx !== -1) {
      attendedRecords.value.splice(recordIdx, 1)
    }
  } catch (err) {
    console.error(err)
    alert('등원 취소 중 오류가 발생했습니다.')
  }
}
// 타이머 관리
let timer = null

// 타이머 설정 함수
const setupTimers = () => {
  if (timer) clearInterval(timer)

  timer = setInterval(() => {
    // Force update by reassigning attendedRecords
    attendedRecords.value = [...attendedRecords.value]
  }, 1000) // 매초 남은 시간 업데이트
}

// 컴포넌트 언마운트 시 타이머 정리
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})


// 출석 여부 함수
const isAttended = (id) => checkedRows.value.includes(id)

// 등원 안 한 사람 목록
const notAttendedItems = computed(() => filteredItems.value.filter(student => !isAttended(student.id)))

// 등원한 사람 목록
const attendedItems = computed(() => filteredItems.value.filter(student => isAttended(student.id)))

onMounted(async () => {
  // 클라이언트 데이터 로드
  await mainStore.fetchSampleClients()

  try {
    // 오늘 등원한 학생들 불러오기
    const { data } = await AttendanceApi.getTodayAttendance()
    // data 예시: [{ id, studentId, attendanceDate, createdAt }, ...]

    // 각 등원 기록을 attendedRecords에 추가
    data.forEach(attendance => {
      const student = clients.find(c => c.id === attendance.studentId)
      if (student) {
        attendedRecords.value.push({
          student: student,
          attendance: attendance,
        })
        if (!checkedRows.value.includes(student.id)) {
          checkedRows.value.push(student.id)
        }
      }
    })
  } catch (e) {
    console.error('오늘 등원 정보 가져오기 실패:', e)
  }

  // 타이머 설정
  setupTimers()
})


// 남은 시간 계산 함수 (HH:MM:SS 형식)
const calculateTimeLeft = (createdAt) => {
  const now = new Date()
  const attendanceTime = new Date(createdAt)
  const endTime = new Date(attendanceTime.getTime() + 90 * 60 * 1000) // 1시간 30분 후

  const diffMs = endTime - now

  if (diffMs <= 0) {
    return '0:00:00'
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

</script>

<style scoped>
/* 필요한 스타일은 기존과 동일하므로 생략 */
</style>
