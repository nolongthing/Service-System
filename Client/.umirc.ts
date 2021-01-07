import { defineConfig, dynamic } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {},
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/test', component: '@/components/asyncCom' },
  ],
  ssr: {},
});
