<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import AttendanceApi from '@/api/api.js'
import { formatDateTime } from '@/utils/dateUtils.js'

// 라우트 파라미터 활용
const route = useRoute()
const studentId = route.params.studentId

// 응답받은 등원 기록 리스트
const attendanceRecords = ref([])

// 등원 기록 조회
const fetchStudentAttendance = async () => {
  try {
    const response = await AttendanceApi.getAttendanceById(studentId)
    attendanceRecords.value = response.data
  } catch (error) {
    console.error('등원 기록 조회 중 오류:', error)
    // 필요 시 에러 처리
  }
}

// 컴포넌트 마운트 후 데이터 로드
onMounted(() => {
  fetchStudentAttendance()
})

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <h2 class="text-2xl font-bold mb-4">학생 ID: {{ studentId }} - 등원 기록</h2>
      
      <div class="overflow-x-auto" v-if="attendanceRecords.length">
        <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead class="bg-green-500 text-white">
            <tr>
              <th class="py-3 px-6 text-left">등원 날짜</th>
              <th class="py-3 px-6 text-left">등원 시간</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="record in attendanceRecords"
              :key="record.id"
              class="border-b hover:bg-gray-100"
            >
              <td class="py-4 px-6">{{ record.attendanceDate }}</td>
              <td class="py-4 px-6">{{ formatDateTime(record.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 등원 기록이 없을 때 -->
      <p v-else class="text-gray-600">등원 기록이 없습니다.</p>
    </SectionMain>
  </LayoutAuthenticated>
</template>



<style scoped>
/* 필요 시 스타일 추가 */
</style>
