import React, { useState } from 'react';
import { FaCheck, FaTimes, FaSpinner, FaTrash } from 'react-icons/fa';
import useUserRole from '../../../../hooks/useUserRole';
import Loading from '../../../../Components/Loading/Loading';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import LoadingSpin from '../../../../Components/Loading/LoadingSpin';

const AllBloodDonationRequests = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const { role, isLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Load all requests
  const {
    data: allRequests = [],
    refetch,
    isLoading: loadData,
  } = useQuery({
    queryKey: ['donationRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donationRequests');
      return res.data;
    },
  });

  // Pagination setup
  const itemsPerPage = 10;
  const filteredRequests =
    filterStatus === 'all'
      ? allRequests
      : allRequests.filter(r => r.status === filterStatus);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const displayedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Open modal
  const openModal = id => {
    setCurrentRequestId(id);
    setShowModal(true);
    reset();
  };

  // ✅ Submit donor info from modal (with confirm)
  const onSubmit = async data => {
    const confirm = await Swal.fire({
      title: 'Confirm Donor Assignment?',
      text: 'Do you want to assign this donor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, assign',
      cancelButtonText: 'Cancel',
      background: 'var(--color-base-100)',
      color: 'var(--color-base-content)',
      confirmButtonColor: '#ef4444',
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/donationRequests/${currentRequestId}/status`, {
        status: 'inprogress',
        donor: {
          name: data.name,
          email: data.email,
        },
      });

      Swal.fire('Success', 'Donor assigned & status updated', 'success');
      setShowModal(false);
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  // ✅ Change status (done / canceled / inprogress) with confirm
  const changeStatus = async (id, status) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change status to "${status}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'Cancel',
      background: 'var(--color-base-100)',
      color: 'var(--color-base-content)',
      confirmButtonColor: '#ef4444',
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/donationRequests/${id}/status`, { status });
      Swal.fire('Updated', `Status changed to ${status}`, 'success');
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  // ✅ Delete request with confirm (admin only)
  const deleteRequest = async id => {
    if (role !== 'admin') return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the request!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: 'var(--color-base-100)',
      color: 'var(--color-base-content)',
      confirmButtonColor: '#ef4444',
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/donationRequests/${id}`);
      Swal.fire('Deleted!', 'Request deleted successfully', 'success');
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Delete failed', 'error');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-12 px-4 md:px-10 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-base-200 rounded-[2.5rem] p-8 border border-base-300 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tight">
              REQUEST <span className="text-primary">PIPELINE</span> 🩸
            </h1>
            <p className="text-base-content/60 mt-2 font-medium">
              {role === 'admin'
                ? 'Admin Control: Monitor all donation activities.'
                : 'Volunteer View: Review and update donation statuses.'}
            </p>
          </div>

          {/* Filters - Modern Pill Style */}
          <div className="flex flex-wrap justify-center gap-2 bg-base-300/50 p-2 rounded-3xl">
            {['all', 'pending', 'inprogress', 'done', 'canceled'].map(f => (
              <button
                key={f}
                onClick={() => {
                  setFilterStatus(f);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filterStatus === f
                    ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 scale-105'
                    : 'text-base-content/70 hover:bg-base-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loadData ? (
        <LoadingSpin />
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Table Container */}
          <div className="bg-base-200 rounded-[2.5rem] border border-base-300 overflow-hidden shadow-2xl shadow-black/5">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
              <table className="w-full table-fixed border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-base-300/30 border-b border-base-300">
                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest opacity-50 text-center">
                      Recipient
                    </th>
                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest opacity-50 text-center">
                      Location
                    </th>
                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest opacity-50 text-center">
                      Group
                    </th>
                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest opacity-50 text-center">
                      Schedule
                    </th>
                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest opacity-50 text-center">
                      Status
                    </th>
                    <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest opacity-50 text-center">
                      Donor Mapping
                    </th>
                    {(role === 'admin' || role === 'volunteer') && (
                      <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest opacity-50 text-right pr-10">
                        Control
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-base-300/50">
                  {displayedRequests.map(req => (
                    <tr
                      key={req._id}
                      className="hover:bg-base-300/20 transition-colors"
                    >
                      <td className="px-6 py-6 text-center">
                        <span className="font-bold text-base-content block truncate px-2">
                          {req.recipientName}
                        </span>
                      </td>

                      <td className="px-6 py-6 text-center">
                        <span className="text-sm opacity-70">
                          {req.district}, {req.upazila}
                        </span>
                      </td>

                      <td className="px-6 py-6 text-center">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-black border border-primary/20">
                          {req.bloodGroup}
                        </span>
                      </td>

                      <td className="px-6 py-6 text-center">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">
                            {req.donationDate}
                          </span>
                          <span className="text-[10px] opacity-50">
                            {req.donationTime}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-6 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            req.status === 'pending'
                              ? 'bg-yellow-500/10 text-yellow-600'
                              : req.status === 'inprogress'
                              ? 'bg-blue-500/10 text-blue-600'
                              : req.status === 'done'
                              ? 'bg-emerald-500/10 text-emerald-600'
                              : 'bg-rose-500/10 text-rose-600'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>

                      <td className="px-6 py-6 text-center">
                        {req.donor ? (
                          <div className="flex flex-col">
                            <span className="text-xs font-bold truncate">
                              {req.donor.name}
                            </span>
                            <span className="text-[10px] opacity-50 truncate max-w-[150px] mx-auto">
                              {req.donor.email}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs opacity-30 italic">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {(role === 'admin' || role === 'volunteer') && (
                        <td className="px-6 py-6 text-right pr-10">
                          <div className="flex justify-end items-center gap-3">
                            {/* Start Progress - Fixed Square */}
                            {req.status === 'pending' && (
                              <button
                                onClick={() => openModal(req._id)}
                                className="group relative flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20 transition-all duration-300 hover:bg-blue-600 hover:text-white active:scale-95"
                                title="Start Progress"
                              >
                                <FaSpinner className="text-sm animate-[spin_3s_linear_infinite]" />
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-base-content text-base-100 text-[10px] px-2 py-1 rounded font-bold z-10">
                                  PROGRESS
                                </span>
                              </button>
                            )}

                            {/* Mark Done - Fixed Square */}
                            {req.status === 'inprogress' && (
                              <button
                                onClick={() => changeStatus(req._id, 'done')}
                                className="group relative flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 transition-all duration-300 hover:bg-emerald-600 hover:text-white active:scale-95"
                                title="Mark Done"
                              >
                                <FaCheck className="text-sm" />
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-base-content text-base-100 text-[10px] px-2 py-1 rounded font-bold z-10">
                                  DONE
                                </span>
                              </button>
                            )}

                            {/* Cancel Request - Fixed Square (Admin Only) */}
                            {role === 'admin' &&
                              req.status !== 'done' &&
                              req.status !== 'canceled' && (
                                <button
                                  onClick={() =>
                                    changeStatus(req._id, 'canceled')
                                  }
                                  className="group relative flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 transition-all duration-300 hover:bg-amber-600 hover:text-white active:scale-95"
                                  title="Cancel Request"
                                >
                                  <FaTimes className="text-sm" />
                                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-base-content text-base-100 text-[10px] px-2 py-1 rounded font-bold z-10">
                                    CANCEL
                                  </span>
                                </button>
                              )}

                            {/* Delete Request - Fixed Square (Admin Only) */}
                            {role === 'admin' && (
                              <button
                                onClick={() => deleteRequest(req._id)}
                                className="group relative flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20 transition-all duration-300 hover:bg-rose-600 hover:text-white active:scale-95"
                                title="Delete Request"
                              >
                                <FaTrash className="text-sm" />
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-base-content text-base-100 text-[10px] px-2 py-1 rounded font-bold z-10">
                                  DELETE
                                </span>
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRequests.length === 0 && (
                <div className="text-center py-20">
                  <p className="opacity-40 font-medium">
                    No donation requests found in this category.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination - Modern Join Style */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-ghost btn-md rounded-2xl bg-base-200 border border-base-300 disabled:opacity-30"
              >
                Prev
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                      currentPage === idx + 1
                        ? 'bg-primary text-primary-content shadow-lg shadow-primary/30'
                        : 'bg-base-200 border border-base-300 hover:bg-base-300'
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
                className="btn btn-ghost btn-md rounded-2xl bg-base-200 border border-base-300 disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modern Modal - Glassmorphism */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-[100] p-4">
          <div className="bg-base-100 p-8 rounded-[3rem] max-w-md w-full shadow-2xl border border-base-300 animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaSpinner className="text-2xl animate-spin" />
              </div>
              <h3 className="text-2xl font-black italic text-base-content">
                ASSIGN DONOR
              </h3>
              <p className="text-sm opacity-50 mt-1">
                Enter volunteer details to initiate progress
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="form-control">
                <label className="label uppercase text-[10px] font-black tracking-widest opacity-40">
                  Donor Full Name
                </label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  placeholder="e.g. John Doe"
                  className="input input-bordered w-full bg-base-200 rounded-2xl border-base-300 focus:border-primary outline-none"
                />
              </div>
              <div className="form-control">
                <label className="label uppercase text-[10px] font-black tracking-widest opacity-40">
                  Email Address
                </label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full bg-base-200 rounded-2xl border-base-300 focus:border-primary outline-none"
                />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-content rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  CONFIRM & ASSIGN
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full py-4 bg-base-300 text-base-content rounded-2xl font-bold hover:bg-base-300/80 transition-all"
                >
                  GO BACK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBloodDonationRequests;
