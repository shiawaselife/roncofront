import {
  mdiAccountCircle,
  mdiMonitor,
  mdiCodeArray,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiAccountMultipleOutline,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiCalendarCheckOutline,
  mdiNote,
  mdiCertificateOutline,
  mdiFileDocumentMultipleOutline,
  mdiSchoolOutline,
  mdiMedal,
} from '@mdi/js'

export default [
  {
    to: '/attendance',
    icon: mdiCalendarCheckOutline,
    label: '출결 관리',
  },
  {
    to: '/study',
    icon: mdiSchoolOutline,
    label: '학습 관리'
  },
  {
    to: '/students',
    label: '학생 관리',
    icon: mdiAccountMultipleOutline
  },
  {
    to: '/certificatate',
    label: '자격증 관리',
    icon: mdiCertificateOutline,
  },
  {
    to: '/report',
    label: '리포트 센터',
    icon: mdiFileDocumentMultipleOutline,
  },
  {
    to: '/code',
    label: '코드 편집기',
    icon: mdiCodeArray
  },
  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One'
      },
      {
        label: 'Item Two'
      }
    ]
  },
]
