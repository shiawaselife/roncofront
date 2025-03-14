<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useWebSocketStore } from '@/stores/WebSocketStore'
import dayjs from 'dayjs'

// localStorage에서 초기 로그 로드
const loadLogsFromStorage = () => {
  const storedLogs = localStorage.getItem('activityLogs')
  return storedLogs ? JSON.parse(storedLogs) : []
}

const logs = ref(loadLogsFromStorage())
const isMinimized = ref(true)
const webSocketStore = useWebSocketStore()

// 토글 함수
const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
}

// 로그 추가 함수
const addLog = (logEvent) => {
  const log = {
    id: Date.now(),
    timestamp: dayjs().format('HH:mm:ss'),
    ...logEvent
  }
  
  logs.value.unshift(log)
  
  // 최대 50개로 제한
  if (logs.value.length > 50) {
    logs.value.pop()
  }
  
  // localStorage에 저장
  localStorage.setItem('activityLogs', JSON.stringify(logs.value))
}

// 로그 초기화 함수
const clearLogs = () => {
  logs.value = []
  localStorage.removeItem('activityLogs')
}

// 로그 타입별 렌더링 계산 속성
const renderLogs = computed(() => {
  return logs.value.map(log => {
    if (log.type === 'attendance') {
      return {
        ...log,
        displayText: `${log.studentName} ${log.action === 'in' ? '등원' : '하원'}`,
        className: log.action === 'in' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-blue-100 text-blue-800'
      }
    } else if (log.type === 'problem') {
      return {
        ...log,
        displayText: `${log.studentName} 문제 ${log.problemId} 완료`,
        className: 'bg-purple-100 text-purple-800'
      }
    }
    return log
  })
})

// 생명주기 훅
onMounted(() => {
  webSocketStore.connect()
  webSocketStore.subscribe('/topic/activity-logs', addLog)
})

onUnmounted(() => {
  webSocketStore.unsubscribe('/topic/activity-logs', addLog)
})

defineEmits(['attendance-update'])
</script>

<template>
  <div 
    class="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-lg transition-all duration-300 transform z-50 overflow-hidden"
    :class="[isMinimized ? 'h-12' : 'h-96']"
  >
    <!-- 헤더 -->
    <div 
      @click="toggleMinimize"
      class="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer group"
    >
      <div class="flex items-center space-x-2">
        <h3 class="text-sm font-medium text-white">실시간 활동 로그</h3>
        <!-- 연결 상태 표시 -->
        <div class="flex items-center">
          <span 
            class="flex h-2 w-2 relative"
            :class="webSocketStore.isConnected ? 'text-green-500' : 'text-red-500'"
          >
            <span 
              class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              :class="webSocketStore.isConnected ? 'bg-green-500' : 'bg-red-500'"
            ></span>
            <span 
              class="relative inline-flex rounded-full h-2 w-2"
              :class="webSocketStore.isConnected ? 'bg-green-500' : 'bg-red-500'"
            ></span>
          </span>
        </div>
      </div>
      <!-- 최소화/최대화 버튼 -->
      <button class="text-white opacity-75 hover:opacity-100 transition-opacity">
        <svg 
          class="w-4 h-4 transform transition-transform"
          :class="isMinimized ? 'rotate-180' : ''"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>

    <!-- 로그 내용 -->
    <div 
      v-show="!isMinimized"
      class="h-[calc(100%-3rem)] overflow-y-auto bg-gray-50"
    >
      <!-- 연결 끊김 상태 -->
      <div 
        v-if="!webSocketStore.isConnected" 
        class="p-4 bg-red-50 border-l-4 border-red-500"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path 
                fillRule="evenodd" 
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              연결이 끊어졌습니다. 재연결 시도 중...
            </p>
          </div>
        </div>
      </div>

      <!-- 로그 없음 상태 -->
      <div 
        v-else-if="logs.length === 0" 
        class="flex items-center justify-center h-full text-gray-500"
      >
        <p class="text-sm">아직 활동 내역이 없습니다</p>
      </div>

      <!-- 로그 목록 -->
      <div v-else class="divide-y divide-gray-100">
        <div 
          v-for="log in renderLogs" 
          :key="log.id"
          class="p-3 hover:bg-gray-100 transition-colors duration-150"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">{{ log.timestamp }}</span>
          </div>
          <div class="mt-1">
            <div class="flex items-center space-x-1">
              <span class="font-medium text-gray-900">{{ log.displayText }}</span>
              <span 
                class="px-2 py-1 text-xs rounded-full"
                :class="log.className"
              >
                {{ log.type }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 로그 초기화 버튼 -->
      <div v-if="logs.length > 0" class="p-2 text-center">
        <button 
          @click="clearLogs" 
          class="text-sm text-red-500 hover:text-red-700 hover:underline"
        >
          모든 로그 지우기
        </button>
      </div>
    </div>
  </div>
</template>