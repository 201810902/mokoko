import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/banner1.svg";
import Form from "../component/Form";
import SideMenu from "../component/SideMenu";
import Logo from "../component/Logo";
import Write from "../pages/Write";
import Profile from "../component/Profile";
import SearchMyCharacter from "../component/SearchMyCharacter";
import "./Community.css";

const Community = () => {
  const postData = {
    postNum: 1,
    postTitle: "자라나는 모코코 게시판 만드는중",
    date: "2024-08-09 14:30:00",
    userId: "양홍련",
    view: 3,
    likes: 4,
  };
  //자유게시판
  const navigate = useNavigate();
  const onClickWrite = (e) => {
    navigate("/write");
  };
  return (
    <div>
      <Profile />
      {/* <Logo /> */}
      <SideMenu />
      <SearchMyCharacter />
      <div className="postListContainer">
        <h2 className="boardName">자유게시판</h2>

        <div className="postList"></div>
        <button className="writeButton" type="button" onClick={onClickWrite}>
          글쓰기
        </button>
      </div>
    </div>
  );
};
export default Community;
