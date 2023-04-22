import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import Signup from "./components/User/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home pageTitle="NoteTake" />} />
          <Route
            path="/login"
            element={<Login pageTitle="NoteTake - Login" />}
          />
          <Route
            path="/signup"
            element={<Signup pageTitle="NoteTake - Signup" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
