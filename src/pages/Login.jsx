import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/user";
import "./Login.css";
import Logo from "./../component/Logo";
import show from "../assets/show-password.svg";
import hide from "../assets/hide-password.svg";
import Loading from "../component/Loding";
import Clicked from "../assets/check_on.svg";
import unClicked from "../assets/check_off.svg";
import debounce from "../utils/debounce";
import {} from "firebase/auth";
const Login = () => {
  // const [input, setInput] = useState("");
  const [userInputData, setUserInputData] = useState({ id: "", password: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const idInputRef = useRef();
  const passwordInputRef = useRef();
  const nav = useNavigate();
  const [isPWHide, setisPWHide] = useState(true);
  const [isAutoLoginClicked, setIsAutoLoginClicked] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(
      userInputData.id === "" || userInputData.password === ""
    );
  }, [userInputData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("id:", userInputData.id, "pw:", userInputData.password);
    if (userInputData.id === "") {
      alert("아이디를 입력하세요");
      idInputRef.current.focus();
      // setIsButtonDisabled(true);
      // console.log(idInputRef.current, userInputData);
      return;
    } else if (userInputData.password === "") {
      alert("비밀번호를 입력하세요");
      passwordInputRef.current.focus();
      // setIsButtonDisabled(true);
      return;
    } else {
      dispatch(
        login({ email: userInputData.id, password: userInputData.password })
      );
      nav("/"); //로그인 후 이동할 페이지
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
      nav("/signup");
    } else {
      nav("/findid");
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
                type={isPWHide ? "hidePW" : "showPW"}
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
                onClick={() => {
                  dispatch(login());
                }}
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
