import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  extraPostCSSPlugins: [
    require('postcss-pxtorem')({
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules/i
    })
  ],
  dynamicImport: {},
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/test', component: '@/components/asyncTest' },
  ],
  // ssr: {},
});
