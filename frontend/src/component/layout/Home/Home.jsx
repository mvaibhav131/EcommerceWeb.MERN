import React from 'react';
import {CgMouse} from "react-icons/cg"
import "./Home.css";

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

     <div className="container" id='container'> </div>
    </div>
  )
}

export default Home
