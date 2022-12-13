import React from 'react';
import { useEffect } from 'react';
import {CgMouse} from "react-icons/cg"
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../actions/productActions';
import Loader from '../Loader/Loader';
import "./Home.css";
import Products from './Product';
import {useAlert} from 'react-alert';



const Home = () => {
  const alert= useAlert();
  const dispatch= useDispatch();
  const {loading,error,products,productCount}=useSelector(
    (state)=>state.products
  );

useEffect(()=>{
  if(error){
    //console.log(error)
    return alert.error(error)
  }
  dispatch(getProduct())
},[dispatch, error]);

  return (
    <>
   {loading ? (<Loader/>) :(
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
   )}
    
     </>
  )
}

export default Home
