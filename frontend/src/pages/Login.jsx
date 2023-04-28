import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import "../styles/login.scss";

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
        autoClose: 1000,
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

  //Using Usercontext
  const user = useContext(UserContext);

  const navigate = useNavigate();

  //Use States for Input Form
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  //HandleChange for changing input value
  function handleDataChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  //onlogin
  async function handlelogin(e) {
    e.preventDefault();

    // if (userData.password < 3) {
    //   toast.warn("Password length must be atleast 3 characters!", {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // }

    const formData = {
      email: userData.email,
      password: userData.password,
    };

    const response = await loginUser(formData);
    //If response is success or there is no error
    if (response?.success) {
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUserData({ email: "", password: "" });
      user.setIsAuthenticated(true);
      user.setUserDetails(response.user);
      setTimeout(() => {
        navigate("/");
      }, 0);
    }
  }

  return (
    <>
      <div className="login">
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
        />
        <h2 className="login_title">Login</h2>
        <form onSubmit={handlelogin} className="login_form">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleDataChange}
            className="login_form_input"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={userData.password}
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
