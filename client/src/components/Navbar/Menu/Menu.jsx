import React from "react";
import LinkButton from "../../Layout/LinkButton";
import { useDispatch, useSelector } from "react-redux";

const Menu = ({ className, logoutUser, handleHam }) => {
  const dispatcH = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <ul className={className}>
      <LinkButton
        to="/"
        name="Home"
        className="menu_btn"
        handleHam={handleHam}
      />
      {isAuthenticated ? (
        <button
          className="menu_btn"
          onClick={() => {
            logoutUser();
            handleHam();
          }}
        >
          Logout
        </button>
      ) : (
        <>
          <LinkButton
            to="/login"
            name="Login"
            className="menu_btn"
            handleHam={handleHam}
          />
          <LinkButton
            to="/signup"
            name="Signup"
            className="menu_btn"
            handleHam={handleHam}
          />
        </>
      )}
    </ul>
  );
};

export default Menu;
