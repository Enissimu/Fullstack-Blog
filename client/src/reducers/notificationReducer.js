const notificatReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return action.msg;
    case "RESET":
      return null;
    default:
      return state;
  }
};

export default notificatReducer;
