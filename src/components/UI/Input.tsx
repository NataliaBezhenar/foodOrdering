import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  input: InputHTMLAttributes<HTMLInputElement> & { id: string };
}

const Input = (props: InputProps) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
