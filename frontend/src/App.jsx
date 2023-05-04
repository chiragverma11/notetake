import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AppContextProvider, UserContext } from "./Context/AppContext";
import { useState } from "react";

//Header Component for Navbar
const HeaderLayout = () => (
  <>
    <header>
      <Navbar />
    </header>
    <Outlet />
  </>
);

//These are all the routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HeaderLayout />}>
      {/* These are Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home pageTitle="NoteTake" />} />
      </Route>

      <Route path="/login" element={<Login pageTitle="NoteTake - Login" />} />
      <Route
        path="/signup"
        element={<Signup pageTitle="NoteTake - Signup" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  return (
    <>
      {/* <AppContextProvider> */}
      {/* <UserContext.Provider
          value={{
            isAuthenticated,
            setIsAuthenticated,
            userDetails,
            setUserDetails,
          }}
        > */}
      <RouterProvider router={router} />
      {/* </UserContext.Provider> */}
      {/* </AppContextProvider> */}
    </>
  );
}

export default App;
