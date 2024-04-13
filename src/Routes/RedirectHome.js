import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectHome = () => {
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const role = useSelector((state) => {
    return state.auth.role;
  });

  return !isLoggedIn ? (
    <Navigate to="/books" replace />
  ) : role === 2006 ? (
    <Navigate to="/lendingList" replace />
  ) : (
    <Navigate to="/books" replace />
  );
};

export default RedirectHome;
