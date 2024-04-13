import React from "react";

// import link
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../assets/Api/axios";
// import logout
import { logout } from "../Redux/authSlice";

const Nav = () => {
  // dispatch
  const dispatch = useDispatch();

  // navigate
  const navigate = useNavigate();

  const location = useLocation();
  // isLoggedIn
  const { isLoggedIn, role } = useSelector((state) => {
    return state.auth;
  });

  // logout
  const handleLogout = () => {
    api.post("logout").then((respone) => {
      if (respone.status === 200 || respone.status ===401) {
        dispatch(logout());
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  //console.log("HA ", location.pathname);
  return (
    <nav className="hidden lg:flex ">
      <ul className="lg:flex space-x-reverse space-x-6 font-semibold text-md text-white ">
        <Link
          className={`inline-block px-10 py-4 rounded-t-md transition-colors duration-300 bg-secondary
          hover:bg-secondary-Hover active:bg-secondary-Active ${
            location.pathname === "/" ? "bg-secondary-400" : ""
          }`}
          to="/"
        >
          قائمة الكتب
        </Link>
        {isLoggedIn && (
          <Link
            className={`inline-block px-10 py-4 rounded-t-md transition-colors duration-300 bg-secondary
            hover:bg-secondary-Hover active:bg-secondary-Active ${
              location.pathname === "/lendingList" ? "bg-secondary-400" : ""
            }`}
            to="/lendingList"
          >
            سجل الإعارات
          </Link>
        )}
        {isLoggedIn && (role == 1996 || role == 2006) && (
          <Link
            className={`inline-block px-10 py-4 rounded-t-md transition-colors duration-300 bg-secondary
          hover:bg-secondary-Hover active:bg-secondary-Active ${
            location.pathname === "/ViewUsers" ? "bg-secondary-400" : ""
          }`}
            to="/ViewUsers"
          >
            قائمة المستخدمين
          </Link>
        )}
        {isLoggedIn ? (
          <button
            className="inline-block px-10 py-4 rounded-t-md transition-colors duration-300 bg-secondary
          hover:bg-secondary-Hover active:bg-secondary-Active"
            type="button"
            onClick={handleLogout}
          >
            تسجيل الخروج
          </button>
        ) : (
          <Link
            className={`inline-block px-10 py-4 rounded-t-md transition-colors duration-300 bg-secondary 
            hover:bg-secondary-Hover active:bg-secondary-Active ${
              location.pathname === "/login" ? "bg-secondary-400" : ""
            }`}
            to="/login"
          >
            تسجيل الدخول
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
