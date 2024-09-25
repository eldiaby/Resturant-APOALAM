import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../../src/App.css";
import Footer from "../components/Footer";

const Main = ({ username, setUsername }) => {
  return (
    <div className="bg-prigmayBG">
      <Navbar username={username} setUsername={setUsername} />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
