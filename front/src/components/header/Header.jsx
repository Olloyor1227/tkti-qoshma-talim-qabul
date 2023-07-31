import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hamburger from "hamburger-react";
import i18next from "i18next";

import { DropDownIcon } from "../../assets/icons";
import logo from "../../assets/images/footer-logo.png";

import { language, headerItems } from "../../config";
import { useAppContext } from "../../context/app.context";

export const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { authState } = useAppContext()

  const [isOpen, setOpen] = useState({ hamburger: false, lang: false });

  const toggleHamburger = () => {
    setOpen({ hamburger: !isOpen.hamburger });
  };

  const changeLanguage = (code) => {
    let pathnameLang = "uz";
    if (pathname.split("/")[1] === "uz") pathnameLang = "uz";
    if (pathname.split("/")[1] === "ru") pathnameLang = "ru";
    if (pathname.split("/")[1] === "en") pathnameLang = "en";
    navigate(pathname.replace(pathnameLang, code));
    location.reload()
    i18next.changeLanguage(code);
  };

  const userNameFirstLatter = JSON.parse(localStorage.getItem("user"))?.name?.slice(0,1)

  return (
    <header
      className={`py-4 top-0 w-full z-10 text-white transition-opacity bg-[#26597E]`}
    >
      <div className="flex items-center justify-between container mx-auto w-[90%]">
        <div className="w-1/6">
          <Link to="/">
            <img src={logo} alt="" width={"80"} height={"15"} className="" />
          </Link>
        </div>
        <div
          className={`w-4/6 xl:flex justify-end gap-10 ${
            isOpen.hamburger
              ? "xl:static absolute top-0 left-0 max-xl:w-full max-xl:h-screen xl:bg-inherit bg-[rgba(0,0,0,0.96)] max-xl:flex max-xl:flex-col max-xl:justify-start max-xl:pt-24"
              : "hidden"
          }`}
        >
          <Link
            to="/"
            className="max-xl:block hidden pl-14 -mt-16 mb-14"
            onClick={() => toggleHamburger()}
          >
            <img src={logo} alt="" width={"150"} height={"20"} className="" />
          </Link>
          
          {headerItems(authState).map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="max-xl:pl-14 max-xl:text-[#F06D06]  border-red-900 max-xl:mb-8"
              onClick={() => toggleHamburger()}
            >
              {t(`${item.name}`)}
            </Link>
          ))}

          <div className="max-xl:flex gap-4 hidden pl-14 mt-8">
            {language.map((item) => (
              <button
                key={item.code}
                className="bg-[#F2F2F2] text-black rounded p-2"
                onClick={() => {
                  changeLanguage(item.code);
                  toggleHamburger();
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3">
          {/* <div
            className="items-center gap-3 text-white ml-10 p-2.5 rounded cursor-pointer xl:flex hidden relative"
            onClick={() => setOpen({ ...isOpen, lang: !isOpen.lang })}
          >
            <p className="capitalize flex items-center gap-1">{i18next.language} <DropDownIcon /></p>
            {isOpen.lang && (
              <ul className="absolute bg-[#F2F2F2] text-black top-10 left-0 w-full rounded">
                {language.map((item) => (
                  <li
                    key={item.code}
                    className="px-2 hover:bg-black hover:text-white rounded"
                    onClick={() => {
                      changeLanguage(item.code);
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div> */}

          {
            authState ? <Link to={`${i18next.language}/cabinet`} className="rounded-full w-6 h-6 bg-white text-black flex justify-center items-center p-2">{userNameFirstLatter}</Link> : null
          }

          <div className="xl:hidden block">
            <Hamburger
              toggled={isOpen.hamburger}
              toggle={() => toggleHamburger()}
            />
          </div>
        </div>

      </div>
    </header>
  );
};
