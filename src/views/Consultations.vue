<!-- Consultations.vue -->
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">상담 기록</h1>
          <button @click="showCreateForm = true" class="bg-orange-500 text-white px-4 py-2 rounded flex items-center">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiPlus" />
            </svg>
            상담 추가
          </button>
        </div>

        <div class="grid gap-4">
          <div v-for="consultation in consultations" :key="consultation.id" 
              class="bg-white p-4 rounded shadow">
            <div class="flex justify-between items-start">
              <div>
                <div class="flex items-center">
                  <h3 class="font-bold text-lg">{{ consultation.student.name }}</h3>
                  <span :class="getStatusClass(consultation.status)" 
                        class="ml-2 px-2 py-1 text-xs rounded-full">
                    {{ consultation.status }}
                  </span>
                </div>
                <span class="text-sm text-blue-600">{{ consultation.type }}</span>
              </div>
              <span class="text-sm text-gray-500">{{ formatDate(consultation.consultationDate) }}</span>
            </div>
            <p class="mt-2 text-sm text-gray-700">{{ consultation.content }}</p>
            <p v-if="consultation.responseContent" class="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
              {{ consultation.responseContent }}
            </p>
          </div>
        </div>

        <!-- 상담 추가 모달 -->
        <Modal :show="showCreateForm" @close="showCreateForm = false">
          <template #title>상담 추가</template>
          <template #content>
            <form @submit.prevent="createConsultation" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">학생</label>
                <select v-model="newConsultation.studentId" class="w-full border rounded p-2">
                  <option v-for="student in students" :key="student.id" :value="student.id">
                    {{ student.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">상담 유형</label>
                <select v-model="newConsultation.type" class="w-full border rounded p-2">
                  <option>수업문의</option>
                  <option>보강문의</option>
                  <option>일정변경</option>
                  <option>기타문의</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">내용</label>
                <textarea v-model="newConsultation.content" rows="4" class="w-full border rounded p-2"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">상담 일시</label>
                <input type="datetime-local" v-model="newConsultation.consultationDate" class="w-full border rounded p-2">
              </div>
              <div class="flex justify-end space-x-2">
                <button type="button" @click="showCreateForm = false" class="px-4 py-2 border rounded">
                  취소
                </button>
                <button type="submit" class="px-4 py-2 bg-orange-500 text-white rounded">
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
const consultations = ref([])
const newConsultation = ref({
  studentId: '',
  type: '',
  content: '',
  consultationDate: ''
})

// 상태 클래스 헬퍼 함수
const getStatusClass = (status) => {
  const classes = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'IN_PROGRESS': 'bg-blue-100 text-blue-800',
    'COMPLETED': 'bg-green-100 text-green-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const createConsultation = async () => {
  try {
    await axios.post('/api/consultations', newConsultation.value)
    showCreateForm.value = false
    loadConsultations()
  } catch (error) {
    console.error('Failed to create consultation:', error)
  }
}

const loadConsultations = async () => {
  try {
    const response = await axios.get('/api/consultations')
    consultations.value = response.data
  } catch (error) {
    console.error('Failed to load consultations:', error)
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
  await Promise.all([
    loadStudents(),
    loadConsultations()
  ])
})
</script>