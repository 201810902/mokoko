import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";
import "./Login.css";
import Logo from "./../component/Logo";
const Login = () => {
  const [input, setInput] = useState("");
  const [userInputData, setUerInputData] = useState("");
  const { id, password } = userInputData;
  const dispatch = useDispatch();
  const onClickLogin = (e) => {
    const { name, value } = e.target;
    setUerInputData({
      ...userInputData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="box">
        <div className="loginSection">
          <Logo />
          <div className="loginForm">
            <input
              className="inputForm"
              type="text"
              name="id"
              placeholder="아이디를 입력하세요"
            />
            <input
              className="inputForm"
              type="text"
              name="password"
              placeholder="비밀번호를 입력하세요"
            />

            <button className="clickLogin" onClick={onClickLogin}>
              로그인
            </button>
          </div>
          <div className="buttonGroup">
            <button className="SignUp">회원가입</button>
            <button className="findId">아이디 / 비밀번호 찾기</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
