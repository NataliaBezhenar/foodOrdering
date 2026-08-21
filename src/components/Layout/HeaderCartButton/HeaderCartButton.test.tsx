import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithCart } from "../../../test-utils";
import HeaderCartButton from "./HeaderCartButton";

describe("HeaderCartButton", () => {
  it("shows a badge of 0 when the cart is empty", () => {
    renderWithCart(<HeaderCartButton onClick={() => {}} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithCart(<HeaderCartButton onClick={onClick} />);

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
