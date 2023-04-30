import React, { useContext } from "react";
import LinkButton from "../../Layout/LinkButton";
import { UserContext } from "../../../Context/UserContext";

const Menu = ({ className, logoutUser, handleHam }) => {
  const user = useContext(UserContext);
  return (
    <ul className={className}>
      <LinkButton
        to="/"
        name="Home"
        className="menu_btn"
        handleHam={handleHam}
      />
      {user.isAuthenticated ? (
        <input
          type="button"
          className="menu_btn"
          value="Logout"
          onClick={() => {
            logoutUser();
            handleHam();
          }}
        />
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
