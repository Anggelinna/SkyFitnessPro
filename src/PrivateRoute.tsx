import { Navigate, Outlet } from 'react-router-dom';
import { RoutesApp } from './const';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function PrivateRoute() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to={RoutesApp.SIGN_IN} />;
  }

  return <Outlet />;
}

export default PrivateRoute;