import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios"

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000";

  const validate = () => {
    let tempErrors = {};

    if (!values.username.trim()) {
      tempErrors.username = "Username is required";
    }
    if (!values.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!values.phoneNumber) {
      tempErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
      tempErrors.phoneNumber = "Phone number is invalid";
    }
    if (!values.password) {
      tempErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    if (!values.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    console.log("from submit   :", values);
    
    event.preventDefault();
    if (!validate()) return;

    setFormError([]);
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("phone_number", values.phoneNumber);
    formData.append("password", values.password);
    // formData.append("confirm_password", values.password);

    try {
      // console.log("reached try");
      // console.log(baseURL);
      
      const res = await axios.post(baseURL + "/api/user/signup/", formData, {
        headers:{
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 201) {
        
        navigate("/login", {
          state: res.data.Message,
        });
      }
    } catch (error) {
      console.log(error);
      
      if (error.response.status === 406) {
        setFormError(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-300 to-gray-400">
      <div className="bg-gray-200 bg-opacity-35 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black/60">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black/60 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              autoComplete="off"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.username ? "border-red-500" : ""
              }`}
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500 text-xs mt-2">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black/60 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-black/60 text-sm font-bold mb-2">Mobile Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Mobile Number"
              autoComplete="off"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
              value={values.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-2">{errors.phoneNumber}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-black/60 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-black/60 text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="off"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-2">{errors.confirmPassword}</p>}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Sign Up
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
        <p>
          Already you have account? 
          <Link to='/login'>
            Login
          </Link></p>
      </div>
    </div>
  );
};

export default Signup;
