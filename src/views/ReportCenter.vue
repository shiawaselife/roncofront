<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
        <!-- 헤더 섹션 -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-blue-600" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiFileDocumentMultipleOutline" />
            </svg>
            <h1 class="text-2xl font-bold text-gray-800 ml-3">리포트 센터</h1>
          </div>
        </div>

        <!-- 상단 메뉴 카드 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RouterLink 
            to="/learning-reports" 
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:-translate-y-1"
          >
            <div class="flex items-start">
              <div class="bg-green-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24">
                  <path fill="currentColor" :d="mdiFileChartOutline" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold text-gray-800">학습 보고서</h2>
                <p class="text-sm text-gray-600 mt-1">학생별 학습 현황 리포트</p>
              </div>
            </div>
          </RouterLink>
          
          <RouterLink 
            to="/portfolios" 
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:-translate-y-1"
          >
            <div class="flex items-start">
              <div class="bg-purple-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" viewBox="0 0 24 24">
                  <path fill="currentColor" :d="mdiFolderOutline" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold text-gray-800">포트폴리오 관리</h2>
                <p class="text-sm text-gray-600 mt-1">학생 결과물 및 기록</p>
              </div>
            </div>
          </RouterLink>
          
          <RouterLink 
            to="/consultations" 
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:-translate-y-1"
          >
            <div class="flex items-start">
              <div class="bg-orange-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-orange-600" viewBox="0 0 24 24">
                  <path fill="currentColor" :d="mdiPhone" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold text-gray-800">상담 기록</h2>
                <p class="text-sm text-gray-600 mt-1">문의 및 상담 관리</p>
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- 하단 내용 그리드 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 최근 상담 기록 -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="border-b border-gray-100 p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="bg-blue-100 p-2 rounded-lg">
                    <svg class="w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                      <path fill="currentColor" :d="mdiCommentTextMultipleOutline"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-800">최근 상담 기록</h3>
                </div>
                <RouterLink 
                  to="/consultations" 
                  class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  전체보기
                </RouterLink>
              </div>
            </div>
            <div class="p-6">
              <ul class="space-y-4">
                <li 
                  v-for="consultation in recentConsultations" 
                  :key="consultation.id" 
                  class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="flex items-center space-x-2">
                        <span class="font-semibold text-gray-800">
                          {{ consultation.student.name }}
                        </span>
                        <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {{ consultation.type }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 mt-1">{{ consultation.content }}</p>
                    </div>
                    <div class="text-right">
                      <div class="text-sm text-gray-500">
                        {{ formatDate(consultation.consultationDate) }}
                      </div>
                      <span 
                        :class="[
                          'text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block',
                          getStatusClass(consultation.status)
                        ]"
                      >
                        {{ getStatusText(consultation.status) }}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- 포트폴리오 -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="border-b border-gray-100 p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="bg-purple-100 p-2 rounded-lg">
                    <svg class="w-5 h-5 text-purple-600" viewBox="0 0 24 24">
                      <path fill="currentColor" :d="mdiFolderOutline"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-800">포트폴리오</h3>
                </div>
                <RouterLink 
                  to="/portfolios" 
                  class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  전체보기
                </RouterLink>
              </div>
            </div>
            <div class="p-6">
              <ul class="space-y-4">
                <li 
                  v-for="portfolio in recentPortfolios" 
                  :key="portfolio.id" 
                  class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="font-semibold text-gray-800">{{ portfolio.title }}</div>
                      <p class="text-sm text-gray-600 mt-1">{{ portfolio.student.name }}</p>
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ formatDate(portfolio.createdDate) }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 학생별 진도 현황 -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="border-b border-gray-100 p-6">
            <div class="flex items-center space-x-3">
              <div class="bg-green-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-green-600" viewBox="0 0 24 24">
                  <path fill="currentColor" :d="mdiProgressCheck" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">학생별 진도 현황</h3>
                <p class="text-sm text-gray-500 mt-1">선택된 학생의 프로그래밍 진도율</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <div 
                v-for="report in studentProgress" 
                :key="report.id" 
                class="bg-gray-50 rounded-lg p-4"
              >
                <div class="flex justify-between mb-2">
                  <span class="font-medium text-gray-800">{{ report.subject }}</span>
                  <span class="text-sm text-gray-600">
                    {{ report.progress }}% 
                    <span class="text-gray-400">
                      (최근 업데이트: {{ formatDate(report.lastUpdate) }})
                    </span>
                  </span>
                </div>
                <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-300"
                    :class="getProgressColorClass(report.subject)"
                    :style="{ width: `${report.progress}%` }"
                  ></div>
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