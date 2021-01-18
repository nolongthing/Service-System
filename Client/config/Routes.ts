export default [
  { path: '/test', component: '@/pages/AyTest' },
  {
    path: '/',
    component: '@/components/Layout',
    routes: [
      { path: '/', component: '@/pages/index' },
      { path: '/chat', component: '@/components/Chat' }
    ]
  },
]