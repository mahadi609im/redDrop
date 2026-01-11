import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  FaCheck,
  FaTimes,
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
} from 'react-icons/fa';
import { AuthContext } from '../../../../context/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpin from '../../../../Components/Loading/LoadingSpin';

const MyDonationRequests = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['myDonationRequests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/my`);
      return res.data;
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRequests =
    filterStatus === 'all'
      ? requests
      : requests.filter(r => r.status === filterStatus);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const displayedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRequestDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      background: 'var(--color-base-100)',
      color: 'var(--color-base-content)',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donationRequests/${id}`).then(res => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire('Deleted!', 'Request has been deleted.', 'success');
          }
        });
      }
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    const confirm = await Swal.fire({
      title: 'Change Status?',
      text: `Update status to ${newStatus}?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#ef4444',
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
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Update failed' });
    }
  };

  if (authLoading || isLoading) return <LoadingSpin />;

  return (
    <section className="min-h-screen bg-base-200 py-10 px-4 md:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-base-content tracking-tight">
              My Donation{' '}
              <span className="text-primary underline decoration-primary/20">
                Requests
              </span>{' '}
              🩸
            </h1>
            <p className="text-base-content/60 mt-2 font-medium">
              Oversee and manage your active blood donation calls.
            </p>
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-3 bg-base-100 px-5 py-2.5 rounded-2xl shadow-sm border border-base-300">
            <FaFilter className="text-primary/60" size={14} />
            <select
              className="bg-transparent text-sm font-bold text-base-content focus:outline-none cursor-pointer"
              value={filterStatus}
              onChange={e => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Records</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        {/* Table Container with Red Drop Shade */}
        <div className="bg-base-100 rounded-3xl overflow-hidden border border-base-300 shadow-[0_8px_30px_rgb(239,68,68,0.06)] dark:shadow-[0_8px_30px_rgb(255,82,82,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-base-300/50 border-b border-base-300">
                  <th className="px-6 py-5 text-xs font-black text-base-content/50 uppercase tracking-widest">
                    Recipient
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-base-content/50 uppercase tracking-widest">
                    Location
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-base-content/50 uppercase tracking-widest text-center">
                    Group
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-base-content/50 uppercase tracking-widest">
                    Schedule
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-base-content/50 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-base-content/50 uppercase tracking-widest text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {displayedRequests.length > 0 ? (
                  displayedRequests.map(req => (
                    <tr
                      key={req._id}
                      className="hover:bg-primary/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <p className="font-bold text-base-content group-hover:text-primary transition-colors">
                          {req.recipientName}
                        </p>
                        <p className="text-[11px] font-medium text-base-content/40 uppercase tracking-tighter">
                          {req.status === 'inprogress'
                            ? `Donor: ${req.donor?.name}`
                            : 'Awaiting Donor'}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-base-content/70">
                        {req.upazila},{' '}
                        <span className="font-semibold">{req.district}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center bg-primary text-primary-content text-xs font-black w-10 h-10 rounded-xl shadow-md shadow-primary/20">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-base-content/70">
                        <div className="font-bold text-base-content">
                          {req.donationDate}
                        </div>
                        <div className="text-xs opacity-60">
                          {req.donationTime}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                            req.status === 'done'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : req.status === 'inprogress'
                              ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                              : req.status === 'canceled'
                              ? 'bg-base-content/10 text-base-content/50 border-base-content/10'
                              : 'bg-primary/10 text-primary border-primary/20'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {req.status === 'inprogress' && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(req._id, 'done')
                                }
                                className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                title="Mark Done"
                              >
                                <FaCheck size={14} />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(req._id, 'canceled')
                                }
                                className="p-2.5 bg-base-content/5 text-base-content/60 rounded-xl hover:bg-base-content hover:text-base-100 transition-all shadow-sm"
                                title="Cancel Request"
                              >
                                <FaTimes size={14} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() =>
                              navigate(`/dashboard/donation-details/${req._id}`)
                            }
                            className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                            title="View"
                          >
                            <FaEye size={14} />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/dashboard/edit-donation/${req._id}`)
                            }
                            className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                            title="Edit"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleRequestDelete(req._id)}
                            className="p-2.5 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                            title="Delete"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center opacity-30">
                        <span className="text-5xl mb-3">📂</span>
                        <p className="font-bold text-xl uppercase tracking-widest">
                          No Requests Found
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Professional Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 text-xs font-black uppercase tracking-widest bg-base-100 text-base-content/60 border border-base-300 rounded-2xl hover:bg-primary hover:text-white disabled:opacity-30 transition-all shadow-sm"
            >
              Prev
            </button>

            <div className="flex items-center gap-2 px-3 py-2 bg-base-300/30 rounded-2xl border border-base-300">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`h-10 w-10 flex items-center justify-center rounded-xl text-xs font-black transition-all ${
                    currentPage === idx + 1
                      ? 'bg-primary text-primary-content shadow-lg shadow-primary/30'
                      : 'text-base-content/40 hover:bg-base-100 hover:text-primary'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-6 py-2 text-xs font-black uppercase tracking-widest bg-base-100 text-base-content/60 border border-base-300 rounded-2xl hover:bg-primary hover:text-white disabled:opacity-30 transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyDonationRequests;
