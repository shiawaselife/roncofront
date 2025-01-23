<template>
 <div>
   <nav v-if="isLoggedIn" class="bg-white shadow">
     <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div class="flex justify-between h-16">
         <div class="flex items-center">
           <div class="text-lg font-semibold">{{ studentName }}님 안녕하세요!</div>
         </div>
         <button 
           @click="handleLogout"
           class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
         >
           로그아웃
         </button>
       </div>
     </div>
   </nav>
   <slot/>
 </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { adminKey } from '@/AdminKey.js'

const router = useRouter()
const studentName = computed(() => {
  const realName = localStorage.getItem('studentName')
  if (realName === adminKey) {
    return '관리용'
  }
  return realName
})
const isLoggedIn = computed(() => !!localStorage.getItem('studentId'))

const handleLogout = () => {
 localStorage.removeItem('studentId')
 localStorage.removeItem('studentName')
 router.push('/')
}
</script>