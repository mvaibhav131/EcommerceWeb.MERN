
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Cart from './component/layout/Cart/Cart';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import Home from './component/layout/Home/Home';
import MyOrder from './component/layout/Order/MyOrder';
import Product from './component/layout/Product/Product';
import MyProfile from './component/layout/Profile/MyProfile';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/product" element= {<Product/>} />
        <Route path="/cart" element= {<Cart/>} />
        <Route path="/order" element= {<MyOrder/>} />
        <Route path="/profile" element={MyProfile} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
