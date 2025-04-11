import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer } from "./CartReducer";
import { filterReducer } from "./FilterReducer";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export type InitialProduct = {
  id: string;
  name: string;
  price: string | number;
  image: string;
  inStock: number;
  fastDelivery: boolean;
  ratings: number;
  qty?: string | number;
}

export type InitialCartState = {
  products: InitialProduct[];
  cart: any[];
};

const initialCartState : InitialCartState = {
  products: [...Array(20)].map(() => {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.abstract(640, 480, true),
      inStock: faker.helpers.arrayElement([0, 2, 3, 5, 6, 7]),
      fastDelivery: faker.datatype.boolean(),
      ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    };
  }),
  cart: [],
};

type FilterState = {
  byStock: boolean;
  sort:string;
  byFastDelivery: boolean;
  byRating: number;
  bySearchQuery: string;
};

const initialFilterState: FilterState = {
  byStock: false,
  sort:"lowToHigh",
  byFastDelivery: false,
  byRating: 0,
  bySearchQuery: "",
};

type InitialStateType = {
  state: InitialCartState;
  dispatch: React.Dispatch<any>;
  filterState: FilterState;
  filterDispatch: React.Dispatch<any>; 
};


const initialStateType = {
  state: initialCartState,
  dispatch: () => null,
  filterState: initialFilterState,
  filterDispatch: () => null
};

const Cart = createContext<InitialStateType>(initialStateType);


const ContextProvider = ({ children }: Props) => {

  /* Using useReducer hook for shopping Cart */
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  /* Using useReducer hook for shopping Cart */

  /* Using useReducer hook for filtered products */
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  /* Using useReducer hook for filtered products */

  return (
    <Cart.Provider value={{ state, dispatch, filterState, filterDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default ContextProvider;

/* Using the useContext hook and returning it in a function so that i can use it directly */
export const CartState = () => {
  return useContext(Cart);
};
/* Using the useContext hook and returning it in a function so that i can use it directly */
