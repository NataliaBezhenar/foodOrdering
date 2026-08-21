import { useContext, useEffect } from "react";
import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithCart } from "../../test-utils";
import { CartContext } from "../../store/CartContext";
import Cart from "./Cart";

const Seed = () => {
  const { addItem } = useContext(CartContext);
  useEffect(() => {
    addItem({ id: "m1", name: "Sushi", price: 10, amount: 2 });
    // Runs once on mount to seed the cart for this test; addItem is a fresh
    // closure every render, so it's intentionally left out of the deps.
  }, []);
  return null;
};

describe("Cart", () => {
  it("shows an empty total when there are no items", () => {
    renderWithCart(<Cart onClose={() => {}} />);

    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("calls onClose when Close is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithCart(<Cart onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders an added item and the computed total", async () => {
    renderWithCart(
      <>
        <Seed />
        <Cart onClose={() => {}} />
      </>
    );

    expect(await screen.findByText("Sushi")).toBeInTheDocument();
    expect(screen.getByText("x2")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
  });
});
