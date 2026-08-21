import type { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card = (props: CardProps) => {
  const classes = `${styles.card} ${props.className || ""}`;
  return <div className={classes}>{props.children}</div>;
};

export default Card;
