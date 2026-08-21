import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithCart } from "../../../test-utils";
import AvailableMeals from "./AvailableMeals";

describe("AvailableMeals", () => {
  it("renders every dummy meal", () => {
    renderWithCart(<AvailableMeals />);

    expect(screen.getByText("Sushi")).toBeInTheDocument();
    expect(screen.getByText("Schnitzel")).toBeInTheDocument();
    expect(screen.getByText("Barbecue Burger")).toBeInTheDocument();
    expect(screen.getByText("Green Bowl")).toBeInTheDocument();
  });
});
