import React, { useState, useEffect } from "react";
import "./ViewCharacter.css";

import jsonData from "./../assets/characters.json";

const ViewCharacter = () => {
  const [characterData, setChracterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("./../assets/character.json");
        const data = jsonData;
        console.log(data);
        setChracterData(data);
      } catch (error) {
        console.log("데이터 불러오기 오류", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="View">
      <h1 className="header">모든 캐릭터</h1>
      <div className="lost_wrap">
        <div className="lost_character">
          {characterData.map((character, index) => (
            <div key={index} className="characterCard">
              <div className="classinfo">
                <p>서버: {character.ServerName}</p>
                <p>클래스: {character.CharacterClassName}</p>
                <p>아이템: {character.ItemAvgLevel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ViewCharacter;
