import React, { useRef, useState } from "react";
import banner1 from "../assets/banner1.svg";
import Logo from "./../component/Logo";
import Menu from "./../component/Menu";
import { useNavigate } from "react-router-dom";

import "./Community.css";
const Community = () => {
  const navigate = useNavigate();
  const onClickEdit = () => {
    navigate("/write");
  };
  return (
    <div>
      <Logo />
      <div className="content">
        <Menu />
        <div className="postList">
          <h3>게시글목록</h3>
          <p>제목 | 글쓴이 | 등록일 | 조회 | 추천</p>
          <ol>게시글1</ol>
        </div>
      </div>
      <button onClick={onClickEdit}>글쓰기</button>
    </div>
  );
};
export default Community;
