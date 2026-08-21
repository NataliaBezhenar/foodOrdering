import { useContext, useRef } from "react";
import type { FormEvent } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../../../UI/Input";
import { CartContext } from "../../../../store/CartContext";

interface MealItemFormProps {
  id: string;
  name: string;
  price: number;
}

const MealItemForm = (props: MealItemFormProps) => {
  const amountInputRef = useRef<HTMLInputElement>(null);
  const cartCtx = useContext(CartContext);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const enteredAmount = +amountInputRef.current!.value;
    if (isNaN(enteredAmount) || enteredAmount < 1 || enteredAmount > 5) {
      return;
    }

    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: enteredAmount,
    });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
