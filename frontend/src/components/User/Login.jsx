import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "../../styles/login.scss";

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

async function loginUser(formData) {
  try {
    const response = await axios({
      method: "post",
      url: `${baseUrl}/login`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    });
    return response.data;
  } catch (error) {
    if (!error.response.data.success) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
}

//Main Function
const Login = ({ pageTitle }) => {
  //Changing Page Title as the page Loads
  useEffect(() => {
    document.title = pageTitle;
    detectDeviceType();
  }, []);

  const navigate = useNavigate();

  //Use States for Input Form
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //HandleChange for changing input value
  function handleDataChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  //onlogin
  async function handlelogin(e) {
    e.preventDefault();

    // if (user.password < 3) {
    //   toast.warn("Password length must be atleast 3 characters!", {
    //     position: "top-right",
    //     autoClose: 4000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // }

    const formData = {
      email: user.email,
      password: user.password,
    };

    const response = await loginUser(formData);
    //If response is success or there is no error
    if (response && response.success) {
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUser({ email: "", password: "" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }

  return (
    <>
      <Navbar />
      <div className="login">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <h2 className="login_title">Login</h2>
        <form onSubmit={handlelogin} className="login_form">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={handleDataChange}
            className="login_form_input"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleDataChange}
            className="login_form_input"
          />
          <button type="submit" name="login" className="loginBtn">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
