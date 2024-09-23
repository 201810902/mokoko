import { useState, useEffect } from "react";
import { fetchPostById } from "../redux/post.js";
import Profile from "../component/Profile.jsx";
import { useParams } from "react-router-dom";
import "./Viewer.css";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../component/Logo.jsx";
import SideMenu from "../component/SideMenu.jsx";
import { doc, updateDoc, increment } from "firebase/firestore";
import { dbService } from "../../firebase.js";
import { dateConverter } from "../utils/timeConverter.js";
// import { collectionRef } from "../redux/reply.js";
const Viewer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.post);
  const post = posts.find((p) => p.id === id);
  const [isLike, setIsLike] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [replyIpnut, setReplyInput] = useState({
    postId: id,
    // userId: user.uid,
    replyDate: currentDate,
    reply: "",
    likeCount: 0,
  });
  //좋아요 기능 함수
  const onClickLike = async () => {
    setIsLike(!isLike);
    const incrementValue = isLike ? -1 : 1;
    try {
      //좋아요 수 firestore에 업데이트
      const postRef = doc(dbService, post.category, id);
      await updateDoc(postRef, {
        likeCount: increment(incrementValue),
      });
      dispatch(fetchPostById(id)); //업데이트된 좋아요수 받아오기
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!post && status) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id, post, status]);

  if (status === "loading") {
    console.log("loading");
    return <div>Loading...</div>;
  }
  if (error) {
    console.Error(error);
    return <div>Error: {error}</div>;
  }
  const onSubmitReply = async (e) => {
    e.preventDefault();
    // try {
    //   const reply = {
    //     postId: replyInput.postId,
    //     userId: replyInput.userId,
    //     replyDate: replyInput.replyDate,
    //     reply: replyInput.reply,
    //     likeCount: replyInput.likeCount,
    //   };
    // }
  };
  return (
    <>
      <div className="profileContainer">
        <Logo />
        <Profile />
      </div>
      <div className="menuContainer">
        <SideMenu />
      </div>
      <div className="postContainer">
        <div className="postViewer" key={post.id}>
          <span>
            <h2>{post.category}</h2>
            <h2 className="viewerTitle">{post.postTitle} </h2>
            <p className="contentAuthor"> {post.userNickName}</p>
            <p className="contentDate">
              {dateConverter(post.date.seconds)} 조회 {post.viewCount}
            </p>
          </span>
          <div
            className="contentViewer"
            dangerouslySetInnerHTML={{ __html: post.post }}
          ></div>
          <div className="likeButton">
            {" "}
            <button
              className={isLike ? "liked" : "unliked"}
              onClick={onClickLike}
              type="button"
            ></button>{" "}
            <span>좋아요</span>
            <span className="">{post.likeCount}</span>
          </div>
          <div className="commentSection">
            <form action="">
              <textarea
                className="replysection"
                id=""
                placeholder="댓글을 남겨보세요"
              ></textarea>
              <button>댓글 등록하기</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Viewer;
