import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../styles/navbar.scss";
import LinkButton from "../Layout/LinkButton";
import HamBurger from "./Burger/HamBurger";
import Menu from "./Menu/Menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineMoon } from "react-icons/hi";
import { HiSun } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userDetails = useSelector((state) => state.auth.userDetails);

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  function handleHam() {
    setOpen(open ? false : true);
  }

  async function logoutUser() {
    dispatch(logout());
  }

  function toggleTheme() {
    const isCurrentDark = theme === "dark";
    setTheme(isCurrentDark ? "light" : "dark");
    localStorage.setItem("theme", isCurrentDark ? "light" : "dark");
  }

  return (
    <>
      <nav>
        <LinkButton to="/" name="NoteTake" className="logo" />
        <button className="theme_btn" onClick={toggleTheme}>
          {theme === "light" ? <HiSun /> : <HiOutlineMoon />}
        </button>
        <HamBurger handleHam={handleHam} open={open} />
        <div className="navLink">
          {isAuthenticated ? (
            <>
              <p className="userName">Hi, {userDetails?.name}</p>
              <input
                type="button"
                className="navlink_btn"
                value="Logout"
                onClick={logoutUser}
              />
            </>
          ) : (
            <>
              <LinkButton to="/login" name="Login" className="navlink_btn" />
              <LinkButton to="/signup" name="Signup" className="navlink_btn" />
            </>
          )}
        </div>
      </nav>
      <Menu
        className={`menu ${open ? "show_menu" : ""}`}
        logoutUser={logoutUser}
        handleHam={handleHam}
      />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
        className="toast"
      />
    </>
  );
};

export default Navbar;
