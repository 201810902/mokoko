import "./Write.css";
import SideMenu from "../component/SideMenu";
import Logo from "../component/Logo";
import Profile from "../component/Profile";
import { useState } from "react";

const Write = () => {
  const [inputData, setInputData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
    console.log(inputData);
  };

  const handleSubmit = (e) => {};

  return (
    <div className="Write">
      {/*<Profile />*/}
      {/*<SideMenu />*/}
      <div className="writingForm">
        <h2>새 글 쓰기</h2>
        <span>
          {/*포스트 해당 게시판 선택*/}
          <select className="selectWriteCategory">
            <option value="none">게시판을 선택하세요</option>
            <option value="">자유게시판</option>
            <option value="">공략게시판</option>
            <option value="">궁금해요</option>
            <option value="">비틱게시판</option>
            <option value="">자모앨범</option>
            <option value="">건의합니다</option>
          </select>

          <label htmlFor="write">
            <input className="postTitle" placeholder="제목을 입력해주세요" />
          </label>
        </span>

        <textarea rows="20" cols="60"></textarea>
        <label htmlFor="file">
          <input type="file" accept="image/*" />
        </label>
        <button type="sumbit" className="postSubmitBtn">
          작성 완료
        </button>
      </div>
    </div>
  );
};
export default Write;
