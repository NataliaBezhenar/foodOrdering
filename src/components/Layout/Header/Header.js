import styles from "./Header.module.css";
import headerImage from "../../../assets/meals.jpg";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>SuperMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={styles["main-image"]}>
        <img src={headerImage} alt="A table full of delicious food" />
      </div>
    </>
  );
};

export default Header;
