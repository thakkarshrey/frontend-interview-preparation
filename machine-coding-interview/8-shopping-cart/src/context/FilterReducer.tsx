type FilterCartState = {
    byStock: boolean;
    sort: string;
    byFastDelivery: boolean;
    byRating: number;
    bySearchQuery: string;
  };
  
  type FilterCartAction = {
    type: string;
    payload: any;
  };
  
  export const filterReducer = (
    state: FilterCartState,
    action: FilterCartAction
  ) => {
    switch (action.type) {
      case "SORT_CART_PRODUCTS":
        return { ...state, sort: action.payload };

      case "SEARCH_PRODUCTS":
        return { ...state, bySearchQuery: action.payload };
  
      case "FILTER_CART_PRODUCTS_BY_OUT_OF_STOCK":
        return { ...state, byStock: !state.byStock };
  
      case "FILTER_CART_PRODUCTS_BY_FAST_DELIVERY":
        return { ...state, byFastDelivery: !state.byFastDelivery };
  
      case "FILTER_CART_PRODUCTS_BY_RATING":
        return { ...state, byRating: action.payload };
  
      case "CLEAR_PRODUCTS":
        return {
          byStock: false,
          sort:"",
          byFastDelivery: false,
          byRating: 0,
          bySearchQuery: "",
        };
  
      default:
        return state;
    }
  };
  