# ManageProblems.vue
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="container mx-auto px-4 py-8">
        <!-- 헤더 -->
        <div class="mb-6 flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">문제 관리</h1>
            <p class="mt-1 text-sm text-gray-500">프로그래밍 문제를 관리합니다</p>
          </div>
          <button
            @click="openModal()"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            새 문제 만들기
          </button>
        </div>

        <!-- 문제 목록 -->
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="problem in problems" :key="problem.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ problem.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {{ problem.categoryName }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ problem.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      @click="openModal(problem)"
                      class="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      수정
                    </button>
                    <button
                      @click="confirmDelete(problem)"
                      class="text-red-600 hover:text-red-900"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 문제 생성/수정 모달 -->
        <div v-if="isModalOpen" class="fixed inset-0 z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- 배경 오버레이 -->
        <div class="fixed inset-0 bg-black bg-opacity-70 transition-opacity" @click="closeModal"></div>
        
        <div class="fixed inset-0 z-50 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <!-- 모달 내용 -->
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {{ editingProblem ? '문제 수정' : '새 문제 만들기' }}
                    </h3>
                    <div class="mt-4">
                      <form @submit.prevent="handleSubmit" class="space-y-6">
                        <!-- 카테고리 섹션 -->
                        <div class="grid md:grid-cols-2 gap-6">
                          <div class="space-y-2">
                            <label for="categoryId" class="block text-sm font-medium text-gray-700">
                              카테고리 ID
                              <span class="text-red-500">*</span>
                            </label>
                            <input
                              id="categoryId"
                              v-model="formData.categoryId"
                              type="text"
                              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                          </div>
                          <div class="space-y-2">
                            <label for="categoryName" class="block text-sm font-medium text-gray-700">
                              카테고리 이름
                              <span class="text-red-500">*</span>
                            </label>
                            <input
                              id="categoryName"
                              v-model="formData.categoryName"
                              type="text"
                              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                          </div>
                        </div>

                        <!-- 제목 -->
                        <div class="space-y-2">
                          <label for="title" class="block text-sm font-medium text-gray-700">
                            제목
                            <span class="text-red-500">*</span>
                          </label>
                          <input
                            id="title"
                            v-model="formData.title"
                            type="text"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <!-- 설명 -->
                        <div class="space-y-2">
                          <label for="description" class="block text-sm font-medium text-gray-700">
                            설명
                            <span class="text-red-500">*</span>
                          </label>
                          <textarea
                            id="description"
                            v-model="formData.description"
                            rows="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          ></textarea>
                        </div>

                        <!-- 지시사항 -->
                        <div class="space-y-4">
                          <div class="flex justify-between items-center">
                            <label class="block text-sm font-medium text-gray-700">
                              지시사항
                              <span class="text-red-500">*</span>
                            </label>
                            <button
                              type="button"
                              @click="addInstruction"
                              class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                              추가
                            </button>
                          </div>
                          <div class="space-y-3">
                            <div
                              v-for="(instruction, index) in formData.instructions"
                              :key="index"
                              class="flex gap-2"
                            >
                              <input
                                v-model="formData.instructions[index]"
                                type="text"
                                class="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                :placeholder="`지시사항 ${index + 1}`"
                              />
                              <button
                                type="button"
                                @click="removeInstruction(index)"
                                class="px-2 py-2 text-red-600 hover:text-red-700"
                                :disabled="formData.instructions.length === 1"
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                        </div>

                        <!-- 버튼 그룹 -->
                        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            :disabled="isSubmitting"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            {{ isSubmitting ? '처리 중...' : (editingProblem ? '수정하기' : '만들기') }}
                          </button>
                          <button
                            type="button"
                            @click="closeModal"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                          >
                            취소
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        <!-- 삭제 확인 모달 -->
        <div v-if="showDeleteConfirm" class="fixed inset-0 z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- 배경 오버레이 -->
        <div class="fixed inset-0 bg-black bg-opacity-70 transition-opacity" @click="showDeleteConfirm = false"></div>
        
        <div class="fixed inset-0 z-50 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">문제 삭제</h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        이 문제를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  @click="handleDelete"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  삭제
                </button>
                <button
                  type="button"
                  @click="showDeleteConfirm = false"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  취소
                </button>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionMain from '@/components/SectionMain.vue';

// 상태 관리
const problems = ref([]);
const isModalOpen = ref(false);
const isSubmitting = ref(false);
const showDeleteConfirm = ref(false);
const editingProblem = ref(null);
const selectedProblem = ref(null);

// 폼 데이터 초기 상태
const initialFormData = {
  categoryId: '',
  categoryName: '',
  title: '',
  description: '',
  instructions: ['']
};

const formData = ref({ ...initialFormData });

// 문제 목록 불러오기
const fetchProblems = async () => {
  try {
    const response = await axios.get('/api/problems');
    problems.value = response.data;
  } catch (error) {
    console.error('문제 목록 로딩 중 오류 발생:', error);
    // TODO: 에러 처리
  }
};

// 모달 열기
const openModal = (problem = null) => {
  if (problem) {
    editingProblem.value = problem;
    formData.value = {
      categoryId: problem.categoryId,
      categoryName: problem.categoryName,
      title: problem.title,
      description: problem.description,
      instructions: problem.instructions?.length ? problem.instructions : ['']
    };
  } else {
    editingProblem.value = null;
    formData.value = { ...initialFormData };
  }
  isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
  editingProblem.value = null;
  formData.value = { ...initialFormData };
};

// 지시사항 추가
const addInstruction = () => {
  formData.value.instructions.push('');
};

// 지시사항 삭제
const removeInstruction = (index) => {
  if (formData.value.instructions.length > 1) {
    formData.value.instructions = formData.value.instructions.filter((_, i) => i !== index);
  }
};

// 폼 제출 처리
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const submitData = {
      ...formData.value,
      instructions: formData.value.instructions.filter(inst => inst.trim() !== '')
    };

    if (editingProblem.value) {
      // 수정
      await axios.put(`/api/problems/${editingProblem.value.id}`, submitData);
    } else {
      // 생성
      await axios.post('/api/problems', submitData);
    }

    // 성공 처리
    await fetchProblems(); // 목록 새로고침
    closeModal();
  } catch (error) {
    console.error('문제 저장 중 오류 발생:', error);
    // TODO: 에러 처리
  } finally {
    isSubmitting.value = false;
  }
};

// 삭제 확인 모달
const confirmDelete = (problem) => {
  selectedProblem.value = problem;
  showDeleteConfirm.value = true;
};

// 삭제 처리
const handleDelete = async () => {
  if (!selectedProblem.value) return;

  try {
    await axios.delete(`/api/problems/${selectedProblem.value.id}`);
    await fetchProblems(); // 목록 새로고침
    showDeleteConfirm.value = false;
    selectedProblem.value = null;
  } catch (error) {
    console.error('문제 삭제 중 오류 발생:', error);
    // TODO: 에러 처리
  }
};

// 초기 데이터 로드
onMounted(() => {
  fetchProblems();
});
</script>