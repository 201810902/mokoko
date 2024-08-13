  import React, { useState, useEffect } from "react";
import jsonData from "./../assets/contents.json";

const DailyContent = () => {
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = jsonData;
        console.log(data);
        setContentData(data);
      } catch (error) {
        console.log("모험섬 컨텐츠 불러오기 오류");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="viewContent">
      <div className="dailyContent">
        {contentData.map((content, index) => (
          <div key={index} className="contentCard">
            <div className="contentInfo">
              {content.ContentsIcon} {content.RewardItemsIcon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DailyContent;
