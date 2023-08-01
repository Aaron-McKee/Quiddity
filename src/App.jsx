
import React from 'react';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Quids from "./pages/quids/Quids";
import Quid from "./pages/quid/Quid";
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
// import Location from "./pages/location/Location";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyQuids from "./pages/myQuids/MyQuids";
import "./app.scss";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";


function App() {
  const queryClient = new QueryClient();

  const Layout = function() {
    return (
      <div className="app">
    <QueryClientProvider client={queryClient}>
    
      <Navbar />
      <Outlet />
      <Footer /> 
      
    </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children : [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/quids",
          element: <Quids />
        },
        {
          path: "/quid/:id",
          element: <Quid />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/myQuids",
          element: <MyQuids />
        },
        {
          path: "/add",
          element: <Add />
        },
        // {
        //   path: "/location",
        //   element: <Location />
        // },
        {
          path: "/messages",
          element: <Messages />
        },
        {
          path: "/message/:id",
          element: <Message />
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },

      ]
    },
  ]);
  
 return (
    <div>
      <RouterProvider router={router} />
      
    </div> 
    
 );
};


export default App;
