import React, { useState } from 'react';
import { FaCheck, FaTimes, FaSpinner, FaTrash } from 'react-icons/fa';
import useUserRole from '../../../../hooks/useUserRole';
import Loading from '../../../../Components/Loading/Loading';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const AllBloodDonationRequests = () => {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);

  const { role, isLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  // React Query for fetching all requests
  const { data: allRequests = [], refetch } = useQuery({
    queryKey: ['donationRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donationRequests');
      return res.data;
    },
  });
  const { register, handleSubmit, reset } = useForm();

  if (isLoading) return <Loading />;

  const filteredRequests =
    filter === 'all'
      ? allRequests
      : allRequests.filter(r => r.status === filter);

  // React Hook Form

  const openModal = id => {
    setCurrentRequestId(id);
    setShowModal(true);
    reset(); // reset form fields
  };

  const onSubmit = async data => {
    try {
      await axiosSecure.patch(`/donationRequests/${currentRequestId}/status`, {
        status: 'inprogress',
        donor: { name: data.name, email: data.email },
      });
      Swal.fire('Success!', 'Status updated and donor info saved', 'success');
      setShowModal(false);
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to update', 'error');
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/donationRequests/${id}/status`, { status });
      Swal.fire('Success!', `Request status updated to "${status}"`, 'success');
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to update status', 'error');
    }
  };

  const deleteRequest = async id => {
    if (role !== 'admin') return;
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This request will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/donationRequests/${id}`);
        Swal.fire('Deleted!', 'Request has been deleted.', 'success');
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Failed to delete request', 'error');
      }
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
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              filter === f
                ? 'bg-red-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto bg-white/90 dark:bg-[#1a1a1a]/80 border border-red-500/10 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-x-auto scrollbar-thin scrollbar-thumb-red-400/60 hover:scrollbar-thumb-red-600 scrollbar-track-transparent">
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
            {filteredRequests.map(req => (
              <tr
                key={req.id}
                className="hover:bg-red-50/60 dark:hover:bg-red-900/10 border-b border-red-500/10 text-center"
              >
                <td className="py-4 font-semibold text-red-700 dark:text-red-300">
                  {req.recipientName}
                </td>
                <td className="py-4">
                  {req.district}, {req.upazila}
                </td>
                <td>
                  <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold shadow">
                    {req.bloodGroup}
                  </span>
                </td>
                <td className="py-4">
                  {req.donationDate} ({req.donationTime})
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
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
                <td className="py-4 text-gray-700 dark:text-gray-300">
                  {req.donor ? `${req.donor.name} (${req.donor.email})` : '-'}
                </td>

                {/* Actions */}
                {(role === 'admin' || role === 'volunteer') && (
                  <td className="py-4 flex justify-center gap-2 flex-wrap">
                    {req.status === 'pending' && (
                      <button
                        onClick={() => openModal(req.id)}
                        className="p-2 rounded-full border border-blue-500 bg-blue-600/20 text-white shadow hover:bg-blue-500/50 transition"
                        title="Start Progress"
                      >
                        <FaSpinner />
                      </button>
                    )}
                    {req.status === 'inprogress' && (
                      <button
                        onClick={() => changeStatus(req.id, 'done')}
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
                          onClick={() => changeStatus(req.id, 'canceled')}
                          className="p-2 rounded-full border border-red-500 bg-red-500/20 text-white shadow hover:bg-red-500/50 transition"
                          title="Cancel Request"
                        >
                          <FaTimes />
                        </button>
                      )}
                    {role === 'admin' && (
                      <button
                        onClick={() => deleteRequest(req.id)}
                        className="p-2 rounded-full border border-red-600 bg-red-600/20 text-white shadow hover:bg-red-600/50 transition"
                        title="Delete Request"
                      >
                        <FaTrash />
                      </button>
                    )}
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
