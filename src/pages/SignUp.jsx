import { useState } from "react";
import Logo from "../component/Logo";
import "./SignUp.css";
import mokoko from "../assets/Travel with MOKOKO.jpg";
const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className="signUp">
      <div className="formContainer">
        <Logo />
        <p></p>
        <input
          className="signupForm"
          type="text"
          name="id"
          placeholder="아이디"
        />
        <input
          className="signupForm"
          type="signupForm"
          name="nickname"
          placeholder="닉네임 (자모에서 사용하는 닉네임)"
        />
        <input
          className="signupForm"
          type="password"
          name="password"
          placeholder="비밀번호"
        />
        <input
          className="signupForm"
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
        />
        <input
          className="signupForm"
          type="text"
          name="email"
          placeholder="비밀번호 분실시 재설정용 이메일"
        />
        <button className="signupButton">가입하기</button>
      </div>
    </div>
  );
};
export default SignUp;
