import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideMenu.css";
import SearchCharacter from "./SearchMyCharacter";
const SideMenu = () => {
  const onClickBoard = (category) => {
    navigate(`/${category}`);
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="sideMenu">
        <SearchCharacter />
        <button type="button" className="moveToLostark">
          <a href="https://lostark.game.onstove.com/Main" target="_blank"></a>
        </button>

        {/* <h3 className="menuHeader">오늘의 일정</h3> */}
        <ul className="menuList">
          <li className="sideItem">
            <a onClick={() => onClickBoard("community")}>💬 자유게시판</a>
          </li>
          <li className="sideItem">
            <a onClick={() => onClickBoard("tactics")}>⚔️ 공략게시판</a>
          </li>
          <li className="sideItem">
            <a onClick={() => onClickBoard("question")}> ❓ 궁금해요</a>
          </li>
          <li className="sideItem">
            <a onClick={() => onClickBoard("bragging")}>😋 비틱게시판</a>
          </li>
          <li className="sideItem">
            <a onClick={() => onClickBoard("gallery")}>📸 자모앨범</a>
          </li>
          <li className="sideItem">
            <a onClick={() => onClickBoard("suggestion")}> 🙋🏻 건의합니다</a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default SideMenu;
