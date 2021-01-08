import { dynamic } from 'umi';

export default dynamic({
  loader: async () => {
    const Test = await import('@/components/Test');
    return Test;
  }
})