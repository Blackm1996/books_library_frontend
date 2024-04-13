import React, { useEffect, useState } from "react";

// import components
import Nav from "./Nav";
import NavMobile from "./NavMobile";

// import Logo
import Logo from "../assets/img/logo.png";

const Header = () => {
  /*const [bg, setBg] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setBg(true);
      } else {
        setBg(false);
      }
    });
  });*/
  return (
    <header
      className={`bg-primary text-white   lg:px-0 w-full fixed z-10 transition-all duration-300 flex`}
      dir="rtl"
    >
      <div className="container pt-5 ml-auto mr-5 flex  rtl:justify-between">
        
        {/* nav */}
        <Nav />
        {/* nav mobile */}
        <NavMobile />
      </div>
      {/* logo */}
      <div className="h-auto">
        <a href="/" className="pb-0">
          {<img src={Logo} alt="" className="w-20 h-16"/>}
        </a>
      </div>
    </header>
  );
};

export default Header;
