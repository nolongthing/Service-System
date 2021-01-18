import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface LoginModelState {
  status: boolean;
}
export interface LoginModelType {
  namespace: 'login';
  state: LoginModelState;
  effects?: {
    query: Effect;
  };
  reducers: {
    // save: Reducer<IndexModelState>;
    // 启用 immer 之后
    changeStatus: ImmerReducer<LoginModelState>;
  };
  subscriptions?: { setup: Subscription };
}
const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    status: true
  },
  reducers: {
    changeStatus(state, action) {
      console.log(111)
      switch (action.type) {
        case 'login':
          return {
            ...state,
            status: true
          }
        case 'logout':
          return {
            ...state,
            status: false
          }
        default:
          return state
      }
    }
  }

};

export default LoginModel;