import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// TODO:
interface IProps {
  children: any,
}

function PrivateRoute({ children }: IProps) {
  const { session } = useAuth();
  console.log(session)

  return session ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute