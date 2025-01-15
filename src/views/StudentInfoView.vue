<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/api.js' // 실제로 학생정보 get/update API가 있다고 가정

import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import UserCard from '@/components/UserCard.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

import { mdiAccount } from '@mdi/js'

// useRoute, useRouter for params & navigation
const route = useRoute()
const router = useRouter()

// studentForm 를 Student 엔티티에 맞게 구성
const studentForm = reactive({
  name: '',
  phone: '',
  parent: '',       // 보호자 연락처
  startTime: '',    // 수업 시작시간 (ex: "14:00")
  endTime: '',      // 수업 종료시간 (ex: "16:00")
  curriculum: '',
  residence: '',
  homePhone: '',
  daysOfWeek: '',
  timeLeft: 0,
  information: '',
  birthday: '',     // LocalDate => "YYYY-MM-DD"
  regDate: ''       // 등록일 => "YYYY-MM-DD"
})

// 학생 정보 불러오기
const fetchStudent = async () => {
  const studentId = route.params.id
  const res = await api.getStudentsById(studentId)
  // 백엔드 응답이 { id, name, phone, parent, startTime, endTime, ... } 형태라 가정
  const data = res.data

  // daysOfWeek (Set<String>)을 콤마로 join해서 문자열로 넣어줌
  // 예: ["mon","wed"] => "mon,wed"
  const daysJoined = data.daysOfWeek ? Array.from(data.daysOfWeek).join(',') : ''

  Object.assign(studentForm, {
    name: data.name || '',
    phone: data.phone || '',
    parent: data.parent || '',
    startTime: data.startTime || '',
    endTime: data.endTime || '',
    curriculum: data.curriculum || '',
    residence: data.residence || '',
    homePhone: data.homePhone || '',
    daysOfWeek: daysJoined,
    timeLeft: data.timeLeft || 0,
    information: data.information || '',
    birthday: data.birthday || '',
    regDate: data.regDate || ''
  })
}

// 학생 정보 수정 제출
const submitStudent = async () => {
  const studentId = route.params.id

  // daysOfWeek를 다시 Set<String> 형태로 변환
  let daysSet = []
  if (studentForm.daysOfWeek.trim().length > 0) {
    daysSet = studentForm.daysOfWeek.split(',').map(s => s.trim())
  }

  // 백엔드가 Student 형태를 그대로 받는다고 가정
  const payload = {
    name: studentForm.name,
    phone: studentForm.phone,
    parent: studentForm.parent,
    startTime: studentForm.startTime,
    endTime: studentForm.endTime,
    curriculum: studentForm.curriculum,
    residence: studentForm.residence,
    homePhone: studentForm.homePhone,
    daysOfWeek: daysSet,        // Set<String>
    timeLeft: studentForm.timeLeft,
    information: studentForm.information,
    birthday: studentForm.birthday,  // "YYYY-MM-DD"
    regDate: studentForm.regDate     // "YYYY-MM-DD"
  }

  await api.updateStudent(studentId, payload)
  router.back() // 수정 완료 후 이전 페이지로 이동
}

// 등원 정보 확인 페이지로 이동
const goToAttendance = () => {
  // 예: /attendance/:id
  router.push(`/attendance/${route.params.id}`)
}

// 초기 mount 시 불러오기
onMounted(fetchStudent)
</script>


<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="학생 정보" main>
        <BaseButton
          color="info"
          label="등원 정보 확인"
          outline
          @click="goToAttendance"
        />
      </SectionTitleLineWithButton>

      <!-- 폼 -->
      <CardBox is-form @submit.prevent="submitStudent">
        <FormField label="Avatar" help="Max 500kb">
          <FormFilePicker label="Upload" />
        </FormField>

        <!-- 이름 -->
        <FormField label="이름" help="Required.">
          <FormControl v-model="studentForm.name" />
        </FormField>

        <!-- 전화번호 -->
        <FormField label="전화번호">
          <FormControl v-model="studentForm.phone" />
        </FormField>

        <!-- 보호자 연락처 -->
        <FormField label="보호자 연락처">
          <FormControl v-model="studentForm.parent" />
        </FormField>

        <!-- 생년월일 -->
        <FormField label="생년월일 (YYYY-MM-DD)">
          <FormControl v-model="studentForm.birthday" type="date" />
        </FormField>

        <!-- 등록일 -->
        <FormField label="등록일 (YYYY-MM-DD)">
          <FormControl v-model="studentForm.regDate" type="date" />
        </FormField>

        <!-- 수업 요일 (Set<String> -> 콤마 구분) -->
        <FormField label="수업 요일 (콤마 구분)">
          <FormControl v-model="studentForm.daysOfWeek" />
        </FormField>

        <!-- 수업 시작시간 -->
        <FormField label="시작 시간 (ex: 14:00)">
          <FormControl v-model="studentForm.startTime" />
        </FormField>

        <!-- 수업 종료시간 -->
        <FormField label="종료 시간 (ex: 16:00)">
          <FormControl v-model="studentForm.endTime" />
        </FormField>

        <!-- 커리큘럼 -->
        <FormField label="커리큘럼">
          <FormControl v-model="studentForm.curriculum" />
        </FormField>

        <!-- 거주지 -->
        <FormField label="거주지">
          <FormControl v-model="studentForm.residence" />
        </FormField>

        <!-- 집 전화번호 -->
        <FormField label="집 전화번호">
          <FormControl v-model="studentForm.homePhone" />
        </FormField>

        <!-- 남은 횟수 -->
        <FormField label="남은 횟수">
          <FormControl v-model.number="studentForm.timeLeft" type="number" min="0" />
        </FormField>

        <!-- 특이사항 -->
        <FormField label="특이사항">
          <FormControl v-model="studentForm.information" />
        </FormField>

        <BaseDivider />

        <template #footer>
          <BaseButtons>
            <BaseButton
              color="info"
              type="submit"
              label="수정"
            />
            <BaseButton
              color="info"
              label="뒤로가기"
              outline
              @click="router.back()"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
