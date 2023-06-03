import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ProtectedRoute = ({
  isAuthenticated,
  redirect = "/login",
  noLoading = false,
}) => {
  const { isLoading } = useSelector((state) => state.auth);

  return (
    <>
      {noLoading ? (
        !isLoading && !isAuthenticated ? (
          <Navigate to={redirect} replace />
        ) : (
          <Outlet />
        )
      ) : isLoading ? (
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
