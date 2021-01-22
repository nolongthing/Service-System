const appSetModel = {
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