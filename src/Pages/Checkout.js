import React, { useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import '../App.css'

function Checkout() {
  const [page, setPage] = useState(0);
  const [valid, setValid] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    nationality: "",
    other: "",
    
  });

  const FormTitles = ["Shiping Address!!", "Payment Method!!","Order Summery!!"];

  const PageDisplay = () => {
    if (page === 0) {
      return <AddressForm valid={valid} setValid={setValid} formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <PaymentForm formData={formData} setFormData={setFormData} />;
    } else if(page === 2){
      return <Review formData={formData} setFormData={setFormData} />;
    }
   
  };

  return (
    <div className="container mt-5">
     <div className="row">
      <div className="col">
      <div className="progressbar">
        <div
          style={{ width: page === 0 ? "20%" : page === 1 ? "40%" : "100%" }}
        ></div>
      </div>


      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
       
        <div className="footer">
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("Thank you !!");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
      
      </div>
     <div className="col">
     <h1>gfcg</h1>
     </div>
     </div>
    
    </div>
  );
}

export default Checkout;