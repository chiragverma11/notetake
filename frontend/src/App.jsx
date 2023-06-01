import { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./slices/authSlice";

//Header Component for Navbar
const HeaderLayout = () => (
  <>
    <header>
      <Navbar />
    </header>
    <Outlet />
  </>
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.auth);

  //These are all the routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<HeaderLayout />}>
        {/* These are Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home pageTitle="NoteTake" />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAuthenticated={!isAuthenticated}
              redirect="/"
              noLoading={true}
            />
          }
        >
          <Route
            path="/login"
            element={<Login pageTitle="NoteTake - Login" />}
          />
          <Route
            path="/signup"
            element={<Signup pageTitle="NoteTake - Signup" />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
