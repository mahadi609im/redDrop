import React, { use, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaCheck, FaTimes, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { AuthContext } from '../../../../context/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../../Components/Loading/Loading';
import LoadingSpin from '../../../../Components/Loading/LoadingSpin';

const MyDonationRequests = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');

  const { user } = useContext(AuthContext);
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

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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
          console.log(res.data);
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
    try {
      const res = await axiosSecure.patch(`/donationRequests/${id}/status`, {
        status: newStatus,
      });
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire('Updated!', `Status changed to ${newStatus}`, 'success');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Something went wrong', 'error');
    }
  };

  const { loading } = use(AuthContext);

  return (
    <section className="min-h-screen bg-red-50 py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700">
          My Donation Requests 🩸
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto mt-3">
          Here you can see all of your donation requests.
        </p>
      </div>

      {/* Filter */}
      <div className="w-full max-w-7xl mx-auto flex justify-end gap-3 mb-4">
        <select
          className="border border-red-500 rounded-md px-3 py-2 text-gray-700 focus:outline-none"
          value={filterStatus}
          onChange={e => {
            setFilterStatus(e.target.value);
            setCurrentPage(1); // filter change e page reset
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="w-full max-w-7xl mx-auto overflow-x-auto bg-white border border-red-500/20 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)]">
        {loading || isLoading ? (
          <LoadingSpin></LoadingSpin>
        ) : (
          <>
            {displayedRequests.length > 0 ? (
              <table className="min-w-auto md:min-w-full table-auto text-sm">
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
                  {displayedRequests.map(req => (
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
                        {req.status === 'done' ? (
                          <span className="px-2 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 capitalize">
                            {req.status}
                          </span>
                        ) : req.status === 'inprogress' ? (
                          <span className="px-2 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 capitalize">
                            {req.status}
                          </span>
                        ) : req.status === 'cancel' ? (
                          <span className="px-2 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800 capitalize">
                            {req.status}
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-500 capitalize">
                            {req.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {req.status === 'inprogress'
                          ? `${req.donor?.name} (${req.donor?.email})`
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

                        {/* Delete */}
                        <button
                          onClick={() => handleRequestDelete(req._id)}
                          className="p-2 rounded-full border border-red-600 bg-red-600/30 text-red-500 shadow hover:bg-red-600/50 transition"
                          title="Delete Request"
                        >
                          <FaTrash />
                        </button>

                        {/* View */}
                        <button
                          onClick={() =>
                            navigate(`/dashboard/donation-details/${req._id}`)
                          }
                          className="p-2 rounded-full border border-blue-600 bg-blue-600/30 text-blue-700 shadow hover:bg-blue-600/50 transition"
                          title="View Details"
                        >
                          <FaEye />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate(`/dashboard/edit-donation/${req._id}`)
                          }
                          className="p-2 rounded-full border border-yellow-600 bg-yellow-600/30 text-yellow-600 shadow hover:bg-yellow-600/50 transition"
                          title="Edit Request"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-4 py-12 text-center text-gray-500 font-semibold">
                No donation requests found.
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 p-4">
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
          </>
        )}
      </div>
    </section>
  );
};

export default MyDonationRequests;
