<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="max-w-7xl mx-auto p-6 space-y-8">
        <!-- 헤더 섹션 -->
        <div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 shadow-sm">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <svg class="w-8 h-8 text-orange-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiPhone" />
              </svg>
              <h1 class="text-2xl font-bold text-gray-800">상담 기록</h1>
            </div>
            <button 
              @click="showCreateForm = true" 
              class="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-150 shadow-sm"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiPlus" />
              </svg>
              상담 추가
            </button>
          </div>
        </div>

        <!-- 상담 목록 -->
        <div class="space-y-4">
          <div 
            v-for="consultation in consultations" 
            :key="consultation.id" 
            class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div class="p-6 border-b border-gray-100">
              <div class="flex justify-between items-start">
                <div class="space-y-1">
                  <div class="flex items-center space-x-3">
                    <h3 class="text-lg font-semibold text-gray-800">{{ consultation.student.name }}</h3>
                    <span 
                      :class="[
                        'px-3 py-1 text-xs rounded-full font-medium',
                        getStatusClass(consultation.status)
                      ]"
                    >
                      {{ consultation.status }}
                    </span>
                  </div>
                  <span class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {{ consultation.type }}
                  </span>
                </div>
                <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {{ formatDate(consultation.consultationDate) }}
                </span>
              </div>
            </div>

            <div class="p-6 space-y-4">
              <!-- 상담 내용 -->
              <div>
                <p class="text-gray-600 text-sm leading-relaxed">{{ consultation.content }}</p>
              </div>

              <!-- 답변 내용 -->
              <div 
                v-if="consultation.responseContent"
                class="bg-gray-50 rounded-lg p-4 border border-gray-100"
              >
                <p class="text-gray-600 text-sm leading-relaxed">
                  {{ consultation.responseContent }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 상담 추가 모달 -->
        <Modal :show="showCreateForm" @close="showCreateForm = false">
          <template #title>
            <div class="flex items-center space-x-2">
              <svg class="w-6 h-6 text-orange-600" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M20 16H5.2L4 17.2V4H20V16Z" />
              </svg>
              <span>상담 추가</span>
            </div>
          </template>
          <template #content>
            <form @submit.prevent="createConsultation" class="space-y-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">학생</label>
                <select 
                  v-model="newConsultation.studentId" 
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                >
                  <option value="">학생을 선택하세요</option>
                  <option v-for="student in students" :key="student.id" :value="student.id">
                    {{ student.name }}
                  </option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">상담 유형</label>
                <select 
                  v-model="newConsultation.type"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                >
                  <option value="">상담 유형을 선택하세요</option>
                  <option>수업문의</option>
                  <option>보강문의</option>
                  <option>일정변경</option>
                  <option>기타문의</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">내용</label>
                <textarea 
                  v-model="newConsultation.content"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none"
                  placeholder="상담 내용을 입력하세요"
                ></textarea>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">상담 일시</label>
                <input 
                  type="datetime-local"
                  v-model="newConsultation.consultationDate"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                >
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
                  class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-150"
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
import { mdiPlus, mdiPhone } from '@mdi/js'

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