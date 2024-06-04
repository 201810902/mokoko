import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/user";
import "./Login.css";
import Logo from "./../component/Logo";
const Login = () => {
  const [input, setInput] = useState("");
  const [userInputData, setUserInputData] = useState({ id: "", password: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const idInputRef = useRef();
  const passwordInputRef = useRef();
  const nav = useNavigate();

  const onClickLogin = (e) => {
    e.preventDefault();
    if (userInputData.id === "") {
      idInputRef.current.focus();
      setIsButtonDisabled(true);
      alert("아이디를 입력하세요");
      console.log(idInputRef.current, userInputData);
      console.log(isButtonDisabled);
      return;
    } else if (userInputData.password === "") {
      passwordInputRef.current.focus();
      setIsButtonDisabled(true);
      alert("비밀번호를 입력하세요");
      console.log(isButtonDisabled);
      return;
    } else {
      setIsButtonDisabled(false);
      console.log(isButtonDisabled);
      const { name, value } = e.target;
      setUserInputData({
        ...userInputData,
        [name]: value,
      });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInputData({
      ...userInputData,
      [name]: value,
    });
    setIsButtonDisabled(
      userInputData.id === "" || userInputData.password === ""
    );
  };

  const onClickButton = (e) => {
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
              className="inputForm"
              type="password"
              name="password"
              onChange={handleChange}
              value={userInputData.password}
              placeholder="비밀번호를 입력하세요"
            />

            <button
              className={`clickLogin ${isButtonDisabled ? "disabled" : ""}`}
              onClick={onClickLogin}
              disabled={isButtonDisabled}
            >
              로그인
            </button>
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
