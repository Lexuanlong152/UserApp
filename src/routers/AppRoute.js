import PrivateRoute from "./PrivateRoute";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import UserLayout from "../layout/UserLayout";
import Login from "../components/Login";
import NotFound from "../components/NotFound";

const AppRoute = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/user" element={<UserLayout />} /> */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoute;
