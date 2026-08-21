import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders its children into the overlay root", () => {
    render(
      <Modal onClose={() => {}}>
        <p>modal content</p>
      </Modal>
    );

    expect(screen.getByText("modal content")).toBeInTheDocument();
  });

  it("calls onClose when the backdrop is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <Modal onClose={onClose}>
        <p>modal content</p>
      </Modal>
    );

    const backdrop = container.ownerDocument.querySelector(
      "#backdrop-root > div"
    )!;
    await user.click(backdrop);

    expect(onClose).toHaveBeenCalledOnce();
  });
});
