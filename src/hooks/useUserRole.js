import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !!user?.email, // user না থাকলে query চলবে না
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data; // { role: "admin" }
    },
  });

  // DEFAULT fallback
  const role = data?.role || 'donor';

  return { role, isLoading };
};

export default useUserRole;
