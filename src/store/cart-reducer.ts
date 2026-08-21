export interface CartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string };

export const defaultCartState: CartState = { items: [], totalAmount: 0 };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      let updatedItems: CartItem[];
      if (existingIndex > -1) {
        const existingItem = state.items[existingIndex];
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case "REMOVE_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems: CartItem[];
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingIndex] = updatedItem;
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    default:
      return state;
  }
}
