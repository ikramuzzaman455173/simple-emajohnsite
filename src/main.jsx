import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from './components/Layout/HomeLayout';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductLoader from './Loaders/CartProductsLoader';
import Checkout from './components/Checkout/Checkout';
import Register from './components/Register/Register';
import AuthProvider from './AuthProvider/AuthProvider';
import PrivateRoute from './Routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: <Shop />,
        loader:()=>fetch('http://localhost:4000/totalProducts')
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