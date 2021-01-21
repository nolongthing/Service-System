import { ImmerReducer } from 'umi';


export interface MessageModelState {
  newMessageList: any[] | null
}
export interface MessageModelType {
  namespace: 'message';
  state: MessageModelState;
  reducers: {
    updateMessageList: ImmerReducer<MessageModelState>;
  };
}

const messageModel: MessageModelType = {
  namespace: 'message',
  state: {
    newMessageList: null,
  },
  reducers: {
    updateMessageList(state, action) {

    }
  }

};

export default messageModel;