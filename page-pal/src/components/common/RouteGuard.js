import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function RouteGuard({
    children
}){
  const { isAuthenticated } = useContext(AuthContext);

    if( !isAuthenticated){
    return <Navigate to='/login'/>;
    }
    
    return children ? children : <Outlet />
}