import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowdRoles, redirectPath = "/" }) => {
  // isLoggedIn
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const role = useSelector((state) => {
    return state.auth.role;
  });
  console.log("allowed ", allowdRoles);
  console.log("role", role);
  return isLoggedIn ? (
    allowdRoles?.includes(role) ? (
      <Outlet />
    ) : (
      <Navigate to={redirectPath} replace />
    )
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
