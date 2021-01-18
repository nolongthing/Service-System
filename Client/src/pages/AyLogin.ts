import { dynamic } from 'umi';

export default dynamic({
  loader: async () => {
    const Login = await import('@/components/Login');
    return Login;
  }
})