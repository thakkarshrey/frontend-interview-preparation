import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/ContextProvider";

type Props = {
  element: {
    id: string;
    price: number | string;
    name: string;
    image: string;
    inStock: number;
    fastDelivery: boolean;
    ratings: number;
  };
};

const SingleProduct = ({ element }: Props) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <>
      <div className="product">
        <Card>
          <Card.Img variant="top" src={element.image} alt={element.name} />
          <Card.Body>
            <Card.Title>{element.name}</Card.Title>
            <Card.Subtitle className="subtitle">
              <span>₹ {element.price}</span>
              {element.fastDelivery ? (
                <div>Fast delivery</div>
              ) : (
                <div>4 day delivery</div>
              )}
              <Rating rating={element.ratings} />
              <div className="button-container">
                {cart.some((elem) => elem.id === element.id) ? (
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: element,
                      });
                    }}
                  >
                    Remove from cart
                  </Button>
                ) : (
                  <Button
                    disabled={!element.inStock}
                    onClick={() => {
                      dispatch({
                        type: "ADD_TO_CART",
                        payload: element,
                      });
                    }}
                  >
                    {!element.inStock ? "Out of stock" : "Add to cart"}
                  </Button>
                )}
              </div>
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
