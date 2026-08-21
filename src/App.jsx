import { useState } from "react";

import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals/Meals";
import Cart from "./components/Cart/Cart";
import Modal from "./components/UI/Modal";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>
      {cartIsShown && (
        <Modal onClose={hideCartHandler}>
          <Cart onClose={hideCartHandler} />
        </Modal>
      )}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </>
  );
}

export default App;
