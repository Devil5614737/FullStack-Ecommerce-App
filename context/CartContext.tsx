import { createContext, ReactNode, useEffect, useState } from "react";
import { CartContextI } from "../interfaces/CartContext";
import { ProductI } from "../interfaces/ProductI";
import { request } from "../api/request";

export const CartContext = createContext({} as CartContextI);

interface CartContextProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProps) => {
  const [cartItems, setCartItems] = useState<ProductI[]>([]);
  const[fetch,setFetch]=useState<boolean>(false)

  const getCartItems = async () => {
    const { data } = await request.post("/data/get-cart-item");
    setCartItems(data as ProductI[]);

  };

  useEffect(() => {
    getCartItems();
    return ()=>setFetch(false);
  }, [fetch]);




  return (
    <CartContext.Provider value={{ cartItems,fetch,setFetch }}>
      {children}
    </CartContext.Provider>
  );
};
