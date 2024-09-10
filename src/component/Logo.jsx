import React from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../assets/jamologo.svg";
import "./Logo.css";

const Logo = () => {
  const nav = useNavigate();
  const onClickLogo = () => {
    nav("/");
  };
  return (
    <>
      <div className="main_Logo Logo_Button" onClick={onClickLogo}>
        <img src={LogoImg} className="logoImg" />
        자라나는 모코코
      </div>
    </>
  );
};
export default Logo;
