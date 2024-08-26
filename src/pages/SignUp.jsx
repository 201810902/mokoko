import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../component/Logo";
import "./SignUp.css";
import mokoko from "../assets/Travel with MOKOKO.jpg";
import debounce from "../utils/debounce";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { authService, dbService } from "../../firebase.js";
import { collection, doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  console.log("SignUp 컴포넌트 렌더링 시작");
  // const [id, setId] = useState("");
  // const [password, setPassword] = useState("");
  const [formState, setformState] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setformState({
      ...formState,
      [name]: value,
    });
    console.log(value);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const { nickname, email, password, passwordConfirm } = formState;
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authService,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: nickname });

      await setDoc(doc(dbService, "User", user.uid), {
        nickName: nickname,
        email: email,
        grade: "🌱소중한 자모",
        profileImg: "",
        visitCount: 0,
        postNumber: 0,
        commentNumber: 0,
      });

      alert("🌱 가입이 완료되었습니다. 자라나는 모코코에 오신 것을 환영합니다");
      navigate("/");
      console.log(user.displayName);
    } catch (error) {
      // createUserWithEmailAndPassword(auth, formState.email, formState.password)
      //   .then(async (userCredential) => {
      //     const user = userCredential.user;
      //     await updateProfile(auth.user, { displayName: formState.nickname });
      //     navigate("/");
      //     alert(
      //       "🌱 가입이 완료되었습니다. 자라나는 모코코에 오신 것을 환영합니다"
      //     );
      //   })
      const errorMessage = error.message;
      switch (error.code) {
        case "auth/weak-password":
          setErrorMsg("비밀번호가 너무 짧습니다. 6자리 이상으로 설정해주세요.");
          break;
        case "auth/invalid-email":
          setErrorMsg("잘못된 이메일 주소입니다. 다시 입력해주세요.");
          break;
        case "auth/email-already-in-use":
          setErrorMsg("이미 가입되어 있는 계정입니다");
          break;
      }
      alert(errorMsg);
    }

    //파이어베이스 인증작업
  };
  const handleDebounceInput = debounce(handleInput, 500);
  return (
    <div className="signUp">
      <div className="formContainer">
        <Logo />
        <p></p>
        <form action="s">
          <input
            className="signupForm"
            type="signupForm"
            name="nickname"
            placeholder="닉네임 (자모에서 사용하는 닉네임)"
            onChange={handleDebounceInput}
          />
          <input
            className="signupForm"
            type="text"
            name="email"
            placeholder="이메일(비밀번호 재설정용)"
            autoComplete="username"
            onChange={handleDebounceInput}
          />
          <input
            className="signupForm"
            type="password"
            name="password"
            placeholder="비밀번호"
            autoComplete="new-password"
            onChange={handleDebounceInput}
          />
          <input
            className="signupForm"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            autoComplete="new-password"
            onChange={handleDebounceInput}
          />
          <button className="signupButton" onClick={handleRegister}>
            가입하기
          </button>
        </form>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>
    </div>
  );
};
export default SignUp;
