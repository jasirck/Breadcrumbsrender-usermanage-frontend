import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
import ToDo from "../todo/ToDo";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.usermanage);
  const token = isAuthenticated;
  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const handleAdminNavigation = () => {
    navigate("/admin");
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Redux Demo
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-white  md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>
                <button
                  onClick={handleAdminNavigation}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Admin
                </button>
              </li>
              <li>
                <button
                  onClick={toggleProfileModal}
                  aria-label="Profile"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
                >
                  <img
                    src={"https://via.placeholder.com/150"}
                    alt="Profile"
                    className="rounded-full w-8 h-8"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        {showProfileModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
              </span>
              <UserProfile closeModal={toggleProfileModal} />
            </div>
          </div>
        )}
      </div>
      { token && <ToDo/>}
    </div>
  );
}

export default Home;
