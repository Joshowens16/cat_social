import React from "react";
import "./sidebar.css";
import { AiFillHome, AiOutlineSearch, AiOutlineMessage } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import UploadModal from "../fileUpload/UploadModal";
const linkStyles = {
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "center",
  gap: "16px",
  color: "inherit",
  textDecoration: "none",
};
const contents = [
  {
    icon: <AiFillHome />,
    name: "home",
  },
  {
    icon: <AiOutlineSearch />,
    name: "search",
  },
  {
    icon: <AiOutlineMessage />,
    name: "messages",
  },
  {
    icon: <CgProfile />,
    name: "profile",
  },
];
const SideBar = () => {
  return (
    <div className="sideBarContainer">
      <h1>Cat Social</h1>
      <div className="sideBarContents">
        <div className="contents">
          {contents.map((item) => {
            return (
              <div className="contentItem" key={item.name}>
                <Link
                  to={`${item.name === "home" ? "/" : "/" + item.name}`}
                  style={linkStyles}
                >
                  <>{item.icon}</>

                  <>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</>
                </Link>
              </div>
            );
          })}
          <UploadModal />
        </div>
        <div className="hamburgerMenu">
          <GiHamburgerMenu />
          More
        </div>
      </div>
    </div>
  );
};

export default SideBar;
