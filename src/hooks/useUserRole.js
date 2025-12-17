import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data;
    },
  });

  const { data: statusDataObj, isLoading: statusLoading } = useQuery({
    queryKey: ['user-status', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/status`);
      return res.data;
    },
  });

  const role = data?.role || 'donor';
  const statusData = statusDataObj?.status;

  return { role, isLoading, statusData, statusLoading };
};

export default useUserRole;
