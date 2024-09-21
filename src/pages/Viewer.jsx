import { useEffect } from "react";
import { fetchPostById } from "../redux/post.js";
import Profile from "../component/Profile.jsx";
import { useParams } from "react-router-dom";
import "./Viewer.css";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../component/Logo.jsx";
import SideMenu from "../component/SideMenu.jsx";

const Viewer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.post);
  const post = posts.find((p) => p.id === id);

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
            <h1>{post.category}</h1>
            <h2 className="viewerTitle">{post.postTitle} </h2>
            <p className="contentAuthor"> {post.userNickName}</p>
            <p className="contentDate">
              {new Date(post.date.seconds * 1000).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // 12시간 형식이 아닌 24시간 형식으로 표시
              })}{" "}
              조회: {post.viewCount}
            </p>
          </span>
          <div
            className="contentViewer"
            dangerouslySetInnerHTML={{ __html: post.post }}
          ></div>
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
