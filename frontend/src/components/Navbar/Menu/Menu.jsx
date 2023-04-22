import React from "react";
import LinkButton from "../../Layout/LinkButton";
import "../../../styles/menu.scss";

const Menu = (props) => {
  return (
    <ul className={props.className}>
      <LinkButton to="/" name="Home" className="auth__btn" />
      <LinkButton to="/login" name="Login" className="auth__btn" />
      <LinkButton to="/signup" name="Signup" className="auth__btn" />
    </ul>
  );
};

export default Menu;
