import React, { useEffect } from "react";
import NavBar from "../Navbar/Navbar";
import "../../styles/home.scss";

const Home = ({ pageTitle }) => {
  //Changing Page Title as the page Loads
  useEffect(() => {
    document.title = pageTitle;
  }, []);

  return (
    <>
      <NavBar />
      <div>Home</div>
    </>
  );
};

export default Home;
