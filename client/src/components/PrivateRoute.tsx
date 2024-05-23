import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

interface IProps {
  children: ReactElement,
}

function PrivateRoute({ children }: IProps) {
  const { session } = useAuth();

  return session ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute