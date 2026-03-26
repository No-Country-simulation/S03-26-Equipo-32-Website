import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {

  const isAuthenticated = true;

  if(isAuthenticated) {
    return <Outlet />
  }
  
  return <Navigate to="/" />
}
