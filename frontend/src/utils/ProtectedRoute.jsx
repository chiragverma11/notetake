import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ProtectedRoute = ({ isAuthenticated, redirect = "/login" }) => {
  const { isLoading } = useSelector((state) => state.auth);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !isAuthenticated ? (
        <Navigate to={redirect} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ProtectedRoute;
