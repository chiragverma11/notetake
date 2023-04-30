import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import "../styles/login.scss";

async function loginUser(formData) {
  try {
    const response = await axios({
      method: "post",
      url: `/api/login`,
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

    const formData = {
      email: userData.email,
      password: userData.password,
    };

    const response = await loginUser(formData);
    //If response is success or there is no error
    if (response?.success) {
      // toast.success("Login Successfully", {
      //   position: "top-right",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
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
          className="toast"
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
