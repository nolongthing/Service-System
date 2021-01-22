export default [
  { path: '/login', component: '@/pages/AyLogin' },
  {
    path: '/',
    component: '@/components/Layout',
    routes: [
      { path: '/index', component: '@/components/Index' },
      { path: '/customer', component: '@/components/Customer' },
      { path: '/my', component: '@/components/My' },
      { path: '/chat', component: '@/components/Chat' },
      { component: '@/components/404' }
    ]
  },
]