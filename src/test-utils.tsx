import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import CartProvider from "./store/CartProvider";

export function renderWithCart(ui: ReactElement) {
  return render(<CartProvider>{ui}</CartProvider>);
}
