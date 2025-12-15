import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router';
import logo from '../../assets/blood-logo.png';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../Loading/Loading';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { statusLoading, statusData } = useUserRole();

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

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search Donors', path: '/search' },
    { name: 'Blood Requests', path: '/blood-requests' },
  ];

  const privateLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search Donors', path: '/search' },
    { name: 'Blood Requests', path: '/blood-requests' },
    { name: 'Funds', path: '/funds' },
  ];

  if (statusLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="navbar bg-base-100 shadow-lg py-4 px-4 md:px-10">
      {/* Navbar Start - Logo + Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {!user ? (
              <>
                {publicLinks.map((link, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-primary text-white rounded-md px-3 py-2 font-semibold'
                          : 'hover:bg-primary hover:text-white rounded-md px-3 py-2 transition'
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    to={'/login'}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-primary text-white rounded-md px-3 py-2 font-semibold'
                        : 'hover:bg-primary hover:text-white rounded-md px-3 py-2 transition'
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/register'}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-primary text-white rounded-md px-3 py-2 font-semibold'
                        : 'hover:bg-primary hover:text-white rounded-md px-3 py-2 transition'
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {privateLinks.map((link, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-primary text-white rounded-md px-3 py-2 font-semibold'
                          : 'hover:bg-primary hover:text-white rounded-md px-3 py-2 transition'
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Blood Logo" className="w-10 h-10" />
          <span className="font-bold text-xl text-primary">RedDrop</span>
        </Link>
      </div>

      {/* Navbar Center - Public Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-4">
          {!user ? (
            <>
              {publicLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-primary text-white rounded-md px-3 py-2 font-semibold'
                        : 'hover:bg-primary hover:text-white rounded-md px-3 py-2 transition'
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </>
          ) : (
            <>
              {privateLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-primary text-white rounded-md px-3 py-2 font-semibold'
                        : 'hover:bg-primary hover:text-white rounded-md px-3 py-2 transition'
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {/* Navbar End - Auth + Theme Toggle */}
      <div className="navbar-end flex items-center space-x-2 relative">
        {/* Auth / User Dropdown */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {statusData === 'active' ? (
              <button
                onClick={() => setOpen(!open)}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border-2 border-green-500">
                  <img
                    src={user?.photoURL}
                    alt="User Avatar"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
            ) : (
              <button
                onClick={() => setOpen(!open)}
                className="btn btn-ghost btn-circle avatar relative"
              >
                <div
                  className={`w-10 rounded-full border-2 relative
                  ${
                    statusData === 'blocked'
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

                  {/* ❗ Error Icon (Bottom Right) */}
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
            )}

            {open && (
              <ul className="absolute right-0 mt-2 w-48 p-2 shadow-lg rounded-xl backdrop-blur-md bg-white/90 border border-gray-200 z-50 menu menu-compact ">
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="font-medium px-3 py-2 rounded-md hover:bg-primary hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="font-medium px-3 py-2 rounded-md hover:bg-primary hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="w-full text-left font-medium px-3 py-2 rounded-md hover:bg-primary hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <ul className="menu menu-horizontal space-x-2 hidden lg:flex">
            <li>
              <NavLink
                to={'/login'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary rounded-md px-3 py-2 font-semibold'
                    : 'hover:bg-primary hover:text-white rounded-md px-3 py-2 transition'
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/register'}
                className={({ isActive }) =>
                  isActive
                    ? ' text-primary rounded-md px-3 py-2 font-semibold'
                    : 'hover:bg-primary hover:text-white rounded-md px-3 py-2 transition'
                }
              >
                Register
              </NavLink>
            </li>
          </ul>
        )}

        {/* Theme Toggle */}
        <button
          onClick={() => toast.warning('Coming soon!')}
          className="btn btn-circle bg-primary hover:bg-red-700 text-white ml-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zm0 14a.75.75 0 01.75.75V18a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 16zm8-6a.75.75 0 01.75.75H18a.75.75 0 010-1.5h1.25A.75.75 0 0118 10zm-14 0a.75.75 0 01.75.75H4a.75.75 0 010-1.5h1.25A.75.75 0 014 10zm11.657-5.657a.75.75 0 011.06 1.06l-.884.884a.75.75 0 11-1.06-1.06l.884-.884zm-9.9 9.9a.75.75 0 011.06 1.06l-.884.884a.75.75 0 11-1.06-1.06l.884-.884zm0-9.9l.884.884a.75.75 0 11-1.06 1.06l-.884-.884a.75.75 0 111.06-1.06zm9.9 9.9l.884.884a.75.75 0 11-1.06 1.06l-.884-.884a.75.75 0 111.06-1.06z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
