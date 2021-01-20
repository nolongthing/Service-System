export default [
  { path: '/login', component: '@/pages/AyLogin' },
  {
    path: '/',
    component: '@/components/Layout',
    routes: [
      { path: '/index', component: '@/pages/index' },
      { path: '/customer', component: '@/components/Customer' },
      { path: '/my', component: '@/components/My' },
      { path: '/chat', component: '@/components/Chat' }
    ]
  },
]