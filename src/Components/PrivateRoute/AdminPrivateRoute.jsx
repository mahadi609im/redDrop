import { useContext } from 'react';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../Loading/Loading';
import Forbidden from '../Forbidden/Forbidden';
import { AuthContext } from '../../context/AuthContext';

const AdminPrivateRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const { role, isLoading } = useUserRole();

  if (loading || isLoading) return <Loading />;

  return role === 'admin' ? children : <Forbidden />;
};

export default AdminPrivateRoute;
