import { Alert } from "react-bootstrap";
export const changeNote = (err, dispatch) => {
  dispatch({ type: "CHANGE", msg: err.response.data.error });
  setTimeout(() => {
    dispatch({ type: "RESET" });
  }, 5000);
};
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    return (
      <div>
        <Alert variant="danger">{message}</Alert>
      </div>
    );
  }
};

export default Notification;
