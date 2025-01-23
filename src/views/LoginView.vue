# Login.vue
<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="handleLogin">
        <h2 class="text-2xl font-bold mb-6 text-center">학생 로그인</h2>
        
        <FormField label="이름" help="학생 이름을 입력하세요">
          <FormControl
            v-model="studentName"
            :icon="mdiAccount"
            name="name"
            autocomplete="name"
            required
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="로그인" />
            <BaseButton to="/" color="info" outline label="뒤로" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount } from '@mdi/js'
import axios from 'axios'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'

import { adminKey } from '@/AdminKey'

const router = useRouter()
const studentName = ref('')

const handleLogin = async () => {
  try {
    const response = await axios.get(`/api/students/login/${studentName.value}`)
    if (response.data) {
      localStorage.setItem('studentId', response.data.id)
      localStorage.setItem('studentName', response.data.name)
      
      if (response.data.name === adminKey) {
        router.push('/attendance')
      }
      else router.push('/s')
    }
  } catch (error) {
    alert('로그인에 실패했습니다.')
  }
}
</script>