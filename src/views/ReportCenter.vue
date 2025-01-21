# ReportCenter.vue
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="p-6">
        <!-- 상단 메뉴 영역 -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-2 text-blue-600" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiFileDocumentMultipleOutline" />
            </svg>
            <h1 class="text-2xl font-bold">리포트 센터</h1>
          </div>
        </div>

        <!-- 상단 3가지 메뉴 -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <RouterLink to="/learning-reports" 
            class="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-500" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiFileChartOutline" />
            </svg>
            <div>
              <h2 class="text-lg font-semibold">학습 보고서</h2>
              <p class="text-sm text-gray-500">학생별 학습 현황 리포트</p>
            </div>
          </RouterLink>
          
          <RouterLink to="/portfolios" 
            class="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiFolderOutline" />
            </svg>
            <div>
              <h2 class="text-lg font-semibold">포트폴리오 관리</h2>
              <p class="text-sm text-gray-500">학생 결과물 및 기록</p>
            </div>
          </RouterLink>
          
          <RouterLink to="/consultations" 
            class="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer flex items-center">
            <svg class="w-5 h-5 mr-2 text-orange-500" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiPhone" />
            </svg>
            <div>
              <h2 class="text-lg font-semibold">상담 기록</h2>
              <p class="text-sm text-gray-500">문의 및 상담 관리</p>
            </div>
          </RouterLink>
        </div>

        <!-- 하단 내용: 최근 상담 기록, 포트폴리오 -->
        <div class="grid grid-cols-2 gap-4">
          <!-- 최근 상담 기록 -->
          <div class="bg-white p-4 rounded shadow">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-500" viewBox="0 0 24 24">
                  <path fill="currentColor" :d="mdiCommentTextMultipleOutline"/>
                </svg>
                <h3 class="text-lg font-semibold">최근 상담 기록</h3>
              </div>
              <RouterLink to="/consultations" class="text-sm text-blue-600">전체보기</RouterLink>
            </div>
            <ul class="space-y-3">
              <li v-for="consultation in recentConsultations" :key="consultation.id" 
                  class="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span class="font-bold">{{ consultation.student.name }}</span>
                  <span class="ml-2 text-sm text-blue-600">{{ consultation.type }}</span>
                  <p class="text-xs text-gray-500">{{ consultation.content }}</p>
                </div>
                <div class="text-right text-sm">
                  <div>{{ formatDate(consultation.consultationDate) }}</div>
                  <span :class="getStatusClass(consultation.status)">
                    {{ getStatusText(consultation.status) }}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <!-- 포트폴리오 -->
          <div class="bg-white p-4 rounded shadow">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-purple-500" viewBox="0 0 24 24">
                  <path fill="currentColor" :d="mdiFolderOutline"/>
                </svg>
                <h3 class="text-lg font-semibold">포트폴리오</h3>
              </div>
              <RouterLink to="/portfolios" class="text-sm text-blue-600">전체보기</RouterLink>
            </div>
            <ul class="space-y-3">
              <li v-for="portfolio in recentPortfolios" :key="portfolio.id" 
                  class="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span class="font-bold">{{ portfolio.title }}</span>
                  <p class="text-xs text-gray-500">{{ portfolio.student.name }}</p>
                </div>
                <div class="text-sm text-gray-600">{{ formatDate(portfolio.createdDate) }}</div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 학생별 진도 현황 -->
        <div class="bg-white p-4 rounded shadow mt-4">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 mr-2 text-green-500" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiProgressCheck" />
            </svg>
            <h3 class="text-lg font-semibold">학생별 진도 현황</h3>
          </div>
          <p class="text-sm text-gray-500 mb-3">선택된 학생의 프로그래밍 진도율</p>
          <div v-for="report in studentProgress" :key="report.id" class="mb-4">
            <div class="flex justify-between mb-1">
              <span>{{ report.subject }}</span>
              <span class="text-sm text-gray-500">
                {{ report.progress }}% 
                (최근 업데이트: {{ formatDate(report.lastUpdate) }})
              </span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded">
              <div class="h-2 rounded" 
                   :class="getProgressColorClass(report.subject)"
                   :style="{ width: report.progress + '%' }">
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

import {
  mdiFileDocumentMultipleOutline,
  mdiFileChartOutline,
  mdiFolderOutline,
  mdiPhone,
  mdiCommentTextMultipleOutline,
  mdiProgressCheck,
  mdiUpload
} from '@mdi/js'

// 상태 관리
const students = ref([])
const selectedStudent = ref('')
const reportType = ref('monthly')
const recentConsultations = ref([])
const recentPortfolios = ref([])
const studentProgress = ref([])

// 헬퍼 함수
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const getStatusClass = (status) => {
  const classes = {
    'PENDING': 'text-yellow-500 font-semibold',
    'IN_PROGRESS': 'text-blue-500 font-semibold',
    'COMPLETED': 'text-green-600 font-semibold',
    'CANCELLED': 'text-red-500 font-semibold'
  }
  return classes[status] || 'text-gray-500 font-semibold'
}

const getStatusText = (status) => {
  const statusMap = {
    'PENDING': '상담예정',
    'IN_PROGRESS': '상담중',
    'COMPLETED': '처리완료',
    'CANCELLED': '취소됨'
  }
  return statusMap[status] || status
}

const getProgressColorClass = (subject) => {
  const colorMap = {
    'Python 기초': 'bg-blue-500',
    'Arduino 기초': 'bg-purple-500',
    'C언어/Python 혼합과정': 'bg-green-500'
  }
  return colorMap[subject] || 'bg-gray-500'
}

// API 호출 함수들
const loadStudents = async () => {
  try {
    const response = await fetch('/api/students')
    students.value = await response.json()
    if (students.value.length > 0) {
      selectedStudent.value = students.value[0].id
    }
  } catch (error) {
    console.error('Failed to load students:', error)
  }
}

const loadRecentConsultations = async () => {
  try {
    const response = await fetch('/api/consultations/recent')
    recentConsultations.value = await response.json()
  } catch (error) {
    console.error('Failed to load recent consultations:', error)
  }
}

const loadRecentPortfolios = async () => {
  try {
    const response = await fetch('/api/portfolios/recent')
    recentPortfolios.value = await response.json()
  } catch (error) {
    console.error('Failed to load recent portfolios:', error)
  }
}

const loadStudentProgress = async () => {
  if (!selectedStudent.value) return
  try {
    const response = await fetch(`/api/learning-reports/student/${selectedStudent.value}`)
    studentProgress.value = await response.json()
  } catch (error) {
    console.error('Failed to load student progress:', error)
  }
}

// 보고서 생성
const generateReport = async () => {
  if (!selectedStudent.value || !reportType.value) return
  try {
    await fetch('/api/learning-reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: selectedStudent.value,
        reportType: reportType.value
      })
    })
    // 보고서 생성 후 필요한 처리
  } catch (error) {
    console.error('Failed to generate report:', error)
  }
}

// 학생 선택 변경 시 진도 현황 업데이트
watch(selectedStudent, () => {
  loadStudentProgress()
})

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
  await loadStudents()
  await Promise.all([
    loadRecentConsultations(),
    loadRecentPortfolios(),
    loadStudentProgress()
  ])
})
</script>