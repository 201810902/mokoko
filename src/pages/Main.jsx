import "./Main.css";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import kakaotalkLogo from "../assets/kakaotalkLogo.svg";
import discordLogo from "../assets/discordLogo.svg";
import banner1 from "../assets/banner1.svg";
import banner2 from "../assets/banner2.svg";
import banner3 from "../assets/banner3.svg";
import banner4 from "../assets/banner4.svg";
import Login from "./Login";
import Logo from "./../component/Logo";
import SideMenu from "../component/SideMenu";
import jamoLogo from "./../assets/jamologo.svg";
import DailyContent from "./../component/DailyContent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Main = () => {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();
  const openTalk = () => {
    window.open("https://open.kakao.com/o/gbZ50Xwd");
  };
  const openDiscord = () => {
    window.open("https://discord.gg/Ez5cYeNp");
  };
  const onClickLogin = () => {
    navigate("/login");
  };
  const handleInput = (e) => {
    console.log(e.target.value);
    const inputValue = e.target.value;
    setInputText(inputValue);
  };
  return (
    <>
      <div className="mainContainer">
        <div className="item loginbox">
          <div className="mainLogo">
            <Logo />
          </div>

          <button className="navButton" onClick={onClickLogin}>
            로그인
          </button>

          <div className="openLink">
            <button className="kakaotalkLink" onClick={openTalk}></button>
            <button className="discordLink" onClick={openDiscord}></button>
          </div>
          <input placeholder="캐릭터 명을 입력하세요" onChange={handleInput} />
        </div>

        {/* <div className="banner">배너배너</div> */}
        <div className="item banner">
          <Swiper
            slidesPerView="auto"
            spaceBetween={30}
            loop={true}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Keyboard, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={banner1} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={banner2} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={banner3} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={banner4} />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="item sidebar">
          <SideMenu />
        </div>
        <div className="item island">
          모험섬 일정
          <DailyContent />
        </div>
        <div className="item event">로아 현재이벤트</div>
        <div className="item board1">게시판(최근글)</div>
        <div className="item board2">게시판(인기글)</div>
        <div className="item gallery">갤러리~~</div>
      </div>
    </>
  );
};
export default Main;
