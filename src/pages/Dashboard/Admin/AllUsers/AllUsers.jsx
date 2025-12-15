import React, { useState } from 'react';
import { FaEllipsisV, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpin from '../../../../Components/Loading/LoadingSpin';

const AllUsers = () => {
  const [filter, setFilter] = useState('all');

  // ✅ Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const filteredUsers = allUsers.filter(user => {
    if (filter === 'all') return true;
    if (filter === 'admin') return user.role === 'admin';
    if (filter === 'volunteer') return user.role === 'volunteer';
    if (filter === 'active') return user.status === 'active';
    if (filter === 'blocked') return user.status === 'blocked';
    return true;
  });

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const toggleBlock = async (id, currentStatus) => {
    const action = currentStatus === 'active' ? 'Block' : 'Unblock';
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are going to ${action} this user!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (result.isConfirmed) {
      try {
        const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
        await axiosSecure.patch(`/users/status/${id}`, { status: newStatus });
        Swal.fire('Success!', `User has been ${action}ed.`, 'success');
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Something went wrong!', 'error');
      }
    }
  };

  const changeRole = async (id, newRole) => {
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are going to change this user role to "${newRole}"!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, change it!`,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${id}/role`, { role: newRole });
        Swal.fire(
          'Success!',
          `User role has been changed to "${newRole}".`,
          'success'
        );
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Something went wrong!', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-red-50 to-white dark:from-[#1a0c0c] dark:to-[#0d0b0b] py-20 px-4 md:px-10 rounded-2xl w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 dark:text-red-400 flex justify-center items-center gap-2">
          All Users
          <FaUsers></FaUsers>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 max-w-xl mx-auto">
          Manage platform users and their roles/status.
        </p>
      </div>

      {isLoading ? (
        <LoadingSpin></LoadingSpin>
      ) : (
        <>
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['all', 'admin', 'volunteer', 'active', 'blocked'].map(f => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setCurrentPage(1); // Filter change করলে page reset
                }}
                className={`px-4 py-2 rounded-full font-medium transition 
        ${
          filter === f
            ? f === 'active'
              ? 'bg-green-600 text-white'
              : f === 'blocked'
              ? 'bg-red-600 text-white'
              : f === 'admin'
              ? 'bg-blue-600 text-white'
              : f === 'volunteer'
              ? 'bg-yellow-600 text-white'
              : 'bg-red-500/80 text-white'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Users Table */}
          <div className="w-full mx-auto bg-white/90 dark:bg-[#1a1a1a]/80 border border-red-500/10 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-x-auto scrollbar-thin scrollbar-thumb-red-400/60 hover:scrollbar-thumb-red-600 scrollbar-track-transparent">
            {displayedUsers.length > 0 ? (
              <table className="w-full table-auto border-collapse overflow-hidden">
                <thead>
                  <tr className="bg-red-600 text-white text-sm md:text-base">
                    <th className="py-3 px-2 text-center font-semibold min-w-[50px]">
                      Avatar
                    </th>
                    <th className="py-3 px-2 text-center font-semibold min-w-[120px]">
                      Name
                    </th>
                    <th className="py-3 px-2 text-center font-semibold min-w-[180px]">
                      Email
                    </th>
                    <th className="py-3 px-2 text-center font-semibold min-w-[120px]">
                      Location
                    </th>
                    <th className="py-3 px-2 text-center font-semibold min-w-[100px]">
                      Blood
                    </th>
                    <th className="py-3 px-2 text-center font-semibold min-w-[90px]">
                      Role
                    </th>
                    <th className="py-3 px-2 text-center font-semibold min-w-[90px]">
                      Status
                    </th>
                    <th className="py-3 px-2 text-center font-semibold min-w-[120px]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white dark:bg-[#111] text-xs md:text-sm">
                  {displayedUsers.map(user => (
                    <tr
                      key={user._id}
                      className="hover:bg-red-50/60 dark:hover:bg-red-900/20 transition-all border-b border-red-500/10"
                    >
                      {/* Avatar */}
                      <td className="py-2 px-1 flex justify-center">
                        <img
                          src={user.photoURL || '/default-avatar.png'}
                          alt={user.displayName}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-red-500/30"
                        />
                      </td>

                      {/* Name */}
                      <td className="py-2 px-2 text-center font-semibold text-red-700 dark:text-red-300 truncate max-w-[120px]">
                        {user.displayName || '-'}
                      </td>

                      {/* Email */}
                      <td className="py-2 px-2 text-center text-gray-700 dark:text-gray-300 truncate max-w-[180px]">
                        {user.email}
                      </td>

                      {/* Location */}
                      <td className="py-2 px-2 text-center capitalize text-gray-300 font-medium truncate max-w-[120px]">
                        {user.district || '-'} | {user.upazila || '-'}
                      </td>

                      {/* Blood Group */}
                      <td className="py-2 px-2 text-center">
                        <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-semibold shadow">
                          {user.bloodGroup || '-'}
                        </span>
                      </td>

                      {/* Role */}
                      <td className="py-2 px-2 text-center capitalize text-red-500 font-medium">
                        {user.role || '-'}
                      </td>

                      {/* Status */}
                      <td className="py-2 px-2 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs md:text-sm font-medium capitalize ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-300 text-red-900 dark:bg-red-700 dark:text-red-200'
                          }`}
                        >
                          {user.status || '-'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-1 px-1">
                        <div className="flex items-center justify-center gap-2">
                          {user.role === 'admin' &&
                            user.status === 'active' && (
                              <>
                                <button
                                  onClick={() =>
                                    changeRole(user._id, 'volunteer')
                                  }
                                  className="p-1.5 rounded-full border border-yellow-400 bg-yellow-500/20 text-white shadow hover:bg-yellow-500/50 transition text-base"
                                  title="Make Volunteer"
                                >
                                  🌟
                                </button>
                                <button
                                  onClick={() => changeRole(user._id, 'donor')}
                                  className="p-1.5 rounded-full border border-purple-500 bg-purple-500/20 text-white shadow hover:bg-purple-500/50 transition text-base"
                                  title="Make Donor"
                                >
                                  🔄
                                </button>
                              </>
                            )}

                          {user.role === 'donor' && (
                            <>
                              {user.status === 'active' ? (
                                <button
                                  onClick={() =>
                                    toggleBlock(user._id, user.status)
                                  }
                                  className="p-1.5 rounded-full border border-red-500 bg-red-500/20 text-white shadow hover:bg-red-500/50 transition text-base"
                                  title="Block User"
                                >
                                  🚫
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    toggleBlock(user._id, user.status)
                                  }
                                  className="p-1.5 rounded-full border border-green-500 bg-green-500/20 text-white shadow hover:bg-green-500/50 transition text-base"
                                  title="Unblock User"
                                >
                                  ✅
                                </button>
                              )}
                            </>
                          )}

                          {/* Non-admin actions */}
                          {user.role !== 'admin' && (
                            <>
                              {user.role === 'donor' &&
                                user.status === 'active' && (
                                  <button
                                    onClick={() =>
                                      changeRole(user._id, 'volunteer')
                                    }
                                    className="p-1.5 rounded-full border border-yellow-400 bg-yellow-500/20 text-white shadow hover:bg-yellow-500/50 transition text-base"
                                    title="Make Volunteer"
                                  >
                                    🌟
                                  </button>
                                )}

                              {(user.role === 'donor' ||
                                user.role === 'volunteer') &&
                                user.status === 'active' && (
                                  <button
                                    onClick={() =>
                                      changeRole(user._id, 'admin')
                                    }
                                    className="p-1.5 rounded-full border border-blue-500 bg-blue-600/20 text-white shadow hover:bg-blue-500/50 transition text-base"
                                    title="Make Admin"
                                  >
                                    👑
                                  </button>
                                )}

                              {user.role === 'volunteer' &&
                                user.status === 'active' && (
                                  <button
                                    onClick={() =>
                                      changeRole(user._id, 'donor')
                                    }
                                    className="p-1.5 rounded-full border border-purple-500 bg-purple-500/20 text-white shadow hover:bg-purple-500/50 transition text-base"
                                    title="Make Donor"
                                  >
                                    🔄
                                  </button>
                                )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-14">
                <h3 className="text-red-600 dark:text-red-400 font-semibold text-xl md:text-2xl tracking-wide">
                  No users found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}
          </div>

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
  );
};

export default AllUsers;
