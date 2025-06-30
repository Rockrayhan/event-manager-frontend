import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/all-events">All Events</Link></li>
      <li><Link to="/add-event">Add Event</Link></li>
      <li><Link to="/my-event">My Event</Link></li>
    </>
  );

  return (
    <div className="navbar bg-orange-300 mb-5 shadow-md px-4">
      {/* Navbar Start (Logo + Mobile Menu) */}
      <div className="navbar-start">
        {/* Hamburger menu for mobile */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 font-semibold"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo and site name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            className="h-[50px] w-[50px] rounded-full"
            src="https://img.freepik.com/premium-vector/alphabetical-letter-e-logo-collection_647881-448.jpg"
            alt="event-logo"
          />
          <span className="text-xl font-bold text-white">Event Manager</span>
        </Link>
      </div>

      {/* Navbar Center (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">{navLinks}</ul>
      </div>

      {/* Navbar End (Profile/Login) */}
      <div className="navbar-end relative">
        {user ? (
          <div className="relative">
            {/* Profile picture */}
            <div
              className="cursor-pointer"
              onClick={toggleDropdown}
              title={user.displayName}
            >
              <img
                src={user.photoURL || "https://i.ibb.co/3sVxPZf/avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg z-50 py-2 text-sm">
                <div className="px-4 py-2 text-gray-800 font-semibold border-b">
                  {user.displayName}
                </div>
                <button
                  onClick={logOut}
                  className="w-full text-left px-4 py-2 hover:bg-orange-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm bg-white text-orange-500 font-semibold">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
