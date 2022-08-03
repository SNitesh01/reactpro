import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert";
import './pages.css';
import swal from 'sweetalert';
import Joi from "joi";

//validation using joi
const loginSchema = Joi.object({
  username: Joi.string()
    .min(4)
    .max(50)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .label("username"),
  password: Joi.string().min(4).max(50).required().label("password"),
});


 
 async function loginUser(credentials) {
  return  fetch('https://www.mecallapi.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

function Login() {

  const [errors, setErrors] = useState([]);


  const [form, setForm] = useState({
    username:"",
    password:""
  })
  //console.log(form)
 
  const handleSubmit = async e => {
    e.preventDefault();
    //validate formdata
    let result = loginSchema.validate(form, { abortEarly: false });
    if (result.error) {
      setErrors(result.error.details);
      return;
    }
    const response = await loginUser(
      form
    );
    if ('accessToken' in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/dashboard";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  }

const HandleChange = (e) => { 
  const {name,value} = e.target;
  setForm((form)=>({
    ...form,[name]:value
  }))
 }

  return (
    <div>
    <Form className='form' onSubmit={handleSubmit}>
    <h1>Login !!</h1>
    {errors?.find(er => er?.path[0] === "server")?.message && (
      <Alert variant="danger">
        {errors?.find(er => er?.path[0] === "server")?.message}
      </Alert>
    )}
   
   
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control onChange={HandleChange} type="email" name="username" placeholder="Enter email"  />
      {errors && (
        <Form.Text className="text-danger">
          {errors?.find(er => er?.path[0] === "username")?.message}
        </Form.Text>
      )}
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

   
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control onChange={HandleChange} type="password" name="password" placeholder="Password" />
      {errors && (
        <Form.Text className="text-danger">
          {errors?.find(er => er?.path[0] === "password")?.message}
        </Form.Text>
      )}
    </Form.Group>
    
   
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
    </div>
  )
}

export default Login