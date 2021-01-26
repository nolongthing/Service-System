import { ImmerReducer, Reducer } from 'umi';
export interface AppSetState {
  header: string | null
}
export interface AppSetType {
  namespace: 'appSet';
  state: AppSetState;
  reducers: {
    setHeader: ImmerReducer<AppSetState>
  };
}
const appSetModel: AppSetType = {
  namespace: 'appSet',
  state: {
    header: null
  },
  reducers: {
    setHeader(state: any, action: any) {
      return {
        ...state,
        header: action.payload
      }
    }
  }

};

export default appSetModel;