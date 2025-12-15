import { Link, NavLink, Outlet } from 'react-router';
import { FaHome, FaUsers } from 'react-icons/fa';
import { BiSolidDonateHeart } from 'react-icons/bi';
import logo from '../../assets/blood-logo.png';
import { PiMapPinPlusFill } from 'react-icons/pi';
import { LuDroplets } from 'react-icons/lu';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../../Components/Loading/Loading';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const DashBoardLayout = () => {
  const { role, isLoading, statusData, statusLoading } = useUserRole();
  const { user, logoutUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔆 Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    return logoutUser()
      .then(() => {})
      .catch(() => {
        toast.error('Failed to logout. Try again.');
      });
  };

  const { loading } = useContext(AuthContext);
  if (loading || isLoading || statusLoading) {
    return <Loading></Loading>;
  }

  const links = (
    <>
      {/* Logo */}
      <li>
        <NavLink
          to="/"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center transition-all duration-300 hover:shadow-sm"
        >
          <div className="flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="RedDrop Logo"
              className="w-8 h-8 object-contain"
            />
          </div>

          <span className="is-drawer-close:hidden ml-3 text-xl text-red-700 font-semibold tracking-wide">
            RedDrop
          </span>
        </NavLink>
      </li>

      {/* Logo */}
      <li>
        <NavLink
          to="/"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex md:hidden items-center transition-all duration-300 hover:shadow-sm"
        >
          <div className="flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="RedDrop Logo"
              className="w-6 h-6 object-contain"
            />
          </div>

          <span className="is-drawer-close:hidden text-base text-red-700 font-bold tracking-wide">
            RedDrop
          </span>
        </NavLink>
      </li>

      {/* Dashboard Home (Common) */}
      <li>
        <NavLink
          to="/dashboard"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center"
          data-tip="Dashboard Home"
        >
          <FaHome className="my-1.5 inline-block size-4 font-bold text-red-600" />
          <span className="is-drawer-close:hidden ml-2 text-red-700 font-medium">
            Dashboard Home
          </span>
        </NavLink>
      </li>
      {statusData === 'active' && (
        <>
          <li>
            <NavLink
              to="/dashboard/create-donation-request"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center"
              data-tip="Create Donation"
            >
              <PiMapPinPlusFill className="my-1.5 inline-block size-5 font-bold text-red-600 -rotate-180" />
              <span className="is-drawer-close:hidden ml-2 text-red-700 font-medium">
                Create Donation
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-donation-requests"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center"
              data-tip="My Donations"
            >
              <BiSolidDonateHeart className="my-1.5 inline-block size-5 font-bold text-red-600" />
              <span className="is-drawer-close:hidden ml-2 text-red-700 font-medium">
                My Donations
              </span>
            </NavLink>
          </li>
        </>
      )}

      {/* Admin Links */}
      {role === 'admin' && (
        <>
          <li>
            <NavLink
              to="/dashboard/all-users"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center"
              data-tip="All Users"
            >
              <FaUsers className="my-1.5 inline-block size-5 font-bold text-red-600" />
              <span className="is-drawer-close:hidden ml-2 text-red-700 font-medium">
                All Users
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-blood-requests"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center"
              data-tip="All Blood Donation"
            >
              <LuDroplets className="my-1.5 inline-block size-5 font-bold text-red-600" />
              <span className="is-drawer-close:hidden ml-2 text-red-700 font-medium">
                All Blood Donation
              </span>
            </NavLink>
          </li>
        </>
      )}

      {/* Volunteer Links */}
      {role === 'volunteer' && (
        <li>
          <NavLink
            to="/dashboard/all-blood-requests"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center"
            data-tip="All Blood Donation"
          >
            <LuDroplets className="my-1.5 inline-block size-5 font-bold text-red-600" />
            <span className="is-drawer-close:hidden ml-2 text-red-700 font-medium">
              All Blood Donation
            </span>
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="drawer lg:drawer-open bg-[#fdf2f2]">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-white shadow-md border-b border-red-200 sticky top-0 z-50 px-4 md:px-8">
          {/* LEFT SIDE */}
          <div className="navbar-start flex items-center gap-2">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="size-5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M9 4v16" />
                <path d="M14 10l2 2l-2 2" />
              </svg>
            </label>

            <h3 className="font-bold text-xl md:text-2xl text-red-600 tracking-wide">
              Dashboard
            </h3>
          </div>

          {/* RIGHT SIDE */}
          <div className="navbar-end flex items-center gap-2 relative">
            {/* ===== User Dropdown ===== */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div
                    className={`w-10 rounded-full border-2 relative
              ${
                statusData === 'active'
                  ? 'border-green-500'
                  : statusData === 'blocked'
                  ? 'border-red-500'
                  : 'border-primary'
              }
            `}
                  >
                    <img
                      src={user?.photoURL}
                      alt="User Avatar"
                      referrerPolicy="no-referrer"
                      className="rounded-full"
                    />

                    {/* ❗ Blocked Icon */}
                    {statusData === 'blocked' && (
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1zm0 7a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 13z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                {open && (
                  <ul
                    className="absolute right-0 mt-2 w-48 p-2 rounded-xl border z-50 shadow-lg
                  bg-white/90 dark:bg-gray-900/80 backdrop-blur-md
                  border-gray-200 dark:border-gray-700 menu text-white"
                  >
                    <li>
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setOpen(false)}
                        className="font-medium px-3 py-2 rounded-md hover:bg-red-600 hover:text-white dark:hover:bg-red-500 transition"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        onClick={() => setOpen(false)}
                        className="font-medium px-3 py-2 rounded-md hover:bg-red-600 hover:text-white dark:hover:bg-red-500 transition"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left font-medium px-3 py-2 rounded-md hover:bg-red-600 hover:text-white dark:hover:bg-red-500 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : null}
          </div>
        </nav>

        {/* Page content */}
        <div className="px-4 md:px-8 py-10 min-h-screen rounded-4xl">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col items-start bg-white border-r border-red-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow space-y-3 p-3">{links}</ul>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default DashBoardLayout;
