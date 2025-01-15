<template>
  <div class="p-6">
    <!-- 상단 타이틀과 최근 접속 -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-2xl font-bold">학습 프로그램</h1>
        <p class="text-sm text-gray-500">안녕하세요, 김민수님!</p>
      </div>
      <div class="text-sm text-gray-500">
        최근 접속: 2025-01-14 14:30
      </div>
    </div>

    <!-- 전체 학습 현황 카드 -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded shadow text-center">
        <div class="flex items-center justify-center mb-1">
          <svg class="w-5 h-5 mr-1 text-gray-400" viewBox="0 0 24 24">
            <path fill="currentColor" :d="mdiClockOutline"/>
          </svg>
          <span class="text-sm text-gray-500">총 학습시간</span>
        </div>
        <div class="text-2xl font-bold">42시간</div>
      </div>
      <div class="bg-white p-4 rounded shadow text-center">
        <div class="flex items-center justify-center mb-1">
          <svg class="w-5 h-5 mr-1 text-gray-400" viewBox="0 0 24 24">
            <path fill="currentColor" :d="mdiProgressCheck" />
          </svg>
          <span class="text-sm text-gray-500">평균 진도율</span>
        </div>
        <div class="text-2xl font-bold">47%</div>
      </div>
      <div class="bg-white p-4 rounded shadow text-center">
        <div class="flex items-center justify-center mb-1">
          <svg class="w-5 h-5 mr-1 text-gray-400" viewBox="0 0 24 24">
            <path fill="currentColor" :d="mdiCheckDecagram" />
          </svg>
          <span class="text-sm text-gray-500">완료한 과제</span>
        </div>
        <div class="text-2xl font-bold">15개</div>
      </div>
      <div class="bg-white p-4 rounded shadow text-center">
        <div class="flex items-center justify-center mb-1">
          <svg class="w-5 h-5 mr-1 text-gray-400" viewBox="0 0 24 24">
            <path fill="currentColor" :d="mdiPlayCircleOutline" />
          </svg>
          <span class="text-sm text-gray-500">현재 진행중</span>
        </div>
        <div class="text-2xl font-bold">3개</div>
      </div>
    </div>

    <!-- 개별 학습 프로그램 진행률 -->
    <div class="space-y-4">
      <!-- 타자 연습 -->
      <div class="bg-white p-4 rounded shadow">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h2 class="text-lg font-semibold">타자 연습</h2>
            <p class="text-sm text-gray-500">최근 학습: 오늘</p>
          </div>
          <p class="text-sm text-gray-700">진행률: <span class="font-bold">65%</span></p>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded mb-2">
          <div class="h-2 bg-blue-500 rounded" style="width: 65%"></div>
        </div>
        <div class="text-sm text-gray-600">
          <div>평균 속도: 320타 / 정확도: 98%</div>
          <div>연습 시간: 2시간</div>
        </div>
      </div>

      <!-- C언어/Python -->
      <div class="bg-white p-4 rounded shadow">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h2 class="text-lg font-semibold">C언어/Python</h2>
            <p class="text-sm text-gray-500">최근 학습: 어제</p>
          </div>
          <p class="text-sm text-gray-700">진행률: <span class="font-bold">45%</span></p>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded mb-2">
          <div class="h-2 bg-green-500 rounded" style="width: 45%"></div>
        </div>
        <div class="text-sm text-gray-600">
          <div>완료한 예제: 23/100</div>
          <div>현재 단원: 배열과 포인터</div>
        </div>
      </div>

      <!-- Arduino/ESP32 -->
      <div class="bg-white p-4 rounded shadow">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h2 class="text-lg font-semibold">Arduino/ESP32</h2>
            <p class="text-sm text-gray-500">최근 학습: 2일 전</p>
          </div>
          <p class="text-sm text-gray-700">진행률: <span class="font-bold">30%</span></p>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded mb-2">
          <div class="h-2 bg-purple-500 rounded" style="width: 30%"></div>
        </div>
        <div class="text-sm text-gray-600">
          <div>완료한 단계: 기초 센서</div>
          <div>현재 실습: LED 제어</div>
        </div>
      </div>

      <!-- Fusion 360 -->
      <div class="bg-white p-4 rounded shadow">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h2 class="text-lg font-semibold">Fusion 360</h2>
            <p class="text-sm text-gray-500">최근 학습: 3일 전</p>
          </div>
          <p class="text-sm text-gray-700">진행률: <span class="font-bold">15%</span></p>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded mb-2">
          <div class="h-2 bg-orange-500 rounded" style="width: 15%"></div>
        </div>
        <div class="text-sm text-gray-600">
          <div>완료한 단계: 기본 도면</div>
          <div>현재 학습: 3D 모델링</div>
        </div>
      </div>

      <!-- 자격증 시험 대비 -->
      <div class="bg-white p-4 rounded shadow">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h2 class="text-lg font-semibold">자격증 시험 대비</h2>
            <p class="text-sm text-gray-500">최근 학습: 오늘</p>
          </div>
          <p class="text-sm text-gray-700">진행률: <span class="font-bold">80%</span></p>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded mb-2">
          <div class="h-2 bg-yellow-500 rounded" style="width: 80%"></div>
        </div>
        <div class="text-sm text-gray-600">
          <div>시험 항목: COS Pro 2급</div>
          <div>시험 일정: 2025-02-15</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  mdiClockOutline,
  mdiProgressCheck,
  mdiCheckDecagram,
  mdiPlayCircleOutline
} from '@mdi/js'
</script>

<style scoped>
</style>
