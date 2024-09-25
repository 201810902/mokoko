import { useState, useEffect, useRef } from "react";
import Profile from "../component/Profile.jsx";
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import "./Viewer.css";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../assets/profileImg.jpg";
import Logo from "../component/Logo.jsx";
import SideMenu from "../component/SideMenu.jsx";
import {
  addDoc,
  setDoc,
  collection,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { dbService } from "../../firebase.js";
import { dateConverter } from "../utils/timeConverter.js";
import { fetchPostById } from "../redux/post.js";
import { addReply, replyConverter } from "../redux/reply.js";
import CategoryMapper from "../utils/CategoryMapper.js";
const Viewer = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // const category = useSearchParams.get("category");
  const category = query.get("category");
  // console.log("location", location);
  // console.log("get category", category, "searchParams", searchParams);

  // console.log("query", query.get("category"));
  // console.log("fetched category", category);
  // console.log("fetched id", id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, status, error } = useSelector((state) => state.post);
  const user = useSelector((state) => state.user.value);
  //이시점까지 post가 존재하지 않는다..
  // const post = posts.find((p) => p.id === id);

  const post =
    posts && Array.isArray(posts) ? posts.find((p) => p.id === id) : null;
  const [isLike, setIsLike] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const replyInputRef = useRef(null);
  const currentReplyDate = new Date();
  const [input, setInput] = useState({
    postId: id,
    userId: user.uid,
    replyDate: currentReplyDate,
    reply: "",
    likeCount: 0,
  });

  const onClickCategory = (e) => {
    navigate(`/${post.category}`);
  };
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
      console.error("onClickLikeError", error);
    }
  };
  //id로 useEffect 가져오기
  useEffect(() => {
    console.log("useEffect 실행");
    // console.log("post:", post);
    // console.log("status:", status);
    // console.log("category:", category);
    // console.log("id:", id);

    if (!post && status !== "loading") {
      dispatch(fetchPostById({ category, id }))
        .unwrap()
        .then((fetchedpPost) => {
          console.log("Post fetched successfully:", fetchedpPost);
        })
        .catch((error) =>
          console.error("Failed to fetch Post:", error.message)
        );
    }
  }, [dispatch, category, id, post, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({ ...prevData, [name]: value }));
  };
  const onSubmitReply = async (e) => {
    e.preventDefault();

    if (!input.reply.trim()) {
      alert("댓글을 입력해주세요!");
      replyInputRef.current.focus();
      return;
    } else {
      if (!confirm("댓글을 등록하시겠습니까?")) return;

      try {
        const reply = {
          postId: input.postId,
          userId: input.userId,
          replyDate: input.replyDate,
          reply: input.reply,
          likeCount: input.likeCount,
        };
        //댓글을 저장할 Firestore의 경로
        const collectionRef = collection(
          dbService,
          category,
          input.postId,
          "replies"
        ).withConverter(replyConverter);
        const docRef = await addDoc(collectionRef, reply);
        const docId = docRef.id;

        await setDoc(
          doc(dbService, "community", input.postId, "replies", docId),
          {
            ...reply,
            id: docId,
          }
        );
        const userRef = doc(dbService, "User", user.uid);
        // await updateDoc(userRef, {replyCount})
        await setDoc(
          doc(dbService, "community", input.postId, "replies", docId),
          {
            ...reply,
          }
        );
        dispatch(addReply(reply));
        console.log("reply submitted");
        alert("댓글 등록이 완료되었습니다!");
        setInput((prevData) => ({ ...prevData, reply: "" }));
        // dispatch(fetchReply(replyId))//작성된 댓글 로딩
      } catch (error) {
        console.error("Erroro writing reply: ", error);
      }
    }
  };
  return (
    <div className="viewerLayout">
      <div className="viewerSidemenu">
        <div className="profileContainer">
          <Logo />
          <Profile />
        </div>
        <div className="menuContainer">
          <SideMenu />
        </div>
      </div>
      <div className="postContainer">
        <div className="postViewer" key={post.id}>
          <div className="postContentHeader">
            <a className="categoryBtn" onClick={onClickCategory}>
              {CategoryMapper(post.category)}
            </a>
            <h2 className="viewerTitle">{post.postTitle} </h2>
            <div className="postWriterInfo">
              <div className="postWriterProfileImgContainer">
                <img className="postWriterProfileImg" src={profileImg} />
              </div>
              <div className="postInfo">
                <div className="contentAuthor"> {post.userNickName}</div>
                <div className="contentDate">
                  {dateConverter(post.date.seconds)} 조회 {post.viewCount}
                </div>
              </div>
            </div>
          </div>
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
            <div className="displayName">{user.nickName}</div>
            <form className="replyForm" onSubmit={onSubmitReply}>
              <textarea
                className="replyInput"
                name="reply"
                placeholder="댓글을 남겨보세요"
                onChange={handleChange}
                value={input.reply}
                ref={replyInputRef}
              ></textarea>
              <button className="replySubmitBtn">등록</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Viewer;
