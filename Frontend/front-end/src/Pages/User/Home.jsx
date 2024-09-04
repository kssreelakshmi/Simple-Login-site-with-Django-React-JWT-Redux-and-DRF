import React from 'react';
import Image from '../../assets/Image1.jpg';
import { useDispatch, useSelector } from 'react-redux';
const Home = () => {
  const authentication_user = useSelector((state) => state.authentication_user);
  console.log(authentication_user.name);
  return (
    <div className="relative h-screen w-full ">
      <img
        src={Image}
        className="absolute top-0 inset-0 h-full w-full object-cover"
        alt="Background"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative flex items-center justify-center h-full">
        <h1 className="text-white text-center text-4xl">Hi, {authentication_user.name}<br/> Welcome to Hodophile</h1>
      </div>
    </div>
  );
};

export default Home;
