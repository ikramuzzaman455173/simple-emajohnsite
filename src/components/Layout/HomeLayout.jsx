import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';
const HomeLayout = () => {
  return (
    <>
      <Header/>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default HomeLayout;