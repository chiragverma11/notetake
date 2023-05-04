import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import "../styles/login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import spinner from "../assets/spinner.svg";

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

  // const [state, dispatch] = useContext(AppContext);

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

    dispatch(login(formData)).then(() => {
      navigate("/");
    });

    // const response = await loginUser(formData);
    //If response is success or there is no error
    // if (response?.success) {
    //   setUserData({ email: "", password: "" });
    // dispatch({ type: "LOGIN_USER_SUCCESS", payload: response.user });
    // setTimeout(() => {
    //   navigate("/");
    // }, 0);
    // }
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
