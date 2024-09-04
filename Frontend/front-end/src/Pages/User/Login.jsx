import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import { set_Authentication } from '../../redux/Authentication/AuthenticationSlice.jsx';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState([]);
  const [message, setMessage] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = "http://127.0.0.1:8000";

  // Handle form input changes
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError([]);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    try {
      const res = await axios.post(baseURL + "/api/user/login/", 
        formData, {
        headers:{
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 200) {
        
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        console.log(res.data.access);
        console.log(res.data.refresh);
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).username,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log("working");
      
      if (error.response?.status === 401) {
        setFormError(error.response.data);
      } else {
        console.log("dkfnkdjfk;   :", error);
        
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (formError) {
        setFormError([]);
      }
    }, 4000);
    return () => clearTimeout(timerId);
  }, [formError]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-300 to-gray-400">
      <div className="bg-gray-100 bg-opacity-35 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black/60">Login</h1>
        {message && (
          <div className="alert alert-primary mb-4 text-center">
            {message}
          </div>
        )}
        {formError.detail && (
          <div className="bg-danger rounded mb-3 py-1 px-2 text-light text-center">
            {formError.detail} !!!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black/60 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              value={values.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              value={values.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-center m-3">
              <p>Not Have an Account?
              <Link className="mx-1 text-dark" to="/signup">
              Sign Up
              </Link>
              </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
