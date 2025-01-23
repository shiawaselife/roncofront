import { createRouter, createWebHashHistory } from 'vue-router'
import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'
import StudentInfoView from '@/views/StudentInfoView.vue'
import { comma } from 'postcss/lib/list'
import Portfolios from '@/views/Portfolios.vue'
import { adminKey } from '@/AdminKey.js'

const routes = [
  {
    path: '/',
    redirect: '/attendance'
  },
  {
    meta: {
      title: '학습 관리',
    },
    path: '/study',
    name: 'study',
    component: () => import('@/views/StudyManagement.vue')
  },
  {
    meta: {
      title: 'Student Info'
    },
    path: '/students/:id/info',
    name: 'studentInfo',
    component: StudentInfoView,
  },
  {
    meta: {
      title: 'Attendance Info'
    },
    path: '/attendance/:studentId',
    name: 'AttendanceInfo',
    component: () => import('@/views/AttendanceInfo.vue')
  },
  {
    meta: {
      title: '출결 관리'
    },
    path: '/attendance',
    name: 'attendance',
    component: () => import('@/views/AttendanceManagement.vue')
  },
  {
    meta: {
      title: '학생 관리'
    },
    path: '/students',
    name: 'students',
    component: () => import('@/views/StudentsManagement.vue')
  },
  {
    meta: {
      title: '자격증 관리'
    },
    path: '/certificatate',
    name: 'certificatate',
    component: () => import('@/views/CertificatateManagement.vue')
  },
  {
    meta: {
      title: '리포트 센터'
    },
    path: '/report',
    name: 'report',
    component: () => import('@/views/ReportCenter.vue')
  },
  {
    meta: {
      title: '트렌드/뉴스'
    },
    path: '/trandnews',
    name: 'trand-news',
    component: () => import('@/views/TrendNewsView.vue')
  },
  {
    meta: {
      title: 'Code Editer',
    },
    path: '/code',
    name: 'code',
    component: () => import('@/views/CodeEditer.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/TablesView.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue')
  },
  {
    meta: {
      title: 'Login',
      allowAnonymous: true
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  },
  {
    meta: {
      title: 'Consultations'
    },
    path: '/consultations',
    name: 'consultations',
    component: () => import('@/views/Consultations.vue')
  },
  {
    meta: {
      title: 'Learning Reports'
    },
    path: '/learning-reports',
    name: 'learning-reports',
    component: () => import('@/views/LearningReports.vue')
  },
  {
    meta: {
      title: 'Portfolios'
    },
    path: '/portfolios',
    name: 'portfolios',
    component: () => import('@/views/Portfolios.vue')
  },
  {
    meta: {
      title: 'Blog Rank'
    },
    path: '/blogrank',
    name: 'blogrank',
    component: () => import('@/views/BlogRank.vue')
  },
  {
    meta: {
      title: 'Class Calendar'
    },
    path: '/classes/calendar',
    name: 'class-calendar',
    component: () => import('@/views/ClassCalendar.vue')
  },
  {
    meta: {
      title: '학생용',
    },
    path: '/s',
    name: 'student-dashboard',
    component: () => import('@/views/StudentDashboard.vue')
  },
  {
    path: '/mos',
    beforeEnter: (to, from, next) => {
      window.location.href = 'https://moscontrol.ybmit.com/control/admin_login.asp'
    },
    name: 'mos-redirect'
  },
  {
    path: '/phpmyadmin',
    beforeEnter: (to, from, next) => {
      window.location.href = '/phpmyadmin'
    },
    name: 'phpmyadmin-redirect'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const studentId = localStorage.getItem('studentId')
  const studentName = localStorage.getItem('studentName')
  
  if (!studentId && to.path !== '/login') {
    next('/login')
    return
  }
 
  if (studentId) {
    if (studentName === adminKey) {
      next()
    } else if (to.path !== '/s') {
      next('/s') 
    } else {
      next()
    }
    return
  }
 
  next()
 })

export default router
