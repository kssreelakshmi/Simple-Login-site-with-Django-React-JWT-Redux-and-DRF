// import React ,{useEffect} from "react";
// import PrivateRoute from '../PrivateRoute.jsx'
// import { Route,Routes } from "react-router-dom";
// import { useDispatch,useSelector } from "react-redux";
// import Home from "../../Pages/User/Home.jsx";
// import Signup from "../../Pages/User/Signup.jsx";
// import Login from "../../Pages/User/Login.jsx";
// import Profile from "../../Pages/User/Profile.jsx";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import isAuthUser from '../../utils/isAuthUser.jsx'
// import { set_Authentication } from "../../redux/Authentication/AuthenticationSlice.jsx";
// import { set_user_basic_details } from "../../redux/User/UserBasicDetailsSlice.jsx";
// import axios from "axios";
// const baseURL = "http://127.0.0.1:8000";

// const UserWraper = () => {
//   const dispatch = useDispatch();
//   const authentication_user =useSelector((state)=>state.authentication_user)
//   const checkAuth = async () => {
//     const isAuthenticated = await isAuthUser();
//     dispatch(
//       set_Authentication({
//         name: isAuthenticated.name,
//         isAuthenticated: isAuthenticated.isAuthenticated,
//       })
//     );
//   };
  
//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem("access");
//       console.log(token);
      

//       await axios.get(baseURL + "/api/user/details/", {
//           headers: {
//             authorization: `Bearer ${token}`,
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         })
//         .then((res) => {
//           dispatch(
//             set_user_basic_details({
//               name: res.data.username,
//               profile_pic: res.data.profile_pic,
//             })
//           );
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   useEffect(() => {
//     if (!authentication_user.name) {
//       checkAuth();
//     }
//     if (authentication_user.isAuthenticated) {
//       fetchUserData();
//     }
//     // eslint-disable-next-line
//   }, [authentication_user]);


//   return (
//     <div>
//     <Navbar />
//     <Routes>
//       <Route path="/" element={<Home />}/>
//       <Route path="/signup" element={<Signup />}/>
//       <Route path="/login" element={<Login />}/>
//       <Route path="/profile" element={
//         // <PrivateRoute>
//           <Profile />
//         // {/* </PrivateRoute > */}
//         }/>
//     </Routes>
//     <Footer />
//     </div>
//   )
// }

// export default UserWraper


import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PrivateRoute from '../PrivateRoute.jsx';
import Home from "../../Pages/User/Home.jsx";
import Signup from "../../Pages/User/Signup.jsx";
import Login from "../../Pages/User/Login.jsx";
import Profile from "../../Pages/User/Profile.jsx";
import Navbar from "./Navbar";
import Footer from "./Footer";
import isAuthUser from '../../utils/isAuthUser.jsx';
import { set_Authentication } from "../../redux/Authentication/AuthenticationSlice.jsx";
import { set_user_basic_details } from "../../redux/User/UserBasicDetailsSlice.jsx";

const baseURL = "http://127.0.0.1:8000";

const UserWrapper = () => {
  const dispatch = useDispatch();
  const authentication_user = useSelector((state) => state.authentication_user);
  const navigate = useNavigate()
  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();
    dispatch(
      set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
      })
    );
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("No access token found");

      const res = await axios.get(baseURL + "/api/user/details/", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(res)
      dispatch(
        set_user_basic_details({
          name: res.data.username,
          profile_pic: res.data.profile_pic,
        })
      );
    } catch (error) {
      console.log("Failed to fetch user data:", error);

      if (error.response?.status === 401) {
        localStorage.clear();
        dispatch(
          set_Authentication({
            name: null,
            isAuthenticated: false,
          }))
        // Handle token expiry (e.g., redirect to login)
        console.log("Token expired or invalid. Redirecting to login.");
      }
    }
  };

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuth();
    }
    if (authentication_user.isAuthenticated) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authentication_user.isAuthenticated]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default UserWrapper;
