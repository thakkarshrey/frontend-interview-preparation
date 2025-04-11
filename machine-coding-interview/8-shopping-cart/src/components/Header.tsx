import {
  Navbar,
  Container,
  FormControl,
  Dropdown,
  Nav,
  Badge,
  Button
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from "../context/ContextProvider";
import "./styles.css";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    filterState:{bySearchQuery},
    filterDispatch
  } = CartState();


  return (
    <>
      <Navbar variant="dark" className="navbar">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{cursor:'pointer'}}>Shopping Cart</Link>
          </Navbar.Brand>
          <Navbar.Text className="search">
            <FormControl
              type="text"
              placeholder="Search"
              style={{ width: 500 }}
              value={bySearchQuery}
              onChange={(event)=>filterDispatch({
                type:"SEARCH_PRODUCTS",
                payload:event.target.value
              })}
            />
          </Navbar.Text>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge bg="success">{cart.length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                  <div className="cart-products-wrapper">
                  {cart.length > 0 ? (
                      <>
                      {cart?.map((element) => {
                        return (
                          <div className="cart-products-wrapper__product">
                            <div
                              style={{
                                display: "flex",
                                gap: "0.5rem",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div className="image-container">
                                <img
                                  src={element.image}
                                  alt={element.name}
                                  className="navbar-image"
                                />
                              </div>
                              <div className="info-container">
                                <div>{element.name}</div>
                                <div>₹ {element.price}</div>
                              </div>
                            </div>
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
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="cart-products-wrapper__product" style={{justifyContent:'center'}}>
                      Cart is empty!!
                    </div>
                  )}
                  <Link to="/cart" className="cart-products-wrapper__product">
                  <Button style={{width:'100%'}}>Go To Cart</Button>
                  </Link>
                  </div>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
