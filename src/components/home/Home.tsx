import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser, setUser } from "../../store/userSlice";
import { RootState } from "../../store";
import axios from "axios";
import "./home.css";
import UploadPost from "../file upload/UploadPost";
import Timeline from "../timeline/Timeline";
const Home = () => {
  const { user } = useSelector((state: RootState) => state);
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
    <div className="homeContainer">
      {/* <UploadPost /> */}
      <Timeline />
    </div>
  );
};

export default Home;
