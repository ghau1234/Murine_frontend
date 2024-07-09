import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const JSON_USER_INFO = JSON.parse(sessionStorage.getItem('login_info'));
  const node_api = "https://murine-backend.onrender.com";
  const node_api1 = "http://localhost:3001";


  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    // Check token initially
    checkToken();

    // Periodically check for token every second
    const intervalId = setInterval(checkToken, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFileChange = (event) => {
    debugger;
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  // const uploadFile = (file) => {
  //   try {
  //     const fileURL = URL.createObjectURL(file);
  //     setUploadedFile(fileURL); 
  //     setShowModal(false);  
  //     toast.success("Image uploaded successfully!");
  //   } catch (error) {
  //     console.error("Failed to upload image:", error);
  //     toast.error("Failed to upload image.");
  //   }
  // };

  const uploadFile = async (file) => {
    try {
      debugger;
      // Create a new FormData object
      const formData = new FormData();
      formData.append('file', file); // Add the file to the formData
      formData.append('userId', JSON.parse(sessionStorage.getItem('login_info')).user.userID);

      // Send the POST request with the formData
      const response = await axios.post(`${node_api}/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set appropriate header
        }
      });
  
      if (response.status === 200) {
        const fileURL = URL.createObjectURL(file); // Generate preview URL
        setUploadedFile(fileURL);
        setShowModal(false);
        toast.success("Image uploaded successfully!");
      } else {
        console.error("Failed to upload image:", response.data);
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.error("Failed to upload image.");
    }
  };
  

  return (
    <>   
      {/* Modal toggle */}
      {isLoggedIn ? (
        <button
          onClick={handleToggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Upload Screenshot
        </button>
      ) : (
        <p>Please login to upload screenshot</p>
      )}
      <ToastContainer/>
      {/* Main modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleToggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="flex items-center justify-center w-full p-3">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
