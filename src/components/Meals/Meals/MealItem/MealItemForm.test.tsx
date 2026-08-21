import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithCart } from "../../../../test-utils";
import HeaderCartButton from "../../../Layout/HeaderCartButton/HeaderCartButton";
import MealItemForm from "./MealItemForm";

describe("MealItemForm", () => {
  it("adds the entered amount to the cart on submit", async () => {
    const user = userEvent.setup();
    renderWithCart(
      <>
        <HeaderCartButton onClick={() => {}} />
        <MealItemForm id="m1" name="Sushi" price={10} />
      </>
    );

    const amountInput = screen.getByLabelText("Amount");
    await user.clear(amountInput);
    await user.type(amountInput, "3");
    await user.click(screen.getByRole("button", { name: "+ Add" }));

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("ignores submission when the amount is out of range", async () => {
    const user = userEvent.setup();
    renderWithCart(
      <>
        <HeaderCartButton onClick={() => {}} />
        <MealItemForm id="m1" name="Sushi" price={10} />
      </>
    );

    const amountInput = screen.getByLabelText("Amount");
    await user.clear(amountInput);
    await user.type(amountInput, "9");
    await user.click(screen.getByRole("button", { name: "+ Add" }));

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
