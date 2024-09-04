import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate ,Link } from 'react-router-dom';
import { Bounce, Slide, Zoom, toast } from 'react-toastify';
import { set_Authentication } from '../../redux/Authentication/AuthenticationSlice';

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authentication_user = useSelector((state) => state.authentication_user);
  const is_authenticated = useSelector(
    (state) => state.authentication_user.isAuthenticated
  );
  const user_basic_details = useSelector((state) => state.user_basic_details);
  const logout = () => {
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
        isAdmin: false,
      })
    );
    navigate("/admin/login");

    toast.info("Logged out !", {
      position: "top-center",
      autoClose: 1999,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };
  
  return (
    <div className='absolutte max-w-full h-14 bg-gray-600'>
    <div className="relative max-w-full h-16 bg-gradient-to-r from-gray-700 via-gray-900 to-black p-4 flex items-center justify-between rounded-b-md z-20">
      <div className="text-3xl text-white text-opacity-60">
      <p className="m-0 font-serif font-semibold">
          <Link to='/admin'>
          Hodophile
          </Link>
        </p>
      </div>
      {!authentication_user.isAuthenticated ?(
          <Link className="bg-gray-500 text-lg text-white px-4 py-2 rounded-xl shadow-lg" to="/admin/login">
          Login
        </Link> ) : (
        <button onClick={()=>logout()} className="bg-gray-500 text-lg text-white px-4 py-2 rounded-xl shadow-lg">Logout</button>
      )
}
      {/* <div className="flex items-center space-x-4">
        <button className="bg-gray-500 text-lg text-white px-4 py-2 rounded-xl shadow-lg">Login</button>
        <button className="bg-gray-500 text-lg text-white px-4 py-2 rounded-xl shadow-lg">Sign Up</button>
        <div className="bg-black rounded-full w-10 h-10 overflow-hidden">
          <button>
          <img
            className="rounded-full w-full h-full object-cover"
            src="https://imgs.search.brave.com/uFVivMWdV33VC0QbgrTXEPKsHo4Ouvx02eGK8J-uDTU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzIxLzg5LzI4/LzM2MF9GXzcyMTg5/Mjg5Ml94Zndwc2hz/UDJHR2hNRWw5enBI/a2RWTFI5ZFhrQk9j/dS5qcGc"
            alt="Profile"
          />
          </button>
        </div>
      </div> */}
    </div>
    </div>
  );
};

export default Navbar;
