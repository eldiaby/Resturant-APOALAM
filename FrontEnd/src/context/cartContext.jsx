import React, { createContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext();

// CartProvider component to wrap your app
export const CartProvider = ({ children }) => {
    const [cartLength, setCartLength] = useState(0); // Initial value for cart length

    return (
        <CartContext.Provider value={{ cartLength, setCartLength }}>
            {children}
        </CartContext.Provider>
    );
};
