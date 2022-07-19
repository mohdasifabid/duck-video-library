import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = useSelector((state)=>state.authState.isAuthenticated)

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }
};
