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
  mdiDatabase,
  mdiCalendarCheckOutline,
  mdiNote,
  mdiCertificateOutline,
  mdiFileDocumentMultipleOutline,
  mdiSchoolOutline,
  mdiMagnify,
  mdiNewspaper,
  mdiGraph,
  mdiSchool,
  mdiDirections
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
    to: '/trandnews',
    label: '트렌드/뉴스',
    icon: mdiNewspaper
  },
  {
    label: '마케팅 관리',
    icon: mdiGraph,
    menu: [
      {
        to: '/blogrank',
        icon: mdiMagnify,
        label: '블로그 순위 분석'
      },
    ]
  },
  {
    to: '/code',
    label: '코드 편집기',
    icon: mdiCodeArray
  },
  {
    to: '/s',
    label: '학생용',
    icon: mdiSchool, 
  },
  {
    to: '/phpmyadmin',
    label: '데이터베이스 관리',
    icon: mdiDatabase
  },
  {
    label: '바로가기',
    icon: mdiDirections,
    menu: [
      {
        to: '/mos',
        label: 'MOS',
        icon: mdiNote
      }
    ],
  }

]
