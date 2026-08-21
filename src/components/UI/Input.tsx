import type { InputHTMLAttributes, Ref } from "react";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  input: InputHTMLAttributes<HTMLInputElement> & { id: string };
  ref?: Ref<HTMLInputElement>;
}

const Input = (props: InputProps) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={props.ref} {...props.input} />
    </div>
  );
};

export default Input;
