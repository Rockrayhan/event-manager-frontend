import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";
import Profile from "./pages/Profile.jsx";

import Purchased from "./pages/Purchased.jsx";
import AddEvent from "./pages/AddEvents.jsx";
import MyEvents from "./pages/MyEvents.jsx";
import EditEvent from "./pages/EditEvent.jsx";
import AllEvents from "./pages/AllEvents.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/all-events",
        element: <PrivateRoute> <AllEvents /> </PrivateRoute>   ,
        // loader: ()=> fetch("https://event-manager-server-bqcq.onrender.com/products")
      },
      // {
      //   path:"/products/:id",
      //   element: <Payment/>,
      //   loader: ({params})=>
      //     fetch(`https://event-manager-server-bqcq.onrender.com/products/${params.id}`),
      // },
      {
        path: "/events/edit/:id",
        element: <EditEvent />,
        loader: ({ params }) =>
          fetch(`https://event-manager-server-bqcq.onrender.com/events/${params.id}`),
      },

      {
        path: "/add-event",
        element: <PrivateRoute> <AddEvent /> </PrivateRoute> ,
      },

      {
        path: "/my-event",
        element: <PrivateRoute> <MyEvents /> </PrivateRoute>,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/profile",
            element: <Profile />,
          },
          // {
          //   path:"",
          //   element: <UserProfile/>
          // },

          {
            path: "/dashboard/add-event",
            element: <AddEvent />,
          },

          {
            path: "/dashboard/my-event",
            element: <MyEvents />,
          },

          {
            path: "",
            element:  <AllEvents />  ,
          },

          {
            path: "/dashboard/my-purchased",
            element: <Purchased />,
          },
          // {
          //   path:"/dashboard/payment",
          //   element: <Payment/>,
          // },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
