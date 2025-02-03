<template>
 <div class="min-h-screen bg-gray-50 py-6 px-4">
   <div class="max-w-7xl mx-auto">
     <!-- 헤더 -->
     <div class="mb-8">
       <h1 class="text-2xl font-bold text-gray-900 mb-4">C/Python 문제 모음</h1>
       
       <!-- 진도율 -->
       <div class="bg-white rounded-lg shadow p-4">
         <div class="flex justify-between mb-2">
           <span class="font-medium">전체 진행률</span>
           <span>{{ solvedCount }}/{{ totalProblems }}문제</span>
         </div>
         <div class="w-full bg-gray-200 rounded-full h-2.5">
           <div class="bg-emerald-600 h-2.5 rounded-full" 
                :style="`width: ${(solvedCount/totalProblems)*100}%`"></div>
         </div>
       </div>
     </div>

     <!-- 카테고리 선택 -->
     <div class="relative w-full md:w-96 mb-8">
       <button 
         @click="isOpen = !isOpen"
         class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
       >
         <div class="flex items-center justify-between">
           <span class="block truncate">{{ selectedCategory ? selectedCategory.title : '카테고리 선택' }}</span>
           <span class="pointer-events-none">
             <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
             </svg>
           </span>
         </div>
       </button>

       <div 
         v-if="isOpen"
         class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
       >
         <div
           v-for="category in categories"
           :key="category.id"
           @click="selectCategory(category)"
           class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
         >
           <div class="flex items-center justify-between">
             <span class="font-normal block truncate">{{ category.title }}</span>
             <span class="text-sm text-gray-500">
               ({{ getSolvedCount(category.id) }}/{{ category.problems.length }})
             </span>
           </div>
         </div>
       </div>
     </div>

     <!-- 선택된 카테고리의 문제 목록 -->
     <div v-if="selectedCategory" class="bg-white rounded-lg shadow overflow-hidden">
       <table class="min-w-full">
         <thead class="bg-gray-50 border-b">
           <tr>
             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">번호</th>
             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">제목</th>
             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">결과</th>
             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
           </tr>
         </thead>
         <tbody class="divide-y divide-gray-200">
           <tr v-for="problem in selectedCategory.problems" 
               :key="problem.id"
               @click="goToProblem(problem.id)"
               class="hover:bg-gray-50 cursor-pointer">
             <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
               {{ problem.id }}
             </td>
             <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
               {{ problem.title }}
             </td>
             <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
               <span v-if="problem.result" 
                     :class="problem.result === 'success' ? 'text-green-600' : 'text-red-600'">
                 {{ problem.result === 'success' ? '성공' : '실패' }}
               </span>
             </td>
             <td class="px-6 py-4 whitespace-nowrap text-sm">
               <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                     :class="getStatusClass(problem.status)">
                 {{ problem.status }}
               </span>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
 </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchProblems } from '@/api/CodeExecutionApi.js'

const router = useRouter()
const isOpen = ref(false)
const selectedCategory = ref(null)



const categories = ref([
 {
   id: 1,
   title: '입력과 출력',
   problems: [
     { id: 1, number: 8, title: '일반맵 출력하기1', status: '완료', result: 'success' },
     { id: 2, number: 11, title: '수식 출력하기2', status: '미시도' }
   ]
 },
 {
   id: 2,
   title: '조건문',
   problems: [
     { id: 3, number: 13, title: 'N 2번 출력하기', status: '진행중' }
   ]
 },
 {
   id: 3,
   title: '반복문',
   problems: []
 },
 {
   id: 4,
   title: '중첩반복문',
   problems: []
 },
 {
   id: 5,
   title: '1차원 배열',
   problems: []
 },
 {
   id: 6,
   title: '함수',
   problems: []
 },
 {
   id: 7,
   title: '다차원 배열',
   problems: []
 },
 {
   id: 8,
   title: '문자열',
   problems: []
 }
])

const selectCategory = (category) => {
 selectedCategory.value = category
 isOpen.value = false
}

const totalProblems = computed(() => 
 categories.value.reduce((acc, cat) => acc + cat.problems.length, 0)
)

const solvedCount = computed(() => 
 categories.value.reduce((acc, cat) => 
   acc + cat.problems.filter(p => p.status === '완료').length, 0
 )
)

const getSolvedCount = (categoryId) => {
 const category = categories.value.find(c => c.id === categoryId)
 return category.problems.filter(p => p.status === '완료').length
}

const goToProblem = (problem) => {
  console.log(problem, selectedCategory.value)
  router.push({
    path: '/code',
    query: { 
      category: selectedCategory.value.id,
      problem: problem
    }
  })
}
const getStatusClass = (status) => {
 switch(status) {
   case '완료':
     return 'bg-green-100 text-green-800'
   case '진행중':
     return 'bg-yellow-100 text-yellow-800'
   case '미시도':
     return 'bg-gray-100 text-gray-800'
   default:
     return 'bg-gray-100 text-gray-800'
 }
}

async function loadProblemsFromServer() {
 try {
   const fetchedProblems = await fetchProblems()
   
   // 카테고리 ID 기준으로 문제 그룹화
   const problemsByCategory = fetchedProblems.reduce((acc, problem) => {
     const categoryId = Number(problem.categoryId)
     if (!acc[categoryId]) {
       acc[categoryId] = []
     }
     acc[categoryId].push(problem)
     return acc
   }, {})

   // 카테고리 데이터 업데이트
   categories.value = categories.value.map(category => ({
     ...category,
     problems: problemsByCategory[category.id] || []
   }))

 } catch (error) {
   console.error('문제 목록 로드 실패:', error)
 }
}

// onMounted 추가
onMounted(() => {
 loadProblemsFromServer()
})
</script>