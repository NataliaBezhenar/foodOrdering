import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithCart } from "../../../../test-utils";
import MealItem from "./MealItem";

describe("MealItem", () => {
  it("renders the meal name, description, formatted price, and amount form", () => {
    renderWithCart(
      <ul>
        <MealItem id="m1" name="Sushi" description="Tasty" price={22.99} />
      </ul>
    );

    expect(screen.getByText("Sushi")).toBeInTheDocument();
    expect(screen.getByText("Tasty")).toBeInTheDocument();
    expect(screen.getByText("$22.99")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  });
});
