import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = () => {

  const onClickMenu = (e) => {
    console.log("click sideMenu");
  };

  const navigate = useNavigate();
  return (
    <>
      <button type="button" className="moveToLostark">
        <a href="https://lostark.game.onstove.com/Main" target="_blank"></a>
      </button>
      <div className="sideMenu">
        {/* <h3 className="menuHeader">오늘의 일정</h3> */}
        <ul className="menuList">
          <li className="sideItem chattingBoard">
            <a href="/community" onClick={onClickMenu}>
              💬 자유게시판
            </a>
          </li>
          <li className="sideItem">
            <a href="/tactics">⚔️ 공략게시판</a>
          </li>
          <li className="sideItem">
            <a href="/community"> ❓ 궁금해요</a>
          </li>
          <li className="sideItem">
            <a href="/bragging">😋 비틱게시판</a>
          </li>
          <li className="sideItem">
            <a href="/gallery">📸 자모앨범</a>
          </li>
          <li className="sideItem">
            <a href="/suggestion"> 🙋🏻 건의합니다</a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default SideMenu;
