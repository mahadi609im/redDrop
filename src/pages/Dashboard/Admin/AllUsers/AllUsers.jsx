import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  FaUsers,
  FaCrown,
  FaShieldAlt,
  FaBan,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaTint,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from 'react-icons/fa';

import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpin from '../../../../Components/Loading/LoadingSpin';

const AllUsers = () => {
  const [filter, setFilter] = useState('all');
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

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // --- Handlers ---
  const toggleBlock = async (id, currentStatus) => {
    const action = currentStatus === 'active' ? 'Block' : 'Unblock';
    const result = await Swal.fire({
      title: `<span style="font-family: 'Plus Jakarta Sans', sans-serif;">${action} User?</span>`,
      text: `This user will ${
        currentStatus === 'active' ? 'lose' : 'regain'
      } access to the platform.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: `Yes, ${action}`,
      background: document.documentElement.classList.contains('dark')
        ? '#1a0f0f'
        : '#fff',
      color: document.documentElement.classList.contains('dark')
        ? '#f5f5f5'
        : '#1a1a1a',
    });

    if (result.isConfirmed) {
      try {
        const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
        await axiosSecure.patch(`/users/status/${id}`, { status: newStatus });
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      } catch (err) {
        Swal.fire('Error', 'Update failed', 'error');
      }
    }
  };

  const changeRole = async (id, newRole) => {
    const result = await Swal.fire({
      title: 'Update Permissions?',
      text: `Promote/Demote user to ${newRole}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Update Role',
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${id}/role`, { role: newRole });
        Swal.fire({
          icon: 'success',
          title: 'Role Changed',
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      } catch (err) {
        Swal.fire('Error', 'Update failed', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200/50 dark:bg-base-100 py-12 px-4 md:px-10">
      {/* --- Executive Header --- */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <FaUsers className="text-3xl text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-base-content">
                User <span className="text-primary text-stroke">Directory</span>
              </h1>
            </div>
            <p className="text-base-content/60 font-medium ml-1">
              Real-time management of {allUsers.length} active platform members.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-base-300/40 p-1.5 rounded-2xl backdrop-blur-md">
            {['all', 'admin', 'volunteer', 'active', 'blocked'].map(f => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === f
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                    : 'hover:bg-base-300 text-base-content/70'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpin />
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* --- Table Glass Card --- */}
          <div className="bg-base-100 dark:bg-base-200 border border-base-300 dark:border-white/5 rounded-[2rem] shadow-2xl shadow-primary/5 overflow-hidden transition-all">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-base-300/30 dark:bg-white/5 border-b border-base-300 dark:border-white/5">
                    <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-base-content/50">
                      Member
                    </th>
                    <th className="px-6 py-5 text-center text-[11px] font-black uppercase tracking-[0.2em] text-base-content/50">
                      Geography
                    </th>
                    <th className="px-6 py-5 text-center text-[11px] font-black uppercase tracking-[0.2em] text-base-content/50">
                      Blood
                    </th>
                    <th className="px-6 py-5 text-center text-[11px] font-black uppercase tracking-[0.2em] text-base-content/50">
                      Level
                    </th>
                    <th className="px-6 py-5 text-center text-[11px] font-black uppercase tracking-[0.2em] text-base-content/50">
                      Status
                    </th>
                    <th className="px-6 py-5 text-right text-[11px] font-black uppercase tracking-[0.2em] text-base-content/50">
                      Control
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300 dark:divide-white/5">
                  {displayedUsers.map(user => (
                    <tr
                      key={user._id}
                      className="group hover:bg-primary/[0.02] transition-colors"
                    >
                      {/* Member Column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={
                                user.photoURL ||
                                'https://i.ibb.co/v3m6VfP/user.png'
                              }
                              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-base-300 dark:ring-white/10"
                              alt=""
                            />
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-base-100 ${
                                user.status === 'active'
                                  ? 'bg-green-500'
                                  : 'bg-red-500'
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-base-content leading-none mb-1">
                              {user.displayName || 'Anonymous'}
                            </p>
                            <p className="text-xs text-base-content/40 font-medium">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-5 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="flex items-center gap-1 text-xs font-bold text-base-content/80">
                            <FaMapMarkerAlt className="text-primary/60" />{' '}
                            {user.district}
                          </span>
                          <span className="text-[10px] uppercase font-black text-base-content/30 tracking-tighter">
                            {user.upazila}
                          </span>
                        </div>
                      </td>

                      {/* Blood Group */}
                      <td className="px-6 py-5 text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-black text-sm border border-primary/20">
                          {user.bloodGroup}
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                            user.role === 'admin'
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              : user.role === 'volunteer'
                              ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                              : 'bg-base-content/5 text-base-content/40 border-base-content/10'
                          }`}
                        >
                          {user.role === 'admin' ? (
                            <FaCrown />
                          ) : (
                            <FaShieldAlt />
                          )}
                          {user.role}
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => toggleBlock(user._id, user.status)}
                          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border ${
                            user.status === 'active'
                              ? 'text-green-500 bg-green-500/5 border-green-500/20 hover:bg-green-500 hover:text-white'
                              : 'text-red-500 bg-red-500/5 border-red-500/20 hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          {user.status}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          {/* Admin & Volunteer Logic */}
                          {user.role !== 'admin' && (
                            <ActionButton
                              color="amber"
                              icon={<FaCrown />}
                              onClick={() => changeRole(user._id, 'admin')}
                              tip="Make Admin"
                            />
                          )}
                          {user.role !== 'volunteer' && (
                            <ActionButton
                              color="blue"
                              icon={<FaShieldAlt />}
                              onClick={() => changeRole(user._id, 'volunteer')}
                              tip="Make Volunteer"
                            />
                          )}
                          <ActionButton
                            color="red"
                            icon={
                              user.status === 'active' ? (
                                <FaBan />
                              ) : (
                                <FaCheckCircle />
                              )
                            }
                            onClick={() => toggleBlock(user._id, user.status)}
                            tip={user.status === 'active' ? 'Block' : 'Unblock'}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!displayedUsers.length && (
              <div className="py-24 text-center">
                <FaSearch className="mx-auto text-5xl text-base-content/10 mb-4" />
                <h3 className="text-xl font-black text-base-content/20 uppercase tracking-[0.3em]">
                  No Match Found
                </h3>
              </div>
            )}
          </div>

          {/* --- Minimalist Pagination --- */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm font-bold text-base-content/30 uppercase tracking-widest">
              Page {currentPage} of {totalPages || 1}
            </p>

            <div className="flex bg-base-300/30 p-1.5 rounded-2xl gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-3 rounded-xl hover:bg-primary hover:text-white disabled:opacity-20 text-base-content/60 transition-all"
              >
                <FaChevronLeft />
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                      currentPage === i + 1
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'hover:bg-base-300 text-base-content/40'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-3 rounded-xl hover:bg-primary hover:text-white disabled:opacity-20 text-base-content/60 transition-all"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helper Components ---
const ActionButton = ({ icon, onClick, color, tip }) => {
  const styles = {
    amber:
      'text-amber-500 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500',
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500',
    red: 'text-red-500 bg-red-500/10 border-red-500/20 hover:bg-red-500',
  };

  return (
    <div className="tooltip tooltip-primary font-bold" data-tip={tip}>
      <button
        onClick={onClick}
        className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-300 hover:text-white active:scale-90 ${styles[color]}`}
      >
        {icon}
      </button>
    </div>
  );
};

export default AllUsers;
