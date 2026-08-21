import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithCart } from "../../../test-utils";
import Header from "./Header";

describe("Header", () => {
  it("renders the title and calls onShowCart when the cart button is clicked", async () => {
    const onShowCart = vi.fn();
    const user = userEvent.setup();
    renderWithCart(<Header onShowCart={onShowCart} />);

    expect(screen.getByText("SuperMeals")).toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    expect(onShowCart).toHaveBeenCalledOnce();
  });
});
