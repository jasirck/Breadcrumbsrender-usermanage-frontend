import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import profileService from "./profileService";
import { logout } from "../../toolkit/slice";
import { FiEdit3 } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UserProfile({ closeModal }) {
  const dispatch = useDispatch();
  const { isAuthenticated, dark_mode } = useSelector((state) => state.usermanage);
  const token = isAuthenticated;
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    email: "",
    username: "",
    phone: "",
    first_name: "",
    last_name: "",
    profile_image: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    else{
    console.log(profileData.email);
    }
    const fetchProfileData = async () => {
      try {
        const data = await profileService.getProfile(token);
        setProfileData(data);
        localStorage.setItem("userProfile", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch(logout())
        navigate("/login");
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData({
      ...profileData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in profileData) {
      formData.append(key, profileData[key]);
    }
    try {
      const updatedData = await profileService.updateProfile(formData, token);
      setProfileData(updatedData);
      setIsEditing(false);
      localStorage.setItem("userProfile", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  
  //   // Ensure profile_image is a File object
  //   if (profileData.profile_image instanceof File) {
  //     formData.append('profile_image', profileData.profile_image); // append only if it's a file
  //   } else {
  //     console.error("Profile image is not a valid file.");
  //   }
  
  //   // Append other fields from profileData
  //   for (let key in profileData) {
  //     if (key !== 'profile_image') { // Skip profile_image here, as it's appended separately
  //       formData.append(key, profileData[key]);
  //     }
  //   }
  
  //   try {
  //     const updatedData = await profileService.updateProfile(formData, token);
  //     setProfileData(updatedData);
  //     setIsEditing(false);
  //     localStorage.setItem("userProfile", JSON.stringify(updatedData));
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const backendURL = "http://127.0.0.1:8000";

  return (
    <div className={`w-80 h-100 max-w-screen-sm mx-auto rounded-lg shadow-lg overflow-hidden ${dark_mode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="flex flex-col items-center p-4">
        <div className="relative">
          <img
            src={`${backendURL}${profileData.profile_image}`}
            alt={profileData.profile_image}
            className={`w-24 h-24 rounded-full ${dark_mode ? 'border-gray-600' : 'border-gray-300'} border-4`}
          />
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`absolute bottom-0 right-0 p-1 rounded-full ${dark_mode ? 'bg-teal-600' : 'bg-blue-500'} text-white`}
          >
            {isEditing ? (
              <FaTimes className={`text-xl ${dark_mode ? 'text-gray-100' : 'text-gray-900'}`} />
            ) : (
              <FiEdit3 className={`text-xl ${dark_mode ? 'text-gray-100' : 'text-gray-900'}`} />
            )}
          </button>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="w-full mt-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`mt-1 block w-full border rounded-md p-2 ${dark_mode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                value={profileData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className={`mt-1 block w-full border rounded-md p-2 ${dark_mode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                value={profileData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="first_name" className="block text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className={`mt-1 block w-full border rounded-md p-2 ${dark_mode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                value={profileData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className={`mt-1 block w-full border rounded-md p-2 ${dark_mode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                value={profileData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className={`mt-1 block w-full border rounded-md p-2 ${dark_mode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                value={profileData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profile_image" className="block text-sm font-medium">
                Profile Image
              </label>
              <input
                type="file"
                name="profile_image"
                id="profile_image"
                className={`mt-1 block w-full border rounded-md p-2 ${dark_mode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white p-2 rounded-md ${dark_mode ? 'bg-teal-600' : 'bg-blue-500'}`}
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="w-full mt-4">
            <p className="text-sm mb-2">
              <strong>Email:</strong> {profileData.email}
            </p>
            <p className="text-sm mb-2">
              <strong>Username:</strong> {profileData.username}
            </p>
            <p className="text-sm mb-2">
              <strong>First Name:</strong> {profileData.first_name}
            </p>
            <p className="text-sm mb-2">
              <strong>Last Name:</strong> {profileData.last_name}
            </p>
            <p className="text-sm mb-2">
              <strong>Phone:</strong> {profileData.phone}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between p-4 border-t">
        <button
          type="button"
          onClick={handleLogout}
          className={`bg-red-500 text-white px-4 py-2 rounded-md ${dark_mode ? 'bg-red-600' : 'bg-red-500'}`}
        >
          Logout
        </button>
        <button
          type="button"
          onClick={closeModal}
          className={`bg-gray-300 text-gray-100 px-4 py-2 rounded-md ${dark_mode ? 'bg-gray-700 text-gray-100' : 'bg-gray-300'}`}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UserProfile;














// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import profileService from "./profileService";
// import { logout } from "../../toolkit/slice";
// import { useNavigate } from "react-router-dom";

// function UserProfile({ closeModal }) {
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useSelector((state) => state.usermanage);
//   const token = isAuthenticated;
//   const navigate = useNavigate();

//   const [profileData, setProfileData] = useState({
//     email: "",
//     username: "",
//     phone: "",
//     first_name: "",
//     last_name: "",
//     profile_image: "",
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (!token) {
//       console.log(token);
      
//       navigate("/login");
//       return;
//     }
//     const fetchProfileData = async () => {
//       try {
//         const data = await profileService.getProfile(token);
//         setProfileData(data);
//         localStorage.setItem("userProfile", JSON.stringify(data));
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         navigate("/");
//       }
//     };

//     if (token) {
//       fetchProfileData();
//     }
//   }, [token,profileData]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setProfileData({
//       ...profileData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     for (let key in profileData) {
//       formData.append(key, profileData[key]);
//     }
//     try {
//       const updatedData = await profileService.updateProfile(formData, token);
//       setProfileData(updatedData);
//       setIsEditing(false);
//       localStorage.setItem("userProfile", JSON.stringify(updatedData));
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const backendURL = " http://127.0.0.1:8000/";

//   return (
//     <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
//       <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//         <div className="sm:flex sm:items-start">
//           <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">
//               User Profile
//             </h3>
//             <div className="mt-2">
//               {isEditing ? (
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       id="email"
//                       className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
//                       value={profileData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="username"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       name="username"
//                       id="username"
//                       className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
//                       value={profileData.username}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="first_name"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       name="first_name"
//                       id="first_name"
//                       className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
//                       value={profileData.first_name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="last_name"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       name="last_name"
//                       id="last_name"
//                       className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
//                       value={profileData.last_name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Phone Number
//                     </label>
//                     <input
//                       type="text"
//                       name="phone"
//                       id="phone"
//                       className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
//                       value={profileData.phone}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="profile_image"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Profile Image
//                     </label>
//                     <input
//                       type="file"
//                       name="profile_image"
//                       id="profile_image"
//                       className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="flex justify-end">
//                     <button
//                       type="submit"
//                       className="mr-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm"
//                     >
//                       Save Changes
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsEditing(false)}
//                       className="px-4 py-2 bg-gray-300 text-black rounded-md shadow-sm"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <div>
//                   <p className="mb-4">
//                     <strong>Email:</strong> {profileData.email}
//                   </p>
//                   <p className="mb-4">
//                     <strong>Username:</strong> {profileData.username}
//                   </p>
//                   <p className="mb-4">
//                     <strong>First Name:</strong> {profileData.first_name}
//                   </p>
//                   <p className="mb-4">
//                     <strong>Last Name:</strong> {profileData.last_name}
//                   </p>
//                   <p className="mb-4">
//                     <strong>Phone:</strong> {profileData.phone}
//                   </p>
//                   <p className="mb-4">
//                     <strong>Profile Image:</strong>
//                     {profileData.profile_image ? (
//                       <img
//                         src={`${backendURL}${profileData.profile_image}`}
//                         alt="Profile"
//                         className="w-16 h-16 rounded-full"
//                       />
//                     ) : (
//                       <span>No Image</span>
//                     )}
//                   </p>
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm"
//                   >
//                     Edit Profile
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//         <button
//           type="button"
//           className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//           onClick={closeModal}
//         >
//           Close
//         </button>
//         <button
//           type="button"
//           className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;
