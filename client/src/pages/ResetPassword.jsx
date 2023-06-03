import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import "../styles/resetPassword.scss";
import { resetPassword } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

//Main Function
const ResetPassword = ({ pageTitle }) => {
  const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.auth.isLoading);
  // const error = useSelector((state) => state.auth.error);
  // const message = useSelector((state) => state.auth.message);
  const { token } = useParams();

  //Use States for Input Form
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  //Changing Page Title as the page Loads
  useEffect(() => {
    document.title = pageTitle;
  }, []);

  //HandleChange for changing input value
  function handleDataChange(e) {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }

  //onSignup
  async function handleResetPassword(e) {
    e.preventDefault();

    if (passwords.password === "" || passwords.confirmPassword === "") {
      return toast.error("Please Enter New Passwords");
    }

    const formData = {
      token,
      password: passwords.password,
      confirmPassword: passwords.confirmPassword,
    };

    // try {
    dispatch(resetPassword(formData));
    setPasswords({
      password: "",
      confirmPassword: "",
    });
    // navigate("/login");
    // } catch (error) {
    //   throw error;
    // }
  }

  return (
    <>
      <div className="resetPassword">
        <Toaster />
        <h2 className="resetPassword_title">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="resetPassword_form">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="New Password"
            value={passwords.password}
            onChange={handleDataChange}
            className="resetPassword_form_input"
            autoComplete="on"
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={handleDataChange}
            className="resetPassword_form_input"
            autoComplete="on"
          />
          <button type="submit" name="Sign up" className="resetPasswordBtn">
            Reset Password
          </button>
          <NavLink to="/login" className="loginBtn_navigate">
            <BiArrowBack className="backArrowIcon" />
            Back to Login
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
