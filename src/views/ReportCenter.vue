<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="p-6">
        <!-- 상단 메뉴 영역 -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-2 text-blue-600" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiFileDocumentMultipleOutline" />
            </svg>
            <h1 class="text-2xl font-bold">리포트 센터</h1>
          </div>
          <div class="flex items-center space-x-2">
            <select class="border p-1 rounded text-sm">
              <option>김민수</option>
              <option>이영희</option>
            </select>
            <select class="border p-1 rounded text-sm">
              <option>월간</option>
              <option>주간</option>
            </select>
            <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm">보고서 생성</button>
          </div>
        </div>

        <!-- 상단 3가지 메뉴(학습 보고서, 포트폴리오, 상담 기록) -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-500" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiFileChartOutline" />
            </svg>
            <div>
              <h2 class="text-lg font-semibold">학습 보고서</h2>
              <p class="text-sm text-gray-500">학생별 학습 현황 리포트</p>
            </div>
          </div>
          <div class="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiFolderOutline" />
            </svg>
            <div>
              <h2 class="text-lg font-semibold">포트폴리오 관리</h2>
              <p class="text-sm text-gray-500">학생 결과물 및 기록</p>
            </div>
          </div>
          <div class="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer flex items-center">
            <svg class="w-5 h-5 mr-2 text-orange-500" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiPhone" />
            </svg>
            <div>
              <h2 class="text-lg font-semibold">상담 기록</h2>
              <p class="text-sm text-gray-500">문의 및 상담 관리</p>
            </div>
          </div>
        </div>

        <!-- 하단 내용: 최근 상담 기록, 포트폴리오, 학생별 진도 현황 -->
        <div class="grid grid-cols-2 gap-4">
          <!-- 최근 상담 기록 -->
          <div class="bg-white p-4 rounded shadow">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2 text-blue-500" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiCommentTextMultipleOutline"/>
              </svg>
              <h3 class="text-lg font-semibold">최근 상담 기록</h3>
            </div>
            <ul class="space-y-3">
              <li class="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span class="font-bold">김민수</span>
                  <span class="ml-2 text-sm text-blue-600">수업문의</span>
                  <p class="text-xs text-gray-500">코딩 기초 과정 문의, 2월 등록 희망 (Python)</p>
                </div>
                <div class="text-right text-sm">
                  <div>2025-01-14</div>
                  <span class="text-yellow-500 font-semibold">상담예정</span>
                </div>
              </li>
              <li class="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span class="font-bold">이영희</span>
                  <span class="ml-2 text-sm text-purple-600">보강문의</span>
                  <p class="text-xs text-gray-500">결석에 따른 보강 일정 조율 (Arduino)</p>
                </div>
                <div class="text-right text-sm">
                  <div>2025-01-13</div>
                  <span class="text-green-600 font-semibold">처리완료</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- 포트폴리오 -->
          <div class="bg-white p-4 rounded shadow">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2 text-purple-500" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiFolderOutline"/>
              </svg>
              <h3 class="text-lg font-semibold">포트폴리오</h3>
            </div>
            <ul class="space-y-3">
              <li class="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span class="font-bold">Arduino 프로젝트</span>
                  <p class="text-xs text-gray-500">김민수</p>
                </div>
                <div class="text-sm text-gray-600">2025-01-14</div>
              </li>
              <li class="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span class="font-bold">로봇 제어 시험</span>
                  <p class="text-xs text-gray-500">이영희</p>
                </div>
                <div class="text-sm text-gray-600">2025-01-13</div>
              </li>
            </ul>
            <div class="text-right mt-2">
              <button class="bg-purple-500 text-white px-3 py-1 rounded text-sm flex items-center">
                <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24">
                  <path fill="currentColor" :d="mdiUpload"/>
                </svg>
                업로드
              </button>
            </div>
          </div>
        </div>

        <!-- 학생별 진도 현황 -->
        <div class="bg-white p-4 rounded shadow mt-4">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 mr-2 text-green-500" viewBox="0 0 24 24">
              <path fill="currentColor" :d="mdiProgressCheck" />
            </svg>
            <h3 class="text-lg font-semibold">학생별 진도 현황</h3>
          </div>
          <p class="text-sm text-gray-500 mb-3">선택된 학생의 프로그래밍 진도율</p>
          <!-- 예시 진행률 -->
          <div class="mb-4">
            <div class="flex justify-between mb-1">
              <span>Python 기초</span>
              <span class="text-sm text-gray-500">75% (최근 업데이트: 2025-01-14)</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded">
              <div class="h-2 bg-blue-500 rounded" style="width: 75%"></div>
            </div>
          </div>
          <div class="mb-4">
            <div class="flex justify-between mb-1">
              <span>Arduino 기초</span>
              <span class="text-sm text-gray-500">50% (최근 업데이트: 2025-01-12)</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded">
              <div class="h-2 bg-purple-500 rounded" style="width: 50%"></div>
            </div>
          </div>
          <div class="mb-4">
            <div class="flex justify-between mb-1">
              <span>C언어/Python 혼합과정</span>
              <span class="text-sm text-gray-500">35% (최근 업데이트: 2025-01-10)</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded">
              <div class="h-2 bg-green-500 rounded" style="width: 35%"></div>
            </div>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
  
</template>

<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'

import {
  mdiFileDocumentMultipleOutline,
  mdiFileChartOutline,
  mdiFolderOutline,
  mdiPhone,
  mdiCommentTextMultipleOutline,
  mdiProgressCheck,
  mdiUpload
} from '@mdi/js'

</script>

<style scoped>
</style>
