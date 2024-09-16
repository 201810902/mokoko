import "./LoginButton.css";
import { useNavigate } from "react-router-dom";
const LoginButton = () => {
  const navigate = useNavigate();

  const onClickLogin = (e) => {
    navigate("/login");
  };
  return (
    <>
      <button type="button" className="loginButton" onClick={onClickLogin}>
        로그인
      </button>
    </>
  );
};
export default LoginButton;
