import AdminHome from '../Admin/AdminHome/AdminHome';
import DonorHome from '../Donor/DonorHome/DonorHome';
import VolunteerHome from '../Volunteer/VolunteerHome/VolunteerHome';
import useUserRole from '../../../hooks/useUserRole';

const RoleBasedDashboard = () => {
  const { role } = useUserRole();

  if (role === 'admin') return <AdminHome />;
  if (role === 'volunteer') return <VolunteerHome />;
  return <DonorHome />;
};

export default RoleBasedDashboard;
