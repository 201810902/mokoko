import "./Write.css";
import SideMenu from "../component/SideMenu";
import Logo from "../component/Logo";

const Write = () => {
  return (
    <div className="Write">
      <Logo />
      <SideMenu />
      <div className="writingForm">
        <span>
          <select className="selectWriteCategory">
            <option value="">자유게시판</option>
            <option value="">공략게시판</option>
            <option value="">궁금해요</option>
            <option value="">비틱게시판</option>
            <option value="">자모앨범</option>
            <option value="">건의합니다</option>
          </select>
          <label htmlFor="write">
            제목: <input />
          </label>
        </span>
        <textarea rows="20" cols="60"></textarea>
        <button type="sumbit">작성 완료</button>
      </div>
    </div>
  );
};
export default Write;
