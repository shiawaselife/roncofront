<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div>
        <!-- 페이지 헤더 -->
        <div class="flex items-center mb-6">
          <svg class="w-6 h-6 mr-2 text-green-500" viewBox="0 0 24 24">
            <path fill="currentColor" :d="mdiSchoolOutline" />
          </svg>
          <h1 class="text-2xl font-bold">학습 관리</h1>
        </div>

        <!-- 과목 목록 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- 타자 연습 -->
          <div class="bg-white p-4 rounded shadow flex flex-col">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2 text-blue-500" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiKeyboardOutline"/>
              </svg>
              <h2 class="font-semibold text-lg">타자 연습</h2>
            </div>
            <p class="text-sm text-gray-600 mb-2">현재 학습중: 12명</p>
            <button class="bg-blue-500 text-white px-3 py-1 rounded mt-auto">상세보기</button>
          </div>

          <!-- COS Pro/COS -->
          <div class="bg-white p-4 rounded shadow flex flex-col">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2 text-yellow-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiLaptop"/>
              </svg>
              <h2 class="font-semibold text-lg">COS Pro/COS</h2>
            </div>
            <p class="text-sm text-gray-600 mb-2">현재 학습중: 8명</p>
            <button class="bg-blue-500 text-white px-3 py-1 rounded mt-auto">상세보기</button>
          </div>

          <!-- C/Python -->
          <div class="bg-white p-4 rounded shadow flex flex-col">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2 text-green-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiLanguagePython"/>
              </svg>
              <h2 class="font-semibold text-lg">C/Python</h2>
            </div>
            <p class="text-sm text-gray-600 mb-2">현재 학습중: 15명</p>
            <button class="bg-blue-500 text-white px-3 py-1 rounded mt-auto">상세보기</button>
          </div>

          <!-- Arduino/ESP32 -->
          <div class="bg-white p-4 rounded shadow flex flex-col">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2 text-purple-600" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiAccessPointNetwork"/>
              </svg>
              <h2 class="font-semibold text-lg">Arduino/ESP32</h2>
            </div>
            <p class="text-sm text-gray-600 mb-2">현재 학습중: 6명</p>
            <button class="bg-blue-500 text-white px-3 py-1 rounded mt-auto">상세보기</button>
          </div>

          <!-- Fusion 360 -->
          <div class="bg-white p-4 rounded shadow flex flex-col">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 mr-2 text-orange-500" viewBox="0 0 24 24">
                <path fill="currentColor" :d="mdiCubeOutline"/>
              </svg>
              <h2 class="font-semibold text-lg">Fusion 360</h2>
            </div>
            <p class="text-sm text-gray-600 mb-2">현재 학습중: 10명</p>
            <button class="bg-blue-500 text-white px-3 py-1 rounded mt-auto">상세보기</button>
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
  mdiSchoolOutline,
  mdiKeyboardOutline,
  mdiLanguagePython,
  mdiAccessPointNetwork,
  mdiCubeOutline,
  mdiLaptop
} from '@mdi/js'
</script>

<style scoped>
</style>
