<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="max-w-7xl mx-auto p-6 space-y-8">
        <!-- 헤더 섹션 -->
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <svg class="w-8 h-8 text-purple-600" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8A2,2 0 0,0 20,6M20,18H4V8H20V18Z" />
              </svg>
              <h1 class="text-2xl font-bold text-gray-800">포트폴리오</h1>
            </div>
            <button 
              @click="showCreateForm = true" 
              class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-150 shadow-sm"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiUpload" />
              </svg>
              포트폴리오 업로드
            </button>
          </div>
        </div>

        <!-- 포트폴리오 그리드 -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="portfolio in portfolios" 
            :key="portfolio.id" 
            class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <!-- 포트폴리오 헤더 -->
            <div class="p-6 border-b border-gray-100">
              <div class="flex justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">{{ portfolio.title }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ portfolio.student.name }}</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-sm text-gray-500">{{ formatDate(portfolio.createdDate) }}</span>
                  <button 
                    @click="deletePortfolio(portfolio.id)"
                    class="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" :d="mdiDelete" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- 포트폴리오 내용 -->
            <div class="p-6">
              <p class="text-gray-600 text-sm leading-relaxed">{{ portfolio.description }}</p>
              
              <div class="mt-4 flex items-center justify-between">
                <span class="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                  {{ portfolio.projectType }}
                </span>
                
                <a 
                  v-if="portfolio.filePath" 
                  :href="'/api/portfolios/' + portfolio.id + '/file'"
                  target="_blank"
                  class="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24">
                    <path fill="currentColor" :d="mdiDownload" />
                  </svg>
                  파일 다운로드
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 포트폴리오 업로드 모달 -->
        <Modal :show="showCreateForm" @close="showCreateForm = false">
          <template #title>
            <div class="flex items-center space-x-2">
              <svg class="w-6 h-6 text-purple-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiUpload" />
              </svg>
              <span>포트폴리오 업로드</span>
            </div>
          </template>
          <template #content>
            <form @submit.prevent="createPortfolio" class="space-y-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">학생</label>
                <select 
                  v-model="newPortfolio.studentId" 
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                >
                  <option value="">학생을 선택하세요</option>
                  <option v-for="student in students" :key="student.id" :value="student.id">
                    {{ student.name }}
                  </option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">제목</label>
                <input 
                  v-model="newPortfolio.title" 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="프로젝트 제목을 입력하세요"
                >
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">프로젝트 유형</label>
                <select 
                  v-model="newPortfolio.projectType" 
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                >
                  <option value="">프로젝트 유형을 선택하세요</option>
                  <option>Arduino</option>
                  <option>Python</option>
                  <option>C언어</option>
                  <option>웹개발</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">설명</label>
                <textarea 
                  v-model="newPortfolio.description" 
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                  placeholder="프로젝트에 대한 설명을 입력하세요"
                ></textarea>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">파일</label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div class="space-y-1 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label class="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                        <span>파일 업로드</span>
                        <input type="file" @change="handleFileUpload" class="sr-only">
                      </label>
                      <p class="pl-1">또는 드래그 앤 드롭</p>
                    </div>
                    <p class="text-xs text-gray-500">ZIP, PDF, DOC, DOCX 최대 10MB</p>
                  </div>
                </div>
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
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-150"
                >
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