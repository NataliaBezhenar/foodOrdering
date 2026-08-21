import styles from "./MealItemForm.module.css";
import Input from "../../../UI/Input";

interface MealItemFormProps {
  id: string;
}

const MealItemForm = (props: MealItemFormProps) => {
  return (
    <form className={styles.form}>
      <Input
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
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
