import React from "react";
import "./profile.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const Profile = () => {
  const { user } = useSelector((state: RootState) => state);
  console.log(user);
  return <div className="profileContainer">My Profile</div>;
};

export default Profile;
