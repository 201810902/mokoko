import "./ViewPost.css";
const ViewPost = () => {
  return (
    <>
      <div className="postViewer">
        <div className="postViewerHeader">
          <span className="postTitleList">제목</span>
          <span className="postDateList">작성일</span>
          <span className="postCountList">조회</span>
        </div>
      </div>
    </>
  );
};
export default ViewPost;
