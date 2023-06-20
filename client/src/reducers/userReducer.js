const userReducer = (state, action) => {
  switch (action.type) {
    case "Log_User":
      return action.user;
    case "Log_Out_User":
      return null;
    default:
      break;
  }
};

export default userReducer;
