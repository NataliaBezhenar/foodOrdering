import styles from "./CartItem.module.css";

interface CartItemProps {
  name: string;
  amount: number;
  price: number;
  onRemove: () => void;
}

const CartItem = (props: CartItemProps) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>x{props.amount}</span>
        </div>
      </div>
      <button onClick={props.onRemove}>Remove</button>
    </li>
  );
};

export default CartItem;
