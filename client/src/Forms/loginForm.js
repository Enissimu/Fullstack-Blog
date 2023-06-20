import { useState, useEffect, useReducer } from "react";
import { Button, Form } from "react-bootstrap";
import { changeNote } from "../components/notifications";
import userReducer from "../reducers/userReducer";
import { setToken } from "../services/blogservice";

function LoginForm({ login, dispatchNotify }) {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [user, dispatch] = useReducer(userReducer, null);

  const handleLogout = () => {
    dispatch({ type: "Log_Out_User" });
    localStorage.clear("loggedUser");
  };

  useEffect(() => {
    const jsonUser = window.localStorage.getItem("loggedUser");
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      setToken(user.token);
      dispatch({ type: "Log_User", user });
    }
  }, []);

  const HandleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });
      dispatch({ type: "Log_User", user });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (err) {
      changeNote(err, dispatchNotify);
    }
  };

  return (
    <div>
      {user !== null ? (
        <div>
          <p>
            welcome back
            {user.name}
          </p>
          <Button className="LogoutButton" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      ) : (
        <Form onSubmit={HandleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              id="UsernameInput"
              onChange={({ target }) => SetUsername(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              id="PasswordInput"
              onChange={({ target }) => SetPassword(target.value)}
            />
          </Form.Group>
          <Button type="submit" id="loginButton">
            Login
          </Button>
        </Form>
      )}
    </div>
  );
}

export default LoginForm;
