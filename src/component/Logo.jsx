import React from "react";
import { useNavigate } from "react-router-dom";

import "./Logo.css";

const Logo = () => {
  const nav = useNavigate();
  const onClickLogo = () => {
    nav("/");
  };
  return (
    <>
      <div className="Logo_Button" onClick={onClickLogo}>
        
        자라나는 모코코
      </div>
    </>
  );
};
export default Logo;
