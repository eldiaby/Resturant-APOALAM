import React from "react";
import axios from "axios";

import { decode } from "jwt-js-decode";
const CheckOutBtn = ({ items }) => {
  // const user = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");

  let jwt = decode(token);
  const user = jwt.payload;

  const handleCheckout = () => {
    console.log(user._id);

    axios
      .post(`http://localhost:5000/api/create-checkout-session`, {
        items,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <button className="btn bg-green text-white" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default CheckOutBtn;
