import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router';
import logo from '../../assets/blood-logo.png';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import useUserRole from '../../hooks/useUserRole';
import { LuSun, LuMoon } from 'react-icons/lu';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { statusData } = useUserRole();

  // --- Theme Logic ---
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    return logoutUser()
      .then(() => {})
      .catch(() => {
        toast.error('Failed to logout. Try again.');
      });
  };

  const navLinks = !user
    ? [
        { name: 'Home', path: '/' },
        { name: 'Donors', path: '/donors' },
        { name: 'Blood Requests', path: '/blood-requests' },
        { name: 'Donation', path: '/donation-proccess' },
        { name: 'Health Tips', path: '/health-tips' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Donors', path: '/donors' },
        { name: 'Blood Requests', path: '/blood-requests' },
        { name: 'Donation', path: '/donation-proccess' },
        { name: 'Funds', path: '/funds' },
        { name: 'Health Tips', path: '/health-tips' },
      ];

  return (
    <div className="navbar bg-base-100/90 dark:bg-base-100/90 backdrop-blur-lg shadow-sm border-b border-base-300 dark:border-primary/10 py-3 px-4 md:px-10 fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
      {/* Navbar Start */}
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-2xl bg-base-100 border border-base-300 rounded-box w-64 z-[110]"
          >
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
            {!user && (
              <>
                <li className="mt-2 border-t border-base-300 pt-2">
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <Link to="/" className="flex items-center group">
          <img
            src={logo}
            alt="Blood Logo"
            className="w-9 h-9 group-hover:scale-110 transition-transform"
          />
          <span className="font-black text-2xl text-primary ml-2 tracking-tight">
            RedDrop
          </span>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-red-500/20'
                      : 'hover:bg-primary/10 text-base-content/80 hover:text-primary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {/* Theme Toggle Button: Logic Corrected */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-2xl transition-all duration-500 hover:bg-base-200"
          title={
            theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'
          }
        >
          {theme === 'light' ? (
            <LuMoon className="text-slate-700" />
          ) : (
            <LuSun className="text-yellow-400 animate-spin-slow" />
          )}
        </button>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-primary transition-all"
            >
              <div
                className={`w-10 rounded-full border-2 ${
                  statusData === 'blocked'
                    ? 'border-red-500'
                    : 'border-green-500'
                }`}
              >
                <img
                  src={user?.photoURL}
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>

            {open && (
              <ul className="absolute right-0 mt-4 w-60 p-2 shadow-2xl rounded-2xl bg-base-100 border border-base-300 z-50 animate-fadeIn">
                <li className="p-4 border-b border-base-300">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    Signed in as
                  </p>
                  <p className="text-sm font-black truncate text-base-content">
                    {user?.displayName}
                  </p>
                </li>
                <li className="mt-2">
                  <Link
                    to="/dashboard/profile"
                    className="flex p-3 hover:bg-primary/10 hover:text-primary rounded-xl font-semibold transition"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex p-3 hover:bg-primary/10 hover:text-primary rounded-xl font-semibold transition"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="mt-2 pt-2 border-t border-base-300">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-3 text-red-500 hover:bg-red-50 rounded-xl transition font-black"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="hidden sm:flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm font-bold">
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary btn-sm text-white px-5 rounded-lg"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
