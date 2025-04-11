import React, { useEffect, useState } from "react";
import { CartState } from "../context/ContextProvider";
import { ListGroup, Button, Row, Col, Form, Image } from "react-bootstrap";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";


const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, elem) => {
        return acc + (elem.price * 1) * (elem.qty * 1);
      }, 0)
    );
  }, [cart]);



  return (
    <>
      <div className="home">
        <ListGroup className="shopping-cart__list-group">
          {cart?.map((element) => {
            return (
              <ListGroup.Item>
                <Row>
                  <div>
                    <Image
                      style={{ width: 200, borderRadius:3 }}
                      src={element.image}
                      alt={element.name}
                    />
                  </div>
                  <Col md={2}>
                    <h3>{element.name}</h3>
                  </Col>
                  <Col md={2}>
                    <span>₹ {element.price}</span>
                  </Col>
                  <Col md={2}>
                    <Rating rating={element.ratings} />
                  </Col>
                  <Col md={2}>
                    <Form.Control as="select" value={element.qty}
                    onChange={(event:React.SyntheticEvent) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          ...element,
                          qty:((event.target as HTMLInputElement).value)
                        }
                      })
                    }
                    >
                      {[...Array(5).keys()].map((x) => {
                        return <option key={x + 1}>{x + 1}</option>;
                      })}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <AiFillDelete
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: element,
                        })
                      }
                      fontSize="25px"
                      style={{ cursor: "pointer" }}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <div className="filters">
          <div
            className="checkout-details"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div className="subtotal" style={{ fontSize: 30, fontWeight: 400 }}>
              Subtotal of ({cart.length}) items
            </div>
            <div className="total" style={{ fontSize: 20, fontWeight: 700 }}>
              Total : ₹ {total}{" "}
            </div>
            <Button>Proceed To Checkout</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
