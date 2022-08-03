import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./pages.css";

function Register() {

  const [form, setForm] = useState({
    username:"",
    email:'',
    mobile:'',
    address:'',
    password:""
  })

console.log(form)
  const handleInputChange = (e) => {
      const {id , value} = e.target;
      if(id === "username"){
          setForm(value);
      }
      if(id === "email"){
        setForm(value);
      }
      if(id === "mobile"){
  setForm(value);
      }
      if(id === "address"){
        setForm(value);
      }
      if(id === "password"){
          setForm(value);
      }

  }

  const handleSubmit  = () => {
   //console.log(username,email,mobile,address,password);
}

  return (
    <div>
      <Form className="form" onChange = {(e) => handleInputChange(e)}>
        <h1>Register !!</h1>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="name" placeholder="Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mobile no</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Addres</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Create Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button onClick={()=>handleSubmit()} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
