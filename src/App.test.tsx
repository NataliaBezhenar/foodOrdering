import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithCart } from "./test-utils";
import App from "./App";

describe("App", () => {
  it("renders the header and meals, with the cart modal closed initially", () => {
    renderWithCart(<App />);

    expect(screen.getByText("SuperMeals")).toBeInTheDocument();
    expect(screen.getByText("Sushi")).toBeInTheDocument();
    expect(screen.queryByText("Total Amount")).not.toBeInTheDocument();
  });

  it("opens the cart modal when the cart button is clicked", async () => {
    const user = userEvent.setup();
    renderWithCart(<App />);

    await user.click(screen.getByText("Your Cart"));

    expect(screen.getByText("Total Amount")).toBeInTheDocument();
  });
});
