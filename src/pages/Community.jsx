import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/banner1.svg";
import Form from "../component/Form";
import SideMenu from "../component/SideMenu";
import Logo from "../component/Logo";
import Write from "../pages/Write";
import Profile from "../component/Profile";
import "./Community.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/post.js";
import { createSelector } from "@reduxjs/toolkit";
import { timeConverter, dateConverter } from "../utils/timeConverter.js";
// import { useParams } from "react-router-dom";
//풀필요 리렌더링 경고: Memoized로 해결해보자..(메모이제이션이 최선인가?)
const selectPosts = (state) => state.post.posts; //기본선택자
//메모이제이션 선택자
const selectPostsMemoized = createSelector([selectPosts], (posts) => posts);

const Community = () => {
  const [isLatest, setisLatest] = useState(true);
  const [isOldest, setisOldest] = useState(false);
  const [sort, setSort] = useState("desc");
  const dispatch = useDispatch();

  //아 이거 한번에 합치고 싶은데 어케 합치지
  const posts = useSelector(selectPosts);
  const status = useSelector((state) => state.post.status);
  const error = useSelector((state) => state.post.error);
  // const { posts, status, error } = useSelector((state) => ({
  //   posts: selectPostsMemoized(selectPosts),
  //   status: state.post.status,
  //   error: state.post.error,
  // }));

  const category = "community";

  useEffect(() => {
    dispatch(fetchPosts({ category, sort }));
  }, [dispatch, category, sort]);
  // console.log("Post:", posts);

  const onClickSortLatest = (e) => {
    setisLatest(true);
    setisOldest(false);
    setSort("desc");
  };
  const onClickSortOldest = (e) => {
    setisOldest(true);
    setisLatest(false);
    setSort("asc");
  };
  const onClickPost = (postId) => {
    navigate(`/posts/${postId}`);
  };
  const searchPost = () => {};
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
          {posts.map((post) => (
            <div
              className="postContentList"
              key={post.id ? post.id : post.date.toString()}
            >
              <span
                className="contentTitle"
                onClick={() => {
                  onClickPost(post.id);
                }}
              >
                {post.postTitle}
                {post.replyCount > 0 && (
                  <span className="replyMark">[{post.replyCount}]</span>
                )}
              </span>
              <span className="postWriter">{post.userNickName}</span>
              <span className="postDate">
                {timeConverter(post.date.seconds)}
              </span>
              <span className="views">{post.viewCount}</span>
            </div>
          ))}
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
