import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import { AppContext } from "../Context/AppContext";

const ProtectedRoute = () => {
  // const [state, dispatch] = useContext(AppContext);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>{!isAuthenticated ? <Navigate to="/login" replace /> : <Outlet />}</>
  );
};

export default ProtectedRoute;
