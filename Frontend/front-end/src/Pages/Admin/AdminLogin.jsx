import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_Authentication } from "../../redux/Authentication/AuthenticationSlice";
import axios from "axios";
import {jwtDecode} from 'jwt-decode'


const AdminLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const baseURL = "http://127.0.0.1:8000";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      const res = await axios.post(baseURL + "/api/user/login/", formData);
      if (res.status === 200) {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).username,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
          })
        );
        navigate("/admin");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setFormError(error.response.data.detail || "Invalid credentials");
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formError) {
      const timerId = setTimeout(() => {
        setFormError("");
      }, 4000);
      return () => clearTimeout(timerId);
    }
  }, [formError]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-400 to-gray-500">
      <div className="bg-white bg-opacity-35 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black/60">Admin Login</h1>
        {formError && (
          <div className="bg-danger rounded mb-3 py-1 px-2 text-light">
            {formError}
          </div>
        )}
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black/60 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-black/60 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
