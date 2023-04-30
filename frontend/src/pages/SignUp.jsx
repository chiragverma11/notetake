import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/signup.scss";

async function signupUser(formData) {
  try {
    const response = await axios({
      method: "post",
      url: `/api/signup`,
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
const SignUp = ({ pageTitle }) => {
  //Changing Page Title as the page Loads
  useEffect(() => {
    document.title = pageTitle;
  }, []);

  const navigate = useNavigate();

  //Use States for Input Form
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  //HandleChange for changing input value
  function handleDataChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  //onSignup
  async function handleSignup(e) {
    e.preventDefault();

    if (user.password < 3) {
      toast.warn("Password length must be atleast 3 characters!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    const formData = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const response = await signupUser(formData);
    //If response is success or there is no error
    if (response && response.success) {
      toast.success("Sign Up Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUser({ name: "", email: "", password: "" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }

  return (
    <>
      <div className="signup">
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
        <h2 className="signup_title">Sign Up</h2>
        <form onSubmit={handleSignup} className="signup_form">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={user.name}
            onChange={handleDataChange}
            className="signup_form_input"
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={handleDataChange}
            className="signup_form_input"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleDataChange}
            className="signup_form_input"
          />
          <button type="submit" name="Sign up" className="signupBtn">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
