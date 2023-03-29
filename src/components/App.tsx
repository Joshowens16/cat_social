import React, { useEffect } from "react";
import Home from "./home/Home";
import Login from "./login/Login";
import { setUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import { RootState } from "../store";
import "./app.css";
import CreateAccount from "./createAccount/CreateAccount";
import SideBar from "./sidebar/SideBar";
const App = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

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

  useEffect(() => {
    loginWithToken();
  }, []);

  return (
    <>
      <Routes>
        {user.id ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/sidebar" element={<SideBar />} />
      </Routes>
    </>
  );
};

export default App;
