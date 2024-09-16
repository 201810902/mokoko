import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../firebase/firestore";
import PostViewer from "../component/ViewPost.jsx";
import LikedViewer from "../component/LikedPostViewer.jsx";
import ReplyViewer from "../component/ReplyViewer.jsx";
import Logo from "../component/Logo.jsx";
import Img from "../assets/profileImg.jpg";

import "./Mypage.css";
const Mypage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const [isClickedPost, setisClickedPost] = useState(true);
  const [isClickedReply, setisClickedReply] = useState(false);
  const [isClickedLiked, setisClickedLiked] = useState(false);
  const onClickviewPost = (e) => {
    setisClickedPost(true);
    setisClickedReply(false);
    setisClickedLiked(false);
  };
  const onClickviewReply = (e) => {
    setisClickedReply(true);
    setisClickedPost(false);
    setisClickedLiked(false);
  };
  const onClickviewLiked = (e) => {
    setisClickedReply(false);
    setisClickedPost(false);
    setisClickedLiked(true);
  };
  const onClickChangePW = (e) => {};
  const onClickQuitButton = (e) => {
    confirm(
      "정말 회원을 탈퇴하시겠습니까? 게시글과 댓글은 자동으로 삭제되지 않습니다."
    );
  };
  return (
    <>
      <Logo />
      <div className="myPage">
        <div className="myInformation">
          <div className="myPageInfo">
            <div className="profileImgContainer">
              <img src={Img} className="myPageProfileImg" />
            </div>
            <div className="myInfo">
              <span className="myNickname">{user.nickName} 님</span>
              <span className="mygrade userGrade">{user.grade}</span>
              <span className="myEmail">{user.email}</span>
              <div className="aboutMember">
                <span className="myData">방문 {user.visitCount}</span>
                <span className="myData">작성글 {user.postNumber}</span>
                <span className="myData">작성 댓글 {user.commentNumber}</span>
              </div>
              <span className="memberButton">
                <button className="changePW" onClick={onClickChangePW}>
                  비밀번호 변경
                </button>
              </span>
            </div>
          </div>
          <div className="myPageButtonGroup">
            <button
              type="button"
              className={isClickedPost ? "ClickedviewPost" : "viewPost"}
              onClick={onClickviewPost}
            >
              작성한 글
            </button>
            <button
              type="button"
              className={isClickedReply ? "ClickedviewReply" : "viewReply"}
              onClick={onClickviewReply}
            >
              작성 댓글
            </button>
            <button
              type="button"
              className={isClickedLiked ? "ClikedviewLiked" : "likedPost"}
              onClick={onClickviewLiked}
            >
              좋아요👍
            </button>
          </div>

          <div className="informSection">
            {isClickedPost ? (
              <PostViewer />
            ) : isClickedReply ? (
              <ReplyViewer />
            ) : isClickedLiked ? (
              <LikedViewer />
            ) : (
              <PostViewer />
            )}
          </div>
          <div className="pageControl">
            <button className="prevPage">{`<`}</button>
            <button className="page1">1</button>
            <button className="nextPage">{`>`}</button>
          </div>
          <button className="quitButton" onClick={onClickQuitButton}>
            회원 탈퇴하기
          </button>
        </div>
      </div>
    </>
  );
};
export default Mypage;
