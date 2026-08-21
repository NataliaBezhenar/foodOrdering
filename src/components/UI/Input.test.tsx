import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("renders a label associated with the input", () => {
    render(
      <Input label="Amount" input={{ id: "amount", type: "number" }} />
    );

    const input = screen.getByLabelText("Amount");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "number");
  });

  it("forwards the ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} label="Amount" input={{ id: "amount" }} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
