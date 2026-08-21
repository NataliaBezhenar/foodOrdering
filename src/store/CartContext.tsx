import { createContext } from "react";
import type { CartItem } from "./cart-reducer";

export interface CartContextValue {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

export const CartContext = createContext<CartContextValue>({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});
