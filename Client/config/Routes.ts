export default [
  {
    path: '/',
    component: '@/components/Layout',
    routes: [
      { path: '/', component: '@/pages/index.tsx' }
    ]
  },
  { path: '/test', component: '@/pages/AyTest' },
]