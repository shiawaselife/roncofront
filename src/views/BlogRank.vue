<!-- App.vue -->
<script setup>
import { ref } from 'vue'
import axios from 'axios'

import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

const keyword = ref('')
const blogs = ref([])
const improvementPoints = [
  '제목 키워드 최적화',
  '대표 이미지 활용', 
  '포스팅 주기 준수',
  '내부 링크 활용',
  '해시태그 활용',
]

const searchBlogs = async () => {
  const params = {
    query: keyword.value,
    display: 10,
    start: 1,
    sort: 'date'
  }
  const headers = {
    'X-Naver-Client-Id': 'D09FBOxISDaoDhEVqfPj',
    'X-Naver-Client-Secret': 'C3FN8ediq6'
  }

  try {
    const res = await axios.get('/v1/search/blog', { params, headers })
    blogs.value = res.data.items
  } catch (err) {
    console.error(err) 
  }
}
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="max-w-7xl mx-auto p-6 space-y-8">
        <!-- 헤더 섹션 -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm">
          <div class="flex items-center space-x-3">
            <svg class="w-8 h-8 text-blue-600" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
            <h1 class="text-2xl font-bold text-gray-800">네이버 블로그 검색 - 상세 분석</h1>
          </div>
        </div>

        <!-- 검색 섹션 -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="max-w-2xl">
            <label class="block text-sm font-medium text-gray-700 mb-2">검색 키워드</label>
            <div class="flex space-x-2">
              <input 
                type="text" 
                v-model="keyword" 
                @keyup.enter="searchBlogs"
                class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="검색어를 입력하세요"
              >
              <button 
                @click="searchBlogs"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm inline-flex items-center space-x-2"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
                <span>검색</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 결과 섹션 -->
        <div v-if="!blogs.length" class="bg-white rounded-xl shadow-sm p-12 text-center">
          <div class="text-gray-500">검색어를 입력하여 블로그를 분석해보세요.</div>
        </div>

        <div v-else class="space-y-6">
          <!-- 검색 결과 테이블 -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-800">상위 10개 포스팅 분석</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gray-50 text-left">
                    <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                    <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">링크</th>
                    <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr 
                    v-for="blog in blogs" 
                    :key="blog.link"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4 text-sm text-gray-900">{{ blog.title }}</td>
                    <td class="px-6 py-4">
                      <a 
                        :href="blog.link" 
                        target="_blank" 
                        class="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center space-x-1"
                      >
                        <span>링크</span>
                        <svg class="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                        </svg>
                      </a>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ blog.postdate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 개선 포인트 카드 -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-800">개선 포인트</h2>
            </div>
            <div class="p-6">
              <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <li 
                  v-for="point in improvementPoints" 
                  :key="point"
                  class="flex items-start space-x-2 bg-gray-50 p-4 rounded-lg"
                >
                  <svg class="w-5 h-5 text-blue-600 mt-0.5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                  </svg>
                  <span class="text-gray-700">{{ point }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>