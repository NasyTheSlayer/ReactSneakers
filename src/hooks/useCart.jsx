import { useContext } from "react"
import AppContext from "../context/AppContext"

export const useCart = () => {
  const { cartItems, setCartitems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj + sum, 0);

  return { cartItems, setCartitems, totalPrice };
};
