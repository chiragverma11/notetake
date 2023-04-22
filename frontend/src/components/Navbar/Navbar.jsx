import React, { useState } from "react";
import { Link } from "react-router-dom";
import LinkButton from "../Layout/LinkButton";
import "../../styles/navbar.scss";
import HamBurger from "./Burger/HamBurger";
import Menu from "./Menu/Menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  function handleHam() {
    setOpen(open ? false : true);
  }
  return (
    <>
      <nav>
        <Link className="logo" to="/">
          NoteTake
        </Link>
        <HamBurger handleHam={handleHam} />
        <div className="navLink">
          <LinkButton to="/login" name="Login" className="auth__btn" />
          <LinkButton to="/signup" name="Signup" className="auth__btn" />
        </div>
      </nav>
      <Menu className={`menu ${open ? "show_menu" : ""}`} />
    </>
  );
};

export default Navbar;
