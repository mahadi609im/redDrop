import { useEffect, useState, useContext } from 'react';
import AdminHome from '../Admin/AdminHome/AdminHome';
import DonorHome from '../Donor/DonorHome/DonorHome';
import VolunteerHome from '../Volunteer/VolunteerHome/VolunteerHome';
import { AuthContext } from '../../../context/AuthContext';
import Loading from '../../../Components/Loading/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const RoleBasedDashboard = () => {
  const { user } = useContext(AuthContext); // login user info
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRole = async () => {
      try {
        // users collection থেকে email অনুযায়ী filter
        const res = await axiosSecure.get(`/users?email=${user.email}`);
        const currentUser = res.data[0];
        console.log(currentUser);
        setRole(currentUser?.role || 'donor'); // যদি role না থাকে default 'donor'
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user?.email, axiosSecure]);

  if (loading) return <Loading />;

  if (role === 'admin') return <AdminHome />;
  if (role === 'volunteer') return <VolunteerHome />;
  return <DonorHome />;
};

export default RoleBasedDashboard;
