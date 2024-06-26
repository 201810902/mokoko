import "./Main.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import kakaotalkLogo from "../assets/kakaotalkLogo.svg";
import discordLogo from "../assets/discordLogo.svg";
import banner1 from "../assets/banner1.svg";
import banner2 from "../assets/banner2.svg";
import banner3 from "../assets/banner3.svg";
import banner4 from "../assets/banner4.svg";
import Login from "./Login";
import Logo from "./../component/Logo";
import jamoLogo from "./../assets/jamologo.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import Menu from "./../component/Menu";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Main = () => {
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
  const onClickboard = () => {
    navigate("/community");
  };
  return (
    <div className="home">
      <div className="container">
        <div className="header">
          <div className="mainLogo">
            <Logo />
          </div>

          <button className="navButton" onClick={onClickLogin}>
            로그인
          </button>

          <div className="openLink">
            <button className="kakaotalkLink" onClick={openTalk}>
              카카오톡
            </button>
            <button className="discordLink" onClick={openDiscord}>
              디스코드
            </button>
          </div>
        </div>
        <Menu />
        <div className="headerBar">
          <input className="searchLoa" placeholder="캐릭터 명을 입력하세요" />
        </div>

        <div className="Banner">
          {/* <img src={banner1} /> */}
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            // breakpoints={{
            //   '640': {max-width:500px,}
            // }}
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
        <div className="footer">
          <div className="board">썸네일</div>
          <div className="board">썸네일</div>
          <div className="board">썸네일</div>{" "}
        </div>
        {/* <div className="birthDay">
          <h3>이달의 생일🎉</h3>
          <div className="birthdayList">생일축하해~</div>
        </div> */}
      </div>
    </div>
  );
};
export default Main;
