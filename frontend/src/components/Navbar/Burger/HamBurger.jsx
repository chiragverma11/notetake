import React, { useContext } from "react";

// This just creates HamBurger Icon for Menu Option
const HamBurger = ({ handleHam, open }) => {
  return (
    <div className={open ? "hamburger open" : "hamburger"} onClick={handleHam}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HamBurger;
