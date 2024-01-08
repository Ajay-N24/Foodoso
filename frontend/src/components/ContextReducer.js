import React, { createContext, useContext, useReducer, useState } from "react";
const CartStateContext = createContext();
const CartDispatchContent = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (action.id === food.id) {
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + parseInt(food.qty),
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;
    case "DROP":
      let empArray = [];
      return empArray;
    default:
      console.log("Error in Reducer");
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContent.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContent.Provider>
  );
};
export const useCart = () => {
  return useContext(CartStateContext);
};
export const useDispatchCart = () => {
  return useContext(CartDispatchContent);
};
