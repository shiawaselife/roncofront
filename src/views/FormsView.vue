<script setup>
import { reactive, ref } from 'vue'
import {
  mdiBallotOutline,
  mdiAccount,
  mdiPhone,
  mdiPhoneClassic,
  mdiHome,
  mdiCalendar
} from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import API from '@/api/api.js'

/**
 * Student 엔티티에 따른 폼 구조
 * name, phone, parent, startTime, endTime, curriculum, residence,
 * homePhone, daysOfWeek, timeLeft, information, birthday, regDate
 */
const form = reactive({
  name: '',
  phone: '',
  parent: '',
  startTime: '01:30',
  endTime: '03:00',
  curriculum: '',
  residence: '',
  homePhone: '',
  daysOfWeek: [],
  timeLeft: 0,
  information: '',
  birthday: '',  // "YYYY-MM-DD"
  regDate: '',   // "YYYY-MM-DD" (등록일)
})

/**
 * 폼 유효성 검사
 * 엔티티에서 not null 인 것들: name, phone, parent, startTime, endTime, curriculum, residence, birthday
 * 나머지는 optional
 */
const validateForm = () => {
  const requiredFields = [
    'name',
    'phone',
    'parent',
    'startTime',
    'endTime',
    'curriculum',
    'residence',
    'birthday'
  ]
  const missing = requiredFields.filter(field => !form[field] || form[field].toString().trim() === '')

  if (missing.length > 0) {
    alert(`다음 필드를 입력해주세요: ${missing.join(', ')}`)
    return false
  }
  return true
}

/**
 * 폼 제출 (학생 등록)
 */
const submit = async () => {
  if (!validateForm()) {
    return
  }
  console.log('제출 데이터:', form)

  // 서버 전송 시, daysOfWeek는 Array<string> 형태로 OK
  try {
    const response = await API.createStudent(form)
    console.log(response.data)
    alert('학생 등록이 완료되었습니다!')
    // 필요하면 form 초기화 or 페이지 이동
  } catch (e) {
    console.error(e)
    alert('학생 등록 중 오류가 발생했습니다.')
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- 상단 섹션 -->
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="학생 등록"
        main
      />

      <CardBox>
        <!-- 폼 제출 -->
        <form @submit.prevent="submit">

          <!-- 기본 인적사항 -->
          <FormField label="기본 인적사항">
            <!-- 3열 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- 이름 -->
              <FormControl
                v-model="form.name"
                :icon="mdiAccount"
                placeholder="이름"
                class="w-full"
              />

              <!-- 전화번호 -->
              <FormControl
                v-model="form.phone"
                type="tel"
                :icon="mdiPhone"
                placeholder="전화번호"
                class="w-full"
              />

              <!-- 보호자 연락처 -->
              <FormControl
                v-model="form.parent"
                type="tel"
                :icon="mdiPhoneClassic"
                placeholder="보호자 연락처"
                class="w-full"
              />
            </div>

            <!-- 2열 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <!-- 생년월일 -->
              <FormControl
                v-model="form.birthday"
                type="date"
                :icon="mdiCalendar"
                placeholder="생년월일"
                class="w-full"
              />

              <!-- 등록일 (optional) -->
              <FormControl
                v-model="form.regDate"
                type="date"
                placeholder="등록일 (선택)"
                class="w-full"
              />

              <!-- 거주지 -->
              <FormControl
                v-model="form.residence"
                :icon="mdiHome"
                placeholder="거주지"
                class="w-full"
              />
            </div>
          </FormField>

          <!-- 수업 정보 -->
          <FormField label="수업 정보">
            <!-- 커리큘럼, 요일 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold mb-2" for="curriculum">커리큘럼</label>
                <FormControl
                  id="curriculum"
                  v-model="form.curriculum"
                  placeholder="ex) C언어, 아두이노, 파이썬..."
                  class="w-full"
                />
              </div>
              <div>
                <label class="block font-bold mb-2" for="daysOfWeek">수업 요일 (복수 선택)</label>
                <!-- 요일 체크박스 -->
                <FormCheckRadioGroup
                  id="daysOfWeek"
                  v-model="form.daysOfWeek"
                  name="daysOfWeek"
                  type="checkbox"
                  :options="{
                    mon: '월요일',
                    tue: '화요일',
                    wed: '수요일',
                    thu: '목요일',
                    fri: '금요일',
                    sat: '토요일',
                    sun: '일요일',
                  }"
                />
              </div>
            </div>
          </FormField>

          <BaseDivider />

          <!-- 추가 정보 -->
          <FormField label="추가 정보" help="기타 특이사항 등을 입력하세요.">
            <FormControl
              type="textarea"
              v-model="form.information"
              class="w-full"
            />
          </FormField>

          <!-- 남은 횟수 (timeLeft) -->
          <FormField label="남은 횟수">
            <FormControl
              type="number"
              v-model.number="form.timeLeft"
              min="0"
              class="w-full"
            />
          </FormField>

          <BaseDivider />

          <!-- 전화번호(집) -->
          <FormField label="집 전화번호 (optional)">
            <FormControl
              v-model="form.homePhone"
              placeholder="ex) 02-xxx-xxxx"
              class="w-full"
            />
          </FormField>

          <!-- 폼 제출 버튼 -->
          <div class="mt-4">
            <BaseButtons>
              <BaseButton
                type="submit"
                color="info"
                label="등록"
              />
            </BaseButtons>
          </div>

        </form>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
