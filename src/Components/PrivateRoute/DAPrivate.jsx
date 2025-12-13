import { useContext } from 'react';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../Loading/Loading';
import Forbidden from '../Forbidden/Forbidden';
import { AuthContext } from '../../context/AuthContext';

const DAPrivate = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const { role, isLoading, statusData, statusLoading } = useUserRole();

  if (loading || isLoading || statusLoading) return <Loading />;

  return (role === 'donor' && statusData === 'active') || role === 'admin' ? (
    children
  ) : (
    <Forbidden />
  );
};

export default DAPrivate;
