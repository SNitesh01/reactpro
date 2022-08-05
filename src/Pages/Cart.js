import React, { useContext } from "react";
import { Button,Table } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from "../App";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Products from "./Products";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  
  

  const subTotal = cart.items
    ?.reduce((acc, el) => acc + el.price * el.qty, 0)
    .toFixed(2);
  const discount = ((15 / 100) * subTotal).toFixed(2);
  const grandTotal = (subTotal - discount).toFixed(2);

  //console.log(subTotal, discount, grandTotal);
  const updateCart = (id, action) => {
    const newCartItems = { ...cart };
    const index = newCartItems.items.findIndex((el) => el.id === id);
    if (action === "inc") newCartItems.items[index].qty++;
    else if (action === "dec") newCartItems.items[index].qty--;
    localStorage.setItem("newCartItems", JSON.stringify(newCartItems));

    if (action === "remove") {
      let cartData = newCartItems;
      let itemToBeDeleted = cartData.items.findIndex((item) => item.id === id);
      cartData.items.splice(itemToBeDeleted, 1);
      localStorage.setItem("newCartItems", JSON.stringify(cartData));
    }
    setCart(newCartItems);
  };
  //console.log(cart.items);

  const checkouthandler = () => { 
    <CircularProgress />

  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h3>releted items !!</h3>
          <Products/>

        </div>
     

        <div className="col">
        <h3>Cart !!</h3>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.items?.map((item, id) => (
              <tr key={id}>
                <td>
                  {
                    <img
                      src={item.image}
                      width="50px"
                      height="50px"
                      alt=""
                    ></img>
                  }{" "}
                  {item.title}
                </td>

                <td>{item.price}</td>

                <td>
                  <FaMinus
                    onClick={() => {
                      updateCart(item.id, "dec");
                    }}
                  />
                  <span>{item.qty}</span>

                  <FaPlus
                    onClick={() => {
                      updateCart(item.id, "inc");
                    }}
                  />
                </td>
                <td>
                  <RemoveCircleIcon
                    onClick={() => {
                      updateCart(item.id, "remove");
                    }}
                  />
                </td>

                <td>{(item.price * item.qty).toFixed(2)}</td>
              </tr>
            ))}

            <tr>
              <td>Sub Total</td>
              <td align="right" colSpan={3}>
                {subTotal}
              </td>
            </tr>
            <tr>
              <td>Discount</td>
              <td align="right" colSpan={3}>
                {discount}
              </td>
            </tr>
            <tr>
              <td>Grand Total</td>
              <td align="right" colSpan={3}>
                {grandTotal}
              </td>
            </tr>
          </tbody>
        </Table>

       <Link to='/Checkout'>
          <Button onClick={checkouthandler} className="m-2" disabled={cart.items.length === 0} >
            Checkout !!
          </Button>
        </Link>
        
      </div>     
      </div>
    </div>
  );
}

export default Cart;
