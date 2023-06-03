import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import "../styles/forgotPassword.scss";
import { forgotPassword } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

//Main Function
const ForgotPassword = ({ pageTitle }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);

  //Use States for Input Form
  const [email, setEmail] = useState("");

  //Changing Page Title as the page Loads
  useEffect(() => {
    document.title = pageTitle;
  }, []);

  //onSignup
  async function handleForgotPassword(e) {
    e.preventDefault();

    if (!email) {
      return toast.error("Please Enter Email");
    }

    const formData = {
      email: email,
    };

    try {
      await dispatch(forgotPassword(formData)).unwrap();
      setEmail("");
      // navigate("/login");
    } catch (error) {}
  }

  return (
    <>
      <div className="forgotPassword">
        <Toaster />
        <h2 className="forgotPassword_title">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="forgotPassword_form">
          <p className="forgotPassword_description">
            No worries, we'll send you reset instructions on your email
          </p>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="forgotPassword_form_input"
            autoComplete="on"
          />
          <button type="submit" name="Sign up" className="resetPasswordBtn">
            Reset Password
          </button>
          <NavLink to="/login" className="loginBtn_navigate">
            <BiArrowBack className="backArrowIcon" />
            Back to Login
          </NavLink>
          <span className="signup_span">
            Don't have an account?{" "}
            <NavLink to="/signup" className="signupBtn">
              Sign up
            </NavLink>
          </span>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
