import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Dashboard } from "./Pages/Dashboard";
import Protected from "./Routes/Protected";
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";

function App() {
  // let api_base_url = process.env.REACT_APP_SERVICE_ID;
  // console.log(api_base_url,'env')
  
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route excat path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<Protected Component={Dashboard} />}
          />
          <Route
            path="/product"
            element={<Protected Component={AddProduct} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
