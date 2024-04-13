import React, { useState } from "react";

// import icons
import BarsIcon from "../assets/img/bars.png";
import CloseIcon from "../assets/img/close.png";

// import Link
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../assets/Api/axios";
// import logout
import { logout } from "../Redux/authSlice";

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState();
  const { isLoggedIn, role } = useSelector((state) => {
    return state.auth;
  });

  // dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  // logout
  const handleLogout = () => {
    api.post("logout").then((respone) => {
      if (respone.status === 200) {
        dispatch(logout());
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        close();
        navigate("/");
      }
    });
  };

  return (
    <nav className="lg:hidden relative z-20" dir="rtl">
      {/* menu icon*/}
      <button className="" onClick={open}>
        <img src={BarsIcon} alt="" />
      </button>
      {/* nav list */}
      <ul
        className={`${
          isOpen ? "right-0" : "-right-full"
        } bg-primary fixed top-0 w-full h-screen text-white transition-all flex flex-col justify-center items-center space-y-8 text-lg`}
      >
        {/* close button */}
        <button className="absolute top-6 left-6" onClick={close}>
          <img src={CloseIcon} alt="" />
        </button>
        <ul className="flex flex-col space-y-6 font-semibold text-sm text-white ">
          <Link
            className="inline-block px-10 py-4 rounded-md transition-colors duration-300 bg-secondary
          hover:bg-secondary-Hover active:bg-secondary-Active"
            onClick={close}
            to="/"
          >
            قائمة الكتب
          </Link>

          {isLoggedIn && (
            <Link
              className="inline-block px-10 py-4 rounded-md transition-colors duration-300 bg-secondary
            hover:bg-secondary-Hover active:bg-secondary-Active"
              onClick={close}
              to="/lendingList"
            >
              سجل الإعارات
            </Link>
          )}

          {isLoggedIn && (role == 1996 || role == 2006) && (
            <Link
              className="inline-block px-10 py-4 rounded-md transition-colors duration-300 bg-secondary
            hover:bg-secondary-Hover active:bg-secondary-Active"
              onClick={close}
              to="/ViewUsers"
            >
              قائمة المستخدمين
            </Link>
          )}

          {isLoggedIn ? (
            <button
              className="ninline-block px-10 py-4 rounded-md transition-colors duration-300 bg-secondary
            hover:bg-secondary-Hover active:bg-secondary-Active"
              type="button"
              onClick={handleLogout}
            >
              تسجيل الخروج
            </button>
          ) : (
            <Link
              className="inline-block px-10 py-4 rounded-md transition-colors duration-300 bg-secondary
            hover:bg-secondary-Hover active:bg-secondary-Active"
              onClick={close}
              to="/login"
            >
              تسجيل الدخول
            </Link>
          )}
        </ul>
      </ul>
    </nav>
  );
};

export default NavMobile;
