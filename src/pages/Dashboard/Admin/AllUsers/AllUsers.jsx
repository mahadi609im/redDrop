import React, { useState } from 'react';
import { FaEllipsisV, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const [filter, setFilter] = useState('all');

  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const filteredUsers =
    filter === 'all' ? allUsers : allUsers.filter(u => u.status === filter);

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
        refetch(); // ডাটা আবার লোড হবে
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
        await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
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
    <div className="min-h-screen bg-linear-to-b from-red-50 to-white dark:from-[#1a0c0c] dark:to-[#0d0b0b] py-20 px-4 md:px-10 rounded-2xl">
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

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {['all', 'active', 'blocked'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              filter === f
                ? f === 'active'
                  ? 'bg-green-600 text-white'
                  : f === 'blocked'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-500/80 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}Active (
            {allUsers.filter(u => u.status === 'active').length})
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="max-w-6xl mx-auto bg-white/90 dark:bg-[#1a1a1a]/80 border border-red-500/10 rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.08)] overflow-x-auto scrollbar-thin scrollbar-thumb-red-400/60 hover:scrollbar-thumb-red-600 scrollbar-track-transparent">
        <table className="w-full table-fixed border-collapse rounded-2xl overflow-hidden min-w-[800px]">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="w-[10%] py-4 text-center font-semibold">Avatar</th>
              <th className="w-[18%] py-4 text-center font-semibold">Name</th>
              <th className="w-[28%] py-4 text-center font-semibold">Email</th>
              <th className="w-[12%] py-4 text-center font-semibold">Role</th>
              <th className="w-[12%] py-4 text-center font-semibold">Status</th>
              <th className="w-[20%] py-4 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-[#111]">
            {filteredUsers.map(user => (
              <tr
                key={user._id}
                className="hover:bg-red-50/60 dark:hover:bg-red-900/20 transition-all border-b border-red-500/10"
              >
                {/* Avatar */}
                <td className="py-4 w-[10%]">
                  <div className="flex justify-center">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-red-500/30"
                    />
                  </div>
                </td>

                {/* Name */}
                <td className="py-4 w-[18%] text-center font-semibold text-red-700 dark:text-red-300">
                  {user.displayName}
                </td>

                {/* Email */}
                <td className="py-4 w-[28%] text-center text-gray-700 dark:text-gray-300 break-all">
                  {user.email}
                </td>

                {/* Role */}
                <td className="py-4 w-[12%] text-center capitalize text-red-500 font-medium">
                  {user.role}
                </td>

                {/* Status */}
                <td className="py-4 w-[12%] text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-300 text-red-900 dark:bg-red-700 dark:text-red-200'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 w-[20%]">
                  <div className="flex items-center justify-center gap-3">
                    {/* Admin হলে শুধু “Make Volunteer” */}
                    {user.role === 'admin' ? (
                      user.status === 'active' && (
                        <button
                          onClick={() => changeRole(user._id, 'volunteer')}
                          className="p-2 rounded-full border border-yellow-400 bg-yellow-500/20 text-white shadow hover:bg-yellow-500/50 transition"
                          title="Make Volunteer"
                        >
                          🌟
                        </button>
                      )
                    ) : (
                      <>
                        {/* Block / Unblock */}
                        {user.status === 'active' ? (
                          <button
                            onClick={() => toggleBlock(user._id, user.status)}
                            className="p-2 rounded-full border border-red-500 bg-red-500/20 text-white shadow hover:bg-red-500/50 transition"
                            title="Block User"
                          >
                            🚫
                          </button>
                        ) : (
                          <button
                            onClick={() => toggleBlock(user._id, user.status)}
                            className="p-2 rounded-full border border-green-500 bg-green-500/20 text-white shadow hover:bg-green-500/50 transition"
                            title="Unblock User"
                          >
                            ✅
                          </button>
                        )}

                        {/* Donor → Make Volunteer */}
                        {user.role === 'donor' && user.status === 'active' && (
                          <button
                            onClick={() => changeRole(user._id, 'volunteer')}
                            className="p-2 rounded-full border border-yellow-400 bg-yellow-500/20 text-white shadow hover:bg-yellow-500/50 transition"
                            title="Make Volunteer"
                          >
                            🌟
                          </button>
                        )}

                        {/* Donor বা Volunteer → Make Admin */}
                        {(user.role === 'donor' || user.role === 'volunteer') &&
                          user.status === 'active' && (
                            <button
                              onClick={() => changeRole(user._id, 'admin')}
                              className="p-2 rounded-full border border-blue-500 bg-blue-600/20 text-white shadow hover:bg-blue-500/50 transition"
                              title="Make Admin"
                            >
                              👑
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
      </div>
    </div>
  );
};

export default AllUsers;
