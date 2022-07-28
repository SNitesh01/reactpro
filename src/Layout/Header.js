import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLogged, setisLogged] = useState(false);

  useEffect(() => {
    checkStorage();
    return () => {};
  }, [isLogged]);
  function checkStorage() {
    if (localStorage.getItem("user")) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }
  const logout = () => {
    localStorage.removeItem("user");
    setisLogged(false);
  };

  return (
   <div>
   <Navbar bg="light">
   <Container>
     <Navbar.Brand href="#home">Logo</Navbar.Brand>
     <Navbar.Toggle aria-controls="basic-navbar-nav" />
     <Navbar.Collapse id="basic-navbar-nav">
       <Nav className="me-auto">
       
         <Nav.Link>
         {!isLogged ? (
           <Link to="/register">Signup</Link>
           ) : (
            <Link to="/product">Add Products</Link>

            )}
         </Nav.Link>

         <Nav.Link>
           {!isLogged ? (
             <Link to="/login">Login</Link>
           ) : (
             <Link to="/" onClick={logout}>
               Logout
             </Link>
           )}
         </Nav.Link>
        

         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
           <NavDropdown.Item href="#action/3.2">
             Another action
           </NavDropdown.Item>
           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
           <NavDropdown.Divider />
           <NavDropdown.Item href="#action/3.4">
             Separated link
           </NavDropdown.Item>
         </NavDropdown>
       </Nav>
     </Navbar.Collapse>
   </Container>
 </Navbar>

 
   </div>
  );
};

export default Header;

// karn.yong@mecallapi.com / mecallapi
// ivy.cal@mecallapi.com / mecallapi
