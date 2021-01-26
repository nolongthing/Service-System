import { defineConfig } from 'umi';
import routes from './config/Routes';

export default defineConfig({
  routes: routes,
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
  dynamicImport: {
    loading: '@/components/Loading'
  },
  dva: {
    immer:true
    // hmr: true
  },
  antd: {},
  proxy: {
    //http请求接口代理
    '/api': {
      'target': 'http://localhost:8081/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
    //socket请求接口代理
    '/socket.io': {
      'target': 'http://localhost:8081', // target host
      'ws': true,
      'changeOrigin': true
    }
  },
  // ssr: {},
});
