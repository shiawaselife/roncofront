<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">학습 보고서</h1>
          <button @click="showCreateForm = true" class="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiPlus" />
            </svg>
            새 보고서 작성
          </button>
        </div>

        <div class="grid gap-4">
          <div v-for="report in reports" :key="report.id" class="bg-white p-4 rounded shadow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-lg">{{ report.student.name }}</h3>
                <p class="text-sm text-gray-600">{{ report.subject }}</p>
              </div>
              <span class="text-sm text-gray-500">{{ formatDate(report.reportDate) }}</span>
            </div>
            <div class="mt-2">
              <div class="flex justify-between items-center mb-1">
                <span>진도율</span>
                <span class="text-sm text-gray-500">{{ report.progress }}%</span>
              </div>
              <div class="w-full h-2 bg-gray-200 rounded">
                <div class="h-2 bg-blue-500 rounded" :style="{ width: report.progress + '%' }"></div>
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-700">{{ report.content }}</p>
          </div>
        </div>

        <!-- 보고서 작성 모달 -->
        <Modal :show="showCreateForm" @close="showCreateForm = false">
          <template #title>새 학습 보고서 작성</template>
          <template #content>
            <form @submit.prevent="createReport" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">학생</label>
                <select v-model="newReport.studentId" class="w-full border rounded p-2">
                  <option v-for="student in students" :key="student.id" :value="student.id">
                    {{ student.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">과목</label>
                <input v-model="newReport.subject" type="text" class="w-full border rounded p-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">진도율 (%)</label>
                <input v-model="newReport.progress" type="number" min="0" max="100" class="w-full border rounded p-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">내용</label>
                <textarea v-model="newReport.content" rows="4" class="w-full border rounded p-2"></textarea>
              </div>
              <div class="flex justify-end space-x-2">
                <button type="button" @click="showCreateForm = false" class="px-4 py-2 border rounded">
                  취소
                </button>
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
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
import { mdiPlus } from '@mdi/js'
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