import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "./CartItem";

describe("CartItem", () => {
  it("renders name, formatted price, and amount", () => {
    render(
      <ul>
        <CartItem name="Sushi" amount={2} price={12.5} onRemove={() => {}} />
      </ul>
    );

    expect(screen.getByText("Sushi")).toBeInTheDocument();
    expect(screen.getByText("$12.50")).toBeInTheDocument();
    expect(screen.getByText("x2")).toBeInTheDocument();
  });

  it("calls onRemove when the Remove button is clicked", async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();
    render(
      <ul>
        <CartItem name="Sushi" amount={1} price={12.5} onRemove={onRemove} />
      </ul>
    );

    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(onRemove).toHaveBeenCalledOnce();
  });
});
