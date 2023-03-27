import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./createAccount.css";
const CreateAccount = () => {
  const [backendValidation, setBackendValidation] = useState(false);
  const [httpStatus, setHttpStatus] = useState<number | null>(null);
  const [accountInfo, setAccountInfo] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const createAccount = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBackendValidation(true);
    const bodyToSubmit = {
      email: accountInfo.email,
      username: accountInfo.username,
      firstName: accountInfo.firstName,
      lastName: accountInfo.lastName,
      password: accountInfo.password,
    };
    const res = await axios.post("/api/users", bodyToSubmit);
    console.log(res);
    setHttpStatus(res.status);
    setBackendValidation(false);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    setAccountInfo({
      ...accountInfo,
      [event.target!.name]: event.target!.value,
    });
  };
  return (
    <div className="signupContainer">
      <div className="signupPortal">
        <h1>Cat Social</h1>
        <p>Sign up to see photos and videos from your feline friends.</p>
        <form onSubmit={createAccount}>
          <input
            placeholder="Email"
            value={accountInfo.email}
            name="email"
            onChange={onChange}
          />
          <input
            placeholder="Username"
            value={accountInfo.username}
            name="username"
            onChange={onChange}
          />
          <input
            placeholder="First Name"
            value={accountInfo.firstName}
            name="firstName"
            onChange={onChange}
          />
          <input
            placeholder="Last Name"
            value={accountInfo.lastName}
            name="lastName"
            onChange={onChange}
          />
          <input
            placeholder="Password"
            name="password"
            value={accountInfo.password}
            onChange={onChange}
          />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="signinAccount">
        <p>Already have an account?</p>
        <Link to="/">Sign In</Link>
      </div>
    </div>
  );
};

export default CreateAccount;
