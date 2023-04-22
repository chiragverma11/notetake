import React from "react";
import { Link } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <>
      <Link className={props.className} to={props.to}>
        {props.name}
      </Link>
    </>
  );
};

export default LinkButton;
