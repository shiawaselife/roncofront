//LayoutAuthenticated.vue
<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import menuAside from '@/menuAside.js'
import menuNavBar from '@/menuNavBar.js'
import { useDarkModeStore } from '@/stores/darkMode.js'
import BaseIcon from '@/components/BaseIcon.vue'
import FormControl from '@/components/FormControl.vue'
import NavBar from '@/components/NavBar.vue'
import NavBarItemPlain from '@/components/NavBarItemPlain.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

// ActivityLog 컴포넌트 import
import ActivityLog from '@/components/ActivityLog.vue'

const layoutAsidePadding = 'xl:pl-60'

const darkModeStore = useDarkModeStore()

const router = useRouter()

const isAsideMobileExpanded = ref(false)
const isAsideLgActive = ref(false)

router.beforeEach(() => {
  isAsideMobileExpanded.value = false
  isAsideLgActive.value = false
})

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    darkModeStore.set()
  }

  if (item.isLogout) {
    //
  }
}

// 실시간 로그 업데이트 핸들러
const handleActivityUpdate = (event) => {
  // 필요한 경우 상위 컴포넌트로 이벤트 전달
  console.log('Activity update:', event)
}
</script>

<template>
  <div
    :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain display="hidden lg:flex xl:hidden" @click.prevent="isAsideLgActive = true">
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />

      <!-- 활동 로그 창 추가 -->
      <ActivityLog 
        @activity-update="handleActivityUpdate"
        class="activity-log-container"
      />
    </div>
  </div>
</template>

<style scoped>
.activity-log-container {
  /* z-index를 NavBar보다 낮게 설정하여 겹치지 않도록 함 */
  z-index: 40;
  
  /* 다크 모드 지원 */
  @apply dark:bg-slate-900 dark:text-slate-100;
}

/* 사이드바가 열려있을 때 로그 창의 위치 조정 */
@media (min-width: 1280px) {
  .activity-log-container {
    right: 20px; /* 기본 위치 */
  }

  .xl\:pl-60 .activity-log-container {
    right: 80px; /* 사이드바가 열려있을 때 */
  }
}
</style>