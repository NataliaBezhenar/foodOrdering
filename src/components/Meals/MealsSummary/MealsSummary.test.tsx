import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MealsSummary from "./MealsSummary";

describe("MealsSummary", () => {
  it("renders the heading", () => {
    render(<MealsSummary />);

    expect(
      screen.getByRole("heading", { name: /delicious food, delivered to you/i })
    ).toBeInTheDocument();
  });
});
