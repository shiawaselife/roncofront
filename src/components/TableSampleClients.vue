<script setup>
import { computed, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import { useRouter } from 'vue-router'
import { mdiEye, mdiTrashCan, mdiPlus } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'

defineProps({
  checkable: Boolean
})

onMounted(() => {
  mainStore.fetchSampleClients() // 학생 데이터 가져오기
})

const dayMapping = {
  mon: '월요일',
  tue: '화요일',
  wed: '수요일',
  thu: '목요일',
  fri: '금요일',
  sat: '토요일',
  sun: '일요일',
}

const mainStore = useMainStore()

const items = computed(() => mainStore.clients)

const router = useRouter()

const goToStudentInfo = (studentId) => {
  // studentInfo 라우트로 이동
  router.push({ name: 'studentInfo', params: { id: studentId } })
}

// 검색어 상태
const searchTerm = ref('')

// 검색어를 기반으로 필터링된 아이템
const filteredItems = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  if (!term) return items.value
  return items.value.filter((client) =>
    client.name.toLowerCase().includes(term) ||
    client.company.toLowerCase().includes(term) ||
    client.city.toLowerCase().includes(term)
  )
})

const isModalActive = ref(false)
const isModalDangerActive = ref(false)

const perPage = ref(5)
const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(() =>
  filteredItems.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(filteredItems.value.length / perPage.value))
const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }
  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []
  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })
  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
  }
}

// 학생 추가 함수
const onAddStudent = () => {
  console.log('학생 추가 버튼 클릭')
  router.push('/forms')
}
</script>

<template>
  <!-- 모달 창들 -->
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="확인해주세요" button="danger" has-cancel>
    <p>클릭하신 학생의 정보가 <b>삭제됩니다</b>.</p>
    <p>진행하시겠습니까?</p>
  </CardBoxModal>

  <!-- 검색 및 추가 버튼 -->
  <div class="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="검색(이름)"
      class="border rounded px-3 py-2 w-full md:w-1/3"
    />
    <BaseButton color="info" :icon="mdiPlus" small @click="onAddStudent" />
  </div>

  <!-- 테이블 -->
  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>이름</th>
        <th>전화번호</th>
        <th>생년월일</th>
        <th>수업 요일</th>
        <th>수업 시간</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" />
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :username="client.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
        </td>
        <td data-label="이름">
          {{ client.name }}
        </td>
        <td data-label="전화번호">
          {{ client.phone }}
        </td>
        <td data-label="생년월일">
          {{ client.birthday }}
        </td>
        <td data-label="수업 요일">
          {{ client.daysOfWeek.map(day => dayMapping[day]).join(', ') }}
        </td>
        <td data-label="수업 시간">
          {{ client.schedule }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiEye" small @click="goToStudentInfo(client.id)" />
            <BaseButton color="danger" :icon="mdiTrashCan" small @click="isModalDangerActive = true" />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- 페이징 -->
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>