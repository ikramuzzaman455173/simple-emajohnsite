import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from './AuthProvider/AuthProvider';
import Checkout from './components/Checkout/Checkout';
import Inventory from './components/Inventory/Inventory';
import HomeLayout from './components/Layout/HomeLayout';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders';
import Register from './components/Register/Register';
import Shop from './components/Shop/Shop';
import './index.css';
import cartProductLoader from './Loaders/CartProductsLoader';
import PrivateRoute from './Routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <Shop />,
        loader: () => fetch('https://simple-emajohn-site-server.vercel.app/totalProducts')
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: cartProductLoader,
      },
      {
        path: "checkout",
        element:<PrivateRoute><Checkout /></PrivateRoute>
      },
      {
        path: "inventory",
        element: <PrivateRoute><Inventory /></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    {/* <React.StrictMode> */}
      <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </AuthProvider>
);