import React from 'react'

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Protected from "./Routes/Protected";
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";
import Products from "./Pages/Products";
import Cart from './Pages/Cart';
import Dashboard from './Pages/Dashboard';



export const CartContext = React.createContext();

function App() {
  // let api_base_url = process.env.REACT_APP_SERVICE_ID;
  // console.log(api_base_url,'env')

  const [cart, setCart] = React.useState({
    items: [],
  });
  
  return (
    <div>
    <CartContext.Provider value={{ cart, setCart }}>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route excat path="/" element={<Home />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Protected Component={Login} />}/>
      <Route path="/products" element={<Products />} />

      <Route
        path="/dashboard"
        element={<Protected Component={Dashboard} />}
      />
      <Route
        path="/product"
        element={<Protected Component={AddProduct} />}
      />
      <Route
        path="/cart"
        element={<Protected Component={Cart} />}
      />
    </Routes>
  </BrowserRouter>
       
    
    
    </CartContext.Provider>
     
    </div>
  );
}

export default App;

