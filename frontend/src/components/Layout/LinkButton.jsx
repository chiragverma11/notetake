import React from "react";
import { NavLink } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <>
      <NavLink
        to={props.to}
        className={props.className}
        onClick={props.handleHam}
      >
        {props.name}
      </NavLink>
    </>
  );
};

export default LinkButton;
