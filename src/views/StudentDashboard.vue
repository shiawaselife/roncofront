<template>
  <div class="min-h-screen bg-gray-50 py-6 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- 헤더 -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">학생 프로그램</h1>
      </div>

      <!-- 메인 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- 학교 정보 수업 -->
        <div class="bg-white rounded-lg shadow p-6 border-t-4 border-emerald-600">
          <h2 class="text-lg font-semibold mb-4">학교 정보 수업</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>현재 진도</span>
              <span>프로그래밍 기초</span>
            </div>
            <div class="flex justify-between">
              <span>학습 진도</span>
              <span>85%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-emerald-600 h-2.5 rounded-full" style="width: 85%"></div>
            </div>
            <button class="w-full mt-4 bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700">
              수업 시작
            </button>
          </div>
        </div>

        <!-- 타자 연습 -->
        <div class="bg-white rounded-lg shadow p-6 border-t-4 border-blue-600">
          <h2 class="text-lg font-semibold mb-4">타자 연습</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>현재 진도</span>
              <span>자판 연습</span>
            </div>
            <div class="flex justify-between">
              <span>정확도</span>
              <span>98%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-blue-600 h-2.5 rounded-full" style="width: 98%"></div>
            </div>
            <button class="w-full mt-4 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
              시작하기
            </button>
          </div>
        </div>

        <!-- 코딩 프로그램 -->
        <div class="bg-white rounded-lg shadow p-6 border-t-4 border-yellow-500">
          <h2 class="text-lg font-semibold mb-4">COS Pro/COS</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>현재 과정</span>
              <span>Python COS</span>
            </div>
            <div class="flex justify-between">
              <span>진행률</span>
              <span>45%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-yellow-500 h-2.5 rounded-full" style="width: 45%"></div>
            </div>
            <button class="w-full mt-4 bg-yellow-500 text-white rounded-lg py-2 hover:bg-yellow-600">
              시작하기
            </button>
          </div>
        </div>
      </div>

      <!-- 중간 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- C/Python -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">C/Python</h2>
          <div class="space-y-2">
            <div>알고리즘 : 기초 문법</div>
            <div>완료된 과제: 3/10</div>
          </div>
          <button class="w-full mt-4 bg-emerald-500 text-white rounded-lg py-2 hover:bg-emerald-600">
            시작하기
          </button>
        </div>

        <!-- 메이커 랩 -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">메이커 랩</h2>
          <div class="space-y-2">
            <div>진행 프로젝트: LED 제어</div>
            <div>진행상태: 고안 중</div>
          </div>
          <button class="w-full mt-4 bg-orange-500 text-white rounded-lg py-2 hover:bg-orange-600">
            시작하기
          </button>
        </div>

        <!-- Fusion 360 -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Fusion 360</h2>
          <div class="space-y-2">
            <div>현재 모델링: 기초 도형</div>
            <div>제출한 작품: 2개</div>
          </div>
          <button class="w-full mt-4 bg-purple-500 text-white rounded-lg py-2 hover:bg-purple-600">
            시작하기
          </button>
        </div>
      </div>

      <!-- 하단 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 코드모스 -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">코드모스</h2>
            <button class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              저장
            </button>
          </div>
          <div class="space-y-2">
            <div>최근 기록: 반복문 실습 - 2024.01.22</div>
            <div>최근 평가: 기초 프로그래밍 테스트 68점</div>
          </div>
        </div>

        <!-- Code.org -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Code.org</h2>
            <button class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              저장
            </button>
          </div>
          <div class="space-y-2">
            <div>최근 기록: Course D - Unit 3 - 2024.01.21</div>
            <div>최근 평가: 알고리즘 과정 완료</div>
          </div>
        </div>
      </div>

      <!-- IT 퀴즈 챌린지 -->
      <div class="bg-white rounded-lg shadow p-6 mt-8">
        <h2 class="text-lg font-semibold mb-4">IT 퀴즈 챌린지</h2>
        <div class="h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <span class="text-gray-500">퀴즈 컨텐츠가 준비중입니다</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 상태 관리

import { ref, onMounted } from 'vue'

const student = ref(null)

// API 호출
onMounted(async () => {
  // 학생 정보 로드
  try {
    const response = await axios.get('/api/student/current')
    student.value = response.data
  } catch (error) {
    console.error('학생 정보 로드 실패:', error)
  }
})
</script>