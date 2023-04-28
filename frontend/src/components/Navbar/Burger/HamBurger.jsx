import React, { useContext } from "react";

// This just creates HamBurger Icon for Menu Option
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
