import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
import ToDo from "../todo/ToDo";
import { useDispatch, useSelector } from "react-redux";
import Download from "../Download/Download";
import { dark_mode_change } from "../../toolkit/slice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [content, setContent] = useState("todo");
  // const [dark_mode, setdark_mode] = useState(false); // Added dark mode state
  const { isAuthenticated, is_admin, dark_mode } = useSelector(
    (state) => state.usermanage
  );
  const token = isAuthenticated;

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const handleAdminNavigation = () => {
    if (!is_admin) {
      navigate("/adminlogin");
    }
  };

  useEffect(()=>{
    if (!token) {
      navigate("/login");
      return;
    }
  },[token])

  return (
    <div
      className={`min-h-screen ${
        dark_mode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <nav
        className={`border-b ${
          dark_mode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span
            className={`text-2xl font-bold ${
              dark_mode ? "text-teal-300" : "text-teal-800"
            }`}
          >
            Redux Demo
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden ${
              dark_mode
                ? "text-teal-300 hover:bg-gray-700"
                : "text-teal-600 hover:bg-gray-100"
            } focus:outline-none focus:ring-2 focus:ring-teal-300`}
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
            <ul
              className={`flex flex-col md:flex-row md:space-x-8 p-4 border rounded-lg ${
                dark_mode
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              {/* <li>
                <button
                  onClick={() => setContent("home")}
                  className={`block py-2 px-4 rounded-md text-lg font-medium ${
                    content === "home"
                      ? dark_mode
                        ? "bg-teal-600 text-white"
                        : "bg-teal-600 text-white"
                      : dark_mode
                      ? "text-teal-300"
                      : "text-teal-800"
                  } hover:bg-gray-100`}
                >
                  Home
                </button>
              </li> */}
              <li>
                <button
                  onClick={() => setContent("todo")}
                  className={`block py-2 px-4 rounded-md text-lg font-medium ${
                    content === "todo"
                      ? dark_mode
                        ? "bg-teal-600 text-white"
                        : "bg-teal-600 text-white"
                      : dark_mode
                      ? "text-teal-300"
                      : "text-teal-800"
                  } hover:bg-gray-100`}
                >
                  ToDo
                </button>
              </li>
              <li>
                <button
                  onClick={() => setContent("downloader")}
                  className={`block py-2 px-4 rounded-md text-lg font-medium ${
                    content === "downloader"
                      ? dark_mode
                        ? "bg-teal-600 text-white"
                        : "bg-teal-600 text-white"
                      : dark_mode
                      ? "text-teal-300"
                      : "text-teal-800"
                  } hover:bg-gray-100`}
                >
                  Downloader
                </button>
              </li>
              {/* <li>
                <button
                  onClick={handleAdminNavigation}
                  className={`block py-2 px-4 text-lg font-medium ${
                    dark_mode
                      ? "text-teal-300 hover:bg-gray-700"
                      : "text-teal-800 hover:bg-gray-100"
                  } rounded-md`}
                >
                  Admin
                </button>
              </li> */}
              <li>
                <button
                  onClick={toggleProfileModal}
                  aria-label="Profile"
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    dark_mode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
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
          <div
            className={`fixed inset-0 z-50 overflow-y-auto ${
              dark_mode
                ? "bg-gray-800 bg-opacity-75"
                : "bg-gray-500 bg-opacity-75"
            }`}
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className={`relative ${
                  dark_mode ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow-lg`}
                aria-hidden="true"
              >
                <UserProfile closeModal={toggleProfileModal} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {token && content === "home" && (
          <div
            className={`bg-white shadow-lg rounded-lg p-5 w-1/3 mx-auto flex justify-center items-center ${
              dark_mode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-2xl font-semibold">Welcome Home</h2>
          </div>
        )}
        {token && content === "todo" && <ToDo />}
        {token && content === "downloader" && <Download />}
      </div>

      <button
        onClick={() => dispatch(dark_mode_change())}
        className={`fixed bottom-4 right-4 p-2 rounded-full ${
          dark_mode ? "bg-teal-600 text-white" : "bg-gray-800 text-white"
        } transition-colors duration-300`}
      >
        {dark_mode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default Home;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserProfile from "../UserProfile/UserProfile";
// import ToDo from "../todo/ToDo";
// import { useSelector } from "react-redux";
// import Download from "../Download/Download";

// function Home() {
//   const navigate = useNavigate();
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [content, setContent] = useState('');
//   const { isAuthenticated,is_admin } = useSelector((state) => state.usermanage);
//   const token = isAuthenticated;

//   const toggleProfileModal = () => {
//     setShowProfileModal(!showProfileModal);
//   };

//   const handleAdminNavigation = () => {
//     if (!is_admin) {
//       navigate("/adminlogin");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
//       <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <span className="text-2xl font-bold text-gray-900 dark:text-white">
//             Redux Demo
//           </span>
//           <button
//             data-collapse-toggle="navbar-default"
//             type="button"
//             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             aria-controls="navbar-default"
//             aria-expanded="false"
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg
//               className="w-5 h-5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 17 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 1h15M1 7h15M1 13h15"
//               />
//             </svg>
//           </button>
//           <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//             <ul className="flex flex-col md:flex-row md:space-x-8 p-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
//               <li>
//                 <button
//                   onClick={() => setContent('home')}
//                   className={`block py-2 px-4 rounded-md text-lg font-medium ${content === 'home' ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-300'} hover:bg-gray-200 dark:hover:bg-gray-700`}
//                 >
//                   Home
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => setContent('todo')}
//                   className={`block py-2 px-4 rounded-md text-lg font-medium ${content === 'todo' ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-300'} hover:bg-gray-200 dark:hover:bg-gray-700`}
//                 >
//                   ToDo
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => setContent('downloader')}
//                   className={`block py-2 px-4 rounded-md text-lg font-medium ${content === 'downloader' ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-300'} hover:bg-gray-200 dark:hover:bg-gray-700`}
//                 >
//                   Downloader
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={handleAdminNavigation}
//                   className="block py-2 px-4 text-lg font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
//                 >
//                   Admin
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={toggleProfileModal}
//                   aria-label="Profile"
//                   className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
//                 >
//                   <img
//                     src={"https://via.placeholder.com/150"}
//                     alt="Profile"
//                     className="rounded-full w-8 h-8"
//                   />
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto p-4">
//         {showProfileModal && (
//           <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75">
//             <div className="flex items-center justify-center min-h-screen px-4">
//               <div
//                 className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg"
//                 aria-hidden="true"
//               >
//                 <UserProfile closeModal={toggleProfileModal} />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-4">
//         {token && content === 'home' && (
//           <div className=" bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 w-1/3 mx-auto flex justify-center items-center">
//             <h2 className="text-2xl font-semibold">Welcome Home</h2>
//             {/* Add more content here */}
//           </div>
//         )}
//         {token && content === 'todo' && <ToDo />}
//         {token && content === 'downloader' && <Download />}
//       </div>
//     </div>
//   );
// }

// export default Home;
