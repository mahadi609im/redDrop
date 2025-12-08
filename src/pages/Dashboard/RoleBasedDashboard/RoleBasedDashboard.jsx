import AdminHome from '../Admin/AdminHome/AdminHome';
import DonorHome from '../Donor/DonorHome/DonorHome';
import VolunteerHome from '../Volunteer/VolunteerHome/VolunteerHome';

const RoleBasedDashboard = () => {
  const role = localStorage.getItem('userRole');

  if (role === 'admin') return <AdminHome />;
  if (role === 'volunteer') return <VolunteerHome />;
  return <DonorHome />;
};

export default RoleBasedDashboard;
