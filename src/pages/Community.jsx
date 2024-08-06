import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/banner1.svg";
import Form from "../component/Form";
import SideMenu from "../component/SideMenu";
import Logo from "../component/Logo";
import Write from "../pages/Write";
import "./Community.css";

const Community = () => {
  const navigate = useNavigate();
  return (
    <div className="community">
      <Logo />
      <SideMenu />
      <button>
        <a href="/write">글쓰기</a>
      </button>
    </div>
  );
};
export default Community;
