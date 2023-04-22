import React, { useContext } from "react";
import "../../../styles/hamburger.scss";

const HamBurger = ({ handleHam }) => {
  return (
    <div className="hamburger" onClick={handleHam}>
      <span className="hamburger_line"></span>
      <span className="hamburger_line"></span>
      <span className="hamburger_line"></span>
    </div>
  );
};

export default HamBurger;
