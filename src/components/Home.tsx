import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../store/userSlice";
import { RootState } from "../store";
import axios from "axios";
const Home = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = async () => {
    window.localStorage.removeItem("token");
    const user_id = user.id;
    await axios.post("/api/auth/revokeRefreshTokens", user_id);
    dispatch(resetUser());
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        <p>Welcome {user.username}!!</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
