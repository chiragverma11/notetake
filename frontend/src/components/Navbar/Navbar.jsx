import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.scss";
import LinkButton from "../Layout/LinkButton";
import HamBurger from "./Burger/HamBurger";
import Menu from "./Menu/Menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

//this function is just used for developement because if I use this website over my local wifi server then the backend cannot respond and set cookie because of same site problem
let baseUrl = "http://localhost:8080/api";
const detectDeviceType = () => {
  baseUrl =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "http://192.168.1.6:8080/api"
      : "http://localhost:8080/api";
};

async function logoutUserRequest() {
  try {
    const response = await axios({
      method: "post",
      url: `${baseUrl}/logout`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (!error.response.data.success) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    console.error(error);
  }
}

const Navbar = () => {
  const [open, setOpen] = useState(false);

  function handleHam() {
    setOpen(open ? false : true);
  }
  //Using Usercontext
  const user = useContext(UserContext);

  async function logoutUser() {
    detectDeviceType();
    const response = await logoutUserRequest();
    if (response?.success) {
      toast.success("Logged Out", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      user.setIsAuthenticated(false);
    }
  }

  return (
    <>
      <nav>
        <LinkButton to="/" name="NoteTake" className="logo" />
        <HamBurger handleHam={handleHam} />
        <div className="navLink">
          {user.isAuthenticated ? (
            <>
              <p className="userName">Hi, {user.userDetails.name}</p>
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
        theme="dark"
        className="toast"
      />
    </>
  );
};

export default Navbar;
