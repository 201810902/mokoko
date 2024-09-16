import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/user"; //Redux Thunk
import "./Login.css";
import Logo from "./../component/Logo";
import show from "../assets/show-password.svg";
import hide from "../assets/hide-password.svg";
import Loading from "../component/Loding";
import Clicked from "../assets/check_on.svg";
import unClicked from "../assets/check_off.svg";
import debounce from "../utils/debounce";

const Login = () => {
  const [userInputData, setUserInputData] = useState({ id: "", password: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPWHide, setisPWHide] = useState(true);
  const [isAutoLoginClicked, setIsAutoLoginClicked] = useState(false);

  const dispatch = useDispatch();
  const idInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.value);
  const { status, error } = useSelector((state) => state.user);

  useEffect(() => {
    setIsButtonDisabled(
      userInputData.id === "" || userInputData.password === ""
    );
  }, [userInputData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("id:", userInputData.id, "pw:", userInputData.password);
    if (userInputData.id === "") {
      alert("아이디를 입력해주세요");
      idInputRef.current.focus();
      // setIsButtonDisabled(true);
      // console.log(idInputRef.current, userInputData);
      return;
    } else if (userInputData.password === "") {
      alert("비밀번호를 입력해주세요");
      passwordInputRef.current.focus();
      // setIsButtonDisabled(true);
      return;
    } else {
      dispatch(
        loginUser({ email: userInputData.id, password: userInputData.password })
      )
        // login({ email: userInputData.id, password: userInputData.password })
        .unwrap()
        .then(() => {
          // const user = authService.currentUser;
          // const displayName = user.displayName;
          console.log("로그인 성공!");
          console.log(loginUser);

          navigate("/");
          // alert(`${user.displayName}님 환영합니다`);
        })
        .catch((error) => {
          console.error("Login Error details", error);
          switch (error.code) {
            case "auth/user-not-found":
              alert("가입되지 않은 사용자 입니다.");
              break;
            case "auth/wrong-password":
              alert("비밀번호가 일치하지 않습니다.");
              break;
            case "auth/invalid-email":
              alert("유효하지 않은 이메일 형식입니다");
              break;
            default:
              alert("로그인에 실패했습니다. 다시 시도해주세요.");
              break;
          }
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // console.log(errorCode);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("입력된 값", userInputData);
    setIsButtonDisabled(
      userInputData.id === "" || userInputData.password === ""
    );
  };

  //자동로그인 버튼
  const handleAutoLogin = (e) => {
    if (!isAutoLoginClicked) {
      setIsAutoLoginClicked(true);
    } else setIsAutoLoginClicked(false);
  };
  const onClickButton = (e) => {
    //회원가입/아이디찾기 버튼
    if (e.target.className === "SignUp") {
      navigate("/signup");
    } else {
      navigate("/findid");
    }
  };
  return (
    <>
      <div className="box">
        <div className="loginSection">
          <Logo />
          <div className="loginForm">
            <form className="loginForm" onSubmit={handleSubmit}>
              <p></p>
              <input
                ref={idInputRef}
                className="inputForm"
                value={userInputData.id}
                type="text"
                name="id"
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
              />
              <input
                ref={passwordInputRef}
                className="inputForm showPassword hidePassword"
                // type={isPWHide ? "hidePW" : "showPW"}
                type={isPWHide ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={userInputData.password}
                placeholder="비밀번호를 입력하세요"
              />
              {/* <button
                type="button"
                className="isPWHideButton hidePassword showPassword"
              ></button> */}
              <label className="isAutoLogin">
                <img
                  src={isAutoLoginClicked ? Clicked : unClicked}
                  alt="자동 로그인"
                  onClick={handleAutoLogin}
                  className="autoLogin"
                />
                자동로그인
              </label>
              <button
                type="submit"
                className={`clickLogin ${isButtonDisabled ? "disabled" : ""}`}
                disabled={isButtonDisabled}
              >
                로그인
              </button>
            </form>
          </div>
          <div className="buttonGroup">
            <button className="SignUp" onClick={onClickButton}>
              회원가입
            </button>
            <button className="FindId" onClick={onClickButton}>
              아이디 / 비밀번호 찾기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
