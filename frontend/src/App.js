
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './component/layout/Header/Footer/Footer';
import Header from './component/layout/Header/Header/Header';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <hr style={{marginBottom:"550px"}}/>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
