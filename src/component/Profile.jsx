import "./Profile.css";
import Img from "../assets/profileImg.jpg";
import Spinner from "../assets/spinner.gif";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, login, logout } from "../redux/user";
import { authService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth"; 
import { fetchUserData } from "../firebase/firestore";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const status = useSelector((state) => state.user.status);
  const [loading, setLoading] = useState(status === "loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, async (user) => {
      if (user) {
        try {
          const userData = await fetchUserData(user.uid);
          if (userData) {
            dispatch(
              // login({
              //   nickName: userData.nickName || "unknown",
              //   email: userData.email,
              //   grade: userData.grade,
              //   visitCount: userData.visitCount,
              //   postNumber: userData.postNumber,
              //   commentNumber: userData.commentNumber,
              // })
              login({
                uid: user.uid,
                ...userData,
              })
            );
          }
          setLoading(false);
        } catch (error) {
          console.error("User data fetch error:", error);
          dispatch(logout());
          setLoading(false);
        }
      } else {
        //Firebase에 인증된 사용자가 없을 경우 Redux에 로그아웃 상태로 설정
        dispatch(logout());
      }
    });

    //컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, [dispatch]);

  const onClickLogout = async () => {
    const isLogout = confirm("로그아웃 하시겠습니까?");
    //unwrap()을 사용하지 않는 경우.
    // if (isLogout) {
    //   dispatch(logoutUser())
    //     .then(() => {
    //       alert("로그아웃 되었습니다.");
    //       navigate("/");
    //     })
    //     .catch((error) => {
    //       const logoutError = error.code;
    //       console.log("로그아웃 오류:", logoutError);
    //     });
    // }
    if (isLogout) {
      try {
        await dispatch(logoutUser()).unwrap();
        alert("로그아웃 되었습니다.");
        navigate("/");
      } catch (error) {
        console.log("로그아웃 오류:", error);
      }
    }
  };
  if (status === "loading") {
    return (
      <div>
        <img src={Spinner} alt="로딩 중" />
      </div>
    );
  }

  const onClickMypage = (e) => {
    navigate("/mypage");
  };
  return (
    <div className="profileBox">
      <div className="infoBox">
        <div className="profImgContainer">
          <img src={Img} className="profileImg" alt="프로필이미지" />
        </div>
        <div className="memberInfo">
          <div className="userGrade">{user.grade}</div>
          <div className="nickName">{user.nickName} 님</div>
          <div className="visitCount">방문수: {user.visitCount}</div>
          <button type="button" onClick={onClickLogout} className="logoutBtn">
            로그아웃
          </button>
        </div>
      </div>
      <div className="profileButton">
        <button type="button" className="myPageBtn" onClick={onClickMypage}>
          마이페이지
        </button>
      </div>
    </div>
  );
};
export default Profile;
