import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../../src/App.css";
import Footer from "../components/Footer";
import { CartProvider } from "../context/cartContext.jsx";

const Main = ({ username, setUsername }) => {

  return (
    <CartProvider>
      <div className="bg-prigmayBG">
        <Navbar username={username} setUsername={setUsername} />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Main;
