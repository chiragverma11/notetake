import React, { useContext } from "react";
import LinkButton from "../../Layout/LinkButton";
import { UserContext } from "../../../Context/UserContext";

const Menu = ({ className, logoutUser }) => {
  const user = useContext(UserContext);
  return (
    <ul className={className}>
      <LinkButton to="/" name="Home" className="menu_btn" />
      {user.isAuthenticated ? (
        <input
          type="button"
          className="menu_btn"
          value="Logout"
          onClick={logoutUser}
        />
      ) : (
        <>
          <LinkButton to="/login" name="Login" className="menu_btn" />
          <LinkButton to="/signup" name="Signup" className="menu_btn" />
        </>
      )}
    </ul>
  );
};

export default Menu;
