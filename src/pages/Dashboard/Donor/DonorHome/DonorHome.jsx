import { useNavigate, Link, useLocation } from 'react-router';
import { FaCheck, FaTimes, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { use, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import LoadingSpin from '../../../../Components/Loading/LoadingSpin';

// থিম অনুযায়ী ডাইনামিক স্ট্যাটাস কালার
const statusColor = {
  pending:
    'px-3 py-1 rounded-full text-xs font-bold bg-warning/10 text-warning border border-warning/20 capitalize',
  inprogress:
    'px-3 py-1 rounded-full text-xs font-bold bg-info/10 text-info border border-info/20 capitalize',
  done: 'px-3 py-1 rounded-full text-xs font-bold bg-success/10 text-success border border-success/20 capitalize',
  canceled:
    'px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 capitalize',
};

const DonorHome = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
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
      title: 'Are you sure?',
      text: `Please confirm to delete this request`,
      icon: 'warning',
      background: 'var(--color-base-200)',
      color: 'var(--color-base-content)',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-base-300)',
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
              background: 'var(--color-base-200)',
              color: 'var(--color-base-content)',
            });
          }
        });
      }
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change status to "${newStatus}"?`,
      icon: 'question',
      background: 'var(--color-base-200)',
      color: 'var(--color-base-content)',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it!',
      confirmButtonColor: 'var(--color-primary)',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/donationRequests/${id}/status`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Status changed to "${newStatus}"`,
          timer: 1500,
          background: 'var(--color-base-200)',
          color: 'var(--color-base-content)',
          showConfirmButton: false,
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

  const recentRequests = requests.slice(0, 3);

  return (
    <section className="min-h-screen bg-base-100 transition-colors duration-500 py-20 px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tighter italic">
          Welcome,{' '}
          <span className="text-primary uppercase not-italic">
            {user?.displayName}
          </span>{' '}
          👋
        </h1>
        <p className="text-base-content/60 max-w-xl mx-auto mt-3 font-medium italic">
          Here are your recent donation requests within the pipeline.
        </p>
        {recentRequests.length < 1 && (
          <div className="mt-8">
            <Link
              to="/dashboard/create-donation-request"
              className="px-8 py-4 bg-primary text-primary-content font-black italic uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all inline-block"
            >
              Create Donation
            </Link>
          </div>
        )}
      </div>

      {loading ? (
        <LoadingSpin />
      ) : (
        <>
          {recentRequests.length > 0 && (
            <div className="w-full mx-auto mt-10 overflow-hidden bg-base-200 border border-base-300 rounded-[2.5rem] shadow-2xl">
              <div className="overflow-x-auto">
                <table className="table w-full text-sm">
                  {/* Table Head */}
                  <thead>
                    <tr className="bg-primary text-primary-content border-none uppercase tracking-widest text-[11px]">
                      <th className="px-6 py-5">Recipient</th>
                      <th className="px-6 py-5">Location</th>
                      <th className="px-6 py-5">Blood</th>
                      <th className="px-6 py-5">Date & Time</th>
                      <th className="px-6 py-5">Status</th>
                      <th className="px-6 py-5">Donor Info</th>
                      <th className="px-6 py-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody className="font-medium">
                    {recentRequests.map(req => (
                      <tr
                        key={req._id}
                        className="border-b border-base-300 hover:bg-base-300/30 transition-all"
                      >
                        <td className="px-6 py-4 font-black text-base-content italic text-base">
                          {req.recipientName}
                        </td>
                        <td className="px-6 py-4 text-base-content/70">
                          {req.district}, {req.upazila}
                        </td>
                        <td className="px-6 py-4">
                          <span className="w-10 h-10 flex items-center justify-center bg-primary text-primary-content rounded-xl font-black italic shadow-lg">
                            {req.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-base-content/70 whitespace-nowrap italic">
                          {req.donationDate} <br />
                          <span className="text-[10px] opacity-50 uppercase tracking-tighter">
                            {req.donationTime}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={statusColor[req.status]}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-base-content/70">
                          {req.status === 'inprogress' && req.donor ? (
                            <div className="flex flex-col">
                              <span className="font-bold text-primary">
                                {req.donor.name}
                              </span>
                              <span className="text-[10px] opacity-60">
                                {req.donor.email}
                              </span>
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center items-center gap-2">
                            {req.status === 'inprogress' && (
                              <>
                                <button
                                  onClick={() =>
                                    handleStatusChange(req._id, 'done')
                                  }
                                  className="p-3 rounded-xl bg-success/10 text-success border border-success/20 hover:bg-success hover:text-white transition-all"
                                  title="Mark Done"
                                >
                                  {' '}
                                  <FaCheck size={12} />{' '}
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusChange(req._id, 'canceled')
                                  }
                                  className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all"
                                  title="Mark Canceled"
                                >
                                  {' '}
                                  <FaTimes size={12} />{' '}
                                </button>
                              </>
                            )}
                            <Link
                              to={`/dashboard/edit-donation/${req._id}`}
                              className="p-3 rounded-xl bg-warning/10 text-warning border border-warning/20 hover:bg-warning hover:text-white transition-all"
                              title="Edit"
                            >
                              {' '}
                              <FaEdit size={12} />{' '}
                            </Link>
                            <button
                              onClick={() => handleRequestDelete(req._id)}
                              className="p-3 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
                              title="Delete"
                            >
                              {' '}
                              <FaTrash size={12} />{' '}
                            </button>
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/donation-details/${req._id}`
                                )
                              }
                              className="p-3 rounded-xl bg-info/10 text-info border border-info/20 hover:bg-info hover:text-white transition-all"
                              title="View"
                            >
                              {' '}
                              <FaEye size={12} />{' '}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {recentRequests.length > 0 && (
            <div className="mt-10 text-right">
              <Link
                to="/dashboard/my-donation-requests"
                className="group inline-flex items-center gap-2 px-8 py-3 bg-base-200 text-base-content font-black italic uppercase tracking-widest rounded-xl border border-base-300 hover:bg-base-300 transition-all"
              >
                View All Requests
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DonorHome;
