import { describe, expect, it } from "vitest";
import { cartReducer, defaultCartState } from "./cart-reducer";
import type { CartState } from "./cart-reducer";

describe("cartReducer", () => {
  it("adds a new item and updates the total", () => {
    const state = cartReducer(defaultCartState, {
      type: "ADD_ITEM",
      item: { id: "m1", name: "Sushi", price: 10, amount: 2 },
    });

    expect(state.items).toEqual([
      { id: "m1", name: "Sushi", price: 10, amount: 2 },
    ]);
    expect(state.totalAmount).toBe(20);
  });

  it("merges amount when adding an item that already exists", () => {
    const initial: CartState = {
      items: [{ id: "m1", name: "Sushi", price: 10, amount: 2 }],
      totalAmount: 20,
    };

    const state = cartReducer(initial, {
      type: "ADD_ITEM",
      item: { id: "m1", name: "Sushi", price: 10, amount: 3 },
    });

    expect(state.items).toEqual([
      { id: "m1", name: "Sushi", price: 10, amount: 5 },
    ]);
    expect(state.totalAmount).toBe(50);
  });

  it("decrements amount when removing an item with amount > 1", () => {
    const initial: CartState = {
      items: [{ id: "m1", name: "Sushi", price: 10, amount: 2 }],
      totalAmount: 20,
    };

    const state = cartReducer(initial, { type: "REMOVE_ITEM", id: "m1" });

    expect(state.items).toEqual([
      { id: "m1", name: "Sushi", price: 10, amount: 1 },
    ]);
    expect(state.totalAmount).toBe(10);
  });

  it("drops the item entirely once its amount reaches 0", () => {
    const initial: CartState = {
      items: [{ id: "m1", name: "Sushi", price: 10, amount: 1 }],
      totalAmount: 10,
    };

    const state = cartReducer(initial, { type: "REMOVE_ITEM", id: "m1" });

    expect(state.items).toEqual([]);
    expect(state.totalAmount).toBe(0);
  });

  it("ignores REMOVE_ITEM for an id that isn't in the cart", () => {
    const initial: CartState = {
      items: [{ id: "m1", name: "Sushi", price: 10, amount: 1 }],
      totalAmount: 10,
    };

    const state = cartReducer(initial, { type: "REMOVE_ITEM", id: "unknown" });

    expect(state).toBe(initial);
  });

  it("returns the current state for an unknown action type", () => {
    const state = cartReducer(defaultCartState, {
      // @ts-expect-error verifying the exhaustive default branch
      type: "UNKNOWN",
    });

    expect(state).toBe(defaultCartState);
  });
});
