<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <!-- 메인 컨테이너 -->
        <div class="max-w-6xl mx-auto">
          <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
            <!-- 헤더 섹션 -->
            <div class="border-b border-gray-100">
              <div class="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 class="text-2xl font-bold text-gray-800">트렌드/뉴스</h2>
                  <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <!-- 검색 입력 -->
                    <div class="relative w-full sm:w-64">
                      <input 
                        v-model="searchTerm"
                        type="text"
                        placeholder="뉴스 검색..."
                        class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        @keyup.enter="handleSearch"
                      >
                      <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                    <!-- 업데이트 정보 -->
                    <div class="flex items-center gap-3">
                      <span class="text-sm text-gray-500">{{ currentDateTime }} 업데이트</span>
                      <button 
                        class="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                        @click="refreshNews"
                        :disabled="loading"
                      >
                        <i class="fas fa-sync" :class="{ 'animate-spin': loading }"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 컨텐츠 영역 -->
            <div class="px-6 py-6">
              <!-- 로딩 상태 -->
              <div v-if="loading" class="flex justify-center items-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>

              <!-- 에러 상태 -->
              <div v-else-if="error" class="text-center py-20">
                <p class="text-red-500 mb-4">{{ error }}</p>
                <button 
                  @click="refreshNews"
                  class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  다시 시도
                </button>
              </div>

              <!-- 뉴스 목록 -->
              <div v-else class="space-y-8">
                <div 
                  v-for="news in newsItems" 
                  :key="news.id" 
                  class="group p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200"
                >
                  <!-- 뉴스 메타 정보 -->
                  <div class="flex flex-wrap items-center gap-2 mb-3">
                    <span :class="[
                      'px-3 py-1.5 rounded-full text-sm font-medium',
                      news.category.type === 'tech' ? 'bg-blue-100 text-blue-700' : '',
                      news.category.type === 'science' ? 'bg-green-100 text-green-700' : '',
                      news.category.type === 'education' ? 'bg-purple-100 text-purple-700' : ''
                    ]">
                      {{ news.category.name }}
                    </span>
                    <span 
                      v-for="tag in news.tags" 
                      :key="tag" 
                      class="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {{ tag }}
                    </span>
                    <span class="text-sm text-gray-500">{{ news.time }}</span>
                  </div>

                  <!-- 뉴스 제목 -->
                  <h3 class="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    <a 
                      :href="news.externalUrl" 
                      target="_blank" 
                      class="flex items-center gap-2"
                    >
                      {{ news.title }}
                      <i class="fas fa-external-link-alt text-gray-400 text-sm transition-colors group-hover:text-blue-500"></i>
                    </a>
                  </h3>

                  <!-- 뉴스 설명 -->
                  <p class="text-gray-600 leading-relaxed mb-4">
                    {{ news.description }}
                  </p>

                  <!-- 뉴스 액션 -->
                  <div class="flex items-center gap-4">
                    <button 
                      @click="toggleBookmark(news)"
                      class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      :class="news.bookmarked ? 'text-yellow-500' : 'text-gray-500'"
                    >
                      <i class="fas fa-bookmark"></i>
                      <span class="text-sm">북마크</span>
                    </button>
                    <button 
                      @click="shareNews(news)"
                      class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                    >
                      <i class="fas fa-share-alt"></i>
                      <span class="text-sm">공유</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import { newsService } from '@/services/newsService'

const newsItems = ref([])
const loading = ref(false)
const error = ref(null)
const searchTerm = ref('')

// 현재 시간 표시
const currentDateTime = computed(() => {
  const now = new Date()
  return now.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// 뉴스 시간 포맷팅
const formatTimestamp = (timestamp) => {
  const now = new Date()
  const date = new Date(timestamp)
  const diffTime = Math.abs(now - date)
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  
  if (diffHours < 1) {
    return '방금 전'
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`
  } else {
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}일 전`
  }
}

// 뉴스 데이터 가져오기
const fetchNews = async () => {
  loading.value = true
  error.value = null
  try {
    const newsData = await newsService.getAllNews()
    newsItems.value = newsData.map(item => ({
      ...item,
      time: formatTimestamp(item.timestamp),
      tags: [item.source],
      bookmarked: false
    }))
  } catch (err) {
    error.value = '뉴스를 불러오는데 실패했습니다'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 검색 처리
const handleSearch = async () => {
  if (!searchTerm.value.trim()) {
    return fetchNews()
  }
  
  loading.value = true
  error.value = null
  try {
    const results = await newsService.searchNews(searchTerm.value)
    newsItems.value = results.map(item => ({
      ...item,
      time: formatTimestamp(item.timestamp),
      tags: [item.source],
      bookmarked: false
    }))
  } catch (err) {
    error.value = '검색에 실패했습니다'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 북마크 토글
const toggleBookmark = (news) => {
  news.bookmarked = !news.bookmarked
}

// 뉴스 공유
const shareNews = async (news) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: news.title,
        text: news.description,
        url: news.externalUrl
      })
    } else {
      await navigator.clipboard.writeText(news.externalUrl)
      alert('링크가 클립보드에 복사되었습니다.')
    }
  } catch (err) {
    console.error('Error sharing news:', err)
  }
}

// 새로고침
const refreshNews = () => {
  fetchNews()
}

// 컴포넌트 마운트 시 뉴스 가져오기
onMounted(() => {
  fetchNews()
})
</script>