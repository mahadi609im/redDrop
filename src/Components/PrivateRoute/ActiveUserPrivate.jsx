import { useContext } from 'react';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../Loading/Loading';
import Forbidden from '../Forbidden/Forbidden';
import { AuthContext } from '../../context/AuthContext';

const ActiveUserPrivate = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const { statusData, statusLoading } = useUserRole();

  if (loading || statusLoading) return <Loading />;

  return statusData === 'active' ? children : <Forbidden />;
};

export default ActiveUserPrivate;
