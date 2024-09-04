// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminCreateUser = () => {
//   const navigate = useNavigate()
//   const [formError, setFormError] = useState([]);
//   const [formData, setFormData] = useState({
//     username: "",
//     phone_number: "",
//     email: "",
//     password: "",
//     profile_pic: "",
//     is_active: ""
//   });
//   const baseURL = "http://127.0.0.1:8000";

//   const handleInputChange = (e) => {
//     const isFile = e.target.files;
//     if (isFile) {
//       const file = e.target.files[0];
//       setFormData({
//         ...formData,
//         profile_pic: file,
//       });
//     } else {
//       const { name, value } = e.target;
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { profile_pic, ...userData } = formData;
//     const userDataWithProfilePic = new FormData();

//     userDataWithProfilePic.append("profile_pic", profile_pic);

//     Object.keys(userData).forEach((key) => {
//       userDataWithProfilePic.append(key, userData[key]);
//     });
//     for (const pair of userDataWithProfilePic.entries()) {
//       console.log(pair[0], " : ", pair[1]);
//     }

//     axios
//       .post(baseURL + "/api/user/admin/users/", userDataWithProfilePic, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         navigate("/admin");
//       })
//       .catch((error) => {
//         console.error("Error creating user:", error);
//         if (error.response.status === 400) {
//           setFormError(error.response.data);
//         } else {
//           console.log(error);
//         }
//       });
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-300 to-gray-400">
//     <div className="bg-gray-200 bg-opacity-35 p-8 rounded-lg shadow-2xl w-full max-w-md">
//       <h1 className="text-2xl font-bold mb-6 text-center text-black/60">Create User</h1>
//       <form onSubmit={handleSubmit}>
//       <div className="flex flex-col items-center mb-6">
//           <img
//             className="w-24 h-24 rounded-full mb-4"
//             src=''
//             // {
//             //   userDetails
//             //     ? userDetails.profile_pic
//             //       ? userDetails.profile_pic
//             //       : "https://imgs.search.brave.com/uFVivMWdV33VC0QbgrTXEPKsHo4Ouvx02eGK8J-uDTU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzIxLzg5LzI4/LzM2MF9GXzcyMTg5/Mjg5Ml94Zndwc2hz/UDJHR2hNRWw5enBI/a2RWTFI5ZFhrQk9j/dS5qcGc"
//             //     : "https://imgs.search.brave.com/uFVivMWdV33VC0QbgrTXEPKsHo4Ouvx02eGK8J-uDTU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzIxLzg5LzI4/LzM2MF9GXzcyMTg5/Mjg5Ml94Zndwc2hz/UDJHR2hNRWw5enBI/a2RWTFI5ZFhrQk9j/dS5qcGc"
//             // }
//             alt="Profile"
//           />
//           <input
//             type="file"
//             accept=".jpg, .jpeg, .png"
//             className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-black/60 text-sm font-bold mb-2">Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             placeholder="Username"
//             autoComplete="off"
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.username ? "border-red-500" : ""
//             }`}
//             value={values.username}
//             onChange={handleChange}
//           />
//           {errors.username && <p className="text-red-500 text-xs mt-2">{errors.username}</p>}
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-black/60 text-sm font-bold mb-2">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Email"
//             autoComplete="off"
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.email ? "border-red-500" : ""
//             }`}
//             value={values.email}
//             onChange={handleChange}
//           />
//           {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
//         </div>
//         <div className="mb-4">
//           <label htmlFor="phoneNumber" className="block text-black/60 text-sm font-bold mb-2">Mobile Number</label>
//           <input
//             type="text"
//             id="phoneNumber"
//             name="phoneNumber"
//             placeholder="Mobile Number"
//             autoComplete="off"
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.phoneNumber ? "border-red-500" : ""
//             }`}
//             value={values.phoneNumber}
//             onChange={handleChange}
//           />
//           {errors.phoneNumber && <p className="text-red-500 text-xs mt-2">{errors.phoneNumber}</p>}
//         </div>
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-black/60 text-sm font-bold mb-2">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Password"
//             autoComplete="off"
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.password ? "border-red-500" : ""
//             }`}
//             value={values.password}
//             onChange={handleChange}
//           />
//           {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
//         </div>
//         <div className="mb-6">
//           <label htmlFor="confirmPassword" className="block text-black/60 text-sm font-bold mb-2">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             autoComplete="off"
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               errors.confirmPassword ? "border-red-500" : ""
//             }`}
//             value={values.confirmPassword}
//             onChange={handleChange}
//           />
//           {errors.confirmPassword && <p className="text-red-500 text-xs mt-2">{errors.confirmPassword}</p>}
//         </div>
//         <div className="flex items-center justify-center">
//           <button
//             type="submit"
//             className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
//           >
//             Create
//           </button>
//         </div>
//       </form>
//       <ul className="text-red-500 mt-4">
//         {Object.keys(formError).map((key) =>
//           formError[key].map((message, index) => (
//             <li key={`${key}_${index}`}>{message}</li>
//           ))
//         )}
//       </ul>
     
//     </div>
//   </div>
//   )
// }

// export default AdminCreateUser

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateUser = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    email: "",
    password: "",
    profile_pic: "",
    is_active: false,
  });
  const baseURL = "http://127.0.0.1:8000";

  const handleInputChange = (e) => {
    const isFile = e.target.files;
    if (isFile) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        profile_pic: file,
      });
    } else {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { profile_pic, ...userData } = formData;
    const userDataWithProfilePic = new FormData();

    userDataWithProfilePic.append("profile_pic", profile_pic);

    Object.keys(userData).forEach((key) => {
      userDataWithProfilePic.append(key, userData[key]);
    });

    axios
      .post(baseURL + "/api/user/admin/users/", userDataWithProfilePic, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        if (error.response && error.response.status === 400) {
          setFormError(error.response.data);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-300 to-gray-400">
      <div className="bg-gray-200 bg-opacity-35 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black/60">Create User</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <img
              className="w-24 h-24 rounded-full mb-4"
              src={formData.profile_pic ? URL.createObjectURL(formData.profile_pic) : "https://via.placeholder.com/100"}
              alt="Profile"
            />
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black/60 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black/60 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-black/60 text-sm font-bold mb-2">Mobile Number</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Mobile Number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-black/60 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="is_active" className="block text-black/60 text-sm font-bold mb-2">Is Active</label>
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              className="mx-3 my-3"
              checked={formData.is_active}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
        </form>
        <ul className="text-red-500 mt-4">
          {Object.keys(formError).map((key) =>
            formError[key].map((message, index) => (
              <li key={`${key}_${index}`}>{message}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminCreateUser;
