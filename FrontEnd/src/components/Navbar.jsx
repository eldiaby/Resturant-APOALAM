import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo3.png";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [url, setUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    setUrl(location.pathname);

    // Check token for logged-in status
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      setUsername("User"); // Replace with actual username if stored
    }
  }, [location]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <Link to="/" className={url === "/" ? "text-green" : ""}>Home</Link>
      </li>
      <li>
        <Link to="/menu" className={url === "/menu" ? "text-green" : ""}>Menu</Link>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li><a>Online Order</a></li>
            <li><a>Table Booking</a></li>
          </ul>
        </details>
      </li>
      <li><a>Offers</a></li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto fixed">
      <nav className={`navbar xl:px-24 ${isSticky
        ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
        : ""
        }`}>
        <div className="navbar-start">
          <Link to="/" className="flex">
            <img src={logo} alt="logo" width={90} height={80} />
          </Link>
        </div>
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 text-lg font-bold hidden lg:flex">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <Link to="cart-page">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle flex items-center justify-center"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
          </Link>

          <div className="dropdown me-4">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              onClick={toggleDropdown} // Add toggle function here
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3"
              >
                {navItems}
              </ul>
            )}

          </div>
          <div>
            {loggedIn ? (
              <div className="relative">
                <button
                  className="btn btn-ghost flex items-center space-x-1"
                  onClick={toggleDropdown}
                >
                  <FaUser className="mr-2" />
                  <span>{username}</span>
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 top-full mt-2 w-48 bg-white shadow-md rounded-lg">
                    <li><Link to="/profile" className="p-2">Profile</Link></li>
                    <li><Link to="/orders" className="p-2">Orders</Link></li>
                    <li><button onClick={handleLogout} className="p-2 w-full text-left">Logout</button></li>
                  </ul>
                )}
              </div>

            ) : (
              <>

                <div style={{ display: "flex" }}>
                  <Link className="btn rounded-full  px-5 bg-green text-white " to="/signUp">
                    SignUp
                  </Link>
                  <Link className="btn rounded-full ms-2 px-5 bg-green text-white" to="/login">
                    Login
                  </Link>
                </div>


              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;



