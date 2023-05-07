import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import spinner from "../assets/spinner.svg";

const Login = ({ pageTitle }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    //Changing Page Title as the page Loads
    document.title = pageTitle;
  }, []);

  const navigate = useNavigate();

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

    dispatch(login(formData));
    navigate("/");
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
            {/* {isLoading ? "Logging..." : "Login"} */}
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
