import { useNavigate, Link, useLocation } from 'react-router';
import { FaCheck, FaTimes, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { use, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import Loading from '../../../../Components/Loading/Loading';
import LoadingSpin from '../../../../Components/Loading/LoadingSpin';

const statusColor = {
  pending:
    'px-2 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 capitalize',
  inprogress:
    'px-2 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 capitalize',
  done: 'px-2 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 capitalize',
  canceled:
    'px-2 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800 capitalize',
};

const DonorHome = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ['myDonationRequests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/my`);
      return res.data;
    },
  });

  const handleRequestDelete = id => {
    Swal.fire({
      title: 'Are you sure ?',
      text: `Please confirm to delete this request`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donationRequests/${id}`).then(res => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your Request has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    // 1️⃣ Confirm modal
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change status to "${newStatus}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    // ❌ User cancelled
    if (!confirm.isConfirmed) return;

    try {
      // 2️⃣ API call
      const res = await axiosSecure.patch(`/donationRequests/${id}/status`, {
        status: newStatus,
      });

      // 3️⃣ Success feedback
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Status changed to "${newStatus}"`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'No changes',
          text: 'Status could not be updated.',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong',
      });
    }
  };
  // Limit to maximum 3 recent requests
  const recentRequests = requests.slice(0, 3);
  const { loading } = use(AuthContext);

  return (
    <section className="min-h-screen bg-red-50 py-20 px-0 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700">
          Welcome, {user?.displayName} 👋
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto mt-3">
          Here are your recent donation requests.
        </p>
        {recentRequests.length < 1 && (
          <div className="mt-6  px-4 py-3">
            <Link
              to="/dashboard/create-donation-request"
              className="px-6 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
            >
              Create Donation
            </Link>
          </div>
        )}
      </div>

      {loading ? (
        <LoadingSpin></LoadingSpin>
      ) : (
        <>
          {/* Recent Donation Requests Table */}
          {recentRequests.length > 0 && (
            <div className="w-full mx-auto mt-10 overflow-x-auto bg-white border border-red-500/20 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)]">
              <table className="min-w-full md:min-w-full table-auto text-sm">
                <thead>
                  <tr className="bg-red-600 text-white text-left">
                    <th className="px-4 py-3 font-semibold">Recipient</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                    <th className="px-4 py-3 font-semibold">Blood</th>
                    <th className="px-4 py-3 font-semibold">Date & Time</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Donor Info</th>
                    <th className="px-4 py-3 font-semibold text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map(req => (
                    <tr
                      key={req.id}
                      className="border-b border-red-500/10 hover:bg-red-50 transition-all"
                    >
                      <td className="px-4 py-3 font-semibold text-red-700 whitespace-nowrap">
                        {req.recipientName}
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {req.district}, {req.upazila}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold shadow">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {req.donationDate} | {req.donationTime}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={statusColor[req.status]}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {req.status === 'inprogress' && req.donor
                          ? `${req.donor.name} (${req.donor.email})`
                          : '-'}
                      </td>
                      <td className="px-4 py-3 flex flex-nowrap gap-1 justify-center items-center">
                        {/* Status buttons only for inprogress */}
                        {req.status === 'inprogress' && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(req._id, 'done')
                              }
                              className="p-2 rounded-full border border-green-700 bg-green-700/30 text-green-700 shadow hover:bg-green-700/50 transition"
                              title="Mark Done"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(req._id, 'canceled')
                              }
                              className="p-2 rounded-full border border-red-700 bg-red-700/30 text-red-700 shadow hover:bg-red-700/50 transition"
                              title="Mark Canceled"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                        <Link
                          state={location?.pathname}
                          to={`/dashboard/edit-donation/${req._id}`}
                          className="p-2 rounded-full border border-yellow-600 bg-yellow-600/30 text-yellow-600 shadow hover:bg-yellow-600/50 transition"
                          title="Edit Request"
                        >
                          <FaEdit />
                        </Link>

                        {/* Delete button for all statuses */}
                        <button
                          onClick={() => handleRequestDelete(req._id)}
                          className="p-2 rounded-full border border-red-600 bg-red-600/30 text-red-500 shadow hover:bg-red-600/50 transition"
                          title="Delete Request"
                        >
                          <FaTrash />
                        </button>

                        {/* View button  */}
                        <button
                          onClick={() =>
                            navigate(`/dashboard/donation-details/${req._id}`)
                          }
                          className="p-2 rounded-full border border-blue-600 bg-blue-600/30 text-blue-700 shadow hover:bg-blue-600/50 transition"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {recentRequests.length > 0 && (
            <div className="mt-6 text-right px-4 py-3">
              <Link
                to="/dashboard/my-donation-requests"
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
              >
                View My All Requests
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DonorHome;
