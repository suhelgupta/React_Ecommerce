import './App.css';
import Home from './Pages/Home';
// import { BrowserRouter as Router,  Switch,Routes, Route, Link } from 'react-router-dom';
import Cart from './Pages/Cart';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from './Pages/Login';
import Products from './Pages/Products';
import Product from './Pages/Product';
import Signup from './Pages/Signup';
import PageNotFound from './Pages/PageNotFound';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemTotalPrice } from './redux/cartSlice';
import { fetchProducts, fetchUsers } from './ApiCalls';


function App() {
  const dispatch = useDispatch();
  const cartState = useSelector((state)=>state.cart.cart)

  useEffect(() => {
    dispatch(cartItemTotalPrice());
  }, [cartState,dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [dispatch]);

  
  return (
    <>
      <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/home" element={ <Home />} />  
            <Route path="/cart" element={ <Cart />} />  
            <Route path="/login" element={ <Login />} />  
            <Route path="/signup" element={ <Signup isAdmin={false} />} />  
            <Route path="/addemployee" element={ <Signup isAdmin={true}  />} />  
            <Route path="/products/" element={ <Products />} />  
            <Route path="/products/:id" element={ <Product />} />
            <Route path="*" element={<PageNotFound />} />   
        </Routes>
        <Footer />
      </div>
    </Router>
    </>
  );
}

export default App;
