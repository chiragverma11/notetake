import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../styles/signup.scss";
import { signup } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

//Main Function
const SignUp = ({ pageTitle }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);

  //Use States for Input Form
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Changing Page Title as the page Loads
  useEffect(() => {
    document.title = pageTitle;
  }, []);

  const navigate = useNavigate();

  //HandleChange for changing input value
  function handleDataChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  //onSignup
  async function handleSignup(e) {
    e.preventDefault();

    if (user.password < 3) {
    }

    const formData = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const result = dispatch(signup(formData));
    console.log(result);
    //If response is success or there is no error
    if (result) {
      console.log("redirect");
      setUser({ name: "", email: "", password: "" });
      // setTimeout(() => {
      //   navigate("/login");
      // }, 2000);
    }
  }

  return (
    <>
      <div className="signup">
        <Toaster />
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
            autoComplete="on"
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={handleDataChange}
            className="signup_form_input"
            autoComplete="on"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleDataChange}
            className="signup_form_input"
            autoComplete="on"
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
