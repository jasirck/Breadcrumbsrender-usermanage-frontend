import React, { useState } from 'react';
import axios from '../../axios';
import { useSelector } from 'react-redux';

function Download() {
  const [link, setLink] = useState('');
  const { isAuthenticated, dark_mode } = useSelector((state) => state.usermanage);

  const handleInputChange = (e) => {
    setLink(e.target.value);
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get('download/', {
        params: { url: link }, 
        headers: {
          Authorization: `Bearer ${isAuthenticated}`,
        },
      });
      console.log(response.data);
      console.log("Downloading video from:", link);
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };

  return (
    <div className={`container mx-auto p-4 ${dark_mode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className={`shadow-lg rounded-lg p-5 w-80 mx-auto ${dark_mode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-xl mb-4 font-medium ${dark_mode ? 'text-teal-400' : 'text-teal-800'} text-center`}>
          YouTube Video Downloader
        </h1>
        <input
          type="text"
          value={link}
          onChange={handleInputChange}
          placeholder="Enter YouTube video link"
          className={`w-full p-2 rounded-lg mb-4 border ${dark_mode ? 'border-teal-600 bg-gray-700 text-gray-100' : 'border-teal-500'}`}
        />
        <button
          onClick={handleDownload}
          className={`w-full py-2 rounded-lg ${dark_mode ? 'bg-teal-600 hover:bg-teal-700 text-gray-100' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default Download;






// import React, { useState } from 'react';
// import axios from '../../axios';
// import { useSelector } from 'react-redux';

// function Download() {
//   const [link, setLink] = useState('');
//   const { isAuthenticated } = useSelector((state) => state.usermanage); // Assume this is the JWT token

//   const handleInputChange = (e) => {
//     setLink(e.target.value);
//   };

//   const handleDownload = async () => {
//     try {
//       const response = await axios.post(
//         'download/',
//         { text: link },
//         {
//           headers: {
//             Authorization: `Bearer ${isAuthenticated}` // Ensure space after 'Bearer'
//           }
//         }
//       );
//       console.log(response.data);
//       // Implement the download functionality with the response
//       console.log("Downloading video from:", link);
//     } catch (error) {
//       console.error("Error downloading the video:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-gray-700 shadow-lg rounded-lg p-5 w-80 mx-auto">
//         <h1 className="text-white font-medium text-center text-xl mb-4">
//           YouTube Video Downloader
//         </h1>
//         <input
//           type="text"
//           value={link}
//           onChange={handleInputChange}
//           placeholder="Enter YouTube video link"
//           className="w-full p-2 rounded-lg mb-4 border border-gray-500"
//         />
//         <button
//           onClick={handleDownload}
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//         >
//           Download
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Download;
