import React from 'react';
import { useEffect } from 'react';
import {CgMouse} from "react-icons/cg"
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../actions/productActions';
import "./Home.css";
import Products from './Product';



const Home = () => {
  const dispatch= useDispatch();
  const {loading,error,products,productCount}=useSelector(
    (state)=>state.products
  );

useEffect(()=>{
  dispatch(getProduct())
},[dispatch]);

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
     {products && products.map((product)=> <Products product={product}/>)}
       </div>
    </div>
  )
}

export default Home
