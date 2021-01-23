import { ImmerReducer } from 'umi';


export interface MessageModelState {
  socket: SocketIOClient.Socket | null,
  newMessageList: any[] | null
}
export interface MessageModelType {
  namespace: 'message';
  state: MessageModelState;
  reducers: {
    updateMessageList: ImmerReducer<MessageModelState>,
    setSocket: ImmerReducer<MessageModelState>,
  };
}

const messageModel: MessageModelType = {
  namespace: 'message',
  state: {
    socket: null,
    newMessageList: null,
  },
  reducers: {
    updateMessageList(state, { payload }) {
      let newMessageList;
      if (payload.messageList) {
        newMessageList = payload.messageList;
      } else if (payload.updateList) {

      }
      return {
        ...state,
        newMessageList
      }
    },
    setSocket(state, { payload }) {
      return {
        ...state,
        socket: payload
      }
    }
  }

};

export default messageModel;