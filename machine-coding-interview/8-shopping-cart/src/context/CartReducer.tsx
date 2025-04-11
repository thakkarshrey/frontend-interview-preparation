import { InitialCartState, InitialProduct } from "./ContextProvider";

type CartAction = {
  type: string;
  payload: InitialProduct;
};

export const cartReducer = (state: InitialCartState, action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log(action.payload, "action.payload");
      const updatedObj = {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
      return updatedObj;

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((elem) => elem.id !== action.payload.id),
      };

    case "CHANGE_CART_QTY":
      console.log(state, action.payload, "state, action.payload");
      return {
        ...state,
        cart: state.cart.map((element) => {
          element.id === action.payload.id
            ? (element.qty = Number(action?.payload?.qty))
            : element.qty;
          return element;
        }),
      };
    default:
      return state;
  }
};
