import React, { useState, useRef, useEffect } from "react";
import "./DropdownMenu.css";

const DropdownMenu = () => {
  const [isOpen, setisOpen] = useState(false);

  const toggleDropdown = () => {
    setisOpen(!isOpen);
  };
  return (
    <div className="dropdown">
      <button
        className="dropdown-button"
        onClick={toggleDropdown}
        type="button"
      >
        공략게시판
      </button>
      {isOpen && (
        <div className="dropDownMenu">
          <a href="/community" className="drowDownItem">
            아브렐슈드
          </a>
          <a href="/community" className="dropDownItem">
            카멘
          </a>
          <a href="/community" className="dropDownItem">
            에키드나
          </a>
        </div>
      )}
    </div>
  );
};
export default DropdownMenu;
