<!-- TypingResults.vue -->
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <!-- 헤더 섹션 -->
          <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">타자 연습 결과</h1>
          </div>

          <!-- 학생 선택 드롭다운 섹션 -->
          <div class="mt-8">
            <div class="max-w-xl mx-auto relative">
              <div class="relative">
                <input
                  type="text"
                  v-model="searchQuery"
                  @input="handleSearch"
                  @focus="showDropdown = true"
                  placeholder="학생 검색 또는 선택..."
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-10"
                />
                <button 
                  @click="toggleDropdown"
                  class="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
                >
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z"/>
                    <path d="M10 17a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 17z"/>
                  </svg>
                </button>
              </div>
              
              <!-- 드롭다운 목록 -->
              <div 
                v-if="showDropdown"
                class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto"
              >
                <div class="sticky top-0 bg-white border-b border-gray-200">
                  <input
                    type="text"
                    v-model="searchQuery"
                    @input="handleSearch"
                    placeholder="학생 이름으로 검색..."
                    class="w-full p-2 border-0 focus:ring-0 sm:text-sm"
                  />
                </div>
                <ul class="py-1">
                  <li 
                    v-for="student in filteredStudents" 
                    :key="student.id"
                    @click="selectStudent(student)"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  >
                    <span>{{ student.name }}</span>
                    <span class="text-sm text-gray-500">{{ student.phone }}</span>
                  </li>
                  <li v-if="filteredStudents.length === 0" class="px-4 py-2 text-sm text-gray-500">
                    검색 결과가 없습니다
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 선택된 학생 정보 및 결과 -->
          <template v-if="currentStudent">
            <!-- 통계 카드 섹션 -->
            <div class="mt-10" v-if="userStats">
              <h2 class="text-2xl font-semibold text-gray-900 mb-6">타자 연습 통계</h2>
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <dt class="text-sm font-medium text-gray-500 truncate">평균 타자</dt>
                    <dd class="mt-1 text-3xl font-semibold text-indigo-600">
                      {{ userStats.averageCpm }}
                    </dd>
                  </div>
                </div>

                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <dt class="text-sm font-medium text-gray-500 truncate">평균 정확도</dt>
                    <dd class="mt-1 text-3xl font-semibold text-green-600">
                      {{ userStats.averageAccuracy }}%
                    </dd>
                  </div>
                </div>

                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <dt class="text-sm font-medium text-gray-500 truncate">총 연습 횟수</dt>
                    <dd class="mt-1 text-3xl font-semibold text-blue-600">
                      {{ userStats.totalPractices }}회
                    </dd>
                  </div>
                </div>
              </div>
            </div>

            <!-- 결과 테이블 섹션 -->
            <div class="mt-10">
              <h2 class="text-2xl font-semibold text-gray-900 mb-6">연습 기록</h2>
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        날짜
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        타자 속도
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        정확도
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        진행률
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="result in typingResults" :key="result.id" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ formatDate(result.timestamp) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {{ result.cpm }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="text-sm text-gray-900">{{ result.accuracy }}%</div>
                          <div 
                            class="ml-2 w-16 bg-gray-200 rounded-full h-2"
                            :title="`정확도: ${result.accuracy}%`"
                          >
                            <div 
                              class="bg-green-600 h-2 rounded-full" 
                              :style="`width: ${result.accuracy}%`"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="text-sm text-gray-900">
                            {{ calculateProgress(result.completedLength, result.textLength) }}%
                          </div>
                          <div 
                            class="ml-2 w-16 bg-gray-200 rounded-full h-2"
                            :title="`진행률: ${calculateProgress(result.completedLength, result.textLength)}%`"
                          >
                            <div 
                              class="bg-blue-600 h-2 rounded-full" 
                              :style="`width: ${calculateProgress(result.completedLength, result.textLength)}%`"
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import axios from 'axios';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionMain from '@/components/SectionMain.vue';
import { debounce } from 'lodash';

const typingResults = ref([]);
const userStats = ref(null);
const currentStudent = ref(null);
const searchQuery = ref('');
const allStudents = ref([]);
const showDropdown = ref(false);

// 필터링된 학생 목록
const filteredStudents = computed(() => {
  if (!searchQuery.value) {
    return allStudents.value;
  }
  const query = searchQuery.value.toLowerCase();
  return allStudents.value.filter(student => 
    student.name.toLowerCase().includes(query) ||
    student.phone.includes(query)
  );
});

// API 호출을 위한 기본 설정
const api = axios.create({
  baseURL: '/api'
});

// 날짜 포맷팅 함수
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 진행률 계산 함수
const calculateProgress = (completed, total) => {
  return ((completed / total) * 100).toFixed(1);
};

// 모든 학생 목록 가져오기
const fetchAllStudents = async () => {
  try {
    const response = await api.get('/students');
    allStudents.value = response.data;
  } catch (error) {
    console.error('학생 목록을 가져오는데 실패했습니다:', error);
    allStudents.value = [];
  }
};

// 드롭다운 토글
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// 학생 선택 함수
const selectStudent = async (student) => {
  currentStudent.value = student;
  searchQuery.value = student.name;
  showDropdown.value = false;
  await loadStudentData(student.id);
};

// 학생 데이터 로드
const loadStudentData = async (studentId) => {
  try {
    await Promise.all([
      fetchResults(studentId),
      fetchUserStats(studentId)
    ]);
  } catch (error) {
    console.error('학생 데이터를 불러오는데 실패했습니다:', error);
  }
};

// 결과 데이터 가져오기
const fetchResults = async (studentId) => {
  try {
    const response = await api.get(`/typing/results/student/${studentId}`);
    typingResults.value = response.data;
    console.log(typingResults)
  } catch (error) {
    console.error('결과를 가져오는데 실패했습니다:', error);
    typingResults.value = [];
  }
};

// 사용자 통계 가져오기
const fetchUserStats = async (studentId) => {
  try {
    const response = await api.get(`/typing/stats/${studentId}`);
    userStats.value = response.data;
  } catch (error) {
    console.error('통계를 가져오는데 실패했습니다:', error);
    userStats.value = null;
  }
};

// 드롭다운 외부 클릭 처리
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.relative');
  if (dropdown && !dropdown.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  fetchAllStudents();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>