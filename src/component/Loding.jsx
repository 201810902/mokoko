import React from "react";
import Spinner from "../assets/spinner.gif";

const Loading = () => {
  return (
    <div>
      <h3>잠시만 기다려주세요...</h3>
      <img src={Spinner} alt="로딩" width="50%" />
    </div>
  );
};

export default Loading;
