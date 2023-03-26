import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import axios from "axios";
import "./login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    setCredentials({
      ...credentials,
      [event.target!.name]: event.target!.value,
    });
  };

  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });

      dispatch(setUser(response.data));
    }
  };

  const attemptLogin = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post("/api/auth", credentials);
    const token = response.data;
    window.localStorage.setItem("token", token);

    loginWithToken();
  };

  return (
    <div className="loginContainer">
      <div className="loginPortal">
        <h1>Cat Social</h1>
        <form onSubmit={attemptLogin}>
          <input
            placeholder="username"
            value={credentials.username}
            name="username"
            onChange={onChange}
          />
          <input
            placeholder="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
          <button>Log in</button>
        </form>
      </div>
      <div className="createAccount">
        <p>Don&apos;t have an account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
