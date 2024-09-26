import React, { useEffect, useState } from "react"; // Ensure this is only imported once
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo3.png";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [url, setUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [cartItems, setCartItems] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUrl(location.pathname);
    const token = localStorage.getItem("token");

    const fetchUserData = async (token) => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { token },
        });
        setUsername(data.userName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      setLoggedIn(true);
      fetchUserData(token);
    }

    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/cart", {
          headers: { token },
        });
        setCartItems(data.length);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (loggedIn) {
      fetchCartItems();
    }
  }, [location, loggedIn]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDropdown2 = () => setIsDropdownOpen2(!isDropdownOpen2);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", text: "Home" },
    { to: "/menu", text: "Menu" },
    { to: "/ReservationForm", text: "Reserve a Table" },
  ];

  return (
    <header className="fixed z-50 w-screen">
      <nav
        className={`navbar xl:px-24 transition-all duration-300 rounded-lg border border-gray-300`}
        style={{
          backgroundColor: isSticky ? "rgba(255, 255, 255, 0.5)" : "white",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="navbar-start">
          <Link to="/" className="flex">
            <img src={logo} alt="logo" className="w-24" />
          </Link>
        </div>
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 text-lg font-bold hidden lg:flex space-x-4">
            {navItems.map((item) => (
              <li
                key={item.to}
                className="hover:opacity-100 transition-opacity duration-300"
              >
                <Link
                  to={item.to}
                  className={`hover:text-green ${
                    url === item.to ? "text-green" : ""
                  }`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end flex items-center">
          <Link to="cart-page" className="btn btn-ghost btn-circle relative">
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
            <span
              className={`badge badge-sm indicator-item absolute top-0 right-0 transform translate-x-1 -translate-y-1 ${
                cartItems > 0 ? "bg-red-600" : "bg-white"
              } text-white`}
              style={{ color: cartItems > 0 ? "white" : "black" }}
            >
              {cartItems}
            </span>
          </Link>

          <div className="dropdown me-4">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              onClick={toggleDropdown2}
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
            {isDropdownOpen2 && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-64 space-y-3"
              >
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="p-2 hover:bg-gray-200">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative">
            {loggedIn ? (
              <>
                <button
                  className="btn btn-ghost flex items-center space-x-1"
                  onClick={toggleDropdown}
                >
                  <FaUser className="mr-2" />
                  <span>{username}</span>
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 top-full mt-2 w-48 bg-white shadow-md rounded-lg">
                    <li>
                      <Link to="/profile" className="p-2 hover:bg-gray-200">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" className="p-2 hover:bg-gray-200">
                        Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="p-2 w-full text-left hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </>
            ) : (
              <div className="flex">
                <Link
                  className="btn rounded-full px-5 bg-green text-white mr-2"
                  to="/signUp"
                >
                  Sign Up
                </Link>
                <Link
                  className="btn rounded-full px-5 bg-green text-white"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
