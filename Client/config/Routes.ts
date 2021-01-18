export default [
  { path: '/login', component: '@/pages/AyLogin' },
  {
    path: '/',
    component: '@/components/Layout',
    routes: [
      { path: '/', component: '@/pages/index' },
      { path: '/chat', component: '@/components/Chat' }
    ]
  },
]