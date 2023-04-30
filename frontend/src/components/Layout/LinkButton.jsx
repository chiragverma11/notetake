import React from "react";
import { Link, NavLink } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <>
      {/* <Link className={props.className} to={props.to}>
        {props.name}
      </Link> */}

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
