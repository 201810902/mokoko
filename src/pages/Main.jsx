import "./Main.css";
import kakaotalkLogo from "../assets/kakaotalkLogo.svg";
import discordLogo from "../assets/discordLogo.svg";
import { Link } from "react-router-dom";

const Main = () => {
  const openTalk = () => {
    window.open("https://open.kakao.com/o/gbZ50Xwd");
  };
  const openDiscord = () => {
    window.open("https://discord.gg/Ez5cYeNp");
  };
  return (
    <>
      <div className="LoginForm">
        <h1>자라나는 모코코</h1>
        <div className="Login">
          <form>
            <input type="text" placeholder="아이디를 입력하세요" />
            <input type="password" placeholder="비밀번호를 입력하세요" />
          </form>
          <button>로그인</button>
        </div>
        <div className="buttonGroup">
          <button className="SignUp">회원가입</button>
          <button className="findId">아이디 / 비밀번호 찾기</button>
        </div>
      </div>

      <div className="Banner">
        <div>배너</div>
        그림
      </div>
      <div className="openLink">
        <button className="kakaotalkLink" onClick={openTalk}>
          <img src={kakaotalkLogo} />
          자라나는 모코코
        </button>
        <button className="discordLink" onClick={openDiscord}>
          <img src={discordLogo} />
          자라나는 모코코
        </button>
      </div>
    </>
  );
};
export default Main;
