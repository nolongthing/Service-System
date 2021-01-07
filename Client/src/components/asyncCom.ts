import { dynamic } from 'umi';

export default dynamic({
  loader: async () => {
    const { default: Test } = await import('@/pages/test');
    return Test;
  }
})



