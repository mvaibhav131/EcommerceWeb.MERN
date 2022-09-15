import React from 'react';
import {CgMouse} from "react-icons/cg"
import "./Home.css";
import Products from './Product';

const product={
  name:"Blue Shirt",
  images:[{url:"https://cdn.shopify.com/s/files/1/1650/5551/products/men-s-round-neck-plain-t-shirt-navy-blue-regular-fit-t-shirt-wolfattire-2549451063341_800x.jpg?v=1561008965"}],
  price:"3000",
  _id:"tshirts"
};

const Home = () => {
  return (
    <div>
     <div className="banner">
      <p>Welcome to Shopify </p>
      <h1>FIND AMEZING PRODUCTS BELOW </h1>

      <a href="#container">
        <button>
          Scroll <CgMouse/> 
        </button>
      </a>
    
     </div>
     <h2 className="homeheading">Featured Product</h2>

     <div className="container" id='container'>
               <Products product={product}/>
               <Products product={product}/>
               <Products product={product}/>
               <Products product={product}/>
               <Products product={product}/>
               <Products product={product}/>
               <Products product={product}/>
               <Products product={product}/>
               <Products product={product}/>
               <Products product={product}/>
       </div>
    </div>
  )
}

export default Home
