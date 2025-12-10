import AdminHome from '../Admin/AdminHome/AdminHome';
import DonorHome from '../Donor/DonorHome/DonorHome';
import VolunteerHome from '../Volunteer/VolunteerHome/VolunteerHome';
import Loading from '../../../Components/Loading/Loading';
import useUserRole from '../../../hooks/useUserRole';
import LoadingSpin from '../../../Components/Loading/LoadingSpin';

const RoleBasedDashboard = () => {
  const { role } = useUserRole();

  if (role === 'admin') return <AdminHome />;
  if (role === 'volunteer') return <VolunteerHome />;
  return <DonorHome />;
};

export default RoleBasedDashboard;
