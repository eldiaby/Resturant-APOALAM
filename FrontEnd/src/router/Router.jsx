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
import EmailOtp from "../components/EmailForOtp";
import ResetPassword from "../components/resetPassword";
import PaymentPage from "../components/CheckOutBtn";
import CheckOutSuccess from "../components/CheckOutSuccess";

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
        path: "/canceled-true",
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
      {
        path: "/success-true",
        element: <CheckOutSuccess />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/EamilOtp",
    element: <EmailOtp />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/paymentPage",
    element: <PaymentPage />,
  },
]);

export default router;
