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
      <div class="container mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-5">네이버 블로그 검색 - 상세 분석</h1>
        <div class="mb-4">
          <label class="mr-2">검색 키워드:</label>
          <input type="text" v-model="keyword" class="border border-gray-400 rounded py-2 px-3" @keyup.enter="searchBlogs">
          <button class="bg-blue-500 text-white rounded py-2 px-4 ml-2" @click="searchBlogs">검색</button>
        </div>
        <div v-if="!blogs.length" class="text-gray-500">검색 결과가 없습니다.</div>
        <div v-else>
          <h2 class="text-xl font-bold mb-2">상위 10개 포스팅 분석</h2>
          <table class="table-auto w-full text-left">
            <thead>
              <tr class="bg-gray-200">
                <th class="px-4 py-2">제목</th>
                <th class="px-4 py-2">링크</th>
                <th class="px-4 py-2">작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="blog in blogs" :key="blog.link">
                <td class="border px-4 py-2">{{ blog.title }}</td>
                <td class="border px-4 py-2">
                  <a :href="blog.link" target="_blank" class="text-blue-500">{{ blog.link }}</a>
                </td>
                <td class="border px-4 py-2">{{ blog.postdate }}</td>
              </tr>
            </tbody>
          </table>

          <h2 class="text-xl font-bold my-4">개선 포인트</h2>
          <ul class="list-disc pl-6">
            <li v-for="point in improvementPoints" :key="point" class="mb-1">{{ point }}</li>  
          </ul>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
  
</template>