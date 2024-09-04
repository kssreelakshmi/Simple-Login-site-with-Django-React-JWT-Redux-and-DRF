// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import UserWraper from './Components/user/UserWraper';
import AdminWrapper from './Components/admin/AdminWrapper';
import userStore from './redux/userStore'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 

const App = () => {
  return (
    <>
    <Router>
    < ToastContainer />
      <Provider store={userStore}>
        <Routes>
        <Route path="/*" element={<UserWraper />} />
        <Route path="/admin/*" element={<AdminWrapper />} />
        </Routes>
      </Provider>
    </Router>
    </>
  );
};

export default App;
