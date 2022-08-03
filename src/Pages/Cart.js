import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from "../App";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axios from "axios";


function Cart() {

  const { cart, setCart } = useContext(CartContext);
  const [Products, setProducts] = useState([]);

    useEffect(() => {
        axios("https://fakestoreapi.com/products").then(res => {
         setProducts(res.data);
  
        })
       
      }, [])

  const subTotal = cart.items
    ?.reduce((acc, el) => acc + el.price * el.qty, 0)
    .toFixed(2);
  const discount = ((15 / 100) * subTotal).toFixed(2);
  const grandTotal = (subTotal - discount).toFixed(2);

  //console.log(subTotal, discount, grandTotal);

  const updateCart = (id, action) => {
    const newCartItems = { ...cart };
    const index = newCartItems.items.findIndex(el => el.id === id);
    if (action === "inc") newCartItems.items[index].qty++;
    else if(action === "dec") newCartItems.items[index].qty--;
    setCart(newCartItems);
  };
  //console.log(cart);


  let list = Products
  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);
    setProducts(newList)

    console.log(newList);
  }
  return (
    <div className="container">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Action</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.items?.map((item, id) => (
            <tr key={id}>
              <td>{item.title} </td>
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
                onClick={() =>{
                  handleRemove(item.id)
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
    
      
    </div>
  );
}

export default Cart;

