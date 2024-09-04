import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_Authentication } from "../../redux/Authentication/AuthenticationSlice";
import { set_user_basic_details } from "../../redux/User/UserBasicDetailsSlice";
import AdminHome from '../../Pages/Admin/AdminHome' 
import AdminLogin from '../../Pages/Admin/AdminLogin'
import AdminCreateUser from '../../Pages/Admin/AdminCreateUser'
import AdminUpdateUser from '../../Pages/Admin/AdminUpdateUser'
import Navbar from '../admin/Navbar'
import Footer from '../admin/Footer'
import AdminPrivateRoute from '../AdminPrivateRoute'
import isAuthAdmin from "../../utils/isAuthAdmin";
import axios from "axios";



const AdminWrapper = () => {
  const dispatch = useDispatch();
  const authentication_user = useSelector((state) => state.authentication_user);
  const baseURL = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access");

  const checkAuthAndFetchUserData = async () => {
    try {
      const isAuthenticated = await isAuthAdmin();
      dispatch(
        set_Authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );

      if (isAuthenticated.isAuthenticated) {
        const res = await axios.get(baseURL + "/api/user/details/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        
        }
      );
  
        dispatch(
          set_user_basic_details({
            name: res.data.username,
            profile_pic: res.data.profile_pic,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route
        path="/"
        element={
          <AdminPrivateRoute>
            <AdminHome />
          </AdminPrivateRoute>
        }
      />
      <Route
        path="/user/create"
        element={
          <AdminPrivateRoute>
            <AdminCreateUser />
          </AdminPrivateRoute>
        }
      />
      <Route
        path="/user/update/:id"
        element={
          <AdminPrivateRoute>
            <AdminUpdateUser />
          </AdminPrivateRoute>
        }
      />
    </Routes>
    <Footer />
  </>
  )
}

export default AdminWrapper