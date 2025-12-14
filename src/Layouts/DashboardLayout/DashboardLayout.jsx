import { Link, NavLink, Outlet } from 'react-router';
import { FaHome, FaUsers } from 'react-icons/fa';
import { BiSolidDonateHeart } from 'react-icons/bi';
import logo from '../../assets/blood-logo.png';
import { PiMapPinPlusFill } from 'react-icons/pi';
import { LuDroplets } from 'react-icons/lu';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../../Components/Loading/Loading';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Bounce, ToastContainer } from 'react-toastify';

const DashBoardLayout = () => {
  const { role, isLoading, statusData, statusLoading } = useUserRole();
  console.log(role, statusData);

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
        <nav className="navbar w-full bg-white shadow-md border-b border-red-200 sticky top-0 left-0 z-50">
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
              className="my-1.5 inline-block size-5"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <h3 className="px-4 font-bold text-2xl text-red-600 tracking-wide drop-shadow-sm">
            Dashboard
          </h3>
        </nav>

        {/* Page content */}
        <div className="py-8 px-8 mb-20 min-h-screen rounded-4xl">
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
