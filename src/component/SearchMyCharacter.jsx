import "./SearchCharacter.css";
import SearchIcon from "../assets/search.svg";
import { useState } from "react";
const SearchCharacter = (characterName) => {
  const [inputData, setInputData] = useState("");
  const handleInput = (e) => {
    setInputData(e.target.value);
    console.log(inputData);
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("검색어:", inputData);
      window.open(
        "https://lostark.game.onstove.com/Profile/Character/" + inputData
      );
      setInputData("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          className="searchCharacter"
          placeholder="전투정보실 검색하기"
          onChange={handleInput}
          onKeyDown={handleSearch}
          value={inputData}
        />
      </form>
    </>
  );
};
export default SearchCharacter;
