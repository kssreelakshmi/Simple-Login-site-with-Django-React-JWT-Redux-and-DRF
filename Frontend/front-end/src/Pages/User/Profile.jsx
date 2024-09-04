
import React, { useEffect, useState } from "react";
import { set_Authentication } from "../../redux/Authentication/AuthenticationSlice.jsx"; 
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    profile_pic: "",
  });
  const [message, setMessage] = useState(null);
  const [formError, setFormError] = useState([]);
  const authentication_user = useSelector((state) => state.authentication_user);
  const dispatch = useDispatch();
  const baseUrl = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access");

  // Fetch user data from the server
  const fetchUserData = async () => {
    try {
      const response = await axios.get(baseUrl + "/api/user/details/", {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setUserDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("the error is:", error);
    }
  };

  // Handle input changes, especially for file uploads
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];
      setUserDetails((prevData) => ({
        ...prevData,
        profile_pic: file,
      }));
    } else {
      setUserDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission with proper data handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", userDetails.username);
    formData.append("email", userDetails.email);
    formData.append("phone_number", userDetails.phone_number);
    if (userDetails.profile_pic) {
      formData.append("profile_pic", userDetails.profile_pic);
    }

    try {
      const response = await axios.post(baseUrl + "/api/user/details/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        set_Authentication({
          name: response.data.username,
          isAuthenticated: true,
        })
      );

      if (response.status === 201) {
        setUserDetails((prevData) => ({
          ...prevData,
          profile_pic: baseUrl + response.data.profile_pic,
        }));
        setMessage("User updated successfully");
      }
    } catch (err) {
      setFormError(err.response.data);
      console.log(err.response.data);
    }
  };

  // Fetch user data on component mount or when authentication changes
  useEffect(() => {
    fetchUserData();
  }, [authentication_user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-300 to-gray-400 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black/60">Profile</h1>

        {message && (
          <div className="alert alert-primary" role="alert">
            {message}
          </div>
        )}

        <div className="flex flex-col items-center mb-6">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={
              userDetails
                ? userDetails.profile_pic
                  ? userDetails.profile_pic
                  : "https://imgs.search.brave.com/uFVivMWdV33VC0QbgrTXEPKsHo4Ouvx02eGK8J-uDTU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzIxLzg5LzI4/LzM2MF9GXzcyMTg5/Mjg5Ml94Zndwc2hz/UDJHR2hNRWw5enBI/a2RWTFI5ZFhrQk9j/dS5qcGc"
                : "https://imgs.search.brave.com/uFVivMWdV33VC0QbgrTXEPKsHo4Ouvx02eGK8J-uDTU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzIxLzg5LzI4/LzM2MF9GXzcyMTg5/Mjg5Ml94Zndwc2hz/UDJHR2hNRWw5enBI/a2RWTFI5ZFhrQk9j/dS5qcGc"
            }
            alt="Profile"
          />
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black/60 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black/60 leading-tight focus:outline-none focus:shadow-outline"
              value={userDetails.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black/60 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black/60 leading-tight focus:outline-none focus:shadow-outline"
              value={userDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-black/60 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Phone Number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black/60 leading-tight focus:outline-none focus:shadow-outline"
              value={userDetails.phone_number}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-center mb-6">
            <button
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>

        {formError.length > 0 && (
          <div className="text-red-600 text-sm mt-4">
            <ul>
              {Object.keys(formError).map((key) =>
                formError[key].map((error, index) => (
                  <li key={`${key}_${index}`}>Error in {key}: {error}</li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

