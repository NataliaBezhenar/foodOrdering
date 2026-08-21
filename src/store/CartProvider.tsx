import { useReducer } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import { cartReducer, defaultCartState } from "./cart-reducer";
import type { CartItem } from "./cart-reducer";

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider = (props: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const removeItemHandler = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const cartContextValue = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
