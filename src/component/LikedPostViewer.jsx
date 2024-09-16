import "./LikedPostViewer.css";
const LikedPostViewer = () => {
  return (
    <>
      <div className="likedViewer">
        <div className="likedViewerHeader">
          <span className="likedPostTitle">제목</span>
          <span className="likedPostWriter">작성자</span>
          <span className="likedPostDateList">작성일</span>
          <span className="likedPostViewCount">조회</span>
        </div>
      </div>
    </>
  );
};
export default LikedPostViewer;
