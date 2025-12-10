import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: currentUser = {}, isLoading } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data?.[0] || {}; // optional chaining
    },
    enabled: !!user?.email,
  });

  return { role: currentUser?.role || 'donor', isLoading };
};

export default useUserRole;
