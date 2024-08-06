import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideMenu.css";
const SideMenu = () => {
  //   const menus = [
  //     { name: "공략게시판", path: "/community" },
  //     { name: "비틱게시판", path: "/" },
  //     { name: "궁금해요", path: "/community" },
  //     { name: "자모앨범", path: "/community" },
  //     { name: "건의합니다", path: "/community" },
  //   ];

  const navigate = useNavigate();
  return (
    <>
      <div className="sideMenu">
        <h3>오늘의 일정</h3>
        <ul>
          <li className="sideItem">
            <a href="/community">자유게시판</a>
          </li>
          <li className="sideItem">
            <a href="/community">공략게시판</a>
          </li>
          <li className="sideItem">
            <a href="/community">궁금해요</a>
          </li>
          <li className="sideItem">
            <a href="/community">비틱게시판</a>
          </li>
          <li className="sideItem">
            <a href="/community">자모앨범</a>
          </li>
          <li className="sideItem">
            <a href="/community">건의합니다</a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default SideMenu;
