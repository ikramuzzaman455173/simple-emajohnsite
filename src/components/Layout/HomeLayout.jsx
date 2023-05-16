import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import LoadingAnimation from '../Loading/Loading';
const HomeLayout = () => {
  const { loading } = useContext(AuthContext)
  if (loading) {
    return <LoadingAnimation/>
  }
  return (
    <>
      <Header/>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default HomeLayout;