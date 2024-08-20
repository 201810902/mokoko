import "./Profile.css";
import Logo from "./Logo";
import Img from "../assets/profileImg.jpg";
import { useSelector } from "react-redux";

const Profile = (userData) => {
  const userSample = {
    nickName: "양홍련",
    grade: "🌱소중한 자모",
    profileImg: Img,
    visitCount: 3,
    postNumber: 1,
    commentNumber: 3,
  };
  const user = useSelector((state) => state.user.value);
  return (
    <div className="profileBox">
      <Logo />
      <div className="infoBox">
        <div className="profImgContainer">
          <img src={user.profileImg} className="profileImg" />
        </div>
        <div className="memberInfo">
          <div className="userGrade">{user.grade}</div>
          <div className="nickName">{user.nickName} 님</div>
          <div className="visitCount">방문수: {user.visitCount}</div>
        </div>
      </div>
      <button type="button" className="myPageBtn">
        마이페이지
      </button>
    </div>
  );
};
export default Profile;
