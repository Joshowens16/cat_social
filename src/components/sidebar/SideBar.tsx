import React from "react";
import "./sidebar.css";
import { AiFillHome, AiOutlineSearch, AiOutlineMessage } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const contents = [
  {
    icon: <AiFillHome />,
    name: "Home",
  },
  {
    icon: <AiOutlineSearch />,
    name: "Search",
  },
  {
    icon: <AiOutlineMessage />,
    name: "Messages",
  },
  {
    icon: <CgProfile />,
    name: "Profile",
  },
];
const SideBar = () => {
  return (
    <div className="sideBarContainer">
      <div className="sideBarContents">
        <h1>Cat Social</h1>
        <div className="contents">
          {contents.map((item) => {
            return (
              <div className="contentItem" key={item.name}>
                {item.icon}
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
