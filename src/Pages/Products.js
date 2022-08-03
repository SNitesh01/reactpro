import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RecipeReviewCard from '../Components/RecipeReviewCard';


function Products() {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        axios("https://fakestoreapi.com/products").then(res => {
         setProducts(res.data);
  
        })
       
      }, [])

      //console.log(Products)
  return (
    <div className='container mt-5 g-5'>
    <div className="row">
    {Products.map((item,index) => {
      return (
        <RecipeReviewCard item={item} key={index} />
       );
    })}
</div>
    </div>
  )
}

export default Products