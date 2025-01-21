<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">포트폴리오</h1>
          <button @click="showCreateForm = true" class="bg-purple-500 text-white px-4 py-2 rounded flex items-center">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiUpload" />
            </svg>
            포트폴리오 업로드
          </button>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="portfolio in portfolios" :key="portfolio.id" 
              class="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-lg">{{ portfolio.title }}</h3>
                <p class="text-sm text-gray-600">{{ portfolio.student.name }}</p>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-sm text-gray-500">{{ formatDate(portfolio.createdDate) }}</span>
                <!-- 삭제 버튼 -->
                <button @click="deletePortfolio(portfolio.id)" 
                        class="text-red-500 hover:text-red-700">
                  <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" :d="mdiDelete" />
                  </svg>
                </button>
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-700">{{ portfolio.description }}</p>
            <div class="mt-3 flex items-center justify-between">
              <span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                {{ portfolio.projectType }}
              </span>
              <!-- 파일 다운로드 링크 -->
              <a v-if="portfolio.filePath" 
                 :href="'/api/portfolios/' + portfolio.id + '/file'"
                 target="_blank"
                 class="text-blue-500 hover:text-blue-700 text-sm flex items-center">
                <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24">
                  <path fill="currentColor" :d="mdiDownload" />
                </svg>
                파일 다운로드
              </a>
            </div>
          </div>
        </div>

        <!-- 포트폴리오 업로드 모달 -->
        <Modal :show="showCreateForm" @close="showCreateForm = false">
          <template #title>포트폴리오 업로드</template>
          <template #content>
            <form @submit.prevent="createPortfolio" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">학생</label>
                <select v-model="newPortfolio.studentId" class="w-full border rounded p-2">
                  <option v-for="student in students" :key="student.id" :value="student.id">
                    {{ student.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">제목</label>
                <input v-model="newPortfolio.title" type="text" class="w-full border rounded p-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">프로젝트 유형</label>
                <select v-model="newPortfolio.projectType" class="w-full border rounded p-2">
                  <option>Arduino</option>
                  <option>Python</option>
                  <option>C언어</option>
                  <option>웹개발</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">설명</label>
                <textarea v-model="newPortfolio.description" rows="4" class="w-full border rounded p-2"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">파일</label>
                <input type="file" @change="handleFileUpload" class="w-full">
              </div>
              <div class="flex justify-end space-x-2">
                <button type="button" @click="showCreateForm = false" class="px-4 py-2 border rounded">
                  취소
                </button>
                <button type="submit" class="px-4 py-2 bg-purple-500 text-white rounded">
                  업로드
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
import { mdiUpload, mdiDelete, mdiDownload } from '@mdi/js'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

const showCreateForm = ref(false)
const students = ref([])
const portfolios = ref([])
const newPortfolio = ref({
 studentId: '',
 title: '',
 projectType: '',
 description: '',
 file: null
})

const formatDate = (date) => {
 return new Date(date).toLocaleDateString('ko-KR', {
   year: 'numeric',
   month: '2-digit',
   day: '2-digit'
 })
}

const handleFileUpload = (event) => {
 newPortfolio.value.file = event.target.files[0]
}

const createPortfolio = async () => {
 try {
   const formData = new FormData()
   Object.keys(newPortfolio.value).forEach(key => {
     formData.append(key, newPortfolio.value[key])
   })
   
   await axios.post('/api/portfolios', formData, {
     headers: {
       'Content-Type': 'multipart/form-data'
     }
   })
   showCreateForm.value = false
   loadPortfolios()
   // 폼 초기화
   newPortfolio.value = {
     studentId: '',
     title: '',
     projectType: '',
     description: '',
     file: null
   }
 } catch (error) {
   console.error('Failed to create portfolio:', error)
 }
}

const deletePortfolio = async (id) => {
 if (!confirm('정말로 이 포트폴리오를 삭제하시겠습니까?')) return
 
 try {
   await axios.delete(`/api/portfolios/${id}`)
   loadPortfolios()  // 목록 새로고침
 } catch (error) {
   console.error('Failed to delete portfolio:', error)
 }
}

const loadPortfolios = async () => {
 try {
   const response = await axios.get('/api/portfolios')
   portfolios.value = response.data
 } catch (error) {
   console.error('Failed to load portfolios:', error)
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
     loadPortfolios()
   ])
 } catch (error) {
   console.error('Failed to load initial data:', error)
 }
})
</script>