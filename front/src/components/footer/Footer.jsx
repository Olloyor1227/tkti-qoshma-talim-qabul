import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import logo from "../../assets/images/footer-logo.png";

import {
  TelegramIcon,
  InstagramIcon,
  YouTubeIcon,
  FacebookIcon,
  Email,
  PhoneIcon,
  Linkedin,
  Talim,
} from "../../assets/icons";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <footer className={`bg-[#26597E] `}>
        <div className="container mx-auto w-[90%] my-[40px]">
          <div className="container  flex justify-between  items-center ">
            <div className="">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <img src={logo} alt="" width={"60"} height={"15"} className="" />
                <p className="uppercase text-center text-white">tkti qoshma  <br /> ta'lim</p>
              </Link>
              <div className="flex gap-4    items-end justify-between ">
                <div className="lg:flex lg:flex-col flex-row-reverse   max-md:flex-col max-md:gap-10 ">
                  <div className="flex lg:gap-5 gap-3 ">
                    <Link to={`https://www.facebook.com/tktiuzrasmiy`}>
                      <FacebookIcon color="white " />
                    </Link>
                    <Link to={`http://youtube.com/@tktiuzrasmiy`}>
                      <YouTubeIcon color="white" />
                    </Link>
                    <Link to="https://t.me/tktiuz">
                      <TelegramIcon color="white" />
                    </Link>
                    <Link to="https://www.instagram.com/tktiuz">
                      <InstagramIcon color="white" />
                    </Link>
                    <Link to={`http://linkedin.com/company/tktiuz`}>
                      <Linkedin color="white" />
                    </Link>
                    <Link to={`https://vk.com/tktiuz`}>
                      <Talim color="white" />
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 my-3">
                    <PhoneIcon />
                    <span className="text-white"> + 998 97 997 90 93</span>
                  </div>

                  <div className="flex items-center gap-2 my-3">
                    <Email />
                    <span className="text-white"> info@tkti.uz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="text-white  flex justify-center my-3 text-xl">
            Navoiy ko’chasi, 32-uy, Toshkent, O'zbekiston, 100011
          </div>
        </div>
      </footer>
    </>
  );
};
