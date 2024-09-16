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
import selectMark from "../assets/downtriangle.png";

const Community = () => {
  const [isLatest, setisLatest] = useState(true);
  const [isOldest, setisOldest] = useState(false);
  const onClickSortLatest = (e) => {
    setisLatest(true);
    setisOldest(false);
  };
  const onClickSortOldest = (e) => {
    setisOldest(true);
    setisLatest(false);
  };
  const searchPost = () => {};
  const postData = {
    postNum: 1,
    postTitle: "자라나는 모코코 게시판 만드는중",
    date: "08-09",
    userId: "양홍련",
    view: 3,
    likes: 4,
    replyCount: 3,
  };
  //자유게시판
  const navigate = useNavigate();
  const onClickWrite = (e) => {
    navigate("/write");
  };
  return (
    <div className="page">
      <div className="profileContainer">
        <Logo />
        <Profile />
      </div>
      <div className="menuContainer">
        <SideMenu />
      </div>
      <div className="postListContainer">
        <h2 className="boardName">자유게시판</h2>

        <span className="sortButton">
          <button
            className={isLatest ? "viewLatest" : "LatestBtn"}
            onClick={onClickSortLatest}
          >
            최신순
          </button>{" "}
          |
          <button
            className={isOldest ? "viewOldest" : "OldestBtn"}
            onClick={onClickSortOldest}
          >
            오래된 순
          </button>
        </span>
        <div className="postList">
          <div className="postViewerHeader">
            <span className="postTitleList">제목</span>
            <span className="writer">작성자</span>
            <span className="dateList">작성일</span>
            <span className="viewCount">조회</span>
          </div>
          <div className="postContentList">
            <span className="contentTitle">
              {postData.postTitle}
              <span className="replyMark">[{postData.replyCount}]</span>
            </span>
            <span className="postWriter">{postData.userId}</span>
            <span className="postDate">{postData.date}</span>
            <span className="views">{postData.view}</span>
          </div>
        </div>
        <div className="footerSection">
          <form className="searchPost">
            <input
              className="searchPostInput"
              placeholder="검색어를 입력하세요"
            ></input>
            <button className="searchPostBtn"> 검색 </button>
          </form>
          <button className="writeButton" type="button" onClick={onClickWrite}>
            ✎ 글쓰기
          </button>
        </div>
        <div className="boardPageControl">
          <button className="prevPage">{`<`}</button>
          <button className="page1">1</button>
          <button className="nextPage">{`>`}</button>
        </div>
      </div>
    </div>
  );
};
export default Community;
