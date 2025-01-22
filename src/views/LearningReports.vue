<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="max-w-7xl mx-auto p-6 space-y-8">
        <!-- 헤더 섹션 -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 flex justify-between items-center shadow-sm">
          <div class="flex items-center space-x-3">
            <svg class="w-8 h-8 text-blue-600" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiFileChartOutline"/>
            </svg>
            <h1 class="text-2xl font-bold text-gray-800">학습 보고서</h1>
          </div>
          <button 
            @click="showCreateForm = true" 
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 shadow-sm"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiPlus" />
            </svg>
            새 보고서 작성
          </button>
        </div>

        <!-- 보고서 그리드 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="report in reports" 
            :key="report.id" 
            class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <!-- 보고서 헤더 -->
            <div class="p-6 border-b border-gray-100">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">{{ report.student.name }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ report.subject }}</p>
                </div>
                <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {{ formatDate(report.reportDate) }}
                </span>
              </div>
            </div>

            <!-- 보고서 내용 -->
            <div class="p-6">
              <div class="space-y-4">
                <!-- 진도율 -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-gray-700">진도율</span>
                    <span class="text-sm font-medium text-blue-600">{{ report.progress }}%</span>
                  </div>
                  <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                      :style="{ width: report.progress + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- 내용 -->
                <p class="text-gray-600 text-sm leading-relaxed">{{ report.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 보고서 작성 모달 -->
        <Modal :show="showCreateForm" @close="showCreateForm = false">
          <template #title>
            <div class="flex items-center space-x-2">
              <svg class="w-6 h-6 text-blue-600" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
              </svg>
              <span>새 학습 보고서 작성</span>
            </div>
          </template>
          <template #content>
            <form @submit.prevent="createReport" class="space-y-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">학생</label>
                <select 
                  v-model="newReport.studentId" 
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">학생을 선택하세요</option>
                  <option v-for="student in students" :key="student.id" :value="student.id">
                    {{ student.name }}
                  </option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">과목</label>
                <input 
                  v-model="newReport.subject" 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="과목명을 입력하세요"
                >
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">진도율 (%)</label>
                <input 
                  v-model="newReport.progress" 
                  type="number" 
                  min="0" 
                  max="100"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">내용</label>
                <textarea 
                  v-model="newReport.content" 
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="학습 내용을 입력하세요"
                ></textarea>
              </div>

              <div class="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  @click="showCreateForm = false" 
                  class="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
                >
                  저장
                </button>
              </div>
            </form>
          </template>
        </Modal>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Modal from '@/components/Modal.vue'
import { mdiPlus, mdiFileChartOutline } from '@mdi/js'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

const showCreateForm = ref(false)
const students = ref([])
const reports = ref([])
const newReport = ref({
 studentId: '',
 subject: '',
 progress: 0,
 content: ''
})

const formatDate = (date) => {
 return new Date(date).toLocaleDateString('ko-KR', {
   year: 'numeric',
   month: '2-digit',
   day: '2-digit'
 })
}

const createReport = async () => {
 try {
   await axios.post('/api/learning-reports', newReport.value)
   showCreateForm.value = false
   loadReports()
 } catch (error) {
   console.error('Failed to create report:', error)
 }
}

const loadReports = async () => {
 try {
   const response = await axios.get('/api/learning-reports')
   reports.value = response.data
 } catch (error) {
   console.error('Failed to load reports:', error)
 }
}

const loadStudents = async () => {
 try {
   const response = await axios.get('/api/students')
   students.value = response.data
 } catch (error) {
   console.error('Failed to load students:', error)
 }
}

onMounted(async () => {
 try {
   await Promise.all([
     loadStudents(),
     loadReports()
   ])
 } catch (error) {
   console.error('Failed to load initial data:', error)
 }
})
</script>