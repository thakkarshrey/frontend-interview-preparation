import { Button, Form } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/ContextProvider";

const Filters = () => {

  const {
    filterState:{byStock, byRating, sort, byFastDelivery}, filterDispatch
  } = CartState();


  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={()=>{
            filterDispatch({
              type:"SORT_CART_PRODUCTS",
              payload:"lowToHigh"
            })
          }}
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={()=>{
            filterDispatch({
              type:"SORT_CART_PRODUCTS",
              payload:"highToLow"
            })
          }}
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          checked={byStock}
          onChange={()=>filterDispatch({
            type:"FILTER_CART_PRODUCTS_BY_OUT_OF_STOCK"          
          })}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          checked={byFastDelivery}
          onChange={()=>filterDispatch({
            type:"FILTER_CART_PRODUCTS_BY_FAST_DELIVERY"          
          })}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          onClick={(i) => filterDispatch({
            type:"FILTER_CART_PRODUCTS_BY_RATING",
            payload: i + 1          
          })}
          rating={byRating}
          style={{ cursor: "pointer" }}

        />
      </span>
      <Button variant="light"
      onClick={(i) => filterDispatch({
        type:"CLEAR_PRODUCTS"
      })}
      >Clear Filters</Button>
    </div>
  );
};

export default Filters;
