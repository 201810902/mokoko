import React from "react";
import { useSelector } from "react-redux";
const Mypage = () => {
  const user = useSelector((state) => state.user.value);
  return (
    <>
      <div>
        <h1>My page</h1>
        <p>nickname: {user.nickname}</p>
        <p>id: {user.id}</p>
        <p></p>
      </div>
    </>
  );
};
export default Mypage;
