import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext(); //creating context here

//search provider created with this we can access anywhere in the app
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
