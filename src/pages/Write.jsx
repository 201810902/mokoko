import React, { useRef, useState } from "react";
import banner1 from "../assets/banner1.svg";
import Logo from "./../component/Logo";
import Menu from "./../component/Menu";
const Write = () => {
  return (
    <>
      <Logo />
      <div className="section">
        <Menu />
        <div className="inputForm">
          <form className="edit">
            <p>
              제목: <input />
            </p>
            <textarea cols="50" rows="20"></textarea>
            <label htmlFor="|">
              <input type="file" />
            </label>
            <button>업로드</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Write;
