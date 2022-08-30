import MealsSummary from "../MealsSummary/MealsSummary";
import AvailableMeals from "../AvailableMeals/AvailableMeals";
import { Fragment } from "react";

const Meals = () => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;
