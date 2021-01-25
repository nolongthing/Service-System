import { ImmerReducer, Reducer } from 'umi';


export interface MessageModelState {
  socket: SocketIOClient.Socket | null,
  newMessageList: any[] | null
}
export interface MessageModelType {
  namespace: 'message';
  state: MessageModelState;
  reducers: {
    initMessageList: ImmerReducer<MessageModelState>,
    updateMessageList: ImmerReducer<MessageModelState>,
    setMessageIsRead: ImmerReducer<MessageModelState>,
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
    initMessageList(state, { payload: { messageList } }) {
      return {
        ...state,
        newMessageList: messageList
      }
    },
    updateMessageList(state, { payload }) {
      let newMessageList;
      //更新未读消息列表
      if (state.newMessageList) {
        newMessageList = [...state.newMessageList];
        const updateIndex = newMessageList.findIndex(item => payload.updateList.userType === 1 ? (item.userId === payload.updateList.userId) : (item.customerId === payload.updateList.customerId));
        // console.log(updateIndex, state.newMessageList[updateIndex]);
        //需要更新的消息条不存在
        if (updateIndex === -1) {
          newMessageList.unshift({
            ...payload.updateList,
            noReadCount: 1
          });
        } else {  //需要更新的消息条存在
          // console.log(updateIndex, state.newMessageList[updateIndex]);
          newMessageList.unshift({
            ...state.newMessageList[updateIndex],
            noReadCount: +state.newMessageList[updateIndex].noReadCount + 1,
          })
          newMessageList.splice(updateIndex + 1, 1);
        }
      } else {
        //消息列表不存在（为空）
        newMessageList = [{
          ...payload.updateList,
          noReadCount: 1
        }]
      }
      return {
        ...state,
        newMessageList
      }
    },
    //设置未读消息已读
    setMessageIsRead(state, { payload }) {
      const needSet = payload.from === 1 ? 'userId' : 'customerId';
      const newMessageList = state.newMessageList?.map(item => {
        if (item[needSet] === payload[needSet]) {
          return {
            ...item,
            noReadCount: 0
          }
        }
        return item;
      })
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