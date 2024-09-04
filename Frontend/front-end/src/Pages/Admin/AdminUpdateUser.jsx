
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AdminUpdateUser = () => {
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000";
  const { id } = useParams();
  const [formError, setFormError] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    phone_number: "",
    email: "",
    profile_pic: "",
    is_active: true,
  });
const token = localStorage.getItem('access')
  useEffect(() => {
    // Fetch user details by ID when the component mounts
    axios
      .get(baseURL + `/api/user/admin/users/${id}/`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        navigate("/admin");
      });
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Update the state based on the input field type
    if (type === "checkbox") {
      setUserData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === "file") {
      const file = event.target.files[0];
      // admin/users/image/update/<int:id>/</int:id>
      const formData = new FormData()
      formData.append('profile_pic',file)
      axios
      .put(baseURL + `/api/user/admin/users/image/update/${id}/`, formData, {
        
        headers: {
          
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          
        },
      })
      .then((response) => {
        console.log(response)
        setUserData((prevData) => ({
          ...prevData,
          [name]: response.data.profile_pic,
        }));
      })
      .catch((error) => {
        setFormError(error.response.data);
        console.error("Error updating user:", error.response.data);
      });

    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDelete = () => {
    // Delete user by ID
    axios
      .delete(baseURL + `/api/user/admin/users/delete/${id}/`)
      .then(() => {
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    axios
      .put(baseURL + `/api/user/admin/users/update/${id}/`, formData, {
        
        headers: {
          "Content-Type":  "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/admin");
      })
      .catch((error) => {
        setFormError(error.response.data);
        console.error("Error updating user:", error.response.data);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-300 to-gray-400 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black/60">
          Update User
        </h1>

        <div className="flex flex-col items-center mb-6">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={
              userData.profile_pic
                ? userData.profile_pic
                : "https://imgs.search.brave.com/uFVivMWdV33VC0QbgrTXEPKsHo4Ouvx02eGK8J-uDTU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzIxLzg5LzI4/LzM2MF9GXzcyMTg5/Mjg5Ml94Zndwc2hz/UDJHR2hNRWw5enBI/a2RWTFI5ZFhrQk9j/dS5qcGc"
            }
            alt="Profile"
          />
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
            name="profile_pic"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-black/60 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black/60 leading-tight focus:outline-none focus:shadow-outline"
              value={userData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black/60 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black/60 leading-tight focus:outline-none focus:shadow-outline"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone_number"
              className="block text-black/60 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Phone Number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black/60 leading-tight focus:outline-none focus:shadow-outline"
              value={userData.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="is_active"
              className="block text-black/60 text-sm font-bold mb-2"
            >
              Is Active
            </label>
            <input
              type="checkbox"
              id="isActive"
              name="is_active"
              className="ml-2"
              checked={userData.is_active}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-center mb-6">
            <button
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              type="submit"
            >
              Update User
            </button>
            <button
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDelete}
            >
              Delete User
            </button>
          </div>
        </form>

        {formError.length > 0 && (
          <div className="text-red-600 text-sm mt-4">
            <ul>
              {Object.keys(formError).map((key) =>
                formError[key].map((error, index) => (
                  <li key={`${key}_${index}`}>
                    Error in {key}: {error}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUpdateUser;



