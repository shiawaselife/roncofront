<template>
  <!-- 라우터로 페이지 전환 -->
  <RouterView />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterView } from 'vue-router'
import API from '@/api/api.js' // 수정된 api.js
import { formatDateTime } from '@/utils/dateUtils.js' // 날짜 포맷 유틸

</script>

<style scoped>
/* 필요한 스타일은 기존과 동일하므로 생략 */
</style>
