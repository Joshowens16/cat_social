import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser, setUser } from "../../store/userSlice";
import { RootState } from "../../store";
import axios from "axios";
import { Login } from "@mui/icons-material";
const Home = () => {
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
