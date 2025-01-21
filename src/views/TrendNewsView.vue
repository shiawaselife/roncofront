# TrendNews.vue
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="min-h-screen bg-gray-50 p-4">
        <!-- News Container -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">트렌드/뉴스</h2>
            <div class="flex items-center gap-4">
              <!-- Search Input -->
              <div class="relative">
                <input 
                  v-model="searchTerm"
                  type="text"
                  placeholder="뉴스 검색..."
                  class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @keyup.enter="handleSearch"
                >
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>
              <span class="text-gray-500">{{ currentDateTime }} 업데이트</span>
              <button 
                class="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                @click="refreshNews"
                :disabled="loading"
              >
                <i class="fas fa-sync" :class="{ 'animate-spin': loading }"></i>
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-10">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-10">
            <p class="text-red-500">{{ error }}</p>
            <button 
              @click="refreshNews"
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              다시 시도
            </button>
          </div>

          <!-- News List -->
          <div v-else class="space-y-6">
            <div v-for="news in newsItems" :key="news.id" 
                class="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              <!-- News Meta -->
              <div class="flex items-center gap-3 mb-3 flex-wrap">
                <span :class="[
                  'px-3 py-1 rounded-full text-sm',
                  news.category.type === 'tech' ? 'bg-blue-100 text-blue-700' : '',
                  news.category.type === 'science' ? 'bg-green-100 text-green-700' : '',
                  news.category.type === 'education' ? 'bg-purple-100 text-purple-700' : ''
                ]">
                  {{ news.category.name }}
                </span>
                <span v-for="tag in news.tags" :key="tag" 
                      class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {{ tag }}
                </span>
                <span class="text-gray-500 text-sm">{{ news.time }}</span>
              </div>

              <!-- News Title -->
              <h3 class="text-lg font-medium mb-2 flex items-center gap-2">
                <a 
                  :href="news.externalUrl" 
                  target="_blank" 
                  class="hover:text-blue-600"
                >
                  {{ news.title }}
                  <i class="fas fa-external-link-alt text-gray-400 text-sm ml-2"></i>
                </a>
              </h3>

              <!-- News Description -->
              <p class="text-gray-600 leading-relaxed mb-3">
                {{ news.description }}
              </p>

              <!-- News Actions -->
              <div class="flex items-center gap-3">
                <button 
                  @click="toggleBookmark(news)"
                  :class="[
                    'text-gray-400 hover:text-gray-600 transition',
                    news.bookmarked ? 'text-yellow-400 hover:text-yellow-500' : ''
                  ]"
                >
                  <i class="fas fa-bookmark"></i>
                </button>
                <button 
                  @click="shareNews(news)"
                  class="text-gray-400 hover:text-gray-600 transition"
                >
                  <i class="fas fa-share-alt"></i>
                </button>
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