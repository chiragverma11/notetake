import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const ProtectedRoute = () => {
  //Using Usercontext
  const user = useContext(UserContext);

  return (
    <>{!user.isAuthenticated ? <Navigate to="/login" replace /> : <Outlet />}</>
  );
};

export default ProtectedRoute;
