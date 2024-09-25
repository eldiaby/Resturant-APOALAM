import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import SignUp from "../components/SignUp";
import CartPage from "../pages/shop/CartPage";
import Login from "../components/Login";
import ReservationForm from "../services/ReservationForm";
import ProfileOrders from "../pages/shop/profileOrdes";
import ProfileSettings from "../pages/profile/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
      {
        path: "/orders",
        element: <ProfileOrders />,
      },
      {
        path: "/ReservationForm",
        element: <ReservationForm />,
      },
      {
        path: "/Profile",
        element: <ProfileSettings />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
