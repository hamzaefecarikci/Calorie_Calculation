import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
