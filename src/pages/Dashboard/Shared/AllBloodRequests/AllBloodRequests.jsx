import React, { useState } from 'react';
import { FaCheck, FaTimes, FaSpinner, FaTrash } from 'react-icons/fa';
import useUserRole from '../../../../hooks/useUserRole';
import Loading from '../../../../Components/Loading/Loading';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const AllBloodDonationRequests = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const { role, isLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Load all requests
  const { data: allRequests = [], refetch } = useQuery({
    queryKey: ['donationRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donationRequests');
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Pagination setup
  const itemsPerPage = 5;
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

  return (
    <div className="min-h-screen bg-linear-to-b from-red-50 to-white dark:from-[#1a0c0c] dark:to-[#0d0b0b] py-20 px-4 md:px-10 rounded-2xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 dark:text-red-400">
          All Blood Donation Requests 🩸
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 max-w-xl mx-auto">
          {role === 'admin'
            ? "Admin can manage all users' blood donation requests."
            : 'Volunteers can view all requests and update status only.'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['all', 'pending', 'inprogress', 'done', 'canceled'].map(f => (
          <button
            key={f}
            onClick={() => {
              setFilterStatus(f);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 rounded-full font-medium transition ${
              filterStatus === f
                ? 'bg-red-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mx-auto bg-white/90 dark:bg-[#1a1a1a]/80 border border-red-500/10 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-x-auto scrollbar-thin scrollbar-thumb-red-400/60 hover:scrollbar-thumb-red-600 scrollbar-track-transparent">
        <table className="w-full table-fixed border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="py-4 text-center">Recipient</th>
              <th className="py-4 text-center">Location</th>
              <th className="py-4 text-center">Blood</th>
              <th className="py-4 text-center">Date & Time</th>
              <th className="py-4 text-center">Status</th>
              <th className="py-4 text-center">Donor Info</th>
              {(role === 'admin' || role === 'volunteer') && (
                <th className="py-4 text-center">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="text-white">
            {displayedRequests.map(req => (
              <tr
                key={req._id}
                className="hover:bg-red-50/60 dark:hover:bg-red-900/10 border-b border-red-500/10 text-center"
              >
                <td className="py-4 font-semibold text-red-700 dark:text-red-300 wrap-break-word whitespace-normal max-w-[180px]">
                  {req.recipientName}
                </td>

                <td className="py-4 wrap-break-word whitespace-normal max-w-[200px]">
                  {req.district}, {req.upazila}
                </td>

                <td className="py-4">
                  <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold shadow whitespace-nowrap">
                    {req.bloodGroup}
                  </span>
                </td>

                <td className="py-4 whitespace-nowrap">
                  {req.donationDate} ({req.donationTime})
                </td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize whitespace-nowrap ${
                      req.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : req.status === 'inprogress'
                        ? 'bg-blue-100 text-blue-800'
                        : req.status === 'done'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-300 text-red-900 dark:bg-red-500 dark:text-red-100'
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                <td className="py-4 text-gray-700 dark:text-gray-300 wrap-break-word whitespace-normal max-w-[250px]">
                  {req.donor ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-medium">{req.donor.name}</span>
                      <span className="text-xs text-gray-500 font-medium break-all">
                        {req.donor.email}
                      </span>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>

                {(role === 'admin' || role === 'volunteer') && (
                  <td className="py-4">
                    <div className="flex flex-wrap justify-center gap-2 max-w-[200px] mx-auto">
                      {req.status === 'pending' && (
                        <button
                          onClick={() => openModal(req._id)}
                          className="p-2 rounded-full border border-blue-500 bg-blue-600/20 text-white shadow hover:bg-blue-500/50 transition"
                          title="Start Progress"
                        >
                          <FaSpinner />
                        </button>
                      )}

                      {req.status === 'inprogress' && (
                        <button
                          onClick={() => changeStatus(req._id, 'done')}
                          className="p-2 rounded-full border border-green-500 bg-green-500/20 text-white shadow hover:bg-green-500/50 transition"
                          title="Mark Done"
                        >
                          <FaCheck />
                        </button>
                      )}

                      {role === 'admin' &&
                        req.status !== 'done' &&
                        req.status !== 'canceled' && (
                          <button
                            onClick={() => changeStatus(req._id, 'canceled')}
                            className="p-2 rounded-full border border-red-500 bg-red-500/20 text-white shadow hover:bg-red-500/50 transition"
                            title="Cancel Request"
                          >
                            <FaTimes />
                          </button>
                        )}

                      {role === 'admin' && (
                        <button
                          onClick={() => deleteRequest(req._id)}
                          className="p-2 rounded-full border border-red-600 bg-red-600/20 text-white shadow hover:bg-red-600/50 transition"
                          title="Delete Request"
                        >
                          <FaTrash />
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
          <p className="text-center py-10 text-gray-500 dark:text-gray-400">
            No requests found
          </p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-8">
          {/* Prev Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1} // 🔹 Disable on first page
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {idx + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages} // 🔹 Disable on last page
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            Next
          </button>
        </div>
      )}
      {/* Modal for assigning donor */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-[#1a1a1a]/80 backdrop-blur-xl p-8 rounded-3xl max-w-md w-full shadow-lg">
            <h3 className="text-2xl font-bold text-red-700 mb-4">
              Assign Donor
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-semibold text-red-100">
                  Donor Name
                </label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  placeholder="Enter donor name"
                  className="input input-bordered w-full bg-base-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-red-100">
                  Donor Email
                </label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="Enter donor email"
                  className="input input-bordered w-full bg-base-100"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 px-6 py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full mt-2 px-6 py-3 bg-gray-300 text-gray-800 rounded-2xl font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBloodDonationRequests;
