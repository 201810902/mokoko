import { useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const onClickBoard = () => {
    navigate("/community");
  };
  const onClickWrite = () => {
    navigate("/write");
  };

  return (
    <>
      <div className="menuBar">
        <h3>인기글🔥</h3>
        <h3 onClick={onClickBoard}>자유게시판</h3>
        <h3>비틱게시판</h3>
        <h3>공략모음집</h3>
        <h3>레이드모집</h3>
        <h3>자모 앨범</h3>
      </div>
    </>
  );
};
export default Menu;
