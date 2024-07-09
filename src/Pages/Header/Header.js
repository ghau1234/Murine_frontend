import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link,useNavigate } from "react-router-dom";



const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session storage token on component mount
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert token to boolean

    // Set up interval to check for token changes (not recommended for production)
    const intervalId = setInterval(() => {
      const newToken = sessionStorage.getItem("token");
      if (newToken !== null && newToken !== isLoggedIn) {
        setIsLoggedIn(!!newToken); // Update state if token changes
      }
    }, 1000); // Check every second (1000 milliseconds)

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once


  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("login_info");
    setIsLoggedIn(false);
    setDropdownOpen(false); // Close dropdown on logout
    navigate("/login");

  };

  return (
    <>
      <div className="top">
        <li className="m-3 logo">
          <Link to="/">
            <a href="#home"><img src="/Images/maurine-logo.png" alt="" /></a>
          </Link>
          <a href="#about">About Us</a>
          <a href="#buy">How To Buy</a>
          <a href="#community">Community</a>
          {isLoggedIn ? (
            <div className="profile-dropdown">
              <button
                type="button"
                className="rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-gray-100"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src="https://img.freepik.com/premium-photo/rat-mouse-mascot-with-glasses-smiling-intellectual_1166767-51.jpg" // Replace with your profile icon path
                  alt="Profile"
                  className="w-8 h-8 object-cover"
                />
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-56 rounded-md shadow-sm bg-white dark:bg-gray-800 z-50">
                  <li>
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button
                type="button"
                className=" m-3 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md px-5 py-1 text-center me-2 mb-2 mt"
              >
                Connect
              </button>
            </Link>
          )}
        </li>
      </div>
    </>
  );
};

export default Header;
