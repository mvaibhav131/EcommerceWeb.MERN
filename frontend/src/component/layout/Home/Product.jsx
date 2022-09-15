
import {Link} from "react-router-dom";
import React from 'react';
import ReactStars from "react-rating-stars-component";
import "./Home.css"

const options = {
  edit : false,
  color : "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  size:window.innerWidth < 600 ? 10 : 20,
  value:3.5,
  isHalf:true,
};

const Products = ({product}) => {
  return (
  <Link className="productCard" to={product._id}>
  <img  src={product.images[0].url} alt="blue-tshirt" />
  <p>{product.name}</p>
  <div>
    <ReactStars {...options}/> <span> (254 reviews)</span>
  </div>
  <span>₹ {product.price}</span>
  </Link>
  )
}

export default Products;
    



